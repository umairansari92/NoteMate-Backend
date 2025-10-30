import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


// Signup Controller
export const signup = async (req, res) => {
    try {
        const { fname, lname, age, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.json({
                message: "User already exists",
                status: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profileImage = req.file ? req.file.path : (req.body.profileImage || "");

        const newUser = await User.create({
            fname,
            lname,
            age,
            email,
            password: hashedPassword,
            profileImage
        });

        const { password: _remove, ...safeUser } = newUser.toObject();
        res.status(201).json({
            message: "Account Created Successfully",
            status: true,
            user: safeUser
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
}

// Login Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await User.findOne({ email });
        if (!userData) {
            return res.json({
                message: "User does not exist",
                status: false,
            });
        }

        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.json({
                message: "Invalid credentials",
                status: false,
            });
        }

        const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        const { password: _pw, ...safeUser } = userData.toObject();
        res.json({
            message: "Login successful",
            status: true,
            token,
            user: safeUser
        });

    } catch (error) {
        console.log(error.message);
        res.json({
            message: error.message,
            status: false,
        });

    }
}


// Logout Controller
export const logout = async (req, res) => {
    try {
        res.json({
            message: "Logout successful",
            status: true,
        });
    } catch (error) {
        console.log(error.message);
        res.json({
            message: error.message,
            status: false,
        });
    }
}
