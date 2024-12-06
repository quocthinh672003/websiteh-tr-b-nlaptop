
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(email);
    
    if (user) {
      const isValid = this.usersService.isValidPassword(password, user.password);
      if (isValid === true) {
      return user;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async register(user: RegisterUserDto) {
    let newUser = await this.usersService.register(user);

    return {
        _id: newUser?._id,
        createdAt: newUser?.createdAt
    };
}


}
