import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  @InjectRepository(Admin)
  private adminsRepository: Repository<Admin>;

  async create(createAdminDto: CreateAdminDto) {
    try {
      const hashedPassword = await bcrypt.hash(createAdminDto.password, 12);
      createAdminDto.password = hashedPassword;
      return await this.adminsRepository.save(createAdminDto);
    } catch (error) {
      throw new BadRequestException('Error Unique Validation ' + error.detail);
    }
  }

  async findAll() {
    return await this.adminsRepository.find();
  }

  async findAdminById(uuid: string) {
    return await this.adminsRepository.findOne({ where: { uuid } });
  }

  async findOneAdmin(attrs: Partial<Admin>) {
    const admin = await this.adminsRepository.findOne({
      where: { uuid: attrs.uuid },
    });
    if (!admin) throw new BadRequestException();

    return admin;
  }

  async update(uuid: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminsRepository.findOne({
      where: { uuid },
    });

    if (!admin) throw new NotFoundException();

    Object.assign(admin, updateAdminDto);
    return await this.adminsRepository.save(admin);
  }
}
