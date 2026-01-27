import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../src/modules/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/modules/users/model/entity/user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../../src/modules/users/model/dto/create-user.dto';
import { UpdateUserDto } from '../../src/modules/users/model/dto/update-user.dto';
import { Like, Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    preload: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debería crear un usuario exitosamente', async () => {
      const dto = { nombre: 'Test', email: 'test@test.com', edad: 25 } as CreateUserDto;
      mockUserRepository.findOne.mockResolvedValue(null);
      mockUserRepository.create.mockReturnValue(dto);
      mockUserRepository.save.mockResolvedValue({ id: '1', ...dto });

      const result = await service.create(dto);
      expect(result).toHaveProperty('id', '1');
    });

    it('debería lanzar error si el email ya existe', async () => {
      const dto = { nombre: 'Test', email: 'existente@test.com' } as CreateUserDto;
      mockUserRepository.findOne.mockResolvedValue({ id: '1' });
      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('debería retornar todos los usuarios si no hay filtro', async () => {
      const users = [{ id: '1', nombre: 'Juan' }];
      mockUserRepository.find.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
      // Verificamos que NO se llamó con where
      expect(mockUserRepository.find).toHaveBeenCalledWith({ relations: ['profile'] });
    });

    it('debería filtrar por término si se provee', async () => {
      const term = 'Juan';
      const users = [{ id: '1', nombre: 'Juan' }];
      mockUserRepository.find.mockResolvedValue(users);

      await service.findAll(term);

      // Verificamos que se usó Like y OR operator (branch coverage)
      expect(mockUserRepository.find).toHaveBeenCalledWith({
        where: [
          { nombre: Like(`%${term}%`) },
          { email: Like(`%${term}%`) },
        ],
        relations: ['profile'],
      });
    });
  });

  describe('findOne', () => {
    it('debería retornar un usuario', async () => {
      const user = { id: '1' };
      mockUserRepository.findOne.mockResolvedValue(user);
      expect(await service.findOne('1')).toEqual(user);
    });

    it('debería lanzar NotFoundException', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debería actualizar exitosamente', async () => {
      const user = { id: '1', nombre: 'Updated' };
      mockUserRepository.preload.mockResolvedValue(user);
      mockUserRepository.save.mockResolvedValue(user);

      expect(await service.update('1', {} as UpdateUserDto)).toEqual(user);
    });

    it('debería lanzar NotFoundException si no existe', async () => {
      mockUserRepository.preload.mockResolvedValue(null);
      await expect(service.update('1', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('debería eliminar un usuario', async () => {
      const user = { id: '1' };
      mockUserRepository.findOne.mockResolvedValue(user); // findOne interno
      mockUserRepository.remove.mockResolvedValue(user);

      await service.remove('1');
      expect(mockUserRepository.remove).toHaveBeenCalled();
    });
  });
});