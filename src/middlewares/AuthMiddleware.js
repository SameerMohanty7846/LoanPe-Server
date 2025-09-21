import jwt from 'jsonwebtoken'

export const authMiddleWare = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
       return  res.status(401).json({
            message: "Unauthorized"

        }

        )
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();


    } catch (err) {
        return res.status(401).json({
            message: 'Invalid or expired token'
        })
    }

}