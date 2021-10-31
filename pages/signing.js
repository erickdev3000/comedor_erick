import { useState, memo } from 'react';
import { useContext } from 'react';
import Link from 'next/link';
import AuthContext from '../context/authContext';
// import ParamsContext from '../context/paramsContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const classes = require('./../styles/login.module.css');

export default memo(function SignIn() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [hasAgreed, setHasAgreed] = useState(false)
  const { setSession } = useContext(AuthContext);
  // const {params} = useContext(ParamsContext);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/signing', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        email,
        password,
        passwordConfirm,
        // url: params.local_backend_nodejs
      }),
    })
      .then((res) => res.json())
      // .then((res) => console.log(res))
      .then(
        (res) => cookieSettup(res),
        (error) => {
          setError(error);
        }
      );
  };

  const cookieSettup = (res) => {
    if (res.data.data !== undefined) {
      setSession(res.data.data.data);
      if (router.query.page) {
        router.push(`${router.query.page}`);
      } else {
        router.push('/');
      }
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <div>
      <div className={'container ' + classes.formBody}>
        <form className={''} onSubmit={handleSubmit}>
          <h3>Ingresar</h3>

          <div className="form-group">
            <label htmlFor="usuario">Nombre de usuario</label>
            <input
              type="text"
              id="usuario"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="form-control"
              placeholder="Usuario"
              require='true'
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electronico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Ingrese correo electronico"
              require='true'
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Clave</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Ingrese contraseña"
              require='true'
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Confirmar clave</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="form-control"
              placeholder="Confirme su contraseña"
              require='true'
            />
          </div>
          <br />
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
                onChange={(e)=>setHasAgreed(!hasAgreed)}
                require='true'
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                <Link href="/agreement" passHref>
                  <a>Acepto los terminos y condiciones</a>
                </Link>
              </label>
            </div>
          </div>
          <br />
          {
              hasAgreed ? <button type="submit" className="btn btn-primary btn-block">
              Registrar
            </button> : <button type="submit" className="btn btn-primary btn-block" disabled>
            Registrar
          </button>
          }
        </form>
      </div>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
})
