import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
    private readonly categoryService: CategoriesService
    
  ){}

  async create(dto: CreateBookDto){
    const book = this.bookRepo.create({
      title: dto.title,
      description: dto.description,
      cover: dto.cover,
      stock: dto.stock,
      price: dto.price,
    });

    if(dto.categoryId){
      const category = await this.categoryService.findOne(dto.categoryId);
      book.category = category;
    }

    return this.bookRepo.save(book);
  }

  async findAll(
    page: number, 
    limit: number,
    category: string,
    search: string
  ) {
    const query = await this.bookRepo.createQueryBuilder('book')
    .leftJoinAndSelect('book.category', 'category')
    .orderBy('book.createdAt', 'DESC')
    .skip((page - 1) * limit)
    .take(limit)

    if(category){
      query.andWhere('category.id = :category', {category})
    }

    if(search?.trim()){
      query.andWhere('book.title ILike :search', {search: `%${search}%`})
    }

    const [data, total] = await query.getManyAndCount();

    return {
      data, 
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit)
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
