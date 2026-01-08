import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookSalesDailyService } from './book-sales-daily.service';
import { CreateBookSalesDailyDto } from './dto/create-book-sales-daily.dto';
import { UpdateBookSalesDailyDto } from './dto/update-book-sales-daily.dto';

@Controller('book-sales-daily')
export class BookSalesDailyController {
  constructor(private readonly bookSalesDailyService: BookSalesDailyService) {}

  @Post()
  create(@Body() createBookSalesDailyDto: CreateBookSalesDailyDto) {
    return this.bookSalesDailyService.create(createBookSalesDailyDto);
  }

  @Get()
  findAll() {
    return this.bookSalesDailyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookSalesDailyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookSalesDailyDto: UpdateBookSalesDailyDto) {
    return this.bookSalesDailyService.update(+id, updateBookSalesDailyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookSalesDailyService.remove(+id);
  }
}
