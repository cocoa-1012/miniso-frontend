import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Container } from '@mui/material';
//MATERIAL-UI FIRSTNAVIGATIONBAR
import Badge from '@mui/material/Badge';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  //Routes,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
//import AuthVerify from "./common/AuthVerify";
import EventBus from './common/EventBus';
//import FirstNavigation from "./components/layout/Header/FirstNavigation";
import Footer from './components/layout/Footer/Footer';
import MainNavigation from './components/layout/Header/MainNavigation';
import Profile from './components/layout/Profile/Profile';
import classes from './FirstNavigation.module.css';
import Cart from './pages/Cart/Cart';
import AccesoriosMaquillaje from './pages/Categories/AccesoriosMaquillaje';
import AlimentosyBebidas from './pages/Categories/AlimentosyBebidas';
import BolsasyAccesorios from './pages/Categories/BolsasyAccesorios';
import Cosmeticos from './pages/Categories/Cosmeticos';
import CuidadoPersonal from './pages/Categories/CuidadoPersonal';
import Electronicos from './pages/Categories/Electronicos';
import EstilodeVida from './pages/Categories/EstilodeVida';
import Juguetes from './pages/Categories/Juguetes';
import LibreriayPapeleria from './pages/Categories/LibreriayPapeleria';
import PerfumesyAromatizantes from './pages/Categories/PerfumesyAromatizantes';
import RegalosGratis from './pages/Categories/RegalosGratis';
import Textil from './pages/Categories/Textil';
import Collections from './pages/Collections';
import ContactUs from './pages/ContactUs';
//import BoardModerator from "./components/board-moderator.component";
//import BoardAdmin from "./components/board-admin.component";
import HomePage from './pages/HomePage';
import Login from './pages/Login/Login';
//import { render } from "@testing-library/react";
import Payment from './pages/Payment/Payment';
import Product from './pages/Product/Product';
import ProductList from './pages/ProductList/ProductList';
import Register from './pages/Register/Register';
import Sale from './pages/Sale';
import ShopNow from './pages/ShopNow';
import Stores from './pages/Stores';
import TheNew from './pages/TheNew';
// AUTHENTICATION
import AuthService from './services/auth.service';

const App = () => {
  // const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  // const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const quantity = useSelector((state) => state.cart.quantity);

  useEffect(() => {
    const user = AuthService.getCurrentUsername();

    if (user) {
      setCurrentUsername(user);
      //  setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      //  setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on('logout', () => {
      logOut();
    });

    return () => {
      EventBus.remove('logout');
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    //   setShowModeratorBoard(false);
    //   setShowAdminBoard(false);
    setCurrentUsername(undefined);
  };

  return (
    <Router>
      {/*<Announcement />*/}
      {/*<FirstNavigation />*/}
      <header className={classes.header}>
        <Container>
          <div className={classes.container_bar}>
            <div className={classes.wrapper}>
              <div className={classes.left}>
                <div className={classes.logo}>
                  <Link to='/'>
                    <img
                      src='/img/logo.png'
                      alt='MINISO'
                      /*height={55}
                    width={55}*/
                    />
                  </Link>
                </div>
              </div>
              <div className={classes.center}>
                {/*<div className={classes.searchContainer}>
              <input className={classes.input}></input>
              <SearchIcon style={{ color: "gray", fontSize: 16 }} />
  </div>*/}
              </div>
              <div className={classes.right}>
                {currentUsername ? (
                  <div className={classes.specialLinks}>
                    <Link to={'/profile'} className={classes.link}>
                      <div className={classes.MenuItem}>{currentUsername}</div>
                    </Link>
                    <div className={`nav-item ${classes.logoutButton}`}>
                      <Link
                        to='/login'
                        className={classes.MenuItem}
                        onClick={logOut}
                      >
                        CERRAR SESION
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className={classes.specialLinks}>
                    <Link to='/login' className={classes.link}>
                      <div className={classes.MenuItem}>INICIAR SESIÓN</div>
                    </Link>
                    <Link to='/register' className={classes.link}>
                      <div className={classes.MenuItem}>REGISTRARSE</div>
                    </Link>
                  </div>
                )}
                <Link to='/cart'>
                  <div className={classes.MenuItem}>
                    <Badge
                      badgeContent={currentUsername ? quantity : 0}
                      color='error'
                    >
                      <ShoppingCartOutlinedIcon color='primary' />
                    </Badge>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </header>
      <MainNavigation />
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/lo-nuevo'>
          <TheNew />
        </Route>
        <Route path='/colecciones'>
          <Collections />
        </Route>
        <Route path='/sale'>
          <Sale />
        </Route>
        <Route path='/tiendas'>
          <Stores />
        </Route>
        <Route path='/contactanos'>
          <ContactUs />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/comprar-ahora'>
          <ShopNow />
        </Route>
        {/*Categories*/}
        <Route path='/accesorios-de-maquillaje'>
          <AccesoriosMaquillaje />
        </Route>
        <Route path='/alimentos-y-bebidas'>
          <AlimentosyBebidas />
        </Route>
        <Route path='/bolsas-y-accesorios'>
          <BolsasyAccesorios />
        </Route>
        <Route path='/cosmeticos'>
          <Cosmeticos />
        </Route>
        <Route path='/cuidado-personal'>
          <CuidadoPersonal />
        </Route>
        <Route path='/electronicos'>
          <Electronicos />
        </Route>
        <Route path='/estilo-de-vida'>
          <EstilodeVida />
        </Route>
        <Route path='/juguetes'>
          <Juguetes />
        </Route>
        <Route path='/libreria-y-papeleria'>
          <LibreriayPapeleria />
        </Route>
        <Route path='/perfumes-y-aromatizantes'>
          <PerfumesyAromatizantes />
        </Route>
        <Route path='/regalos-gratis'>
          <RegalosGratis />
        </Route>
        <Route path='/textil'>
          <Textil />
        </Route>
        <Route path='/productoslista/:category'>
          <ProductList />
        </Route>
        <Route path='/product/:id'>
          <Product />
        </Route>
        <Route path='/cart'>
          <Cart />
        </Route>
        <Route path='/payment'>
          <Payment />
        </Route>
        <Route path='/login'>
          <Login />
          {/*{user ? <Redirect to='/' /> : <Login />}*/}
        </Route>
        <Route path='/register'>
          <Register />
          {/*{user ? <Redirect to='/' /> : <Register />}*/}
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};
export default App;
