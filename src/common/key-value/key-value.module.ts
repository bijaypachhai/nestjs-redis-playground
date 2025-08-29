import { Global, Module } from "@nestjs/common";
import { RedisModule } from "src/common/redis/redis.module";
import { KeyValueRedisService } from "./key-value.service";

@Global()
@Module({
    imports: [RedisModule],
    providers: [KeyValueRedisService],
    exports: [KeyValueRedisService]
})
export class KeyValueModule {}