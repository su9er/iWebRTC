import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class RpcController {
  constructor() { }

  @MessagePattern({ cmd: 'keepAlive' })
  async keepAlive(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(`Pattern: ${context.getPattern()}`);
    console.log(`Message: ${context.getMessage()}`);
    console.log(`Channel: ${context.getChannelRef()}`);
  }
}
