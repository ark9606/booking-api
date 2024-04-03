import { RoomEntity } from './room.entity';

class RoomRepository {
  private rooms: RoomEntity[];

  constructor() {
    this.rooms = [];
  }

  // Create a new room
  create(room: RoomEntity): RoomEntity {
    this.rooms.push(room);
    return room;
  }

  // Retrieve all rooms
  findAll(): RoomEntity[] {
    return this.rooms;
  }

  // Retrieve a room by ID
  findById(id: string): RoomEntity | undefined {
    return this.rooms.find((room) => room.roomId === id);
  }

  // Retrieve the last room
  findLast(): RoomEntity | undefined {
    return this.rooms[this.rooms.length - 1];
  }
}

export default RoomRepository;
