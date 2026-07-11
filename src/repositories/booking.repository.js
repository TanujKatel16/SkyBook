import { Booking } from "../models/booking.model.js";

class BookingRepository {

    async createBooking(bookingData) {
        return await Booking.create(bookingData);
    }

    async findById(_id) {
        return await Booking.findById(_id)
        .populate("user", "-password -refreshToken")
        .populate("flight");
    }

    async findByUserId(userId) {
        return await Booking.find({ user: userId })
        .populate("flight");
    }

    async updateBooking(id,updateData,session){

        return await Booking.findByIdAndUpdate(

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

    async deleteBooking(_id) {
        return await Booking.findByIdAndDelete(_id);
    }

}

export default new BookingRepository();