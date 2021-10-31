const fs = require('fs');
import path from 'path';
var newpath =
  path.join(`${__dirname}/../../../../`, 'json-files') + '/counter.json';

export default (req, res) => {
  //   console.log(req.body);
  let data = JSON.parse(fs.readFileSync(newpath));
  if (req.method === 'GET') {
    res.status(200).json({
      status: 'success',
      data: data.count,
    });
  } else if (req.method === 'POST') {
    data = req.body;
    // console.log(data)
    fs.writeFileSync(newpath, data);
    res.status(201).json({
      status: 'success',
    });
  } else {
    console.log('ERROR');
  }
};
