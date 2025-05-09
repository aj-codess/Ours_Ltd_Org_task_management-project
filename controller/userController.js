import User from "./../model/userModel.js";
import Admin from "./../model/adminModel.js";
import logService from "../service/logService.js";

const getUser=async(req,res)=>{
    try{
        const userId=req.user;
        const user = await User.findOne({id:userId}).select("-password");

        if(!user){
            res.status(404).json({status:"failed",message:"User not Found"});
        };

        return res.status(200).json({status:"success",user});

    } catch(error){
        res.status(500).json({status:"failed",message:"Internal Server Error In getting User"});
        console.log("Error Getting User - ",error);
    }
};


const updateProfile=async(req,res)=>{
    try{
        const {username,phone,email}=req.body;
        const userId=req.user;
        const user=await User.findOneAndUpdate(
            {id:userId},
            {$set:{
                username,
                phone,
                email
            }},
            {new:true}
        );

        if(user){
            return res.status(200).json({status:"Success",message:"User Profile Updated"});
        }

    } catch(error){
        return res.status(500).json({status:"failed",message:"Internal Server Error In updating User Profile"});
        console.log("Error updating User - ",error);
    }
};


const deleteAccount=async(req,res)=>{
    try{
        const userId=req.user;
        const {password}=req.body;
        const user=await User.findOne({id:userId});
        if(!user){
            return res.status(404).json({status:"failed",message:"User not Found"});
        };

        if(!(await user.matchPassword(password))){
            return res.status(406).json({status:"failed",message:"Password Unmatched. Failed Deleting User."})
        };

        const isDeleted=await User.findOneAndDelete(
            {id:userId},
            {new:true}
        );

        if(isDeleted){
            return res.status(200).json({status:"Success",message:"User Account Deleted Successfully"});
        };

    } catch(error){
        res.status(500).json({status:"failed",message:"Internal Server Error In Deleting User Account"});
        console.log("Error Deleting User - ",error);
    }
};



const getTask=async(req,res)=>{
    try{
        const userId=req.user;

        

    } catch(error){
        res.status(404).json({status:"Failed",message:"Internal Server Error in Getting task"});
        console.log("Error Getting Task - ",error);
    }
};


export default {
    getUser,
    updateProfile,
    deleteAccount,
    getTask
}