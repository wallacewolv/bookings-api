const User = require("./User");
const bcrypt = require("bcrypt");

class AuthService {
  constructor(repository) {
    this.repository = repository;
  }

  register(name, email, password) {
    const userExists = this.repository.findByEmail(email);
    if (userExists) {
      throw new Error("This email was already used by another user.");
    }

    const newUser = new User({ name, email, password });
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    this.repository.save(newUser);
    return newUser;
  }

  login() {

  }
}

module.exports = AuthService;
