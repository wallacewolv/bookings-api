const fastify = require('fastify');
const BookingRepository = require('./bookings/BookingRepository');
const BookingService = require('./bookings/BookingService');

const app = fastify({ logger: true });

const bookingRepository = new BookingRepository();
const bookingService = new BookingService(bookingRepository);

app.get("/hello", (request, reply) => {
  reply.send({ message: "Hello, World!" });
});

app.post("/api/bookings", (request, reply) => {
  const { roomId, guestName, checkInDate, checkOutDate } = request.body;

  const booking = bookingService.createBooking({ roomId, guestName, checkInDate, checkOutDate });

  reply.code(201).send({ message: "Booking created successfully.", booking });
});

module.exports = app;
