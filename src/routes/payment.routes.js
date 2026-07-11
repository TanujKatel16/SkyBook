import { Router } from "express";

import {

    makePayment,

    getPaymentById,

    getPaymentByBookingId

} from "../controllers/payment.controller.js";

import { verifyJWT } from "../middleware/verifyJWT.js";

const router = Router();

router.post(
    "/",
    verifyJWT,
    makePayment
);

router.get(
    "/:id",
    verifyJWT,
    getPaymentById
);

router.get(
    "/booking/:bookingId",
    verifyJWT,
    getPaymentByBookingId
);

export default router;