// BE-39 (pool + ready) and BE-40 (migrate + seed)
const db = require("@lib/db/dbconnect");
const { migrate } = require("../../src/lib/db/migrate");
const { seed } = require("../../scripts/seed");
const { truncateAll, rows, one } = require("../helpers/db");

describe("database infrastructure", () => {
  beforeEach(truncateAll);

  test("ready() resolves and the pool can execute queries", async () => {
    await expect(db.ready({ log: () => {} })).resolves.toBeDefined();
    const [result] = await db.promise().query("SELECT 1 + 1 AS two");
    expect(result[0].two).toBe(2);
  });

  test("migrate() is idempotent: applying the schema twice keeps all tables", async () => {
    await migrate({ log: () => {} });
    await migrate({ log: () => {} });
    const tables = (await rows("SHOW TABLES")).map((r) => Object.values(r)[0]);
    for (const table of [
      "users", "images", "likes", "dislikes", "matches", "messages", "report", "notifications", "blocks", "views",
    ]) {
      expect(tables).toContain(table);
    }
    // schema.sql renamed messages.content1 -> content
    const columns = (await rows("SHOW COLUMNS FROM messages")).map((c) => c.Field);
    expect(columns).toContain("content");
    expect(columns).not.toContain("content1");
  });

  test("seed() inserts users with pictures, coordinates, likes, matches and views", async () => {
    const summary = await seed({ count: 30, prefix: "seedtest", log: () => {} });
    expect(summary.users).toBe(30);
    expect(summary.images).toBe(90);

    expect((await one("SELECT COUNT(*) AS n FROM users")).n).toBe(30);
    expect((await one("SELECT COUNT(*) AS n FROM images")).n).toBe(90);
    expect((await one("SELECT COUNT(*) AS n FROM users WHERE latitude IS NULL OR longitude IS NULL")).n).toBe(0);
    expect((await one("SELECT COUNT(*) AS n FROM likes")).n).toBe(summary.likes);
    expect((await one("SELECT COUNT(*) AS n FROM matches")).n).toBe(summary.matches);
    expect((await one("SELECT COUNT(*) AS n FROM views")).n).toBeGreaterThan(0);

    const user = await one("SELECT * FROM users WHERE displayName = 'seedtest0'");
    expect(user.password.startsWith("$argon2")).toBe(true);
    expect(Array.isArray(user.orientation)).toBe(true);
    expect(user.emailVerified).toBe(1);
  });
});
