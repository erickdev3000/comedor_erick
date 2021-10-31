import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import AuthContext from '../context/authContext';
// import ParamsContext from '../context/paramsContext';
import Image from 'next/image';
const classes = require('./../styles/menu.module.css');
import CarousselSSR from '../components/Caroussel';
import MenuAdmin from '../components/MenuAdmin';

export default function Menu({ items }) {
  const [count, setCount] = useState(0);
  // const {setParams} = useContext(ParamsContext);

  // useEffect(()=>{
  //   setParams(params)
  // }, [])

  // Server side render component
  const SSRElements = (
    <>
      <MenuAdmin
        title={'Disfruta de nuestros platillos preparados para hoy'}
        componentName={'Carusel'}
        visible={false}
        Component={<CarousselSSR items={items} />}
      />
    </>
  );

  return (
    <div>
      <div className={'text-center '}>
        <h1>Bienvenido a Comedor Buen Amancer</h1>
        <h2>Actualmente hay {count} clientes en el local</h2>
        <br />
        <Image src={`/logo.jpg`} alt="logo" width="250" height="250" />
        <br />
        {SSRElements}
        <Link href="/menu/sell" passHref>
          <a className="btn btn-success">Comprar</a>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `${process.env.BACKEND}/api/v1/menu?limit=100`,
    {
      method: 'GET',
      mode: 'cors',
    }
  );
  const data = await res.json();
  const items = data.records;

  // const paramRes = await fetch(
  //   `${process.env.BACKEND}/api/v1/params`,
  //   {
  //     method: 'GET',
  //     mode: 'cors',
  //   }
  // );
  // const data2 = await paramRes.json();
  // const params = data2.records[0]

  // console.log(data)

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { items }, // will be passed to the page component as props
  };
}
