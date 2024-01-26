const fastify = require('fastify');
const bookingRoutes = require('./routes/booking-routes');
const userRoutes = require('./routes/user-routes');

const app = fastify({ logger: true });

bookingRoutes(app);
userRoutes(app);

module.exports = app;
