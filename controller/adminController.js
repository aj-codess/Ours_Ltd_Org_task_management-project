import Admin from "./../model/adminModel.js";
import User from "./../model/userModel.js";
import utility from "../service/utility.js";

const getAdmin=async(req,res)=>{
    try{

        const adminId=req.user;
        const adminObj=await Admin.findOne({id:adminId});

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

        const adminId=req.user;
        const {adminName,email,phone}=req.body;
        const adminObj=await Admin.findOneAndUpdate(
            {id:adminId},
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

        const adminId=req.user;
        const {password}=req.body;
        const adminObj=await Admin.findOne({id:adminId});

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



const getUsers=async(req,res)=>{
    try{

        const users = await User.find().select({
            password: 0,
            phone: 0,
        });

        if(!users){
            return res.status(404).json({status:"failed",message:"Error Getting Users"});
        };

        return res.status(200).json({status:"success",users});

    } catch(error){
        res.status(500).json({status:"failed",message:"Internal Server Error In Getting Users"});
        console.log("Error getting users - ",error);
    }
};


const createTask=async(req,res)=>{
    try{

        const adminId=req.user;

        const {title,description,dueDate,status}=req.body;

        const admin=await Admin.findOneAndUpdate(
            {id:adminId},
            {
                $push:{
                    id:utility.genId(),
                    title,
                    description,
                    dueDate:new Date(dueDate),
                    status
                }
            },
            {new:true}
        );

        if(admin){
            return res.status(201).json({status:"Success",message:"Task Created Successfully"});
        };

        return res.json({status:"failed",message:"Failed Creating task"});

    } catch(error){
        res.status(500).json({status:"failed",message:"Internal Server Error In Creating task"});
        console.log("Error creating task - ",error);
    }
};



const deleteTask=async(req,res)=>{
    try{
        const adminId=req.user;
        const {taskId}=req.body;

        const adminObj=await Admin.findOneAndUpdate(
            {id:adminId},
            {
                $pull:{
                    task:{id:taskId}
                }
            },
            {new:true}
        );

        if(adminObj){
            return res.status(200).json({status:"Success",message:"Task Deleted Successfully"});
        }

        return res.json({status:"Failed",message:"Task wasnt Deleted"});

    } catch(error){
        res.status(500).json({status:"failed",message:"Internal Server Error In Deleting task"});
        console.log("Error deleting task - ",error);
    }
}



const getTask=async(req,res)=>{
    try{

        const adminId=req.user;

        const obj=await Admin.findOne({id:adminId});

        if(obj){
            return res.status(200).json({status:"Success",data:obj.task});
        }else{
            return res.status(404).json({status:"Failed",message:"Data Not Found"});
        };

    } catch(error){
        res.status(500).json({status:"failed",message:"Internal Server Error In Getting task"});
        console.log("Error getting task - ",error);
    }
}


const assignToTask=async(req,res)=>{
    try{

        const adminId=req.user;
        const {taskId,userId}=req.body;

        const adminObj=await Admin.findOneAndUpdate(
            {id:adminId,"task.id":taskId},
            {
                $addToSet:{
                    "task.$.assignedTo":userId,
                }
            },
            {new:true}
        );

        if(adminObj){
            return res.status(200).json({status:"success",isAssigned:true});
        }

        return res.json({status:"Failed",isAssigned:false});

    } catch(error){
        res.status(500).json({status:"Failed",message:"Internal Server Error in Assigning Task"});
        console.log("Error In the Assignment of task");
    }
}


const removeUser=async(req,res)=>{
    try{

        const adminId=req.user;
        const {taskId,userId}=req.body;

        const taskObj=await Admin.findOneAndUpdate(
            {id:adminId,"task.id":taskId},
            {
                $pull:{
                    "task.$.assignedTo":userId
                }
            },
            {new:true}
        );

        if(taskObj){
            return res.status(200).json({status:"Success",isRemoves:true});
        };

        return res.json({status:"Failed",isRemoved:false});

    } catch(error){
        res.status(500).json({status:"Failed",message:"Internal Server Error in removing User From Task"});
        console.log("Error Removing User From task");
    }
}



export default {
    getAdmin,
    updateProfile,
    deleteAdmin,
    getUsers,
    createTask,
    deleteTask,
    getTask,
    assignToTask,
    removeUser
}