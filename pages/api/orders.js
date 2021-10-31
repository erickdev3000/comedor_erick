export default async (req, res) => {
  let records = [];
  // console.log(req.query)
  if (req.query.role === 'admin') {
    if (req.method === 'GET') {
      records = await fetch(`${process.env.ORDERS_BACKEND}/api/v1/bills/orders?limit=${req.query.limit}&page=${req.query.page}&status=${req.query.status}&ifValue=${req.query.ifValue}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: req.headers.authorization,
          // 'Content-Type': 'application/json',
        },
        // body: JSON.stringify({
        //   status: req.query.status,
        //   ifValue: req.query.ifValue,
        // }),
      });
    } else if (req.method === 'PATCH') {
      records = await fetch(
        `${process.env.ORDERS_BACKEND}/api/v1/bills/${req.body.id}`,
        {
          method: 'PATCH',
          mode: 'cors',
          headers: {
            Authorization: req.headers.authorization,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: req.body.status,
          }),
        }
      );
    } else if (req.method === 'DELETE') {
      records = await fetch(
        `${process.env.ORDERS_BACKEND}/api/v1/bills/${req.body.id}`,
        {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            Authorization: req.headers.authorization,
          },
        }
      );
    }
  } else if (req.query.role === 'user') {
    // console.log(req.body)
    records = await fetch(`${process.env.ORDERS_BACKEND}/api/v1/bills/ownedOrders?limit=${req.query.limit}&page=${req.query.page}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: req.headers.authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: req.body.id,
        status: null,
        ifValue: null,
      }),
    });
  } else {
    console.log('ERROR');
    return;
  }

  const data = await records.json();

  // console.log(data);
  if (records.ok) {
    res.status(201).json({
      status: 'success',
      data,
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
