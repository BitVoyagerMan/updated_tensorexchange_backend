import { UseGuards } from "@nestjs/common";
import { Args, Context, Query, Resolver, } from "@nestjs/graphql";
import { AuthGuard } from "./auth/auth.guard";
import { User } from "./user/entity/user.entity";
import * as jwt from 'jsonwebtoken'
import { JwtGuard } from "./auth/jwt.guard";
import { RoleGuard, Roles} from "./auth/role.guard";
@Resolver(of => String)
export class AppResolver {
    @Query (returns => String)
    index(): String{
        return "NestJs Graphql Server";
    }

    @Query (returns => String)
    @UseGuards(JwtGuard)
    securedResource(@Context("user") user:any): String{
        return "This is secured Data" + JSON.stringify(user);
    }

    @Query (returns => String)
    @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
    securedResourceForAdmin(@Context("user") user:any): String{
        return "This is secured Data for Admin" + JSON.stringify(user);
    }

    

    @Query(returns => String)
    @UseGuards(AuthGuard)
    login(
        @Args({name: "email", type: () => String}) email: string,
        @Args({name: "password", type: () => String}) password: string,
        @Context("user") user:User
    ) : string{
        let payload = {
            id: user.id,
            username: user.username,
            email:user.email,
            role: user.role,
            is_Verified: user.is_verified
        }
        return jwt.sign(payload, "BitVoyager", {expiresIn:"3600s"})
    }
}