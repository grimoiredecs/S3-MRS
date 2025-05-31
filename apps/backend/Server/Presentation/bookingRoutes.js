// routes/bookingRoutes.js
import createBookingController from './BookingControllers.js';
import BookingService from '../Business/BookingServices.js';

const bookingRouter = createBookingController(BookingService);

export default bookingRouter;