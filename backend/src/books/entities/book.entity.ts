import { Category } from "src/categories/entities/category.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Book {

    @PrimaryGeneratedColumn("uuid")
    id : string;

    @Column({nullable : true})
    slug: string

    @Column({unique: true})
    title: string;

    @Column()
    price: number;

    @Column({nullable: true})
    description: string;

    @Column()
    stock: number;

    @Column({nullable : true})
    soldCount: number;

    @Column({nullable: true})
    cover: string;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Category, (category) => category.books, {
        nullable: true,
        onDelete: 'SET NULL'
    })
    category: Category;


    @BeforeInsert()
    @BeforeUpdate()
    generateSlug() {
        this.slug = this.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
  }

    
}
