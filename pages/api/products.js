export default async (req, res) => {
  let records = [];
  // console.log(req.method, req.body.id)
  if (req.method === 'POST') {
    records = await fetch(`${process.env.BACKEND}/api/v1/products`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: req.headers.authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: req.body.name,
        expires: req.body.expires,
      }),
    });
  } else if (req.method === 'PATCH') {
    records = await fetch(
      `${process.env.BACKEND}/api/v1/products/${req.body.id}`,
      {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          Authorization: req.headers.authorization,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: req.body.name,
          expires: req.body.expires,
        }),
      }
    );
  } else if (req.method === 'DELETE') {
    records = await fetch(
      `${process.env.BACKEND}/api/v1/products/${req.body.id}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
  } else if (req.method === 'GET') {
    records = await fetch(
      `${process.env.BACKEND}/api/v1/products?limit=100`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
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
