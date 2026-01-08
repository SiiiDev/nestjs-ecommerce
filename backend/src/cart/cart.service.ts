import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartRepo: Repository<CartItem>,
    private readonly booksService: BooksService,
  ) {}

  async addToCart(userId: string, dto: AddToCartDto): Promise<CartItem> {
    // Verify book exists
    await this.booksService.findOne(+dto.bookId);

    // Check if item already in cart
    const existing = await this.cartRepo.findOne({
      where: { userId, bookId: dto.bookId },
    });

    if (existing) {
      existing.quantity += dto.quantity;
      return this.cartRepo.save(existing);
    }

    const item = this.cartRepo.create({
      userId,
      bookId: dto.bookId,
      quantity: dto.quantity,
    });

    return this.cartRepo.save(item);
  }

  async getCart(userId: string): Promise<CartItem[]> {
    return this.cartRepo.find({
      where: { userId },
      relations: ['book'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateCartItem(userId: string, itemId: string, quantity: number): Promise<CartItem> {
    const item = await this.cartRepo.findOne({
      where: { id: itemId, userId },
    });

    if (!item) throw new NotFoundException('Cart item not found');

    if (quantity <= 0) {
      await this.cartRepo.remove(item);
      return item;
    }

    item.quantity = quantity;
    return this.cartRepo.save(item);
  }

  async removeFromCart(userId: string, itemId: string): Promise<void> {
    const item = await this.cartRepo.findOne({
      where: { id: itemId, userId },
    });

    if (!item) throw new NotFoundException('Cart item not found');

    await this.cartRepo.remove(item);
  }

  async clearCart(userId: string): Promise<void> {
    await this.cartRepo.delete({ userId });
  }
}
