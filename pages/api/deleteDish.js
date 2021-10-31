import path from 'path';
import fs from 'fs';

export default async (req, res) => {
  var filePath =
    path.join(`${__dirname}/../../../../`, 'public') +
    '/dishes/' +
    req.body.fileName;

    // console.log(filePath)
  const deleteDish = await fetch(
    `${process.env.BACKEND}/api/v1/menu/${req.body.id}`,
    {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${req.headers.authorization}`,
      },
    }
  );

  const data = await deleteDish;
  if (deleteDish.ok) {
    if (fs.existsSync(path)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          throw err;
        }
      });
    } else {
      // console.log("File does not exist.")
    }
    res.status(200).json({
      status: 'success',
      data: {
        message: data
      },
    });
  } else {
    res.status(401).json({
        status: 'failed',
        data: {
          message: data.message[0].message
        },
      });
  }
};
