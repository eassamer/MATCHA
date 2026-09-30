// Per test file: install a fake socket.io instance and close the DB pool at the end.
const { setSocketInstance } = require("@lib/socketManager");
const db = require("@lib/db/dbconnect");

const emitted = [];
const fakeIo = {
  emitted,
  to: (room) => ({
    emit: (event, payload) => emitted.push({ room: String(room), event, payload }),
  }),
  emit: (event, payload) => emitted.push({ room: null, event, payload }),
};
setSocketInstance(fakeIo);
global.fakeIo = fakeIo;

beforeEach(() => {
  emitted.length = 0;
});

afterAll(async () => {
  await db.close();
});
