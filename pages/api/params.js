export default async (req, res) => {
    const result = await fetch(
      `${process.env.backend_nodejs}/api/v1/params`,
      {
        method: 'GET',
        mode: 'cors',
      }
    );
  
    const data = await result.json();
    // console.log(data)
    if (result.ok) {
      res.status(200).json({
        status: 'success',
        data
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
  