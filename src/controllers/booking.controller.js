import { asyncHandler } from "../utils/asyncHandler.js";
import bookingService from "../services/booking.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createBooking = asyncHandler(async (req, res) => {

    const booking =
        await bookingService.createBooking(
            req.user._id,
            req.body
        );

        return res.status(201).json(
        new ApiResponse(
            201,
            booking,
            "Booking created successfully"
        )
    );

});

const getBookingById = asyncHandler(async (req, res) => {

    const booking =
        await bookingService.getBookingById(
            req.params.id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            booking,
            "Booking fetched successfully"
        )
    );

});

const getMyBookings = asyncHandler(async (req, res) => {

    const bookings =
        await bookingService.getMyBookings(
            req.user._id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            bookings,
            "Bookings fetched successfully"
        )
    );

});

const cancelBooking = asyncHandler(async (req, res) => {

    await bookingService.cancelBooking(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Booking cancelled successfully"
        )
    );

});

export {
    createBooking,
    getBookingById,
    getMyBookings,
    cancelBooking
};