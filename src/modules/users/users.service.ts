import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './model/repository/users.repository';
import { CreateUserDto } from './model/dto/create-user.dto';
import { UpdateUserDto } from './model/dto/update-user.dto';
import { User } from './model/entity/user.entity';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        // La validación de duplicados ahora la maneja la BD y el repositorio lo atrapa
        return this.usersRepository.create(createUserDto);
    }

    async findAll(term?: string): Promise<User[]> {
        return this.usersRepository.findAll(term);
    }

    async findOne(id: string): Promise<User> {
        const user = await this.usersRepository.findOne(id);
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersRepository.update(id, updateUserDto);
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id); // Reutilizamos el método para validar existencia
        await this.usersRepository.remove(user);
    }
}