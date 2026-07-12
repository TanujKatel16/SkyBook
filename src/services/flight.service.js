import flightRepository from "../repositories/flight.repository.js";
import { ApiError } from "../utils/ApiError.js";
import redisClient from "../config/redis.js";

class FlightService {

    async createFlight(flightData) {

        const {
            flightNumber,
            source,
            destination,
            departureTime,
            arrivalTime,
            totalSeats,
            availableSeats,
            baseFare,
            status
        } = flightData;

        if (
            !flightNumber ||
            !source ||
            !destination ||
            !departureTime ||
            !arrivalTime ||
            totalSeats == null ||
            availableSeats == null ||
            baseFare == null
        ) {
            throw new ApiError(400, "All required fields must be provided");
        }

        const existingFlight =
            await flightRepository.findByFlightNumber(flightNumber);

        if (existingFlight) {
            throw new ApiError(409, "Flight already exists");
        }

        if (availableSeats > totalSeats) {
            throw new ApiError(
                400,
                "Available seats cannot exceed total seats"
            );
        }

        const flight = await flightRepository.createFlight({
            flightNumber: flightNumber.toUpperCase(),
            source: source.toUpperCase(),
            destination: destination.toUpperCase(),
            departureTime,
            arrivalTime,
            totalSeats,
            availableSeats,
            baseFare,
            status
        });
        await redisClient.flushAll();

        return flight;
    }

    async getFlightById(id) {

        const flight = await flightRepository.findById(id);

        if (!flight) {
            throw new ApiError(404, "Flight not found");
        }

        return flight;
    }

    async getAllFlights() {

        return await flightRepository.findAllFlights();

    }

    async searchFlights(filters) {

        const cacheKey = `flights:${JSON.stringify(filters)}`;

        const cachedFlights = await redisClient.get(cacheKey);

        if (cachedFlights) {

            console.log("✅ Cache Hit");

            return JSON.parse(cachedFlights);

        }

        console.log("❌ Cache Miss");

        const flights = await flightRepository.searchFlights(filters);

        await redisClient.set(
            cacheKey,
            JSON.stringify(flights),
            {
                EX: 120
            }
        );

        return flights;

    }

    async updateFlight(id, updateData) {

        const flight =
            await flightRepository.updateFlight(id, updateData);

        if (!flight) {
            throw new ApiError(404, "Flight not found");
        }
        await redisClient.flushAll();

        return flight;
    }

    async deleteFlight(id) {

        const flight =
            await flightRepository.deleteFlight(id);

        if (!flight) {
            throw new ApiError(404, "Flight not found");
        }
        await redisClient.flushAll();
        return flight;
    }

}

export default new FlightService();