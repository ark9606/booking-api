export interface RoomDTO {
  roomId: string;
  title: string;
  location: string;
  description: string;
  area: number;
  price: number;
}

export type RoomListItemDTO = Pick<
  RoomDTO,
  'roomId' | 'title' | 'location' | 'area' | 'price'
>;
