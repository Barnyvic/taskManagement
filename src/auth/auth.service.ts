import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { HandleError, HandleSuccess } from 'src/common/utils/response';
import { verifyPassword } from '../common/utils/auth.helper';
import { UserDocument } from '../users/schema/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async LoginUser(data: LoginUserDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      const newUser = await this.userService.create(data);

      const token = await this.generateToken(newUser);

      return HandleSuccess(
        token,
        HttpStatus.OK,
        'User created and logged in successfully',
      );
    }
    const isPasswordValid = await verifyPassword(data.password, user.password);
    if (!isPasswordValid) {
      return HandleError({
        error: true,
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid email or password',
      });
    }
    const token = await this.generateToken(user);
    return HandleSuccess(token, HttpStatus.OK, 'Login successful');
  }

  async generateToken(user: UserDocument): Promise<string> {
    const payload = { id: user._id, email: user.email };
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
  }
}
