const Booking = require("./booking");

class BookingService {
  constructor(repository) {
    this.repository = repository;
  }

  findAllBooking() {
    return this.repository.findAll();
  }

  createBooking({ roomId, guestName, checkInDate, checkOutDate }) {
    const newBooking = new Booking(roomId, guestName, checkInDate, checkOutDate);

    this.repository.create(newBooking);
    return newBooking;
  }
}

module.exports = BookingService;
