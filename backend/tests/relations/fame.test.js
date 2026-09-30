// BE-02: fame rating recomputed per user after like / dislike / report
const { truncateAll, createUser, one } = require("../helpers/db");
const { api } = require("../helpers/http");

const fameOf = async (user) => (await one("SELECT fameRating FROM users WHERE userId = ?", [user.userId])).fameRating;

describe("fame rating", () => {
  beforeEach(truncateAll);

  test("like → 100, then dislike → 50, then report → 33; other users untouched", async () => {
    const target = await createUser();
    const a = await createUser();
    const b = await createUser();
    const c = await createUser();
    expect(await fameOf(target)).toBe(50);

    await api(a).post("/relations/like").send({ id: target.userId }).expect(200);
    expect(await fameOf(target)).toBe(100);
    expect(await fameOf(a)).toBe(50);

    await api(b).post("/relations/dislike").send({ id: target.userId }).expect(200);
    expect(await fameOf(target)).toBe(50);

    await api(c).post("/users/report").send({ id: target.userId, reason: "This account looks fake" }).expect(200);
    expect(await fameOf(target)).toBe(33);
    expect(await fameOf(a)).toBe(50);
    expect(await fameOf(b)).toBe(50);
  });

  test("a match counts as a positive signal", async () => {
    const a = await createUser();
    const b = await createUser();
    await api(a).post("/relations/like").send({ id: b.userId }).expect(200);
    await api(b).post("/relations/like").send({ id: a.userId }).expect(200);
    expect(await fameOf(a)).toBe(100);
    expect(await fameOf(b)).toBe(100);
  });
});
