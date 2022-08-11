import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getRoot() {
    return {
      message: 'RSS Reader API v1.0',
      error: false,
    };
  }
}
