export default async (req, res) => {
  // console.log(req.body)
  const processSell = await fetch(`${process.env.BACKEND}/api/v1/bills`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: req.headers.authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      totalPrice: req.body.totalPrice,
      totalDishes: req.body.totalDishes,
      customer: req.body.customer,
      day: req.body.day,
      isFiado: req.body.isFiado,
      status: req.body.status
    }),
  });

  if (req.body.isFiado && req.body.role === 'user') {
    let newBalance = -(req.body.currentBalance * 1 + req.body.totalPrice * 1)
    const updateBalance = await fetch(`${process.env.BACKEND}/api/v1/users/updateuser/${req.body.id}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        Authorization: req.headers.authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        balance: newBalance
      }),
    });
    const balance = await updateBalance.json()
  }

  const data = await processSell.json();

  // console.log(data, balance)

  if (processSell.ok) {
    res.status(201).json({
      status: 'success',
      data
    });
  } else {
    res.status(401).json({
      status: 'failed',
      data: {
        message: data.message,
      },
    });
  }
};
