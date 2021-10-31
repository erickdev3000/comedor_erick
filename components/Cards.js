import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useContext } from 'react';
const classes = require('./../styles/menu.module.css');
const cardsController = require('../controllers/cardsController.js');
import SearchBar from './NavigationItems/SearchBar';
import PaginationControls from './NavigationItems/PaginationControls';

import {
  BsFillTrashFill,
  BsChevronCompactUp,
  BsChevronCompactDown,
  BsGearFill,
} from 'react-icons/bs';

export default function Cards(props) {
  let [filterObject = props.items.length > 0 ? [...props.items] : [], setFilterObject] = useState();
  const [visible, setVisible] = useState('d-none');

  useEffect(() => {
    if (props.session) {
      setVisible('');
    }
  }, []);

  // const notify = (text) => toast(text);
  const cardButtons = (el, id, i, fileName) => (
    <div key={i} className={visible}>
      {/* Button to Delete Card */}
      <button
        type="button"
        className={'btn btn-danger'}
        onClick={(e) =>
          cardsController.deleteDish(
            id,
            i,
            fileName,
            props.session.token,
            toast('Platillo eliminado del menu'),
          )
        }
      >
        <BsFillTrashFill />
      </button>
      {/* Button to set Dish for today */}
      <button
        type="button"
        className={'btn btn-success'}
        onClick={(e) =>
          cardsController.setDishForToday(
            id,
            i,
            true,
            props.session.token,
            toast.success('Platillo selecionado para hoy!'),
          )
        }
      >
        <BsChevronCompactUp />
      </button>
      {/* Button to remove Dish for today */}
      <button
        type="button"
        className={'btn btn-primary'}
        onClick={(e) =>
          cardsController.setDishForToday(
            id,
            i,
            false,
            props.session.token,
            toast.success('Platillo removido para hoy')
          )
        }
      >
        <BsChevronCompactDown />
      </button>
      <Link
        href={{ pathname: '/addDish', query: { data: JSON.stringify(el) } }}
        passHref
      >
        <button type="button" className={'btn btn-warning'}>
          <BsGearFill />
        </button>
      </Link>
    </div>
  );

  const setNewFilteredObject = (obj) => {
    setFilterObject(obj)
  };

  const setNewItems = (res) => {
    setFilterObject(res.data.records);
  };

    return (
      <>
        <SearchBar updateFilter={setNewFilteredObject} items={props.items} />
        <div className={classes.paginationControls}>
          <PaginationControls
            totalRecords={props.totalRecords}
            limit={100}
            toUpdateParent={setNewItems}
            url={`${process.env.BACKEND}/api/v1/menu`}
            method={'GET'}
          />
        </div>
        <div className={classes.centerCard}>
          {filterObject.map((el, i) => {
            // console.log(el)
            let colorBorder = '';
            el.forToday
              ? (colorBorder = classes.borderActive)
              : (colorBorder = '');
            return (
              <div
                key={i}
                id={i}
                className={`card ${colorBorder}`}
                style={{
                  width: '18rem',
                  display: 'inline-block',
                  marginRight: '2vw',
                }}
              >
                {cardButtons(el, el.id, i, el.image)}
                <div className={classes.hoverCard}>
                  <Image
                    src={
                      el.image !== undefined
                        ? `/dishes/${el.image}`
                        : `/dishes/stockDishImg.png`
                    }
                    className="card-img-top"
                    alt="me"
                    width="1000"
                    height="1000"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{el.name}</h5>
                    <p className="card-text">{el.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div>
            <ToastContainer />
          </div>
        </div>
      </>
    );
}
