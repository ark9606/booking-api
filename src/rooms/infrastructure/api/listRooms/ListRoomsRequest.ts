export class ListRoomsRequestQuery {
  skip?: number;
  take?: number;
  orderBy?: 'price' | 'area';
  orderDirection: 'ASC' | 'DESC';
}
