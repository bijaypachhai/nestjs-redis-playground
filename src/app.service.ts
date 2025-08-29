import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
  ){}
  getHello(): string {
    return 'Hello World!';
  }

  getInfo(): string {
    return 'This is your info.'
  }

  getError(): void {
    throw new NotFoundException('Not found error')
  }
}
