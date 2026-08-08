import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({

    user: {

        type: Schema.Types.ObjectId,

        ref: "User",
        index: true,
        required: true

    },

    flight: {

        type: Schema.Types.ObjectId,

        ref: "Flight",
        required: true

    },

    passenger: {

        fullName: {

            type: String,
            required: true

        },

        age: {

            type: Number,
            required: true

        },

        gender: {

            type: String,

            enum: [
                "Male",
                "Female",
                "Other"
            ],

            required: true

        }

    },

    bookingStatus: {

        type: String,

        enum: [
            "Confirmed",
            "Cancelled",
            "Pending"
        ],

        default: "pending"

    },

    totalFare: {

        type: Number,

        required: true

    },

    pnr: {

        type: String,
        unique: true,
        required: true,
        index: true
    }

}, {

    timestamps: true

});

export const Booking =
    mongoose.model(
        "Booking",
        bookingSchema
    );