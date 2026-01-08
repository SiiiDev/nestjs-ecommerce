import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
        private readonly categoryService: CategoriesService
    ){}

    async create(dto: CreateProductDto): Promise<Product> {
        const product = this.productRepo.create({
            title: dto.title,
            description: dto.description,
            image: dto.image,
            stock: dto.stock,
            price: dto.price
        });

        if(dto.categoryId){
            const category = await this.categoryService.findOne(dto.categoryId);
            product.category = category;
        }

        return this.productRepo.save(product);
    }

    async findAllPagination(
        page: number,
        limit: number,
        category: string,
        search: string
    ): Promise<{ data: Product[]; meta: { total: number; page: number; lastPage: number } }> {
        const query = await this.productRepo.createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .orderBy('product.createdAt', 'DESC')
        .skip((page - 1) * limit)
        .take(limit);

        if(category){
            query.andWhere('category.id = :category', {category});
        }

        if(search){
            query.andWhere('product.title ILike :search', {search: `%${search}%`});
        }

        const [data, total] = await query.getManyAndCount();

        return {
            data, 
            meta : {
                total, 
                page,
                lastPage: Math.ceil(total / limit)
            },  
        }
    }


    async findOne(id: string): Promise<Product> {
        const product = await this.productRepo.findOne({where: {id}});
        if(!product) throw new NotFoundException('Product is not found');

        return product;
    }

    async update(id: string, dto: UpdateProductDto): Promise<Product>{
        const product = await this.findOne(id);

        if(dto.categoryId){
            product.category = await this.categoryService.findOne(dto.categoryId);
        }

        Object.assign(product, dto);
        return this.productRepo.save(product);
    }

    async remove(id: string): Promise<void>{
        const product = await this.findOne(id);
        await this.productRepo.remove(product);
    }
}
