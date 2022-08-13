import { IsString, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  @IsNotEmpty({ message: 'Email Must Be Filled' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Password Must Be Filled' })
  password!: string;
}
