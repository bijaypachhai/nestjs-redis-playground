import { Controller, Get, Post, Body } from '@nestjs/common'
import { CatsService } from './cats.service';
import { CatBodyDto } from './cats.dto';

@Controller('cats')
export class CatsController {
    constructor(
        private readonly catsService: CatsService
    ) {}

    @Get()
    async getCats(): Promise<string[]> {
        return await this.catsService.getCats();
    }

    @Get('list')
    async getRange(): Promise<string[]> {
        return await this.catsService.getBids();
    }

    @Post()
    createCat(@Body() catBody: CatBodyDto): string {
        return this.catsService.createCat();
    }
}