import { IsString, IsEmail, IsInt, ValidateNested, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CreateProfileDto {
    @ApiProperty({ example: 'Desarrollador Senior' })
    @IsString()
    @IsNotEmpty()
    nombrePerfil: string;

    @ApiProperty({ example: 'DEV-001' })
    @IsString()
    @IsNotEmpty()
    codigo: string;
}

export class CreateUserDto {
    @ApiProperty({ example: 'Juan Perez' })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ example: 'juan@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 30 })
    @IsInt()
    @Min(18)
    edad: number;

    @ApiProperty()
    @ValidateNested()
    @Type(() => CreateProfileDto)
    profile: CreateProfileDto;
}