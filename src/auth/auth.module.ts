import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './auth.guard';
import { JwtGuard } from './jwt.guard';
import { RoleGuard } from './role.guard';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [AuthGuard, JwtGuard, RoleGuard],
  exports: []

})
export class AuthModule {}
