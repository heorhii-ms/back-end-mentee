import {Injectable} from '@nestjs/common';
import {User} from '@prisma/client';
import * as bcrypt from 'bcrypt';

import {AUTH_CONSTANTS} from 'src/constants/auth-constants';
import {PrismaService} from '../prisma/prisma.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  public async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      AUTH_CONSTANTS.ROUNDS_OF_GASHING,
    );

    createUserDto.password = hashedPassword;

    return this.prisma.user.create({data: createUserDto});
  }

  public findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public findOne(id: number) {
    return this.prisma.user.findFirst({where: {id}});
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(
        updateUserDto.password,
        AUTH_CONSTANTS.ROUNDS_OF_GASHING,
      );

      updateUserDto.password = hashedPassword;
    }

    return this.prisma.user.update({
      where: {id},
      data: updateUserDto,
    });
  }

  public remove(id: number) {
    return this.prisma.user.delete({where: {id}});
  }
}
