import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
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
  @Put(':userId/update-user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  update(
    @Param('userId') userId: string,
    @Body() updateUserData: Partial<User>,
  ) {
    return this.usersService.UpdateUser(userId, updateUserData);
  }
}
