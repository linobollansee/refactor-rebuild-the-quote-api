import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { QuotesService } from "./quotes.service";
import { CreateQuoteDto } from "./dto/create-quote.dto";
import { UpdateQuoteDto } from "./dto/update-quote.dto";
import { Quote } from "./entities/quote.entity";

@Controller("quotes")
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  async findAll(
    @Query("limit") limit?: number,
    @Query("author") author?: string
  ): Promise<Quote[]> {
    return this.quotesService.findAll(limit, author);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Quote> {
    return this.quotesService.findOne(id);
  }

  @Post()
  async create(@Body() createQuoteDto: CreateQuoteDto): Promise<Quote> {
    return this.quotesService.create(createQuoteDto);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateQuoteDto: UpdateQuoteDto
  ): Promise<Quote> {
    return this.quotesService.update(id, updateQuoteDto);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.quotesService.remove(id);
  }
}
