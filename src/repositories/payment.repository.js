import { Payment } from "../models/payment.model.js";

class PaymentRepository {

    async createPayment(paymentData, session){

        const [payment] =  await Payment.create(
            [paymentData],
            { session }
        );

        return payment;

    }

    async findById(_id) {

        return await Payment.findById(_id)
            .populate("booking");

    }

    async findByBookingId(bookingId) {

        return await Payment.findOne({
            booking: bookingId
        });

    }

}

export default new PaymentRepository();