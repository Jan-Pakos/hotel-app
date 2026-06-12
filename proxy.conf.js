module.exports = [
  {
    context: ['/reservations'],
    target: 'http://localhost:8080',
    secure: false,
    changeOrigin: true,
    bypass: function (req) {
      // Let Angular handle HTML navigations; only proxy XHR/fetch API calls
      if (req.headers.accept && req.headers.accept.includes('text/html')) {
        return '/index.html';
      }
    }
  }
];
