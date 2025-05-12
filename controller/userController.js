import User from "./../model/userModel.js";
import Admin from "./../model/adminModel.js";
import logService from "../service/logService.js";

const getUser=async(req,res)=>{
    try{
        const userId=req.user;
        const user = await User.findOne({id:userId}).select("-password -_id -__v -id -createdAt -updatedAt");

        if(!user){
            return res.status(404).json({status:"failed",message:"User not Found"});
        };

        return res.status(200).json({status:"success",user});

    } catch(error){
        return res.status(500).json({status:"failed",message:"Internal Server Error In getting User"});
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

        const taskObj=await Admin.find().select({
            id:0,
            password:0,
            email:0,
            phone:0
        });

        if(taskObj){
            return res.status(200).json({status:"Success",adminName:taskObj.adminName,task:taskObj.task});
        };

        return res.json({status:"Failed",message:"No Task Found"});

    } catch(error){
        res.status(500).json({status:"Failed",message:"Internal Server Error in Getting task"});
        console.log("Error Getting Task - ",error);
    }
};


const getAssignedTask=async(req,res)=>{
    try{

        const userId=req.user;

        const tasks = await Admin.aggregate([
            { $unwind: "$task" },
            { $match: { "task.assignedTo": userId } },
            {
              $project: {
                id: "$task.id",
                title: "$task.title",
                description: "$task.description",
                dueDate: "$task.dueDate",
                status: "$task.status",
              },
            },
          ]);
      
          if (tasks.length > 0) {
            return res.json({ status: "Success", tasks });
          }
      
          return res.json({ status: "Failed", message: "No tasks found" });

    } catch(error){
        res.status(500).json({status:"Failed",message:"Internal Server Error in Getting Assigned Task"});
        console.log("Error Getting Users Assigned Task - ",error);
    }
};

export default {
    getUser,
    updateProfile,
    deleteAccount,
    getTask,
    getAssignedTask
}