import { Body, Controller, Get, Post, Req, Res, UseGuards, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.authService.login(user);
    
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // Set to false for localhost development
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/', // Make cookie available for all routes
      domain: undefined, // Don't set domain for localhost
    });

    return { message: 'Logged in successfully', user: { id: user.id, email: user.email, role: user.role } };
  }

  @Get('debug')
  async debug(@Req() req: Request) {
    return {
      cookies: req.cookies,
      signedCookies: req.signedCookies,
      headers: req.headers.cookie,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: Request) {
    return req.user;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/', // Must match the path used when setting the cookie
      domain: undefined,
    });
    return { message: 'Logged out successfully' };
  }
}
