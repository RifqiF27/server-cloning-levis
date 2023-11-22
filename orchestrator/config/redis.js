const Redis = require('ioredis')

// const redis = new Redis({
//     port: 14886, // Redis port
//     host: 'redis-14886.c252.ap-southeast-1-1.ec2.cloud.redislabs.com', // Redis host
//     password: "qysVQevd1xsO3z9WeqqeW4mEprKie7gS",
//   });
const redis = new Redis("redis://default:qysVQevd1xsO3z9WeqqeW4mEprKie7gS@redis-14886.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:14886");

module.exports = redis