/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDbClient {
  task: {
    create: (data: any) => Promise<any>;
    findMany: (data: any) => Promise<any>;
    findUnique: (data: any) => Promise<any>;
    update: (data: any) => Promise<any>;
    delete: (data: any) => Promise<any>;
  };
}
