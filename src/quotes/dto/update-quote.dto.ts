import { IsString, IsOptional } from "class-validator";

export class UpdateQuoteDto {
  @IsString()
  @IsOptional()
  text?: string;

  @IsString()
  @IsOptional()
  author?: string;
}
