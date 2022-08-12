import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Schema as MongooseSchema } from 'mongoose';
import { Room } from '@entities/room.entity';
import { GetRoomDto } from './dto/get-room.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomService } from './room.service';

@ApiTags('房间管理')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @ApiOperation({ summary: '获取所有房间列表' })
  @Get()
  getAllRooms(): Promise<Room[]> {
    return this.roomService.getAllRooms();
  }

  @ApiOperation({
    summary: '获取分页房间列表',
  })
  @Get('page')
  getPageRooms(
    @Query() getRoomDto: GetRoomDto,
  ): Promise<{ list: Room[]; page: number; limit: number; total: number }> {
    return this.roomService.getPageRooms(getRoomDto);
  }

  @ApiOperation({
    summary: '获取房间信息',
  })
  @Get(':id')
  getRoomById(@Param('id') id: MongooseSchema.Types.ObjectId): Promise<Room> {
    return this.roomService.getRoomById(id);
  }

  @ApiOperation({
    summary: '创建房间',
  })
  @Post()
  createRoom(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomService.createRoom(createRoomDto);
  }

  @ApiOperation({
    summary: '更新房间信息',
  })
  @Patch(':id')
  updateRoom(
    @Param('id') id: MongooseSchema.Types.ObjectId,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<Room> {
    return this.roomService.updateRoom(id, updateRoomDto);
  }

  @ApiOperation({
    summary: '删除房间',
  })
  @Delete(':id')
  deleteRoom(@Param('id') id: MongooseSchema.Types.ObjectId): Promise<Room> {
    return this.roomService.deleteRoom(id);
  }
}
