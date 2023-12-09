import { CacheKeys } from 'config';

export type JSONObject = Record<string, unknown>;

export type ICacheKey = keyof typeof CacheKeys;
