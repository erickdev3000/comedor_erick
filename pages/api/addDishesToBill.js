export default async (req, res) => {
    const addDishesToBill = await fetch(`${process.env.BACKEND}/api/v1/bills/detailedBilling`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: req.headers.authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bill: req.body.bill,
        dish: req.body.dish,
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount,
        day: req.body.day,
      }),
    });
  
    const result = await addDishesToBill.json();
  
    if (addDishesToBill.ok) {
      res.status(201).json({
        status: 'success',
        data: {
          result,
        },
      });
    } else {
      res.status(401).json({
        status: 'failed',
        data: {
          message: result.message,
        },
      });
    }
  };
  