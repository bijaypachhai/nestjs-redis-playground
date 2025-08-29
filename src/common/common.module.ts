import { Module } from "@nestjs/common";
import { RedisModule } from "./redis/redis.module";
import { ListRedisModule } from "./list-redis/list-redis.module";

@Module({
    imports: [
        RedisModule,
        ListRedisModule,
    ],
    providers: [],
    exports: []
})
export class CommonModule {}