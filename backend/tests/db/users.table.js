class usersTable {
  constructor() {
    this.name = "userTable";
    this.message = "User Table";
    this.status = 200;
    this.client = null;
    this.isConnected = false;
    this.connection = null;
    this.users = [];
  }

  async findById(id) {
    return this.users.find((user) => user.userId === id);
  }

  async findByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  async findByDisplayName(displayName) {
    return this.users.find((user) => user.displayName === displayName);
  }

  async findByUserName(userName) {
    return this.users.find((user) => user.userName === userName);
  }

  clear() {
    this.users = [];
  }

  destroy() {
    this.users = [];
  }

  async update(
    userId,
    firstName,
    lastName,
    displayName,
    email,
    longitude,
    latitude,
    radiusInKm,
    interests,
    sex,
    bio
  ) {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error(`${this.name}.update: User not found`);
    }
    user.firstName = firstName;
    user.lastName = lastName;
    user.displayName = displayName;
    user.email = email;
    user.longitude = longitude;
    user.latitude = latitude;
    user.radiusInKm = radiusInKm || 100;
    (user.interests = interests), (user.sex = sex);
    user.bio = bio || "";
    return user;
  }

  async create(user) {
    const queryInput = {
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      birthDate: new Date(user.birthDate),
      email: user.email,
      password: user.password,
      sex: user.sex,
      interests: user.interests,
      createdAt: new Date(),
    };

    this.users.push(queryInput);
    return queryInput;
  }

  async updatePassword(userId, password) {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error(`${this.name}.updatePassword: User not found`);
    }
    user.password = password;
    return user;
  }

  async remove(userId) {
    const userIndex = this.users.findIndex((user) => user.userId === userId);
    if (userIndex === -1) {
      throw new Error(`${this.name}.remove: User not found`);
    }
    this.users.splice(userIndex, 1);
    return true;
  }

  async updateLastLocation(userId, longitude, latitude) {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error(`${this.name}.updateLastLocation: User not found`);
    }
    user.longitude = longitude;
    user.latitude = latitude;
    return user;
  }
}

module.exports = usersTable;
