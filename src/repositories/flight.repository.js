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

    async searchFlights(filters) {

        return await Flight.find(filters);

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

}

export default new FlightRepository();