export default async (req, res) => {
  let stats;
  // console.log(req.query)
  if (req.query.mode === 'month') {
    stats = await fetch(`${process.env.BACKEND}/api/v1/stats/months?month=${req.query.month}&year=${req.query.year}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `${req.headers.authorization}`,
      }
    });
  } else if (req.query.mode === 'year') {
    stats = await fetch(`${process.env.BACKEND}/api/v1/stats/years?month=${req.query.month}&year=${req.query.year}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `${req.headers.authorization}`,
      }
    });
  } else if (req.query.mode === 'week') {
    stats = await fetch(`${process.env.BACKEND}/api/v1/stats/week?month=${req.query.month}&year=${req.query.year}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `${req.headers.authorization}`,
      },
      query: JSON.stringify({
        month: req.query.month,
        year: req.query.year,
      }),
    });
  } else if (req.query.mode === 'day') {
    stats = await fetch(`${process.env.BACKEND}/api/v1/stats/day?day=${req.query.day}&month=${req.query.month}&year=${req.query.year}&day2=${req.query.day2}&month2=${req.query.month2}&year2=${req.query.year2}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `${req.headers.authorization}`,
      }
    });
  }

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
