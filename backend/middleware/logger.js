// Custom middleware: logs every successful POST request
const postLogger = (req, res, next) => {
  if (req.method === 'POST') {
    const originalJson = res.json.bind(res);
    res.json = function (data) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const userId = req.session && req.session.userId ? req.session.userId : 'unauthenticated';
        console.log(`[POST LOG] Timestamp: ${new Date().toISOString()} | Route: ${req.originalUrl} | User ID: ${userId}`);
      }
      return originalJson(data);
    };
  }
  next();
};

module.exports = postLogger;
