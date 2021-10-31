export default async (req, res) => {
    const login = await fetch(`${process.env.BACKEND}/api/v1/users/signup`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
      }),
    });
  
    const data = await login.json();
    if (login.ok) {
      res.status(201).json({
        status: 'success',
        data: {
          data
        },
      });
    } else {
      res.status(401).json({
          status: 'failed',
          data: {
            message: data.message
          },
        });
    }
  };