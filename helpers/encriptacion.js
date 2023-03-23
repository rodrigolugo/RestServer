const  bcryptjs = require('bcryptjs');



const encriptarPass = (password) =>{
    const salt = bcryptjs.genSaltSync();
    passwordEncrypt = bcryptjs.hashSync(password, salt);
    
    return passwordEncrypt;
}


module.exports = {
    encriptarPass
}