import bcrypt from 'bcryptjs';

const saltRatio = 14;
// const salt = 'MyPasswordIs$afe@!'
/*
    With "salt Ratio or salt round" they actually mean the cost factor.
    The cost factor controls how much time is needed to calculate a single BCrypt hash.
    The higher the cost factor, the more hashing rounds are done.
    Increasing the cost factor by 1 doubles the necessary time. The more time is necessary,
    the more difficult is brute-forcing.
*/
export const encryptPW = async (pw)=>{
    const salt = await bcrypt.genSalt(saltRatio)
    const encPW = await bcrypt.hash(pw, salt);
    return encPW;
}

export const decryptPW = async (pw, dbPW) =>{
    const decPW = await bcrypt.compare(pw, dbPW);
    return decPW;    
}