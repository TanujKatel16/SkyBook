import { Flight } from "../models/flight.model.js";

class FlightRepository {

    async createFlight(flightData) {
        return await Flight.create(flightData);
    }

    async findById(_id) {
        return await Flight.findById(_id);
    }

    async findByFlightNumber(flightNumber) {
        return await Flight.findOne({ flightNumber });
    }

    async findAllFlights() {
        return await Flight.find();
    }

    async searchFlights({ source, destination, date, passengers }) {

        const query = {};

        if (source) {
            query.source = source.toUpperCase();
        }

        if (destination) {
            query.destination = destination.toUpperCase();
        }

        if (passengers) {
            query.availableSeats = {
                $gte: Number(passengers)
            };
        }

        if (date) {

            const start = new Date(date);
            const end = new Date(date);

            end.setDate(end.getDate() + 1);

            query.departureTime = {
                $gte: start,
                $lt: end
            };

        }

        return await Flight.find(query);

    }

    async updateFlight(id,updateData,session){

        return await Flight.findByIdAndUpdate(

            id,

            {

                $set:updateData

            },

            {

                returnDocument:"after",

                session

            }

        );

    }

    async deleteFlight(_id) {

        return await Flight.findByIdAndDelete(_id);

    }

    async getFrequentRoutes() {

    return await Flight.find()

        .sort({ baseFare: 1 })

        .limit(4);

}

}

export default new FlightRepository();