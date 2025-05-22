// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../prisma/models/user.js'; // fix to import as a instance instead of a class 
 
const jwtSecret = process.env.JWT_SECRET;

export const register = async (req, res) => {
  try {
    const { username, password,email } = req.body;
    
    // Check if user exists
    // const userInstance= new User();
 
    const existingUser = await User.getUserByUserName(username);

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    // Create new user
    // hash user password before passing

    const user = await User.createUser({username,password, email}); 
   
    const payload = {
    id: user.id,
    email: user.email
};
console.log("payload:",payload); // it is correct
  
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
    const decoded = jwt.decode(token);
console.log("Decoded Token After Signing:", decoded);
    res.status(201).json({ token,decoded });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.getUserByUserName(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
    
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const protectedRoute = (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
};