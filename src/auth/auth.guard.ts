import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { User } from "src/user/entity/user.entity";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly userService: UserService){}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const ctx = GqlExecutionContext.create(context).getContext();
        const {username, password} = ctx.req.body.variables;
        const user: User = await this.userService.findUserByUsername(username);
        console.log(password)
        const compareResult = await bcrypt.compare(password, user.password)
        console.log(compareResult)
        if(user && compareResult) {
            console.log(user)
            ctx.user = user;
            return true;
        }
        else{
            throw new HttpException("UnAuthenticated", HttpStatus.UNAUTHORIZED);
        }
    }
}