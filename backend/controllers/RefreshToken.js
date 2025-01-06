import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return refreshToken.senStatus(401);
        const user = await Users.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const name = user[0].name;
            const phone = user[0].phone;
            const profilImg = user[0].profilImg;
            const email = user[0].email;
            const role = user[0].role;
            const status = user[0].status;
            const accessToken = jwt.sign({ userId, name, phone, profilImg, email, role, status}, 
                process.env.ACCESS_TOKEN_SECRET, 
                { expiresIn: '15s' });
                res.json({ accessToken });
        });
    } catch (error) {
       console.log(error); 
    }
}