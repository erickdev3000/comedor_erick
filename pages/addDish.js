import { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './../context/authContext';
// import ParamsContext from '../context/paramsContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import ImageFile from './../components/previewUpload'

const classes = require('./../styles/addDish.module.css');

export default function addDish({ item }) {
  const router = useRouter();
  const { session } = useContext(AuthContext);
  // const {params} = useContext(ParamsContext);
  const [isForTodayState = true, setIsForTodayState] = useState(item.isFortoday);
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [image, setImage] = useState(`/dishes/${item.image}`);
  const [uploadImage, setUploadImage] = useState();

  const isForTodayHanlder = () => {
    setIsForTodayState(!isForTodayState);
  };

  const addItemHandler = (e) => {
    e.preventDefault();
    if (price <= 0) { toast.error('El precio no puede ser 0 o menor') }
    else {
      //Using form data to be able to sent the image to node.js backend
      var formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      if (image !== undefined && image.filename !== '') {
        formData.append('image', uploadImage);
      }
      formData.append('forToday', isForTodayState);

      // console.log(formData);
      fetch(`/api/addDish`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Authorization: `${session.token}`,
          // 'url': params.local_backend_nodejs
        },
        body: formData,
      })
        .then((res) => res.json())
        // .then((res) => console.log(res));
        .then((res) => router.push('/menu/catalog'));
    }
  };

  const clearState = () => {
    setName('');
    setDescription('');
    setPrice(0);
    setImage('');
  };

  const imageHandler = (e) => {
    let reader = new FileReader();
    setUploadImage(e.target.files[0]);
    reader.onload = function (ev) {
      setImage(ev.target.result);
    }.bind(this);
    reader.readAsDataURL(e.target.files[0])
    // setImage(pickedImg.name)
  }

  return (
    <div>
      <div className={'container ' + classes.formBody}>
        <div className="row">
          <div className="col">
            <form onSubmit={addItemHandler}>
              <div className="input-group">
                <span
                  className={`input-group-text ${classes.labelsText}`}
                >
                  Nombre
                </span>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  require
                />
              </div>
              <br />
              <div className="input-group">
                <span
                  className={`input-group-text ${classes.labelsText}`}
                >
                  Descripcion
                </span>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
              <br />
              <div className="input-group">
                <span
                  className={`input-group-text ${classes.labelsText}`}
                >
                  Precio
                </span>
                <input
                  type="number"
                  className="form-control"
                  step="0.01"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>
              <br />
              {/* Foto upload */}
              <span className={`input-group-text ${classes.labelsText}`}>Foto</span>
              <input
                type="file"
                className="form-control"
                onChange={imageHandler}
              />
              <br />
              <div className="input-group">
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio1"
                  onClick={(e) => isForTodayHanlder()}
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio1">
                  ¿Es para hoy?
                </label>
                <label className="btn btn-outline-primary">
                  {isForTodayState ? 'Si' : 'No'}
                </label>
              </div>
              <br />
              <div className="input-group">
                <input
                  type="submit"
                  className="btn btn-outline-primary form-control"
                />
                <Link href="/menu/catalog" passHref>
                  <button
                    type="button"
                    className="btn btn-outline-primary form-control"
                  >
                    Cancelar
                  </button>
                </Link>
              </div>
            </form>
          </div>

        </div>
        <div className={`${classes.imageViewer}`}>
          <ImageFile imageURI={image} />
        </div>
        <div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  if (!context.query) {
    return {
      notFound: true,
    };
  }
  let item = [{}];
  if (context.query.data !== undefined) {
    item = JSON.parse(context.query.data);
  } else {
    item = {
      name: '',
      description: '',
      price: 0,
      image: 'stockDishImg.png',
      forToday: true
    };
  }

  return {
    props: { item }, // will be passed to the page component as props
  };
}
