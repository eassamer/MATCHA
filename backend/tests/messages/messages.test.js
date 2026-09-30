// BE-29: message persistence and history
const { truncateAll, createUser, rows } = require("../helpers/db");
const { api } = require("../helpers/http");

describe("messages", () => {
  beforeEach(truncateAll);

  test("POST /messages/create persists the message and emits it to the receiver", async () => {
    const a = await createUser();
    const b = await createUser();

    const res = await api(a).post("/messages/create").send({ receiverId: b.userId, content: "  hello  " });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ senderId: a.userId, receiverId: b.userId, content: "hello" });
    expect(res.body.id).toMatch(/^[0-9a-f-]{36}$/);
    expect(res.body.createdAt).toBeDefined();

    const stored = await rows("SELECT * FROM messages");
    expect(stored).toHaveLength(1);
    expect(stored[0]).toMatchObject({ id: res.body.id, content: "hello" });
    expect(stored[0].createdAt).toBeInstanceOf(Date);

    const event = global.fakeIo.emitted.find((e) => e.event === "newMessage");
    expect(event.room).toBe(b.userId);
    expect(event.payload.id).toBe(res.body.id);
  });

  test("rejects empty content, self-messaging and unknown receivers", async () => {
    const a = await createUser();
    const b = await createUser();
    await api(a).post("/messages/create").send({ receiverId: b.userId, content: "   " }).expect(400);
    await api(a).post("/messages/create").send({ receiverId: a.userId, content: "hi" }).expect(403);
    await api(a).post("/messages/create").send({ receiverId: "00000000-0000-0000-0000-000000000000", content: "hi" }).expect(404);
  });

  test("GET /messages/between returns the conversation oldest-first with pagination from the newest end", async () => {
    const a = await createUser();
    const b = await createUser();
    const c = await createUser();
    for (const [sender, receiver, content] of [
      [a, b, "m1"], [b, a, "m2"], [a, b, "m3"], [a, c, "other-conversation"],
    ]) {
      await api(sender).post("/messages/create").send({ receiverId: receiver.userId, content }).expect(201);
    }

    const all = await api(a).get(`/messages/between?receiverId=${b.userId}`).expect(200);
    expect(all.body.map((m) => m.content)).toEqual(["m1", "m2", "m3"]);
    expect(all.body[0].createdAt).toBeDefined();

    const latest = await api(b).get(`/messages/between?receiverId=${a.userId}&take=0&limit=2`).expect(200);
    expect(latest.body.map((m) => m.content)).toEqual(["m2", "m3"]);

    const older = await api(b).get(`/messages/between?receiverId=${a.userId}&take=2&limit=2`).expect(200);
    expect(older.body.map((m) => m.content)).toEqual(["m1"]);
  });

  test("rejects invalid pagination", async () => {
    const a = await createUser();
    const b = await createUser();
    await api(a).get(`/messages/between?receiverId=${b.userId}&limit=abc`).expect(400);
    await api(a).get(`/messages/between?receiverId=${b.userId}&take=-1`).expect(400);
  });

  test("POST /messages/delete removes the message and notifies both participants", async () => {
    const a = await createUser();
    const b = await createUser();
    const created = await api(a).post("/messages/create").send({ receiverId: b.userId, content: "bye" });
    global.fakeIo.emitted.length = 0;

    await api(a).post("/messages/delete").send({ messageId: created.body.id }).expect(200);
    expect(await rows("SELECT * FROM messages")).toHaveLength(0);
    const targets = global.fakeIo.emitted.filter((e) => e.event === "messageDeleted").map((e) => e.room).sort();
    expect(targets).toEqual([a.userId, b.userId].sort());

    await api(a).post("/messages/delete").send({ messageId: created.body.id }).expect(404);
  });
});
