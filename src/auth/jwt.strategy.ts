import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  // This method is called when the user is authenticated
  async validate(payload) {
    const userExist = await this.userService.findById(payload.id);
    if (!userExist) {
      throw new UnauthorizedException('Login first to access this endpoint.');
    }
    const user = (({ _id, email }) => ({ _id, email }))(userExist);
    return user;
  }
}
