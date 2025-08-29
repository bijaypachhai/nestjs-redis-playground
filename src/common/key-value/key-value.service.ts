import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { REDIS_CLIENT_CONNECTION } from 'src/common/redis/redis.constant';
import { IKeyValueService } from './interfaces/key-value.service.interface';
import { IGetKeyData, ISetKeyOptions } from './interfaces/key-value.interface';

@Injectable()
export class KeyValueRedisService implements IKeyValueService {
  private maxRequestTime: number;
//   private maxRequest: number;

  constructor(
    @Inject(REDIS_CLIENT_CONNECTION) private readonly redis: RedisClientType,
  ) {
    this.maxRequestTime = 120; //milliseconds
  }

  decrement(key: string, by?: number): Promise<number> {
    throw new Error('Method not implemented.');
  }

  /**
   * @async
   * function to increment the count of key which stores number
   * @param key {string}
   * @param by {number?} - count by which the number should be incremented, default is 1.
   * @returns {Promise<number>}
   */
  async increment(key: string, by: number = 1): Promise<any> {
    const ttl = this.maxRequestTime * 1000;

    const data = await this.keyExists(key);
    if (data) {
      const resp: string | null = await this.redis.get(key);
      await this.redis.set(key, Number(resp) + by, { EX: ttl });
    }
  }

  /**
   * @param data object
   * @returns string
   */
  generateKey(data: IGetKeyData): string {
    return `${data.module ?? ''}:${data.identifier ?? ''}`;
  }

  /**
   * @param key string
   * @returns {Promise<string|null>}
   */
  async get(key: string): Promise<string | null> {
    const data: string | null = await this.redis.get(key);

    return data;
  }

  /**
   * @param key string
   * @param value number
   * @return void
   */
  async set(
    key: string,
    value: number | string,
    options?: ISetKeyOptions,
  ): Promise<void> {
    await this.redis.set(key, value, { EX: options?.expirationSeconds });
  }

  /**
   * @param key string
   * @returns Promise<boolean>
   */
  async keyExists(key: string): Promise<boolean> {
    const data = await this.redis.get(key);
    return !!data;
  }

  /**
   * @param key string
   * @returns Promise<boolean>
   */
  async removeKey(key: string): Promise<boolean> {
    if (await this.keyExists(key)) {
      await this.redis.del(key);
      return true;
    }
    return false;
  }

  async getAllExistKeys(key: string) {
    return this.redis.keys(key);
  }

  async getAllKeys() {
    return this.redis.keys('*');
  }

  async getType(key: string) {
    return this.redis.type(key);
  }

  // GET HASH MAP FROM REDIS CACHE
  async hGet(key: string) {
    return this.redis.hGet(key, 'data');
  }

  // GET SORTED ORDER FROM REDIS CACHE
  async zGet(key: string) {
    return this.redis.zScan(key, '0');
  }
}
