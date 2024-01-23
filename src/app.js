const fastify = require('fastify');

const BookingRepository = require('./bookings/BookingRepository');
const BookingService = require('./bookings/BookingService');
const BookingController = require('./bookings/BookingController');

const UserRepository = require('./auth/UserRepository');
const AuthService = require('./auth/AuthService');
const AuthController = require('./auth/AuthController');

const app = fastify({ logger: true });

const bookingRepository = new BookingRepository();
const bookingService = new BookingService(bookingRepository);
const bookingController = new BookingController(bookingService);

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

const authenticatedRouteoptions = {
  preHandler: (request, reply, done) => {
    // Bearer seu-token....
    const token = request.headers.authorization?.replace(/^Bearer /, "");
    if (!token) reply.code(401).send({ message: "Unauthorized: token missing." });

    const user = authService.verifyToken(token);
    if (!user) reply.code(404).send({ message: "Unauthorized: invalid token." });
    request.user = user;
    done();
  }
};

app.get("/hello", (request, reply) => {
  reply.send({ message: "Hello, World!" });
});

app.get("/api/bookings", authenticatedRouteoptions, (request, reply) => {
  const { code, body } = bookingController.index(request);
  reply.code(code).send(body);
});

app.post("/api/bookings", authenticatedRouteoptions, (request, reply) => {
  const { code, body } = bookingController.save(request);
  reply.code(code).send({ body });
});

app.post("/api/auth/register", (request, reply) => {
  const { code, body } = authController.register(request);
  reply.code(code).send(body);
});

app.post("/api/auth/login", (request, reply) => {
  const { code, body } = authController.login(request);
  reply.code(code).send(body);
});

module.exports = app;
