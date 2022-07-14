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

  getUserByEmail(userEmail: string): Promise<User> {
    return this.prismaService.user.findFirst({ where: { email: userEmail } });
  }

  createUser(data: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  deleteUserById(id: string): void {
    this.prismaService.user.delete({ where: { id: Number(id) } });
  }
}
