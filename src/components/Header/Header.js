import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Container } from '@mui/material';
//MATERIAL-UI FIRSTNAVIGATIONBAR
import Badge from '@mui/material/Badge';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  //Routes,
  Link,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import EventBus from '../../common/EventBus';
import classes from '../../FirstNavigation.module.css';
import AuthService from '../../services/auth.service';

const Header = () => {
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
    <div>
      {' '}
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
    </div>
  );
};

export default Header;
