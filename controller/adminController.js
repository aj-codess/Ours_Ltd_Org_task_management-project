
const getAdmin=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({status:"failed",message:"Internal Server Error In getting Admin"});
        console.log("Error Getting Admin - ",error);
    }
};


const updateProfile=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({status:"failed",message:"Internal Server Error In updating Admin Profile"});
        console.log("Error updating Admin - ",error);
    }
};


const deleteAdmin=async(req,res)=>{
    try{

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