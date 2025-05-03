import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user.repository';
import { to } from 'src/common/utils/to.utils';
import { User } from 'src/database/schemas/user.schema';
import { UpdateUserDto } from 'src/interfaces/user.dto';

@Injectable()
export class UserHelperService {
  constructor(private readonly userRepo: UserRepository) {}

  async findByEmail(email: string) {
    const [error, user] = await to(this.userRepo.findByEmail(email));
    if (error) {
      throw new InternalServerErrorException('Failed to query user by email');
    }
    return user;
  }
  
  async findByUserId(userId: string) {
    const [error, user] = await to(this.userRepo.findByUserId(userId));
    if (error) {
      throw new InternalServerErrorException('Failed to query user by userId');
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  
  async createUser(data: Partial<User>) {
    const [error, user] = await to(this.userRepo.create(data));
    if (error || !user) {
      throw new InternalServerErrorException('Failed to create user');
    }
    return user;
  }
  

  async updateUserByUserId(userId: string, update: Partial<UpdateUserDto>) {
    const [error, updatedUser] = await to(
      this.userRepo.updateUserByUserId(userId, update)
    );
  
    if (error) throw new InternalServerErrorException('Failed to update user');
    if (!updatedUser) throw new NotFoundException('User not found');
  
    return updatedUser;
  }
//   async create(userData: any) {
//     const [error, user] = await to(this.userRepo.create(userData));

//     if (error) {
//       throw new InternalServerErrorException('Failed to create user');
//     }

//     if(!user){
//         throw new InternalServerErrorException('Failed to create user');
//     }

//     return user;
//   }

//   async findByEmail(email: string) {
//     const [error, user] = await to(this.userRepo.findByEmail(email));

//     if (error) {
//       throw new InternalServerErrorException('Failed to fetch user by email');
//     }

//     return user;
//   }

//   async findByUserId(userId: string) {
//     const [error, user] = await to(this.userRepo.findByUserId(userId));

//     if (error) {
//       throw new InternalServerErrorException('Failed to fetch user by userId');
//     }

//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     return user;
//   }
}
