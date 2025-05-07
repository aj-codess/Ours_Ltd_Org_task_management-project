import Admin from "./../model/adminModel.js";
import logService from "./../service/logService.js";

const getAdmin=async(req,res)=>{
    try{

        const userId=req.user;
        const adminObj=await Admin.findOne({id:userId});

        if(!adminObj){
            return res.status(404).json({status:"Failed",message:"Admin Account Not Found"});
        };

        return res.status(200).json({status:"success",admin:adminObj});

    } catch(error){
        res.status(500).json({status:"failed",message:"Internal Server Error In getting Admin"});
        console.log("Error Getting Admin - ",error);
    };
};


const updateProfile=async(req,res)=>{
    try{

        const userId=req.user;
        const {adminName,email,phone}=req.body;
        const adminObj=findOneAndUpdate(
            {id:userId},
        {
            $set:{
                adminName,email,phone
            }
        },
    {new:true});

        if(adminObj){
            return res.status(200).json({status:"success",message:"data Stored Successfully"})
        };

        return res.status()

    } catch(error){
        res.status(500).json({status:"failed",message:"Internal Server Error In updating Admin Profile"});
        console.log("Error updating Admin - ",error);
    }
};


const deleteAdmin=async(req,res)=>{
    try{

        const userId=req.user;
        const {password}=req.body;
        const adminObj=await Admin.findOne({id:userId});

        if(!adminObj){
            return res.status(404).json({status:"Failed",message:"Admin not Found"});
        };

        if(!(await adminObj.matchPassword(password))){
            return res.status(409).json({status:"failed",message:"conflict in Matching password"});
        };

        const isDeleted=await Admin.findOneAndDelete(
            {id:userId},
            {new:true}
        );

        if(isDeleted){
            return res.status(200).json({status:"Success",message:"Admin Account Deleted Successfully"});
        };

    } catch(error){
        res.status(500).json({status:"failed",message:"Internal Server Error In Deleting Admin Account"});
        console.log("Error Deleting Admin - ",error);
    }
};


export default {
    getAdmin,
    updateProfile,
    deleteAdmin
}