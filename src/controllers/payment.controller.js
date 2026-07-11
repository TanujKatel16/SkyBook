import { asyncHandler } from "../utils/asyncHandler.js";
import paymentService from "../services/payment.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const makePayment = asyncHandler(async (req, res) => {

    const payment =
        await paymentService.makePayment(
            req.body
        );

    return res.status(201).json(

        new ApiResponse(

            201,

            payment,

            "Payment successful"

        )

    );

});

const getPaymentById = asyncHandler(async (req, res) => {

    const payment =
        await paymentService.getPaymentById(
            req.params.id
        );

    return res.status(200).json(

        new ApiResponse(

            200,

            payment,

            "Payment fetched successfully"

        )

    );

});

const getPaymentByBookingId = asyncHandler(async (req, res) => {

    const payment =
        await paymentService.getPaymentByBookingId(
            req.params.bookingId
        );

    return res.status(200).json(

        new ApiResponse(

            200,

            payment,

            "Payment fetched successfully"

        )

    );

});

export {

    makePayment,

    getPaymentById,

    getPaymentByBookingId

};