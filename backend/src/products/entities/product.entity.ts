import { Category } from "src/categories/entities/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class Product{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({type: 'text'})
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({default: 0})
    stock: number;

    @Column({ nullable: true })
    image: string

    @ManyToOne(() => Category, (category) => category.products, {
        nullable: true,
        onDelete: 'SET NULL'
    })
    category: Category;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}