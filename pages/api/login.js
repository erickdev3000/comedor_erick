export default async (req, res) => {
  const login = await fetch(
    `${process.env.BACKEND}/api/v1/users/login`,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: req.body.email,
        password: req.body.password,
      }),
    }
  );

  const data = await login.json();
  // console.log(data)

  if (login.ok) {
    data.user.token = data.token;
    res.status(201).json({
      status: 'success',
      data: {
        user: data.user,
      },
    });
  } else {
    res.status(401).json({
      status: 'failed',
      data,
    });
  }
};
