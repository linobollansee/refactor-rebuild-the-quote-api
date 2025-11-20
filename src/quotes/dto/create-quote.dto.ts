import { IsString, IsNotEmpty } from "class-validator";

export class CreateQuoteDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  author: string;
}
