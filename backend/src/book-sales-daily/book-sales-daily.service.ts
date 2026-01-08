import { Injectable } from '@nestjs/common';
import { CreateBookSalesDailyDto } from './dto/create-book-sales-daily.dto';
import { UpdateBookSalesDailyDto } from './dto/update-book-sales-daily.dto';

@Injectable()
export class BookSalesDailyService {
  create(createBookSalesDailyDto: CreateBookSalesDailyDto) {
    return 'This action adds a new bookSalesDaily';
  }

  findAll() {
    return `This action returns all bookSalesDaily`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookSalesDaily`;
  }

  update(id: number, updateBookSalesDailyDto: UpdateBookSalesDailyDto) {
    return `This action updates a #${id} bookSalesDaily`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookSalesDaily`;
  }
}
