import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../core/prisma.service';
import { CreateUserDto } from '../auth/dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  getUserById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id: Number(id) },
    });
  }

  getUserByEmail(email: string): Promise<User> {
    return this.prismaService.user.findFirst({ where: { email } });
  }
  // ??data
  createUser(data: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  deleteUserById(id: string): void {
    this.prismaService.user.delete({ where: { id: Number(id) } });
  }
}
