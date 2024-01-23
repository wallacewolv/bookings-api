const Booking = require("./booking");

class BookingService {
  constructor(repository) {
    this.repository = repository;
  }

  findAllBooking() {
    return this.repository.findAll();
  }

  createBooking({ user, roomId, guestName, checkInDate, checkOutDate }) {
    const newBooking = new Booking({ user, roomId, guestName, checkInDate, checkOutDate });

    const overlappingBooking = this.repository.findAll().find((booking) => {
      return (
        booking.roomId === newBooking.roomId &&
        booking.checkInDate < newBooking.checkOutDate &&
        booking.checkOutDate > newBooking.checkInDate
      );
    });

    if (overlappingBooking) {
      throw new Error("The room is already booked for the selected dates.");
    }

    this.repository.create(newBooking);
    return newBooking;
  }
}

module.exports = BookingService;
