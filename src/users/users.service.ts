import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import * as moment from 'moment';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,
  ) {}
  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };
  async create(createUserDto: CreateUserDto) {
    const { email, name, password, birthDate, phone, address } = createUserDto;
    const checkEmail = await this.userModel.findOne({ email: email });

    if (checkEmail) {
      console.log('Email đã tồn tại');
      throw new BadRequestException(
        `Email: ${email} đã tồn tại trên hệ thống. Vui lòng sử dụng email khác.`,
      );
    }

    const hashPassword = this.getHashPassword(password);

    let newUser = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      birthDate,
      phone,
      address,
    });
    return newUser;
  }

  async register(user: RegisterUserDto) {
    const { email, name, password, birthDate, phone, address } = user;
  
    // Kiểm tra xem email đã tồn tại chưa
    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(
        `Email: ${email} đã tồn tại trên hệ thống. Vui lòng sử dụng email khác.`,
      );
    }
  
    // Xử lý birthDate nếu FE gửi sai định dạng
    const formattedBirthDate = moment(birthDate, ['DD/MM/YYYY', 'YYYY-MM-DD']).toDate();
  
    // Hash password
    const hashPassword = this.getHashPassword(password);
  
    // Tạo user mới
    const newRegister = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      birthDate: formattedBirthDate,
      phone,
      address,
    });
  
    return newRegister;
  }
  

  findOneByUsername(username: string) {
    return this.userModel.findOne({
      email: username,
    });
  }

  isValidPassword(password: string, hash: string) {
    //compare(so sánh) password đã hashed
    return compareSync(password, hash);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
