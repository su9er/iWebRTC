import { RoomsService } from './rooms.service';
import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('房间管理')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) { }

  @ApiOperation({
    summary: '获取房间列表',
  })
  @Get()
  getRooms() {
    return this.roomsService.getRooms();
  }

  @Get('/exception')
  getRoomsException() {
    throw new HttpException('测试错误', HttpStatus.FORBIDDEN);
  }
}
