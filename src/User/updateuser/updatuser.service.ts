import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './updateuser.repository';
import { UpdateUserProfileDto } from './updateuser.dto';
import { User } from '../Auth/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async updateUserProfile(
    userId: string,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<User | null> {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.updateUser(userId, updateUserProfileDto);
  }
}