import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from './users-repository';
import { User, UserDocument } from './schema/users.schema';
import { hashPassword } from '../common/utils/auth.helper';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(userDto: Partial<User>): Promise<UserDocument> {
    const hashedPassword = await hashPassword(userDto.password);
    const createdUser = await this.usersRepository.create({
      ...userDto,
      password: hashedPassword,
    });
    return createdUser;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    return user;
  }

  async UpdateUser(userId: string, updateUserData: Partial<User>) {
    try {
      const user = await this.usersRepository.findById(
        new Types.ObjectId(userId),
      );

      if (!user) {
        return {
          error: true,
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'User not found.',
          data: null,
        };
      }

      const updatedUser = await this.usersRepository.updateOne(
        new Types.ObjectId(userId),
        updateUserData,
      );

      return {
        error: false,
        statusCode: HttpStatus.OK,
        message: 'User updated successfully.',
        data: updatedUser,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'An unexpected error occurred.',
        data: null,
      };
    }
  }

  async findById(id: string) {
    const user = await this.usersRepository.findById(new Types.ObjectId(id));
    return user;
  }
}
