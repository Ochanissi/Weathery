const express = require('express');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');

// App initialization
const app = express();
const port = process.env.PORT || 5001;

if (process.env.NODE_ENV === 'production') {
  app.use(compression());
  app.use(enforce.HTTPS({ trustProtoHeader: true }));

  // Serving static files
  app.use(express.static(path.join(__dirname, 'dist')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});
