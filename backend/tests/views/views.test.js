// BE-16: profile view history
const { truncateAll, createUser, addImage, rows } = require("../helpers/db");
const { api } = require("../helpers/http");

describe("views", () => {
  beforeEach(truncateAll);

  test("POST /views records a visit once per pair and notifies the viewed user", async () => {
    const viewer = await createUser();
    const viewed = await createUser();

    const first = await api(viewer).post("/views").send({ id: viewed.userId });
    expect(first.status).toBe(201);
    expect(first.body).toMatchObject({ created: true, viewerId: viewer.userId, viewedId: viewed.userId });

    const second = await api(viewer).post("/views").send({ id: viewed.userId });
    expect(second.status).toBe(200);
    expect(second.body.created).toBe(false);

    expect(await rows("SELECT * FROM views")).toHaveLength(1);

    const notifications = await rows("SELECT * FROM notifications WHERE userId = ?", [viewed.userId]);
    expect(notifications).toHaveLength(1);
    expect(notifications[0].type).toBe("view");
    expect(notifications[0].content).toContain(viewer.displayName);

    const event = global.fakeIo.emitted.find((e) => e.event === "view");
    expect(event.room).toBe(viewed.userId);
    expect(event.payload.viewerId).toBe(viewer.userId);
  });

  test("viewing your own profile is not recorded; unknown users → 404", async () => {
    const me = await createUser();
    const res = await api(me).post("/views").send({ id: me.userId }).expect(200);
    expect(res.body.created).toBe(false);
    expect(await rows("SELECT * FROM views")).toHaveLength(0);

    await api(me).post("/views").send({ id: "00000000-0000-0000-0000-000000000000" }).expect(404);
    await api(me).post("/views").send({}).expect(400);
  });

  test("GET /views/me lists viewers with their profile and picture, most recent first", async () => {
    const viewed = await createUser();
    const v1 = await createUser();
    const v2 = await createUser();
    await addImage(v1.userId, 0, "https://example.com/v1.jpg");
    await api(v1).post("/views").send({ id: viewed.userId }).expect(201);
    await api(v2).post("/views").send({ id: viewed.userId }).expect(201);

    const res = await api(viewed).get("/views/me").expect(200);
    expect(res.body.map((v) => v.userId)).toEqual([v2.userId, v1.userId]);
    expect(res.body[1].displayName).toBe(v1.displayName);
    expect(res.body[1].userImages).toEqual(["https://example.com/v1.jpg"]);
    expect(res.body[1].viewedAt).toBeDefined();
    expect(res.body[1].password).toBeUndefined();
  });

  test("GET /views/:userId is restricted to your own id", async () => {
    const a = await createUser();
    const b = await createUser();
    await api(a).get(`/views/${a.userId}`).expect(200);
    await api(a).get(`/views/${b.userId}`).expect(403);
  });
});
