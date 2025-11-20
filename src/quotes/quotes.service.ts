import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { Quote } from "./entities/quote.entity";
import { CreateQuoteDto } from "./dto/create-quote.dto";
import { UpdateQuoteDto } from "./dto/update-quote.dto";

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quotesRepository: Repository<Quote>
  ) {}

  async findAll(limit?: number, author?: string): Promise<Quote[]> {
    const queryBuilder = this.quotesRepository.createQueryBuilder("quote");

    // Filter by author if provided
    if (author) {
      queryBuilder.where("quote.author LIKE :author", {
        author: `%${author}%`,
      });
    }

    // Limit results if provided
    if (limit) {
      queryBuilder.take(limit);
    }

    return queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Quote> {
    const quote = await this.quotesRepository.findOne({ where: { id } });
    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }
    return quote;
  }

  async create(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const newQuote = this.quotesRepository.create(createQuoteDto);
    return this.quotesRepository.save(newQuote);
  }

  async update(id: number, updateQuoteDto: UpdateQuoteDto): Promise<Quote> {
    const quote = await this.findOne(id);
    Object.assign(quote, updateQuoteDto);
    return this.quotesRepository.save(quote);
  }

  async remove(id: number): Promise<void> {
    const result = await this.quotesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }
  }
}
