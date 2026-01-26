import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from '../services/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return home page data', () => {
      const result = appController.getHome();
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('message');
      expect(result.title).toBe('NestJS MVC Application');
    });
  });

  describe('about', () => {
    it('should return about page data', () => {
      const result = appController.getAbout();
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('description');
      expect(result.title).toBe('About');
    });
  });
});
