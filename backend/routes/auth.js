const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sohambad$hah';
var fetchuser = require('../middleware/fetchuser');

//ROUTE 1:
router.post('/user', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'enter a valid password').isLength({ min: 5 })], async (req, res) => {

        let success = false;


        // validationResult function checks whether
        // any occurs or not and return an object
        const errors = validationResult(req);

        // If some error occurs, then this
        // block of code will run
        if (!errors.isEmpty()) {
            return res.status(400).json({ success,errors: errors.array() });
        }
        //check for users with same email
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success,error: "sorry email already exist with this value" })
            }
            //salting 
            const salt = await bcrypt.genSalt(10);
            secPass = await bcrypt.hash(req.body.password, salt)

            //create new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })

            const data = {
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);

            //res.json(user)
            success=true;
            res.json({ success,authtoken })

        } catch (error) {
            console.error(error.message)
            res.status(500).send("internal server error")
        }
    });



//ROUTE 2:
//authenticate user using post "/api/auth/login" no login required

router.post('/login', [

    body('email', 'enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists(),
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success=false;
            return res.status(400).json({ error: "please login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success=false;
            return res.status(400).json({ success,error: "please login with correct credentials" });

        }
        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);

        //res.json(user)
        success=true;
        res.json({ success,authtoken })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("internal server error")
    }
});



//ROUTE 3:"/api/auth/getuser"
router.post('/getuser', fetchuser ,async (req, res) => {
   
try {
    userId = userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)

} catch (error) {
    console.error(error.message)
    res.status(500).send("internal server error")
}
})
module.exports=router;