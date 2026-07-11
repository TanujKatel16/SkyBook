import nodemailer from "nodemailer";
import { bookingConfirmationTemplate } from "../templates/bookingConfirmation.template.js";

class EmailService {

    constructor() {

        console.log("EMAIL_USER:", process.env.EMAIL_USER);
       console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD);

        this.transporter = nodemailer.createTransport({

            service: "gmail",

            auth: {

                user: process.env.EMAIL_USER,

                pass: process.env.EMAIL_PASSWORD

            }

        });

    }

    async sendBookingConfirmation({


        email,

        passengerName,

        flightNumber,

        source,

        destination,

        departureTime,

        amount,

        transactionId

    }) {

        const html = bookingConfirmationTemplate({

            passengerName,

            flightNumber,

            source,

            destination,

            departureTime,

            amount,

            transactionId

        });

        const info = await this.transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: email,

            subject: "SkyBook Booking Confirmation",

            html

        });
        console.log(info);

    }

}

export default new EmailService();