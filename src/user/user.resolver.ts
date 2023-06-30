import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { UserInput } from "./dto/user.input";
import { User, LoginReturn } from "./entity/user.entity";
import { UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/jwt.guard";
import { LoginInput } from "./dto/login.input";
import { AuthGuard } from "src/auth/auth.guard";




@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService){}
    //TODO: Signup
    @Mutation(() => User)
    async signup(@Args('data') data: UserInput) : Promise <User>{
        return this.userService.signUp(data);
    }
    //TODO: check verificationToken
    @Query(returns => Boolean)
    @UseGuards(JwtGuard)
    verifyToken(@Context("user") user:User):Boolean{
        return true;
    }
    //TODO: Login
    @Mutation(() => LoginReturn)
    @UseGuards(AuthGuard)
    async login(@Args('data') data: LoginInput, @Context("user") user:User){
        return this.userService.logIn(data, user);
    }

}