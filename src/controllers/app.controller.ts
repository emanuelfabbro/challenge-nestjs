import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHome() {
    return {
      title: 'NestJS MVC Application',
      message: this.appService.getWelcomeMessage(),
    };
  }

  @Get('about')
  @Render('about')
  getAbout() {
    return {
      title: 'About',
      description: 'This is a MVC NestJS application boilerplate.',
    };
  }
}
