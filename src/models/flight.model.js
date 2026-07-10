import mongoose, {Schema} from "mongoose";


const flightSchema = new Schema (

    {

        // flight number
        // starts from (source)
        // ends at (destination)
        // number of seats(total)
        // available seats
        // Starting time
        // Reaching time
        // base fare
        // status

        flightNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
            index: true
        },

        source:{

            type: String,
            required: true,
            index: true,
            trim: true,
            uppercase: true

        },
        destination:{

            type: String,
            required: true,
            index: true,
            trim: true,
            uppercase: true

        },
        totalSeats :{

            type:Number,
            required: true,
            min:1
        },
        availableSeats :{

            type:Number,
            required: true,
            min:0
        },

        arrivalTime :{

            type:Date,
            required:true,
            index:true,

        },
        departureTime :{

            type:Date,
            required:true,
            index:true,

        },
        baseFare :{

            type:Number,
            required:true,
            min: 0

        },
        status :{

            type:String,
            required:true,
            enum:["Scheduled","Delayed","Boarding","Cancelled"],
            default:"Scheduled"


        },
        isActive: {
            type: Boolean,
            default: true
        }

    },
    {
        timestamps: true
    }

);


export const Flight = mongoose.model("Flight", flightSchema);