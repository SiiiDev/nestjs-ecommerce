import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) {}

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
    @Query('category') category:string,
    @Query('search') search : string
  ){
    return this.productsService.findAllPagination(+page, +limit, category, search);
  }

  

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateProductDto){
    return this.productsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto){
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.productsService.remove(id);
  }
}
