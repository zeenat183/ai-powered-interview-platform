import { Request } from 'express';
export interface ExtendedRequest extends Request {
    user?: {
        sub: string;
        [key: string]: any;
    };
}
