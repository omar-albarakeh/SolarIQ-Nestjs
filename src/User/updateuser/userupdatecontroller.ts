import {
  Controller,
  Put,
  Param,
  Body,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './updatuser.service';
import { UpdateUserProfileDto } from './updateuser.dto';
import { User } from '../Auth/user.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('profile/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateUserProfile(
    @Param('id') userId: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<User | null> {
    try {
      return await this.userService.updateUserProfile(userId, updateUserProfileDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}