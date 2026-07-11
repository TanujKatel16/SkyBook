import paymentRepository from "../repositories/payment.repository.js";
import bookingRepository from "../repositories/booking.repository.js";
import flightRepository from "../repositories/flight.repository.js";
import { ApiError } from "../utils/ApiError.js";

class PaymentService {

    async makePayment(paymentData) {

        const {

            bookingId,

            paymentMethod

        } = paymentData;

        const booking =
            await bookingRepository.findById(
                bookingId
            );

        if (!booking) {

            throw new ApiError(
                404,
                "Booking not found"
            );

        }

        if (
            booking.bookingStatus ===
            "Confirmed"
        ) {

            throw new ApiError(
                400,
                "Booking already paid"
            );

        }

        const flight =
            await flightRepository.findById(
                booking.flight._id
            );

        if (
            flight.availableSeats <= 0
        ) {

            throw new ApiError(
                400,
                "No seats available"
            );

        }

        const payment =
            await paymentRepository.createPayment({

                booking: booking._id,

                amount: booking.totalFare,

                paymentMethod,

                paymentStatus: "Success",

                transactionId:
                    "TXN" + Date.now()

            });

        await flightRepository.updateFlight(

            flight._id,

            {

                availableSeats:
                    flight.availableSeats - 1

            }

        );

        await bookingRepository.updateBooking(

            booking._id,

            {

                bookingStatus:
                    "Confirmed"

            }

        );

        return payment;

    }

    async getPaymentById(id) {

        const payment =
            await paymentRepository.findById(
                id
            );

        if (!payment) {

            throw new ApiError(
                404,
                "Payment not found"
            );

        }

        return payment;

    }

    async getPaymentByBookingId(
        bookingId
    ) {

        const payment =
            await paymentRepository.findByBookingId(
                bookingId
            );

        if (!payment) {

            throw new ApiError(
                404,
                "Payment not found"
            );

        }

        return payment;

    }

}

export default new PaymentService();