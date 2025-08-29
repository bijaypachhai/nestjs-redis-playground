export interface IListRedisService {
    addToList(key: string, value: string): Promise<void>;
    removeFromList(key: string): Promise<void>;
    getByIndex(key: string, index: number): Promise<string>;
    keyExists(key: string): Promise<boolean>;
}

export interface IGetKeyData {
    module: string;
    identifier: string | number;
}