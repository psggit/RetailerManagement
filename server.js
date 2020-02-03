const express = require('express');
const path = require('path')
const app = express();
const helmet = require("helmet")
// const ASSET_PATH = process.env.ASSET_PATH || '/'

app.use(helmet({
  frameguard: {
    action: "deny"
  }
}))

app.get('*.js', function (req, res, next) {
  const vendorUrlRegex = /vendor.*.js/
  if (/app.*.js/.test(req.url) || /vendor.*.js/.test(req.url)) {
    req.url += ".gz"
    res.set("Content-Encoding", "gzip")
    res.set("Content-type", "text/javascript")
  }
  if (vendorUrlRegex.test(req.url)) {
    res.setHeader('Cache-Control', 'private, max-age=31536000')
  }
  next();
});

app.use('/admin', express.static(path.join(__dirname, 'dist')))

app.get('/*', (req, res) => {
  if (!/.*.js/.test(req.url)) {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  }
  res.sendFile(path.join(__dirname, 'dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
});

// Serve the files on port 3000.
app.listen(8080, function () {
  console.log('Example app listening on the port 8080!\n');
});