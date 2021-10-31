const classes = require('./../styles/menu.module.css');

exports.deleteDish = (id, i, fileName, token, url) => {
  fetch(`/api/deleteDish`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      fileName,
      // url
    }),
  });
  document.getElementById(i).className = 'd-none';
};

exports.setDishForToday = (id, i, forToday, token, url) => {
  fetch(`/api/setDishForToday`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      forToday,
      // url,
    }),
  })
    .then((res) => res.json())

    if(forToday){      
      document.getElementById(i).className = `card ${classes.borderActive}`;
    } else {
      document.getElementById(i).className = 'card ';
    }
};