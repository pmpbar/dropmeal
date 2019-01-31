const fs = require('fs');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const syslog = require('./log');

const PORT = 3002;

const upload = multer({ dest: 'uploads/' });
const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json({ status: 'OK', data: 'Nothing here' });
});
app.post('/upload', upload.single('file'), (req, res) => {
  // const stream = fs.createWriteStream(`./uploads/${req.file.filename}.json`); // safer
  const stream = fs.createWriteStream(`./uploads/${req.file.originalname}`);
  stream.once('open', () => {
    stream.write(JSON.stringify(req.file));
    stream.end();
    res.json({ status: 'OK', msg: 'Success' });
  });
});

app.listen(PORT, () => syslog.info(`Server listening on ${PORT}`));
