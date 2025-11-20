import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuotesModule } from "./quotes/quotes.module";
import { UsersModule } from "./users/users.module";
import { Quote } from "./quotes/entities/quote.entity";
import { User } from "./users/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "better-sqlite3",
      database: "quote-api.db",
      entities: [Quote, User],
      synchronize: true,
    }),
    QuotesModule,
    UsersModule,
  ],
})
export class AppModule {}
