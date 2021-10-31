import { useRouter } from 'next/router';
import { useContext } from 'react';
import AuthContext from '../context/authContext';
// import ParamsContext from '../context/paramsContext';
import Link from 'next/link';
const classes = require('./../styles/topbar.module.css');

export default function TopBar(props) {
  const router = useRouter();
  const { session, quitSession } = useContext(AuthContext);

  if (session) {
    if (session.role === 'admin') {
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link href="/" passHref>
              <a className="navbar-brand">Buen Amanecer</a>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link href="/" passHref>
                    <a className="nav-link">Home</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href={`/dashboard`} passHref>
                    <a className="nav-link">DashBoard</a>
                  </Link>
                </li>
                <li className="nav-item"></li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Menu
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link href="/menu/sell" passHref>
                        <a className="dropdown-item">Vender</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/menu/catalog" passHref>
                        <a className="dropdown-item">Catalogo</a>
                      </Link>
                      </li>
                      <li>
                      <Link href="/addDish" passHref>
                        <a className="dropdown-item">Agregar menu</a>
                      </Link>
                      </li>
                      <li>
                      <Link href="/menu/carusel" passHref>
                        <a className="dropdown-item">Carusel</a>
                      </Link>
                      </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Pedidos
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link href={`/orders/Pending`} passHref>
                        <a className="dropdown-item">Pendientes</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={`/orders/isReady`} passHref>
                        <a className="dropdown-item">Listos para retirar</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={`/orders/Completed`} passHref>
                        <a className="dropdown-item">Completados</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Historial
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link href="/sellHistory/grupal" passHref>
                        <a className="dropdown-item">Listado grupal</a>
                      </Link>
                    </li>
                    <Link href="/sellHistory/individual" passHref>
                      <a className="dropdown-item">Listado individual</a>
                    </Link>
                    <Link href="/stats" passHref>
                      <a className="dropdown-item">Estadisticas</a>
                    </Link>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Gastos
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link href="/expenses" passHref>
                        <a className="dropdown-item">Reportar Compras</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/products" passHref>
                        <a className="dropdown-item">Productos</a>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <Link href="/peopleCounter" passHref>
                <a className="nav-link">Contador</a>
              </Link>
              <Link href="/" passHref>
                <a className="nav-link" onClick={quitSession}>
                  Logout
                </a>
              </Link>
            </div>
          </div>
        </nav>
      );
    } else if (session.role === 'user') {
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link href="/" passHref>
              <a className="navbar-brand">Buen Amanecer</a>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link href="/" passHref>
                    <a className="nav-link">Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/menu/carusel" passHref>
                    <a className="nav-link">Platos de hoy</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/menu/catalog" passHref>
                    <a className="nav-link">Catalogo</a>
                  </Link>
                </li>
                <li>
                  <Link href="/menu/sell" passHref>
                    <a className="nav-link">Comprar</a>
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Mis Pedidos
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link href={`/orders/Pending?token=${session.token}&role=${session.role}&id=${session._id}`} passHref>
                        <a className="dropdown-item">Pendientes</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={`/orders/isReady?token=${session.token}&role=${session.role}&id=${session._id}`} passHref>
                        <a className="dropdown-item">Listos para retirar</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={`/orders/Completed?token=${session.token}&role=${session.role}&id=${session._id}`} passHref>
                        <a className="dropdown-item">Completados</a>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <Link href="/" passHref>
                <a className="nav-link" onClick={quitSession}>
                  Logout
                </a>
              </Link>
            </div>
          </div>
        </nav>
      );
    }
  } else {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link href="/" passHref>
            <a className="navbar-brand">Buen Amanecer</a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/" passHref>
                  <a className="nav-link">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/menu/carusel" passHref>
                  <a className="nav-link">Platos de hoy</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/menu/catalog" passHref>
                  <a className="nav-link">Catalogo</a>
                </Link>
              </li>
            </ul>
            <Link href="/signing" passHref>
              <a className="nav-link">Registrase</a>
            </Link>
            <Link href="/login" passHref>
              <a className="nav-link">Login</a>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
