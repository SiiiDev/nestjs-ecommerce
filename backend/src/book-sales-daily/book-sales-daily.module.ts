import { Module } from '@nestjs/common';
import { BookSalesDailyService } from './book-sales-daily.service';
import { BookSalesDailyController } from './book-sales-daily.controller';

@Module({
  controllers: [BookSalesDailyController],
  providers: [BookSalesDailyService],
})
export class BookSalesDailyModule {}
