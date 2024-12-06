import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './decorators/customize';
import { Response } from 'express';
import { RegisterUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // Render trang Quản Lý Nhà Sản Xuất (qlnsx)
  @Public()
  @Get('qlnsx')
  renderQLNSXPage(@Res() res: Response) {
    res.render('qlnsx', { title: 'Quản Lý Nhà Sản Xuất' });
  }

  // Render trang Quản Lý Sản Phẩm (qlsp)
  @Public()
  @Get('qlsp')
  renderQLSPPage(@Res() res: Response) {
    res.render('qlsp', { title: 'Quản Lý Sản Phẩm' });
  }

  // Route để serve trang login
  @Public()
  @Get('auth/login')
  renderLoginPage(@Res() res: Response) {
    res.render('DangNhap', { title: 'Đăng Nhập' });
  }

  @Public()
  @Get('auth/register')
  renderRegisterPage(@Res() res: Response) {
    res.render('DangKy', { title: 'Đăng Ký' });
  }

  @Public()
  @Get('/')
  renderHomePage(@Res() res: Response) {
    res.render('home', { title: 'Trang chủ' });
  }
  // Route xử lý đăng nhập
  // @Public()
  // @Post('auth/login')
  // async login(@Body() body: { email: string; password: string }) {
  //   const user = await this.authService.validateUser(body.email, body.password);
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid email or password');
  //   }
  //   return this.authService.login(user);
  // }
  

  @Public()
  @Post('auth/login')
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const loginResponse = await this.authService.login(user);

    // Lưu token vào cookie (tuỳ chọn)
    res.cookie('token', loginResponse.access_token, {
      httpOnly: true,
      secure: false, // Đặt thành true nếu dùng HTTPS
      maxAge: 24 * 60 * 60 * 1000, // Thời gian sống của cookie: 1 ngày
    });

    // Redirect đến trang chủ
    return res.redirect('/');
  }

  @Public()
  @Post('auth/register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res() res: Response,
  ) {
    try {
      const newUser = await this.authService.register(registerUserDto);
      return res.status(201).json({
        message: 'Đăng ký thành công!',
        userId: newUser._id,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Có lỗi xảy ra trong quá trình đăng ký.',
      });
    }
  }
}
