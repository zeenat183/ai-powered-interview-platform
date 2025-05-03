import { UserRepository } from '../../database/repositories/user.repository';
import { User } from 'src/database/schemas/user.schema';
import { UpdateUserDto } from 'src/interfaces/user.dto';
export declare class UserHelperService {
    private readonly userRepo;
    constructor(userRepo: UserRepository);
    findByEmail(email: string): Promise<User | null>;
    findByUserId(userId: string): Promise<User>;
    createUser(data: Partial<User>): Promise<User>;
    updateUserByUserId(userId: string, update: Partial<UpdateUserDto>): Promise<import("mongoose").FlattenMaps<import("src/database/schemas/user.schema").UserDocument> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    }>;
}
