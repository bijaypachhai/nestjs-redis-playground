import { Injectable, NotFoundException } from "@nestjs/common";
import { ListRedisService } from "src/common/list-redis/list-redis.service";
import { randomInt } from "crypto";

@Injectable()
export class CatsService {
    constructor(
        private readonly listRedisService: ListRedisService,
    ){}

    async getCats(): Promise<string[]> {
        const bid = this.addRandom();
        await this.listRedisService.addToList('cats:getCats', bid);
        return ['cat1', 'cat2', 'cat3'];
    }

    createCat(): string {
        throw new NotFoundException('Cat Record cannot be created');
        return 'Cat record created Successfully';
    }

    async getBids(): Promise<string[]> {
        const data = await this.listRedisService.getRange('cats:getCats', 0, -1);
        return data;
    }

    addRandom(): string {
        return `Bid::${randomInt(100)}`;
    }
}