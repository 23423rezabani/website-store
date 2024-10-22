
import JWT from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
    const token = req.cookies.access_token;  
    if (!token) return res.status(401).json("Access Denied");

    try {
        JWT.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) return res.status(403).send("Forbidden");

            req.user = user;
            next(); 
        });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
