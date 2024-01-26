class UserMemoryRepository {
  constructor() {
    this.users = [];
  }

  findByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  save(user) {
    this.users.push(user);
  }
}

module.exports = UserMemoryRepository;
