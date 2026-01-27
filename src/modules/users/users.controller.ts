import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './model/dto/create-user.dto';
import { UpdateUserDto } from './model/dto/update-user.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApiTags, ApiOperation, ApiQuery, ApiHeader } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Crear usuario' })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar usuarios' })
    @ApiQuery({ name: 'term', required: false, description: 'Filtra por nombre o email' })
    findAll(@Query('term') term?: string) {
        return this.usersService.findAll(term);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener usuario por ID' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar usuario' })
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar usuario' })
    @Roles('admin')
    @ApiHeader({
        name: 'x-role',
        description: 'Rol del usuario (ej: user, admin)',
        required: true,
    })
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.remove(id);
    }
}