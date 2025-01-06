import Users from "../models/UserModel.js";

export const verifyUser = async(req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke Akun Anda!"});
    }
    const user = await Users.findOne({
        where:{
            id: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User Tidak Ditemukan!"});
    req.userId = user.id;
    req.role = user.role;
    next();
}

export const adminOnly = async(req, res, next) => {
    const user = await Users.findOne({
        where:{
            id: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User Tidak Ditemukan!"});
    if(user.role !== "Admin") return res.status(403).json({msg: "Akses Dilarang!"});
    next();
}

export const managerOnly = async(req, res, next) => {
    const user = await Users.findOne({
        where:{
            id: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User Tidak Ditemukan!"});
    if(user.role !== "Manager") return res.status(403).json({msg: "Akses Dilarang!"});
    next();
}