import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { HandleError, HandleSuccess } from 'src/common/utils/response';
import { verifyPassword } from '../common/utils/auth.helper';
import { UserDocument } from '../users/schema/users.schema';
import { SignUpDto } from './dto/signup-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDto) {
    const existingUser = await this.userService.findByEmail(data.email);
    if (existingUser) {
      return HandleError({
        error: true,
        status: HttpStatus.BAD_REQUEST,
        message: 'Email already in use',
      });
    }

    const newUser = await this.userService.create(data);

    return HandleSuccess(
      newUser,
      HttpStatus.CREATED,
      'User created successfully',
    );
  }

  async loginUser(data: LoginUserDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      return HandleError({
        error: true,
        status: HttpStatus.BAD_REQUEST,
        message: 'User not found pls signup....',
      });
    }
    const isPasswordValid = await verifyPassword(data.password, user.password);
    if (!isPasswordValid) {
      return HandleError({
        error: true,
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid password...',
      });
    }
    const token = await this.generateToken(user);
    const userResponse = {
      token: token,
      fullName: `${user.lastName} ${user.firstName}`,
    };
    return HandleSuccess(userResponse, HttpStatus.OK, 'Login successful');
  }

  async generateToken(user: UserDocument): Promise<string> {
    const payload = { id: user._id, email: user.email };
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
  }
}
