import bookingRepository from "../repositories/booking.repository.js";
import flightRepository from "../repositories/flight.repository.js";
import generatePNR from "../utils/generatePNR.js";
import { ApiError } from "../utils/ApiError.js";

class BookingService {

    async createBooking(userId, bookingData) {

        const {
            flightId,
            passengers
        } = bookingData;

        if (!passengers || passengers.length === 0) {
        throw new ApiError(400, "At least one passenger is required");
}

        const flight = await flightRepository.findById(flightId);

        if (!flight) {
            throw new ApiError(404, "Flight not found");
        }

        if (flight.availableSeats < passengers.length) {
        throw new ApiError(
            400,
            `Only ${flight.availableSeats} seats are available`
        );
    }

        const booking = await bookingRepository.createBooking({

            user: userId,

            flight: flightId,

            passengers,

            bookingStatus: "Pending",

            totalFare: flight.baseFare * passengers.length,

            pnr: generatePNR() // isme change baakin hai

        });
        return booking;

    }

    async getBookingByPNR(pnr) {

        const booking =
            await bookingRepository.findByPNR(pnr);

        if (!booking) {

            throw new ApiError(

                404,

                "Booking not found"

            );

        }

        return booking;

    }

    async getBookingById(id) {

        const booking =
            await bookingRepository.findById(id);

        if (!booking) {
            throw new ApiError(
                404,
                "Booking not found"
            );
        }

        return booking;

    }

    async getMyBookings(userId) {

        return await bookingRepository.findByUserId(
            userId
        );

    }

    async cancelBooking(id) {  //Ek tweak baaki hai isme, agar booking cancel hogye jo pending tha toh no change in seats

        const booking =
            await bookingRepository.findById(id);

        if (!booking) {
            throw new ApiError(
                404,
                "Booking not found"
            );
        }

        if (booking.bookingStatus === "Cancelled") {
            throw new ApiError(
                400,
                "Booking already cancelled"
            );
        }

        await bookingRepository.updateBooking(
            id,
            {
                bookingStatus: "Cancelled"
            }
        );

        const flight =
            await flightRepository.findById(
                booking.flight._id
            );

        await flightRepository.updateFlight(
            flight._id,
            {
                availableSeats:
                    flight.availableSeats + 1
            }
        );

        return;

    }

}

export default new BookingService();