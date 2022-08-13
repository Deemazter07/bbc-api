import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateAdminDto } from 'src/admin/dto/update-admin.dto';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async getAdminProfile(uuid: string): Promise<any> {
    const admin = await this.adminService.findAdminById(uuid);
    return admin;
  }

  async loginAdmin(email: string, password: string) {
    try {
      let admin = await this.adminService.findOneAdmin({ email });
      if (await bcrypt.compare(password, admin.password)) {
        const accessToken = this.jwtService.sign({
          uuid: admin.uuid,
          name: admin.name,
          email: admin.email,
          is_active: admin.is_active,
        });
        console.log('accessToken', accessToken);

        admin['accessToken'] = accessToken;
        let updateJwt: UpdateAdminDto = {
          jwt_token: accessToken,
          last_login: moment().format(),
        };
        await this.adminService.update(admin.uuid, updateJwt);
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
