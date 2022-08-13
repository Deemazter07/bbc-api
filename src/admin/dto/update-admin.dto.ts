import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @IsOptional()
  @IsString()
  jwt_token?: string;

  @IsOptional()
  @IsString()
  last_login?: string;
}
