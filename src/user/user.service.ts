import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { ROLE_USER } from 'src/utils/helper';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private usersRepository: Repository<User>;

  async create(createUserDto: CreateUserDto) {
    try {
      console.log('createUserDto', createUserDto);
      const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
      createUserDto.password = hashedPassword;
      createUserDto.role = createUserDto.role.toLowerCase();

      return await this.usersRepository.save(createUserDto);
    } catch (error) {
      console.log('error', error);
      throw new BadRequestException('Error Unique Validation ' + error.detail);
    }
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findUserById(uuid: string) {
    return await this.usersRepository.findOne({ where: { uuid } });
  }

  async findOneUser(attrs: Partial<User>) {
    const user = await this.usersRepository.findOne({
      where: { uuid: attrs.uuid },
    });
    if (!user) throw new BadRequestException();

    return user;
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { uuid },
    });

    if (!user) throw new NotFoundException();

    Object.assign(user, updateUserDto);
    return await this.usersRepository.save(user);
  }
}
