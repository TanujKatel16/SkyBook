import { Router } from "express";

import {
    createBooking,
    getBookingById,
    getMyBookings,
    cancelBooking
} from "../controllers/booking.controller.js";

import { verifyJWT } from "../middleware/verifyJWT.js";

const router = Router();

router.post("/", verifyJWT, createBooking);

router.get("/my-bookings", verifyJWT, getMyBookings);

router.get("/:id", verifyJWT, getBookingById);

router.patch("/:id/cancel", verifyJWT, cancelBooking);

export default router;