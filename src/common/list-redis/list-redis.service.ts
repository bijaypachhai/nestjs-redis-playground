import { Inject } from "@nestjs/common";
import { REDIS_CLIENT_CONNECTION } from "../redis/redis.constant";
import { RedisClientType } from "redis";
import { IGetKeyData, IListRedisService } from "./interfaces/list-redis.interface";

export class ListRedisService implements IListRedisService {
    constructor(
        @Inject(REDIS_CLIENT_CONNECTION) private readonly redis: RedisClientType,
    ){}

    generateKey(data: IGetKeyData): string {
        return `${data.module}:${data.identifier}`;
    }

    async addToList(
        key: string,
        value: string
    ): Promise<void> {
        await this.redis.rPush(key, value)
    }

    async getByIndex(key: string, index: number): Promise<string> {

        const keyExists = await this.keyExists(key);

        if (keyExists) {
            const value = await this.redis.lIndex(key, index);
            return value ? value: 'sorry';
        } else {
            return 'key does not exist'
        }
    }

    async getRange(key: string, firstIndex: number = 0, lastIndex: number): Promise<string[]> {
        const value = await this.redis.lRange(key, firstIndex, lastIndex);
        return value;
    }

    async keyExists(key: string): Promise<boolean> {
        const existingKey = await this.redis.get(key);
        return !!existingKey;
    }

    async removeFromList(): Promise<void> {
        
    }
}