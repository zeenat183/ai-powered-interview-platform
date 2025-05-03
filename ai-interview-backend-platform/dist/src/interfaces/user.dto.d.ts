export declare enum Role {
    USER = "user",
    ADMIN = "admin"
}
export declare class RegisterUserDto {
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
}
export declare class LoginUserDto {
    email: string;
    password: string;
}
export declare class UpdateUserDto {
    name?: string;
    phoneNumber?: string;
}
