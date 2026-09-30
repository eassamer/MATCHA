// BE-04: password change must verify the current password and store a hash
const { truncateAll, createUser, one } = require("../helpers/db");
const { api } = require("../helpers/http");

describe("POST /users/update/password", () => {
  beforeEach(truncateAll);

  test("stores an argon2 hash and the new password works for login", async () => {
    const alice = await createUser({ password: "OldPassword1" });

    const res = await api(alice)
      .post("/users/update/password")
      .send({ currentPassword: "OldPassword1", password: "NewPassword2" });
    expect(res.status).toBe(200);

    const row = await one("SELECT password FROM users WHERE userId = ?", [alice.userId]);
    expect(row.password).not.toBe("NewPassword2");
    expect(row.password.startsWith("$argon2")).toBe(true);

    await api().post("/auth/login").send({ email: alice.email, password: "NewPassword2" }).expect(200);
    await api().post("/auth/login").send({ email: alice.email, password: "OldPassword1" }).expect(401);
  });

  test("rejects a wrong current password with 401 and keeps the old one", async () => {
    const alice = await createUser({ password: "OldPassword1" });
    const res = await api(alice)
      .post("/users/update/password")
      .send({ currentPassword: "Nope12345", password: "NewPassword2" });
    expect(res.status).toBe(401);
    await api().post("/auth/login").send({ email: alice.email, password: "OldPassword1" }).expect(200);
  });

  test("rejects a weak new password with 400", async () => {
    const alice = await createUser({ password: "OldPassword1" });
    const res = await api(alice)
      .post("/users/update/password")
      .send({ currentPassword: "OldPassword1", password: "short" });
    expect(res.status).toBe(400);
  });

  test("requires the current password", async () => {
    const alice = await createUser();
    const res = await api(alice).post("/users/update/password").send({ password: "NewPassword2" });
    expect(res.status).toBe(400);
  });
});
