import { useState, useEffect, useContext } from 'react';
import AuthContext from './../../context/authContext';
// import ParamsContext from './../../context/paramsContext';
import { useRouter } from 'next/router';
import PaginationControls from './../../components/NavigationItems/PaginationControls';
import Table from './../../components/Table';
const classes = require('./../../styles/sellHistory.module.css');

export default function sellHistory() {
  const router = useRouter();
  const { typeHistory } = router.query;

  const { session } = useContext(AuthContext);
  // const {params} = useContext(ParamsContext);
  const [items, setItems] = useState([]);
  const [totalRecords, setTotalRecords] = useState();
  const [sort, setSort] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    //window.location.href.split('/').pop() retrieves the params from the URL, as in useEffect the Router.query is empty at build time
    if (session === undefined) router.push('/');
    fetch(`/api/getTables`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${session.token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        limit: 10,
        sort,
        type: window.location.href.split('/').pop(),
        // url: params.local_backend_nodejs
      }),
    })
      .then((res) => res.json())
      // .then((res) => console.log(res))
      .then((res) => {
        setItems(res.data.records),
          setTotalRecords(res.data.totalRecords);
      })
      .then(() => setLoaded(true));
  }, [typeHistory]);

  const parentItemsUpdate = (res) => {
    setItems(res.data.records);
  };

  const itemList = (type) => {
    if (type === 'grupal') {
      return (
        <Table
          headers={['ID', 'Total de Platos', 'Total', 'Estado', 'Cliente', 'Dia', 'Fecha']}
          items={items}
          body={['_id', 'totalDishes', 'totalPrice', 'estado', 'customer', 'day','createdAt']}
        />
      );
    } else if (type === 'individual') {
      return (
        <Table
          headers={['ID', 'Plato', 'Dia', 'Fecha', 'Precio']}
          items={items}
          body={['_id', 'name', 'day','createdAt', 'price']}
        />
      );
    } else if (type === 'stats') {
      return (
        <>
        
        </>
      );
    }
  };

  if (!loaded) {
    return <></>;
  } else {
    return (
      <div>
        <h1 className={classes.centerItem}>
          Historial de ventas {typeHistory}
        </h1>
        <br />
        <div className={classes.paginationNav}>
          <PaginationControls
            token={session.token}
            totalRecords={totalRecords}
            limit={10}
            sort={sort}
            toUpdateParent={parentItemsUpdate}
            type={typeHistory}
            url={'/api/getTables'}
            method={'POST'}
          />
        </div>
        {itemList(typeHistory)}
      </div>
    );
  }
}
