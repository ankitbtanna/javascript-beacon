import { Controller, Post, Req } from '@nestjs/common';

@Controller()
export class AppController {

  @Post('analytics')
  logAnalytics(@Req() req): void {
    console.log('############# BEACON SIGNAL ##############');
    console.log(req.body);
    console.log('##########################################');
  }
}
