import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { UserInput } from "./dto/user.input";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import { LoginInput } from "./dto/login.input";
@Injectable()
export class UserService{
    constructor(@InjectRepository(User) public readonly userRepo: Repository<User>){}

    async findUserByUsername(username : string) {
        let user: User = await this.userRepo.findOne({where: {username: username, is_verified: true}})
        return user;
    }
    async logIn(data:LoginInput, user:User) {
        console.log(user)
        const payload = {
            id: user.id,
            username: user.username,
            email:user.email,
            role: user.role,
            is_Verified: user.is_verified
        }
        const verificationToken:String = jwt.sign(payload, process.env.JWT_KEY, {expiresIn:"3600s"})                            
        return {token:verificationToken, user:user};
    }

    async signUp(data:UserInput){
        const hashPassword = async (plainPassword) => {
            const hashedPassword = await bcrypt.hash(plainPassword, 10); // 10 is the number of rounds to use, it's commonly used number
            return hashedPassword;
        };
        data.password = await hashPassword(data.password);
        
        console.log(data);
        const newUser:User = await this.userRepo.save({
            ...data, 
            role:"NORMAL_USER",
            is_verified: 0
        });
        console.log(newUser);
        const payload = {
            id: newUser.id,
            username: newUser.username,
            email:newUser.email,
            role: newUser.role,
            is_Verified: newUser.is_verified
        }
        const verificationToken = jwt.sign(payload, process.env.JWT_KEY, {expiresIn:"3600s"})
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT, // standard port for SMTPS
            secure: false, // true for SMTPS
            requireTLS: true, 
            auth: {
                type: 'login', 
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        console.log(transporter);
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: newUser.email,
            subject: 'Please confirm your email',
            html: `<a href="${process.env.FRONTEND_URL}/verifyEmail?token=${verificationToken}">Verify your email</a>`,
        };
        console.log(mailOptions);
        await transporter.sendMail(mailOptions);
        return newUser;
    }
    
}