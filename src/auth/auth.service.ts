import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { signInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService
  ) { }

  async generateAccessToken(auth: Auth): Promise<string> {
    const payload = { id: auth.id, email: auth.email, role: auth.role };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || '12345',
      expiresIn: process.env.JWT_EXPIRE_ACCESS || '15m',
    });
  }

  async generateRefreshToken(auth: Auth): Promise<string> {
    const payload = { id: auth.id, email: auth.email, role: auth.role };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || '12345',
      expiresIn: process.env.JWT_EXPIRE_REFRESH || '15h',
    });
  }

  async signUp(createAuthDto: CreateAuthDto): Promise<Auth> {
    const email = createAuthDto.email
    const hashedPassword = await hash(createAuthDto.password, 10);
    const newAuth = this.authRepository.create({
      ...createAuthDto,
      password: hashedPassword,
    });

    const existingUser = await this.authRepository.findOneBy({ email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    console.log(this.authRepository.save(newAuth));
    return this.authRepository.save(newAuth);
  }

  async signIn(signInDto: signInDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = signInDto;
    const user = await this.authRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('User Not Found');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }

  async findAll(): Promise<Auth[]> {
    return this.authRepository.find();
  }

  async findOne(id: string): Promise<Auth | undefined> {
    return this.authRepository.findOne({ where: { id } });
  }

  async update(id: string, updateAuthDto: UpdateAuthDto): Promise<Auth | undefined> {
    await this.authRepository.update(id, updateAuthDto);
    return this.authRepository.findOne({ where: { id } });
  }

  async logout(id: string): Promise<void> {
    await this.authRepository.delete(id);
  }
}


