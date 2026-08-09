import paymentRepository from "../repositories/payment.repository.js";
import bookingRepository from "../repositories/booking.repository.js";
import flightRepository from "../repositories/flight.repository.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";
import emailService from "./email.service.js";

class PaymentService {


    async makePayment(paymentData) {

        const session = await mongoose.startSession();

        try {

            session.startTransaction();

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

            if (booking.bookingStatus === "Confirmed") {
                throw new ApiError(
                    400,
                    "Booking already paid"
                );
            }

            const flight =
                await flightRepository.findById(
                    booking.flight._id
                );

            if (flight.availableSeats < booking.passengers.length) {
                throw new ApiError(
                    400,
                    "Not enough seats available"
                );
            }

            const payment =
                await paymentRepository.createPayment(

                    {

                        booking: booking._id,

                        amount: booking.totalFare,

                        paymentMethod,

                        paymentStatus: "Success",

                        transactionId:
                            "TXN" + Date.now()

                    },

                    session

                );

            await flightRepository.updateFlight(

                flight._id,

                {

                    availableSeats: flight.availableSeats - booking.passengers.length

                },

                session

            );

            await bookingRepository.updateBooking(

                booking._id,

                {

                    bookingStatus: "Confirmed"

                },

                session

            );

            await session.commitTransaction();

            session.endSession();

            try{
               
                await emailService.sendBookingConfirmation({

                email: booking.user.email,

                passengers: booking.passengers,

                flightNumber: flight.flightNumber,

                source: flight.source,

                destination: flight.destination,

                departureTime: flight.departureTime,

                amount: booking.totalFare,

                transactionId: payment.transactionId

            });

            }catch (error){

                console.error("Email sending failed:", error);

            }

            return payment;

        }

        catch (error) {

            await session.abortTransaction();

            session.endSession();

            throw error;

        }

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