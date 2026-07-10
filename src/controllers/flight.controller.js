import { asyncHandler } from "../utils/asyncHandler.js";
import flightService from "../services/flight.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createFlight = asyncHandler(async (req, res) => {

    const flight = await flightService.createFlight(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            flight,
            "Flight created successfully"
        )
    );

});

const getFlightById = asyncHandler(async (req, res) => {

    const flight = await flightService.getFlightById(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            flight,
            "Flight fetched successfully"
        )
    );

});

const getAllFlights = asyncHandler(async (req, res) => {

    const flights = await flightService.getAllFlights();

    return res.status(200).json(
        new ApiResponse(
            200,
            flights,
            "Flights fetched successfully"
        )
    );

});

const searchFlights = asyncHandler(async (req, res) => {

    const flights = await flightService.searchFlights(
        req.query
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            flights,
            "Flights fetched successfully"
        )
    );

});

const updateFlight = asyncHandler(async (req, res) => {

    const flight = await flightService.updateFlight(
        req.params.id,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            flight,
            "Flight updated successfully"
        )
    );

});

const deleteFlight = asyncHandler(async (req, res) => {

    await flightService.deleteFlight(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Flight deleted successfully"
        )
    );

});

export {
    createFlight,
    getFlightById,
    getAllFlights,
    searchFlights,
    updateFlight,
    deleteFlight
};