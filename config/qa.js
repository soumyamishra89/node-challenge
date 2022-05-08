module.exports = {
  db: {
    host: '0.0.0.0',
    port: 5432,
    database: 'test',
  },
  rateLimiting: {
    windowMs: 10 * 60 * 1000, // 10mins
    max: 10, // 100 requests per 100 mins
    standardHeaders: true,
    legacyHeaders: false,
  },
};
