/*controllers/login.js*/
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models/user'); // Import the User model


    function findUserByUsername(username) {
        return users.find(user => user.username === username);
      }
      
      // Controller method to handle user lookup by username
      function getUserByUsername(req, res) {
        const { username } = req.params;
      
        const user = findUserByUsername(username);
        if (user) {
          res.status(200).json({ user });
          console.log(user.username)
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      }
      console.log(getUserByUsername);
    exports.login = async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.status(422).json({ errors: errors.array() }); // Return validation errors
        }
    
        const username = req.body.username;
        const password = req.body.password;
    
        try {
            console.log('Attempting to find user by username:', username);
            // Find user by username
             const user = await User.findOne({ where: { username } });

            // Log the generated SQL query
             console.log('Executed SQL query:', User.findOne({ where: { username } }).sql);


            if (!user) {
                console.log('User not found');
                return res.status(401).json({ message: 'Invalid username or password' });
            }
    
            console.log('User found:', user);
    
            // Check password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log('Password validation result:', isPasswordValid);
            
            if (!isPasswordValid) {
                console.log('Password is invalid');
                return res.status(401).json({ message: 'Invalid username or password' });
            }
    
            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, username: user.username },
                'Emounaaa', // Secret key used for signing
                { expiresIn: '1h' }
            );
    
            console.log('Login successful. Token generated:', token);
            
            res.status(200).json({ message: 'Login successful', token: token , user:user });
        } catch (err) {
            console.error('Error during login:', err);
            res.status(500).json({ message: 'An error occurred while logging in. Please try again later.' });
        }
        
};
