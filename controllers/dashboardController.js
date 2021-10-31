exports.getStats = async(token, day) => {
  const stats = await fetch(`/api/getStats`, {
    method: 'POST',
    mode: 'cors',
    headers: {'content-type': 'application/json' },
    body: JSON.stringify({
        day,
        token
    })
  });

  const data = await stats.json();
//   console.log(data)
   data;
};
