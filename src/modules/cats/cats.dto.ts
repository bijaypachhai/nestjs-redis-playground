import { IsString, IsNotEmpty } from "class-validator";

export class CatBodyDto {
    
    @IsString()
    @IsNotEmpty()
    data: string;
}