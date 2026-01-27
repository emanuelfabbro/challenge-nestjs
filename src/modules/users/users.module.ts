import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/entity/user.entity';
import { Profile } from './model/entity/profile.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Profile])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule { }