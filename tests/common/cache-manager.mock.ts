export class CacheManagerMock {
  public async del(key: string): Promise<void> {
    return;
  }
  public async get(key: string): Promise<any> {
    return;
  }
  public async set(key: string, value: any, options?: { ttl: number }): Promise<void> {
    return;
  }
  public store: any = {
    keys(pattern: string): Promise<string[]> {
      return Promise.resolve([]);
    },
  };
}
