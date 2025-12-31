import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>,
    ){}

    async create(dto: CreateCategoryDto): Promise<Category> {
        const exists = await this.categoryRepo.findOne({
            where: {name: dto.name},
        });

        if(exists) throw new ConflictException('Category already exists');

        const category = this.categoryRepo.create(dto);
        return this.categoryRepo.save(category);
    }

    async findAll(): Promise<Category[]> {
        return this.categoryRepo.find({
            order: {createdAt : 'DESC'}
        });
    }

    async findOne(id: string): Promise<Category> {
        const category = await this.categoryRepo.findOne({
            where: {id}
        })
        
        if(!category) throw new NotFoundException('Category Not Found');
        return category;
    }

    async update(id: string, dto: UpdateCategoryDto) : Promise<Category> {
        const category = await this.findOne(id);
        Object.assign(category, dto);
        return this.categoryRepo.save(category);      
    }

    async remove(id: string): Promise<void> {
        const category = await this.findOne(id);
        await this.categoryRepo.remove(category);
    }
}
