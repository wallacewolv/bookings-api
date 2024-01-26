const BookingMemoryRepository = require('./bookings/BookingMemoryRepository');
const BookingPostgreRepository = require('./bookings/BookingPostgreRepository');
const BookingService = require('./bookings/BookingService');
const BookingController = require('./bookings/BookingController');

const UserMemoryRepository = require('./auth/UserMemoryRepository');
const UserPostgreRepository = require('./auth/UserPostgreRepository');
const AuthService = require('./auth/AuthService');
const AuthController = require('./auth/AuthController');

const bookingRepository = new BookingPostgreRepository();
const bookingService = new BookingService(bookingRepository);
const bookingController = new BookingController(bookingService);

const userRepository = new UserPostgreRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

module.exports = {
  bookingRepository,
  bookingService,
  bookingController,
  userRepository,
  authService,
  authController,
};
