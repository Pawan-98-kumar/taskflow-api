const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// register user 
const registerUser = async (req,res)=>{
    try{
        const { name, email, password } = req.body;
    
        // check all field are provided
     if (typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
       !name.trim() ||
      !email.trim() ||
      !password.trim()) {
      return res.status(400).json({message: "Enter email, name and password" });
}

      const cleanEmail = email.trim().toLowerCase();

  // email format
     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return res.status(400).json({message: "Enter a valid email"});
}     
      // check minimun password length
        if (password.length < 8) {
         return res.status(400).json({ message: "Password must be at least 8 characters long"});
            }

         const existingUser = await User.findOne({ email:cleanEmail });
         if (existingUser) {
          return res.status(409).json({message: 'Email already registered'});
            }
       
            // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name:name.trim(),email:cleanEmail,password: hashedPassword});
        await user.save();
        return res.status(201).json({
        message: 'User registered successfully'});
     }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
}

// login user
const loginUser = async(req,res)=>{
    try{
      const { email, password } = req.body;

        if ( typeof email !== 'string' ||
              typeof password !== 'string' ||
          !email.trim() ||
         !password.trim()){
       return res.status(400).json({message: "Enter email and password"});
      }

      const cleanEmail = email.trim().toLowerCase();

      const user = await User.findOne({ email: cleanEmail });
      if(!user){
        return res.status(401).json({message:"Invalid email or password"});
      }
      
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(401).json({message:"Invalid email or password"});
        }
       const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        return res.status(200).json({token,message:"Login successful"});
    
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login failed' });
    }
}

module.exports = {registerUser, loginUser};