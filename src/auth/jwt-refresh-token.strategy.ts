import { Request } from "express";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from '@nestjs/common';
import { refreshTokenSecret } from "src/config";
 
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token'
) {
  constructor(
  ) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: refreshTokenSecret(),
        passReToCallback:true
      });
  }
 
  async validate(request: Request, payload: any) {
    const refreshToken = request.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken}
  }
}