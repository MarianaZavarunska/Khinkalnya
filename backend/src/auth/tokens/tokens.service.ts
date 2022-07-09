import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, TokenPair } from '@prisma/client';

import { PrismaService } from '../../core/prisma.service';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async generateTokensPair(user: Partial<User>) {
    const payload = { id: user.id, email: user.email };
    const [access, refresh] = await Promise.all([
      this.jwtService.sign(payload, { secret: 'Access', expiresIn: '1d' }),
      this.jwtService.sign(payload, { secret: 'Refresh', expiresIn: '1d' }),
    ]);

    await this.deleteTokensPair(user.id);

    const tokensPair = await this.saveTokens({ access, refresh }, user.id);
    return {
      user,
      tokensPair,
    };
  }

  async saveTokens(tokensPair, id: number): Promise<TokenPair> {
    return this.prismaService.tokenPair.create({
      data: {
        accessToken: tokensPair.access,
        refreshToken: tokensPair.refresh,
        authorId: id,
      },
    });
  }

  async deleteTokensPair(id: number) {
    return this.prismaService.tokenPair.delete({ where: { authorId: id } });
  }
}
