import bcrypt from 'bcrypt';
import fs from "fs";
import jwt from 'jsonwebtoken';
import * as crypto from "crypto";

const saltRounds=10;


  const writePublicPrivate=async()=>{
    try{

      const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: { type: "spki", format: "pem" },
        privateKeyEncoding: { type: "pkcs8", format: "pem" },
      });

      fs.writeFileSync(`./assets/keys/public.pem`, publicKey);
      fs.writeFileSync(`./assets/keys/private.pem`, privateKey);
    } catch(error){
      console.log("Error Writing private and public key to File - ",error);
      process.exit(1);
    }
  };


  let publicKey;
  let privateKey;

  const loadKeyToMemory=async()=>{
    try{
      privateKey = fs.readFileSync('./assets/keys/private.pem', 'utf8');
      publicKey = fs.readFileSync('./assets/keys/public.pem', 'utf8');
    } catch(error){
      console.log("Error Loading Persistent Key to Memory - ",error);
      process.exit(1);
    }
  };
  


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
    passHash,
    writePublicPrivate,
    loadKeyToMemory
  }