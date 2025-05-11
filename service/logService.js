import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as crypto from "crypto";

const saltRounds=10;


const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });



  const signToken = async (id) => {

    return new Promise((resolve, reject) => {
      jwt.sign(
        { id: id },
        privateKey,
        { algorithm: 'RS256' },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });

  };



const verifyToken = async (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        publicKey,
        { algorithms: ['RS256'] },
        (err, decoded) => {
          if (err) {
            console.log("Token recieved but verification Error - ",err.message);
            reject(err);
          } else {
            resolve(decoded);
          }
        }
      );
    });
  };



  const passHash=(password)=>{

    try{
  
      const salt = bcrypt.genSaltSync(saltRounds);
    
      const pass_hash = bcrypt.hashSync(password, salt);
    
      return pass_hash;
  
    } catch(error){
  
      console.error("unabe to hash password: ",error.message);
  
    }
  
  };


  export default {
    verifyToken,
    signToken,
    passHash
  }