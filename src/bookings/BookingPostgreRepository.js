const db = require("../database");
const Booking = require("./Booking");

class BookingPostgreRepository {
  constructor() {
    this.db = db;
  }

  async findAll() {
    const storeBookings = await this.db.manyOrNone(`
      SELECT id, 
      room_id AS "roomId", 
      guest_name AS "guestName", 
      check_in_date AS "checkInDate", 
      check_out_date AS "checkOutDate,
      user_id AS "UserId"
      FROM Bookings
    `);

    return storeBookings.map(booking => new Booking(booking));
  }

  async create(booking) {
    const insert = "INSERT INTO Bookings (id, room_id, guest_name, check_in_date, check_out_date, user_id)";
    const values = "VALUES (${id}, ${roomId}, ${guestName}, ${checkInDate}, ${checkOutDate}, ${userId})"
    await this.db.none(`${insert} ${values}`, booking);
  }
}

module.exports = BookingPostgreRepository;
