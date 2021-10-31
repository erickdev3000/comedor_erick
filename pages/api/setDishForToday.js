export default async (req, res) => {
  // console.log(process.env.BACKEND);

  const updateDish = await fetch(
    `${process.env.BACKEND}/api/v1/menu/${req.body.id}`,
    {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${req.headers.authorization}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        forToday: req.body.forToday,
      }),
    }
  );

  const data = await updateDish.json();

  // console.log(data)

  if (updateDish.ok) {
    res.status(200).json({
      status: 'success',
      data
    });
  } else {
    res.status(401).json({
      status: 'failed',
      data: {
        message: data.message[0].message,
      },
    });
  }
};
