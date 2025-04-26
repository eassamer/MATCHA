const usersTable = require("./users.table");

class GlobalDatabase {
  constructor() {
    this.name = "GlobalDatabase";
    this.message = "Global Database";
    this.status = 200;
    this.client = null;
    this.isConnected = false;
    this.connection = null;
    this.users = new usersTable();
    this.images = [];
    this.likes = [];
    this.dislikes = [];
    this.oauthUsers = [];
    this.matches = [];
    this.messages = [];
  }

  clearUsers() {
    this.users.destroy();
    this.users = new usersTable();
  }

  

  
}

module.exports = GlobalDatabase;
