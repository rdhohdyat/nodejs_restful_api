import {validate} from "../validation/validation.js";
import {registerUserValidation, loginUserValidation} from "../validation/user.validation.js";
import {prismaClient} from "../application/database.js";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from 'uuid';

const getAllUsers = async () => {
    return prismaClient.user.findMany();
}

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const userIsExist = await prismaClient.user.findUnique({
        where: {
            username: user.username
        }
    })

    if (userIsExist) {
        throw new Error("User already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true,
        }
    })
}

const login = async (request) => {
    const userRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            username: userRequest.username,
        }
    })

    if (!user) {
        throw new Error("Account not registered");
    }

    const passwordIsMatch = await bcrypt.compare(userRequest.password, user.password);

    if (!passwordIsMatch) {
        throw new Error("username or password is wrong");
    }

    const tokenGenerate = uuidv4()

    return prismaClient.user.update({
        data: {
            token: tokenGenerate
        },
        where: {
            username: userRequest.username
        },
        select: {
            username: true,
            name: true,
            token: true
        }
    })
}

export default {
    register,
    login,
    getAllUsers
}



