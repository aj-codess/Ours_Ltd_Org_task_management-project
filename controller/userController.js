import User from "./../model/userModel.js";

const getUser=async(req,res)=>{
    try{
        
    } catch(error){
        res.status(500).json({status:"failed",message:"Internal Server Error In getting User"});
        console.log("Error Getting User - ",error);
    }
};


const updateProfile=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({status:"failed",message:"Internal Server Error In updating User Profile"});
        console.log("Error updating User - ",error);
    }
};


const deleteAccount=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({status:"failed",message:"Internal Server Error In Deleting User Account"});
        console.log("Error Deleting User - ",error);
    }
};


export default {
    getUser,
    updateProfile,
    deleteAccount
}