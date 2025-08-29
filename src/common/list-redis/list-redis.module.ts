import { Global, Module } from "@nestjs/common";
import { RedisModule } from "../redis/redis.module";
import { ListRedisService } from "./list-redis.service";


@Global()
@Module({
    imports: [RedisModule],
    providers: [ListRedisService],
    exports: [ListRedisService]
})
export class ListRedisModule {}