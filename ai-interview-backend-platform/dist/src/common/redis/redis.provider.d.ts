import Redis from 'ioredis';
export declare const RedisProvider: {
    provide: string;
    useFactory: () => Redis;
};
