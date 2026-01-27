import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../src/modules/users/users.controller';
import { UsersService } from '../../src/modules/users/users.service';
import { CreateUserDto } from '../../src/modules/users/model/dto/create-user.dto';
import { UpdateUserDto } from '../../src/modules/users/model/dto/update-user.dto';

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;

    const mockUsersService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: mockUsersService,
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('debería llamar al servicio create', async () => {
            const dto = { nombre: 'Test' } as CreateUserDto;
            mockUsersService.create.mockResolvedValue({ id: '1', ...dto });

            await controller.create(dto);
            expect(service.create).toHaveBeenCalledWith(dto);
        });
    });

    describe('findAll', () => {
        it('debería llamar al servicio findAll con query params', async () => {
            const term = 'busqueda';
            mockUsersService.findAll.mockResolvedValue([]);

            await controller.findAll(term);
            expect(service.findAll).toHaveBeenCalledWith(term);
        });
    });

    describe('findOne', () => {
        it('debería llamar al servicio findOne', async () => {
            const id = 'uuid-test';
            mockUsersService.findOne.mockResolvedValue({ id });

            await controller.findOne(id);
            expect(service.findOne).toHaveBeenCalledWith(id);
        });
    });

    describe('update', () => {
        it('debería llamar al servicio update', async () => {
            const id = 'uuid-test';
            const dto = { nombre: 'New' } as UpdateUserDto;

            await controller.update(id, dto);
            expect(service.update).toHaveBeenCalledWith(id, dto);
        });
    });

    describe('remove', () => {
        it('debería llamar al servicio remove', async () => {
            const id = 'uuid-test';
            await controller.remove(id);
            expect(service.remove).toHaveBeenCalledWith(id);
        });
    });
});