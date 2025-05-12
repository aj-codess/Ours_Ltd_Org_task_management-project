import User from "./../model/userModel.js";
import Admin from "./../model/adminModel.js";
import utility from "./../service/utility.js";
import logServices from "../service/logService.js";

const cookieOptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "strict",
    secure:false
  };

const newUser=async(req,res)=>{
    try{
        const {email,password,phone,username}=req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and Password Required" });
        };

        const id=utility.genId();

        const newUser=new User({
            id: id,
            email: email,
            username: username,
            password: logServices.passHash(password),
            phone: phone
        });

        const user = await newUser.save();

        if (user) {

            const token = await logServices.signToken(user.id);

            res.cookie("authToken", token, cookieOptions);

                    return res.status(200).json({
                        username: user.username,
                        message: 'User Created Successfully',
                    });
        
          } else {
            return res.status(400).json({ error: "User not created" });
          };

    } catch(error){
        res.status(500).json({status:"Failed",message:"Internal Server Error"});
        console.log(
            "Internal Server Error - ",error
        );
    }
}


const oldUser=async(req,res)=>{
    try{

        const { email, password } = req.body;

        const userObj=await User.findOne({email});
  
        if(!userObj || !(await userObj.matchPassword(password))){
  
          return res.status(401).json({status:"Failed",isLoggedIn: false});
  
        };
  
        const token = await logServices.signToken(userObj.id);
        
        res.cookie("authToken", token, cookieOptions);

        return res.status(200).json({status:"Success",isLoggedIn:true})

    } catch(error){
        res.status(500).json({status:"Failed",message:"Internal Server Error"});
        console.log(
            "Internal Server Error - ",error
        );
    }
}


const newAdmin=async(req,res)=>{
    try{

        const {email,password,adminName,phone}=req.body;

        if(!email || !password){
            return res.status(400).json({ error: "Email and Password Required" });
        }

        const adminId=utility.genId();

        const adminObj=new Admin({
            id:adminId,
            adminName:adminName,
            email:email,
            password:logServices.passHash(password),
            phone:phone
        });

        if(adminObj){
            const token = await logServices.signToken(adminObj.id);
        
            res.cookie('authToken', token, cookieOptions);
        
                    return res.status(200).json({
                        username: adminObj.adminName,
                        message: 'User Created Successfully',
                    });
        
          } else {
            return res.status(400).json({status:"Failed",message: "Admin not created" });
          };

    } catch(error){
        res.status(500).json({status:"Failed",message:"Internal Server Error"});
        console.log(
            "Internal Server Error - ",error
        );
    }
}


const oldAdmin=async(req,res)=>{
    try{

        const {email,password}=req.body;

        const adminObj=await Admin.findOne({email});

        if(!adminObj || !(await adminObj.matchPassword(password))){
  
            return res.status(401).json({status:"Failed",isLoggedIn: false});
    
        };

        const token = await logServices.signToken(adminObj.id);
        
        res.cookie("authToken", token, cookieOptions);

        return res.status(401).json({status:"Success",isLoggedIn:true});

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