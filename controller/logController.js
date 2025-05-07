
const newUser=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({status:"Failed",message:"Internal Server Error"});
        console.log(
            "Internal Server Error - ",error
        );
    }
}


const oldUser=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({status:"Failed",message:"Internal Server Error"});
        console.log(
            "Internal Server Error - ",error
        );
    }
}


const newAdmin=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({status:"Failed",message:"Internal Server Error"});
        console.log(
            "Internal Server Error - ",error
        );
    }
}


const oldAdmin=async(req,res)=>{
    try{

    } catch(error){
        res.status(500).json({status:"Failed",message:"Internal Server Error"});
        console.log(
            "Internal Server Error - ",error
        );
    }
}

export default {
    newUser,
    oldUser,
    newAdmin,
    oldAdmin
}