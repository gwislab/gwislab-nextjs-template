// import { createClient } from 'redis';
// import { RedisPubSub } from 'graphql-redis-subscriptions';

// export default {
//   client: createClient(),
//   pubsub: new RedisPubSub({
//     connection: {
//       host: '127.0.0.1',
//       port: 6379,
//       retryStrategy: (attempt: number) => Math.max(attempt * 100, 3000),
//     },
//   }),
// };
