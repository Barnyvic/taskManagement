import { Body, Controller, Put, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiOperation,
  ApiBody,
  ApiTags,
  ApiBearerAuth,
  PartialType,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from './schema/users.schema';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Update user by ID' })
  @ApiBody({ type: PartialType<User> })
  @Put('/update-user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  update(@Request() req, @Body() updateUserData: Partial<User>) {
    const { _id: userId } = req.user;
    return this.usersService.UpdateUser(userId, updateUserData);
  }
}
