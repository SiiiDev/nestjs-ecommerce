import { RegisterDto } from './dto/register.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}


//   Register Object 
  async register(registerDto: RegisterDto){
    const {email, password} = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      email,
      password: hashedPassword,
    });

    return this.userRepo.save(user);
  }

// Validate user credentials
  async validateUser(email: string, password: string){
    const user = await this.userRepo.findOne({
        where: {email},
        select: ['id', 'email', 'password', 'role'],
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

// jwt token generator
async login(user: User){
    const payload = {'sub': user.id, 'email': user.email, 'role': user.role};
    const token = this.jwtService.sign(payload);
    return token;
}

}
