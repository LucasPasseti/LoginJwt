import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {

    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
    
        const newUser = new User({
            ...req.body,
            password: hash,
        });
    
        await newUser.save()
        res.status(200).send("Usuário cria com sucesso.")
    } catch(err){
        next(err);
    }
}

export const login = async (req, res, next) => {

    try {        
        const user = await User.findOne({ username: req.body.username});
        if(!user) return next(createError(404, 'Usuário não existe'));
    
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, 'Sua senha ou Usuário está errado'))

        // Cookie e token
        const token = jwt.sign(
            { id:user._id},
            process.env.JWT
        );

        const { password, ...otherDetails } = user._doc;
        res.cookie('acess_token', token, {
            httpOnly: true,
        }).status(200).json({details: {...otherDetails}});

    } catch(err) {
        next(err);
    }
}

