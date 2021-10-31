export default async (req, res) => {
  // console.log(req.query, req.headers.authorization)
  const stats = await fetch(`${process.env.BACKEND}/api/v1/stats?mode=${req.query.mode}&day=${req.query.day}&month=${req.query.month}&year=${req.query.year}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: `${req.headers.authorization}`,
    }
  });

  const data = await stats.json();
  // console.log(data)
  if (stats.ok) {
    res.status(200).json({
      status: 'success',
      data: data.data,
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        message: data.message,
      },
    });
  }
};
