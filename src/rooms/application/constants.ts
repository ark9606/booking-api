export const LIST_ROOMS_ORDER_BY = ['price', 'area'] as const;
export type ListRoomsOrderBy = (typeof LIST_ROOMS_ORDER_BY)[number];
