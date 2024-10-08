import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/model/user.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService) {}
  async login(user: UserDocument, response: Response) {
    const tokenPaylaod = {
      userId: user._id,
    }
    const expires = new Date()
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION')
    )

    const token = this.jwtService.sign(tokenPaylaod)

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    })
  }
}
