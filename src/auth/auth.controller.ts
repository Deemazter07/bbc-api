import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login_admin')
  async loginAdmin(@Body() loginAuthDto: LoginAuthDto) {
    try {
      const login = await this.authService.loginAdmin(
        loginAuthDto.email,
        loginAuthDto.password,
      );
      return login;
    } catch (error) {
      throw error;
    }
  }

  @Get('me')
  async admin(@Req() req: any) {
    try {
      // const ability = this.caslAbilityCustom.createForUser(req.decoded);
      // if (ability.can(Action.Read, 'all')) {
      // "user" has read access to everything

      let admin: any = await this.authService.getAdminProfile(req.uuid);

      admin.jwt_token = req.headers.authorization;
      return admin;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
