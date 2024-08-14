export enum ErrorPageRoutePathEnum {
  notFound = '/errors/404',
  forbidden = '/errors/403',
}

export enum ErrorPageDescriptionEnum {
  notFound = 'notFound',
  forbidden = 'forbidden'
}

export type ErrorMockType = {
  [statusError in ErrorPageDescriptionEnum]: {
    code?: string;
    title: string;
  };
};
