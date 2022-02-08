const bcrypt = require('bcryptjs')

class Bcrypt{
    
    async EncryptPassword(password){
        const salt = await bcrypt.genSalt(12)
        return bcrypt.hash(password,salt)
    }

    async MatchPassword(password,userPassword){
        try {
            return await bcrypt.compare(password,userPassword)
        }catch(error) {
            console.log('[-] '+error);
        }
    }

}

const bcryptjs = new Bcrypt()
module.exports = bcryptjs