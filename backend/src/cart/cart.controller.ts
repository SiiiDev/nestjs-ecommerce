import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addToCart(@Request() req, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(req.user.id, dto);
  }

  @Get()
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.id);
  }

  @Patch(':id')
  updateCartItem(@Request() req, @Param('id') itemId: string, @Body() body: { quantity: number }) {
    return this.cartService.updateCartItem(req.user.id, itemId, body.quantity);
  }

  @Delete(':id')
  removeFromCart(@Request() req, @Param('id') itemId: string) {
    return this.cartService.removeFromCart(req.user.id, itemId);
  }

  @Delete()
  clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.id);
  }
}
