import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.cookies?.accessToken;
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" })
        }

        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export const isAdmin = (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admins only" });
    next();
};