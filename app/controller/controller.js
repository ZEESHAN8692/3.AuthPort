import User from "../model/userModel.js";
import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";




passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) return done(null, false, { message: "User not found" });


            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return done(null, false, { message: "Incorrect password" });


            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);


passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});


class PassportController {
    async register(req, res) {
        const { name, email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) return res.status(400).json({ msg: "Email already registered" });
            const hashedPassword = await bcrypt.hash(password, 10);

            user = new User({ name, email, password: hashedPassword });
            await user.save();

            res.json({ status: true, message: "User registered successfully", data: user });
        } catch (err) {
            res.status(500).json({ msg: "Server error" });
        }

    }

    async login(req, res) {
        try {
            passport.authenticate("local", (err, user, info) => {
                if (err) {
                    console.error("Authentication error:", err);
                    return res.status(500).json({ msg: "Server error during authentication" });
                }

                if (!user) {
                    return res.status(401).json({ msg: info?.message || "Unauthorized" });
                }

                req.logIn(user, (err) => {
                    if (err) {
                        console.error("Login error:", err);
                        return res.status(500).json({ msg: "Server error during login" });
                    }

                    return res.status(200).json({
                        status: true,
                        message: "Login successful",
                        data: user,
                    });
                });
            })
        } catch (error) {
            console.error("Unexpected error:", error);
            return res.status(500).json({
                msg: "Unexpected server error",
                error: error.message,
            });
        }
    }

    async profile(req, res) {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        res.json({ msg: "Welcome to profile", user: req.user });
        try {

        } catch (error) {
            res.status(500).json({ msg: "Server error", error: error.message });

        }

    }
}

export default new PassportController();
