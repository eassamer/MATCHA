// BE-03 (createdAt + superlike), BE-18 (matches list), BE-23 (unmatch in both directions)
const { truncateAll, createUser, rows, one } = require("../helpers/db");
const { api } = require("../helpers/http");

async function makeMatch(first, second) {
  await api(first).post("/relations/like").send({ id: second.userId }).expect(200);
  const res = await api(second).post("/relations/like").send({ id: first.userId }).expect(200);
  return res.body;
}

describe("likes, matches and unmatch", () => {
  beforeEach(truncateAll);

  test("a like back creates a match with createdAt and removes the pending like", async () => {
    const a = await createUser();
    const b = await createUser();
    const body = await makeMatch(a, b);

    expect(Array.isArray(body)).toBe(true);
    expect(body[0].matchedUserId).toBe(a.userId);
    expect(body[0].matchedUser.displayName).toBe(a.displayName);

    const match = await one("SELECT * FROM matches");
    expect(match.createdAt).toBeInstanceOf(Date);
    expect(await rows("SELECT * FROM likes")).toHaveLength(0);

    const events = global.fakeIo.emitted.filter((e) => e.event === "match");
    expect(events.map((e) => e.room).sort()).toEqual([a.userId, b.userId].sort());
  });

  test("GET /relations/matches returns the other user for both sides", async () => {
    const a = await createUser();
    const b = await createUser();
    await makeMatch(a, b);

    const forA = await api(a).get("/relations/matches").expect(200);
    expect(forA.body).toHaveLength(1);
    expect(forA.body[0].userId).toBe(b.userId);
    expect(forA.body[0].displayName).toBe(b.displayName);
    expect(forA.body[0].matchId).toBeDefined();
    expect(forA.body[0].password).toBeUndefined();

    const forB = await api(b).get("/relations/matches").expect(200);
    expect(forB.body).toHaveLength(1);
    expect(forB.body[0].userId).toBe(a.userId);
  });

  test("superlike stores superLike=true", async () => {
    const a = await createUser();
    const b = await createUser();
    await api(a).post("/relations/superlike").send({ id: b.userId }).expect(200);
    const like = await one("SELECT * FROM likes WHERE senderId = ? AND receiverId = ?", [a.userId, b.userId]);
    expect(like.superLike).toBe(1);
    expect(like.createdAt).toBeInstanceOf(Date);
  });

  test("dislike stores createdAt", async () => {
    const a = await createUser();
    const b = await createUser();
    await api(a).post("/relations/dislike").send({ id: b.userId }).expect(200);
    const dislike = await one("SELECT * FROM dislikes");
    expect(dislike.createdAt).toBeInstanceOf(Date);
  });

  test.each([
    ["the user who liked first", 0],
    ["the user who liked back", 1],
  ])("unmatch works when initiated by %s", async (_label, initiatorIndex) => {
    const a = await createUser();
    const b = await createUser();
    await makeMatch(a, b);
    const [initiator, other] = initiatorIndex === 0 ? [a, b] : [b, a];

    await api(initiator).delete("/relations/match").send({ id: other.userId }).expect(200);

    expect(await rows("SELECT * FROM matches")).toHaveLength(0);
    expect((await api(a).get("/relations/matches")).body).toHaveLength(0);
    expect((await api(b).get("/relations/matches")).body).toHaveLength(0);
    const events = global.fakeIo.emitted.filter((e) => e.event === "unmatch");
    expect(events.map((e) => e.room).sort()).toEqual([a.userId, b.userId].sort());
  });

  test("unmatch with a user you are not matched with → 404 and does not touch other matches", async () => {
    const a = await createUser();
    const b = await createUser();
    const c = await createUser();
    await makeMatch(a, b);

    await api(c).delete("/relations/match").send({ id: b.userId }).expect(404);
    expect(await rows("SELECT * FROM matches")).toHaveLength(1);
  });

  test("dislike after a match removes the match regardless of direction", async () => {
    const a = await createUser();
    const b = await createUser();
    await makeMatch(a, b);
    await api(a).post("/relations/dislike").send({ id: b.userId }).expect(200);
    expect(await rows("SELECT * FROM matches")).toHaveLength(0);
  });
});
