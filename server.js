import connectDB from "./src/config/db.js";
import {app} from "./src/app.js";


const PORT = process.env.PORT || 8000;

connectDB()
.then(()=>{

    app.listen(PORT, ()=>{
       console.log(`Server is running on http://localhost:${PORT}`);
    });

})
.catch((err)=>{
    console.log("MONGODB connection failed !!",err);
})
