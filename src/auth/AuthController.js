class AuthController {
  constructor(service) {
    this.service = service;
  }

  register(request) {
    const { name, email, password } = request.body;
    if (!name || !email || !password) {
      return { codee: 400, body: { message: "name, email, password are required." } };
    }

    try {
      const user = this.service.register(name, email, password);
      return { code: 201, body: { message: "User created successfully.", user } };
    } catch (error) {
      return { code: 400, body: { message: error.message } };
    }
  }

  login(request) {

  }
}

module.exports = AuthController;
