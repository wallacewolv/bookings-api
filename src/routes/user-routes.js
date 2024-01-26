const { authController } = require("../bootstrap");

function userRoutes(app) {
  app.post("/api/auth/register", async (request, reply) => {
    const { code, body } = await authController.register(request);
    reply.code(code).send(body);
  });

  app.post("/api/auth/login", async (request, reply) => {
    const { code, body } = await authController.login(request);
    reply.code(code).send(body);
  });
}

module.exports = userRoutes;
