// BE-01: login must not be filtered out by received dislikes
const { truncateAll, createUser, addImage } = require("../helpers/db");
const { api } = require("../helpers/http");

describe("POST /auth/login", () => {
  beforeEach(truncateAll);

  test("a user who has received a dislike can still log in", async () => {
    const alice = await createUser({ password: "Password123" });
    const bob = await createUser();
    await api(bob).post("/relations/dislike").send({ id: alice.userId }).expect(200);

    const res = await api().post("/auth/login").send({ email: alice.email, password: "Password123" });

    expect(res.status).toBe(200);
    expect(res.body.userId).toBe(alice.userId);
    expect(res.body.password).toBeUndefined();
    expect(res.headers["set-cookie"].join(";")).toMatch(/jwt=/);
  });

  test("returns pictures as an array and relation lists as JSON", async () => {
    const alice = await createUser();
    await addImage(alice.userId, 0, "https://example.com/a0.jpg");
    await addImage(alice.userId, 1, "https://example.com/a1.jpg");

    const res = await api().post("/auth/login").send({ email: alice.email, password: alice.password });

    expect(res.status).toBe(200);
    expect(res.body.userImages).toEqual(
      expect.arrayContaining(["https://example.com/a0.jpg", "https://example.com/a1.jpg"])
    );
    expect(res.body.userImages).toHaveLength(2);
    expect(res.body.likes).toBeNull();
    expect(res.body.likedBy).toBeNull();
    expect(res.body.matches).toBeNull();
  });

  test("rejects a wrong password", async () => {
    const alice = await createUser();
    const res = await api().post("/auth/login").send({ email: alice.email, password: "Wrong1234" });
    expect(res.status).toBe(401);
  });
});
