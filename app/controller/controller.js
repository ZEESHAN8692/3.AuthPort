import User from "../model/userModel.js";
import passport from "passport";
import bcrypt from "bcryptjs";

class PassportController {
   async register(req, res) {
    
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({
            status: false,
            message: "User already exists",
        });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password : hashedPassword });
    await newUser.save();
    res.json({
        status: true,
        message: "User created successfully",
        data: newUser
    });
    
       
   }

//    async login(req, res, next) {
//        passport.authenticate("local", (err, user, info) => {
//            if (err) {
//                return next(err);
//            }
//            if (!user) {
//                return res.status(400).json({
//                    message: info.message,
//                });
//            }
//            req.logIn(user, (err) => {
//                if (err) {
//                    return next(err);
//                }
//                return res.json({
//                    message: "Login successful",
//                });
//            });
//        })(req, res, next);
//    }
}

export default new PassportController();
