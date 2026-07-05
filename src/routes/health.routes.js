import {Router} from "express";

const router=Router();

router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"SkyBook Api is running ",
    });
});

export default router;