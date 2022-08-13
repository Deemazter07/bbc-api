import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async getAdminProfile(uuid: string): Promise<any> {
    const admin = await this.userService.findUserById(uuid);
    return admin;
  }

  async loginAdmin(email: string, password: string) {
    try {
      let admin = await this.userService.findOneUser({ email });
      if (await bcrypt.compare(password, admin.password)) {
        const accessToken = this.jwtService.sign({
          uuid: admin.uuid,
          name: admin.name,
          email: admin.email,
          is_active: admin.is_active,
        });
        console.log('accessToken', accessToken);

        admin['accessToken'] = accessToken;
        let updateJwt: UpdateUserDto = {
          jwt_token: accessToken,
          last_login: moment().format(),
        };
        await this.userService.update(admin.uuid, updateJwt);
        return {
          accessToken: accessToken,
          message: 'Log In successfully',
        };
      }
    } catch (error) {
      return error;
    }
  }
}
