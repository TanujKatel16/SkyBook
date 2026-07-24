import "dotenv/config";
import connectDB from "./src/config/db.js";
import redisClient from "./src/config/redis.js";
import {app} from "./src/app.js";


const PORT = process.env.PORT || 8000;


connectDB()
.then(async ()=>{

    await redisClient.connect();

    app.listen(PORT, ()=>{

        console.log(`Server running on  http://localhost:${PORT}`);

    });

})
.catch((err)=>{

    console.log("MONGODB connection failed !!",err);

});




