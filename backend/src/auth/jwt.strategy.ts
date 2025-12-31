import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET') || 'secretKey';
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: any) => {
          // Extract JWT from cookie
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['jwt'];
          }
          // Fallback: also check signed cookies
          if (!token && req && req.signedCookies) {
            token = req.signedCookies['jwt'];
          }
          // Also check raw cookie header as fallback
          if (!token && req && req.headers && req.headers.cookie) {
            const cookies = req.headers.cookie.split(';');
            for (const cookie of cookies) {
              const [name, value] = cookie.trim().split('=');
              if (name === 'jwt') {
                token = value;
                break;
              }
            }
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    // This will be available as req.user
    if (!payload) {
      return null;
    }
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
