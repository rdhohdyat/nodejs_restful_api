import userService from "../service/user.service.js";

export const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);

        res.status(200).json({
            message: "Registered successfully",
            data: result
        });
    } catch (e) {
        res.status(400).json({
            error: e.message || "Registration failed",
        });
    }
};

export const login = async (req, res, next) => {
    try {
       const result = await userService.login(req.body);
       if(result) {
           res.status(200).json({
               message: "Login successfully",
               data: result
           })
       }
    }catch (e) {
        res.status(400).json({
            error: e.message || "Login failed",
        });
    }
}

export const getAllUser = async (req, res, next) => {
    try {
     const users = await userService.getAllUsers();

     if(users) {
         res.status(200).json({
             message: "Successfully getting all users",
             data: users
         })
     }
    }catch (e) {
        res.status(400).json({
            error: e.message || "Login failed",
        });
    }
}

