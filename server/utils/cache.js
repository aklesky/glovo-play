import Redis from 'ioredis';
import { Transform } from 'stream';
import { isProduction } from '../../config/env';
import { logger } from './logger';

export class RedisStorage {
  static instance = null;

  static getInstance(options = {}, log) {
    if (!RedisStorage.instance) {
      RedisStorage.instance = new RedisStorage(options, log);
    }
    return RedisStorage.instance;
  }

  constructor(options, log) {
    this.logger = log;
    this.onReady = this.onReady.bind(this);
    this.onError = this.onError.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.getStream = this.getStream.bind(this);

    this.instance = new Redis({
      host: options.host || null,
      port: options.port || 6379,
      password: options.password || null,
      showFriendlyErrorStack: !isProduction,
      maxRetriesPerRequest: 5,
      enableReadyCheck: true,
      enableOfflineQueue: false,
      retryStrategy: RedisStorage.retryStrategy,
      reconnectOnError: RedisStorage.reconnectOnError
    });

    this.instance.on('error', this.onError);
    this.instance.on('ready', this.onReady);
    this.instance.on('connection', this.onConnect);
  }

  async set(key, data) {
    try {
      await this.instance.set(key, data);
      return true;
    } catch (e) {
      this.logger.error(e.message);
      return false;
    }
  }

  async get(key) {
    try {
      const data = await this.instance.get(key);
      return data;
    } catch (e) {
      this.logger.error(e.message);
      return false;
    }
  }

  async flush() {
    try {
      await this.instance.flushall();
      return true;
    } catch (e) {
      this.logger.error(e.message);
      return false;
    }
  }

  static retryStrategy(times) {
    return Math.min(times * 10000, 2000);
  }

  static reconnectOnError(error) {
    const target = 'READONLY';
    return error.message.slice(0, target.length) === target;
  }

  onError(error) {
    this.logger.error(error.message);
  }

  onReady() {
    this.logger.info('Redis Connection is Ready.');
  }

  onConnect() {
    this.logger.info('Connected to Redis.');
  }

  getClient() {
    return this.instance;
  }

  getStream(key) {
    const buffered = [];
    const _this = this;
    return new Transform({
      transform(data, _, cb) {
        buffered.push(data);
        cb(null, data);
      },
      flush(cb) {
        _this.set(key, Buffer.concat(buffered)).catch(_this.onError);
        cb();
      }
    });
  }

  async close() {
    try {
      await this.instance.quit();
      return true;
    } catch (e) {
      this.logger.error('Unable to close redis connection.');
      return false;
    }
  }
}

export const redisClient = RedisStorage.getInstance(
  { port: process.env.REDIS_PORT || 6379 },
  logger
);
