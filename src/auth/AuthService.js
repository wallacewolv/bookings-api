const User = require("./User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    return { name: newUser.name, email: newUser.email };
  }

  login(email, password) {
    const user = this.repository.findByEmail(email);
    if (!user) {
      throw new Error("User not found.");
    }

    const isSamePassword = bcrypt.compareSync(password, user.password);
    if (!isSamePassword) {
      throw new Error("Wrong password.");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "segredo-do-jwt", { expiresIn: "1d" }
    );

    return { token, user: { name: user.name, email: user.email } };
  };
};


module.exports = AuthService;
