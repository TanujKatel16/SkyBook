const bookingConfirmationTemplate = ({

    passengers,

    flightNumber,

    source,

    destination,

    departureTime,

    amount,

    transactionId

}) => {

    const passengerRows = passengers.map((passenger, index) => `

        <tr>

            <td><b>Passenger ${index + 1}</b></td>

            <td>

                <b>${passenger.fullName}</b><br>

                Age: ${passenger.age}<br>

                Gender: ${passenger.gender}

            </td>

        </tr>

    `).join("");

    return `

<!DOCTYPE html>

<html>

<head>

    <style>

        body{

            font-family: Arial, sans-serif;

            background:#f4f4f4;

            padding:20px;

        }

        .container{

            max-width:600px;

            margin:auto;

            background:white;

            padding:25px;

            border-radius:10px;

            box-shadow:0 2px 8px rgba(0,0,0,0.1);

        }

        h2{

            color:#0d6efd;

        }

        table{

            width:100%;

            border-collapse:collapse;

            margin-top:20px;

        }

        td{

            padding:10px;

            border-bottom:1px solid #ddd;

        }

        .footer{

            margin-top:30px;

            text-align:center;

            color:gray;

        }

    </style>

</head>

<body>

    <div class="container">

        <h2>✈️ SkyBook</h2>

        <h3>Booking Confirmed</h3>

        <p>Your payment was successful.</p>

        <table>

            ${passengerRows}

            <tr>

                <td><b>Flight</b></td>

                <td>${flightNumber}</td>

            </tr>

            <tr>

                <td><b>Route</b></td>

                <td>${source} → ${destination}</td>

            </tr>

            <tr>

                <td><b>Departure</b></td>

                <td>${new Date(departureTime).toLocaleString()}</td>

            </tr>

            <tr>

                <td><b>Amount Paid</b></td>

                <td>₹${amount}</td>

            </tr>

            <tr>

                <td><b>Transaction ID</b></td>

                <td>${transactionId}</td>

            </tr>

        </table>

        <div class="footer">

            <p>Thank you for choosing <b>SkyBook</b>.</p>

            <p>We wish you a pleasant journey! ✈️</p>

        </div>

    </div>

</body>

</html>

`;

};

export { bookingConfirmationTemplate };