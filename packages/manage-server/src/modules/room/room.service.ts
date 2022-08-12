import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Room } from '@entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { GetRoomDto } from './dto/get-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
  ) { }

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    let room = await this.getRoomByCode(createRoomDto.code);

    if (room) {
      throw new ConflictException(`房间"${createRoomDto.code}"已经存在`);
    }

    const createdRoom = new this.roomModel(createRoomDto);
    try {
      room = await createdRoom.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!room) {
      throw new ConflictException('房间创建失败');
    }

    return room;
  }

  async updateRoom(
    id: MongooseSchema.Types.ObjectId,
    updateRoomDto: UpdateRoomDto,
  ): Promise<Room> {
    const actualDate = new Date();
    actualDate.toISOString();

    const updateData = {
      ...updateRoomDto,
      updateAt: actualDate,
    };

    let room;

    try {
      room = await this.roomModel
        .findOneAndUpdate({ _id: id }, updateData, { new: true })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!room) {
      throw new NotFoundException('房间不存在');
    }

    return room;
  }

  async deleteRoom(id: MongooseSchema.Types.ObjectId): Promise<Room> {
    let room;
    try {
      room = await this.roomModel.findOneAndDelete({ _id: id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!room) {
      throw new NotFoundException('房间不存在');
    }

    return room;
  }

  async getAllRooms(): Promise<Room[]> {
    let rooms;
    try {
      rooms = await this.roomModel
        .find({}, 'name code signalGatewayId')
        .sort({ createdAt: -1 })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return rooms;
  }

  async getPageRooms(
    query: GetRoomDto,
  ): Promise<{ list: Room[]; page: number; limit: number; total: number }> {
    const { page, limit, name, code } = query;
    const limitNum = limit ? limit : 20;
    const skip = page ? (page - 1) * limitNum : 0;

    let rooms: Room[];
    let count: number;
    let where = {};

    if (name) {
      where = { ...where, name: { $regex: name } };
    }

    if (code) {
      where = { ...where, code };
    }

    try {
      rooms = await this.roomModel
        .find(where, 'name code signalGatewayId')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .exec();

      count = await this.roomModel.countDocuments(where).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return {
      list: rooms,
      page: page || 1,
      limit: limitNum,
      total: count,
    };
  }

  async getRoomById(id: MongooseSchema.Types.ObjectId): Promise<Room> {
    let room;
    try {
      room = await this.roomModel.findById(
        { _id: id },
        'name code signalGatewayId',
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!room) {
      throw new NotFoundException('房间不存在');
    }

    return room;
  }

  async getRoomByCode(code: string): Promise<Room> {
    let room;
    try {
      room = await this.roomModel
        .findOne({ code }, 'name code signalGatewayId')
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return room;
  }
}
