const { authService, bookingController } = require("../bootstrap");

const authenticatedRouteoptions = {
  preHandler: async (request, reply) => {
    // Bearer seu-token....
    const token = request.headers.authorization?.replace(/^Bearer /, "");
    if (!token) reply.code(401).send({ message: "Unauthorized: token missing." });

    const user = await authService.verifyToken(token);
    if (!user) reply.code(404).send({ message: "Unauthorized: invalid token." });
    request.user = user;
  }
};

function bookingRoutes(app) {
  app.get("/api/bookings", authenticatedRouteoptions, async (request, reply) => {
    const { code, body } = await bookingController.index(request);
    reply.code(code).send(body);
  });

  app.post("/api/bookings", authenticatedRouteoptions, async (request, reply) => {
    const { code, body } = await bookingController.save(request);
    reply.code(code).send({ body });
  });
}

module.exports = bookingRoutes;
