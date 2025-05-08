import generateUniqueId from 'generate-unique-id';

const genId=()=>{

    const id = generateUniqueId({
      includeSymbols: ['@','#','|'],
      excludeSymbols: ['0'],
      length:15
    });
  
      return id;
  };


  export default {
    genId
  }