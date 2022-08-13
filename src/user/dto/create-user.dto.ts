import { IsString, IsOptional, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name Must Be Filled' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Email Must Be Filled' })
  @IsEmail({}, { message: 'Wrong Email Format' })
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Password Must Be Filled' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Discord Id Must Be Filled' })
  discord_id: string;

  @IsString()
  @IsOptional()
  is_active?: boolean;

  @IsString()
  @IsNotEmpty()
  role: string;
}
