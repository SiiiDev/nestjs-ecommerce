import { PartialType } from '@nestjs/mapped-types';
import { CreateBookSalesDailyDto } from './create-book-sales-daily.dto';

export class UpdateBookSalesDailyDto extends PartialType(CreateBookSalesDailyDto) {}
