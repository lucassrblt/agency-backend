import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../../guard/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAll(@Query() email): Promise<any> {
    if(!email) {
      return this.userService.getAll();
    }else {
      return this.userService.findOne(email.email)
    }
  }

  @Post()
    async create(@Body() user){
      return this.userService.create(user)
    }

  @Post('/login')
    async login(@Body() user){
      return this.userService.login(user)
    }
}