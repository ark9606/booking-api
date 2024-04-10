export const ORDER_BY = ['ASC', 'DESC'] as const;
export type OrderBy = (typeof ORDER_BY)[number];
