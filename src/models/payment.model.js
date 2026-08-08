import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({

    booking: {

        type: Schema.Types.ObjectId,

        ref: "Booking",

        required: true

    },

    amount: {

        type: Number,

        required: true

    },

    paymentMethod: {

        type: String,

        enum: [
            "UPI",
            "Credit Card",
            "Debit Card",
            "Net Banking"
        ],

        required: true

    },

    paymentStatus: {

        type: String,

        enum: [
            "Success",
            "Failed"
        ],

        default: "Success"

    },

    transactionId: {

        type: String,

        unique: true,

        required: true

    }

},
{
    timestamps: true
});

export const Payment = mongoose.model(
    "Payment",
    paymentSchema
);