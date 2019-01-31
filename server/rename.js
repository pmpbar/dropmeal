const fs = require('fs');

fs.readdirSync('./meta').forEach(fname => {
  console.log('./meta/'+fname);
  fs.readFile('./meta/'+fname, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const j = JSON.parse(data);

    fs.rename('./data/'+fname.split('.')[0], './data/'+j.originalname,
      () => console.log('./data/'+fname.split('.')[0], ' -> ', j.originalname));
  })
})
