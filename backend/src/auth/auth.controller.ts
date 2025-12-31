import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { error } from 'console';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { Response, Request } from 'express';


@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService){}

   @Post('register')
   async register(@Body() registerDto: RegisterDto){
    return this.authService.register(registerDto);
   }

   @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password
    );
    if(!user) return {error: 'invalid credentials'};

    const token = await this.authService.login(user);
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { message: 'Logged in' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: Request) {
    return req.user;
  }

  // Logout user by clearing cookie
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { message: 'Logged out' };
  }
}
