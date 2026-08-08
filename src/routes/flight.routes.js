import { Router } from "express";
import {
    createFlight,
    getFlightById,
    getAllFlights,
    searchFlights,
    updateFlight,
    deleteFlight,
    getFrequentRoutes
} from "../controllers/flight.controller.js";

import { verifyJWT } from "../middleware/verifyJWT.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = Router();

// Public Routes
router.get("/", getAllFlights);
router.get("/search", searchFlights);
router.get("/frequent-routes",getFrequentRoutes);
router.get("/:id", getFlightById);


// Admin Routes
router.post("/", verifyJWT, verifyAdmin, createFlight);
router.patch("/:id", verifyJWT, verifyAdmin, updateFlight);
router.delete("/:id", verifyJWT, verifyAdmin, deleteFlight);

export default router;