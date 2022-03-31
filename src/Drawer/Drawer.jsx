import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
//import Divider from "@mui/material/Divider";
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
//import MenuIcon from "@mui/icons-material/Menu";
import classes from './Drawer.module.css';

const CategoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  transition: all 0.5s;
  &:hover {
    color: blue;
  }
`;
const Drawer = () => {
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    setState(open);
  };
  const [categories, setCategories] = useState([]);

  const getCategories = useCallback(async () => {
    let url = 'http://3.16.73.177:9080/public/categories/first';
    // let url = '/api/public/categories/first';
    const res = await axios.get(url, {
      crossDomain: true,
    });
    setCategories(res.data.body);
  }, []);
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <div>
      <IconButton className={classes.btn} onClick={toggleDrawer(true)}>
        <div className={classes.hamburguer}>
          &#9776;
          {/*<MenuIcon />*/}
        </div>
        <div className={classes.title}>Categorías</div>
      </IconButton>
      <SwipeableDrawer
        anchor={'left'}
        open={state}
        onClose={toggleDrawer(false)}
        onClick={toggleDrawer(false)}
        PaperProps={{
          sx: { width: '300px' },
        }}
      >
        <div>
          <Box className={classes.diBox} textAlign='left' p={1}>
            <h3>Categorías</h3>
          </Box>
          <List>
            <Link to='/login' className={classes.daLink}>
              <div className={classes.MenuItem}>INICIAR SESIÓN</div>
            </Link>
            <Link to='/register' className={classes.daLink}>
              <div className={classes.MenuItem}>REGISTRARSE</div>
            </Link>

            <ListItem>
              <ListItemText>
                {categories.map((cat) => (
                  <Link
                    to={`/productoslista/${cat.codCatUno}`}
                    className={classes.link}
                    key={cat.codCatUno}
                  >
                    <CategoryItem>
                      <span>{cat.descripcion}</span>
                      <span className='arrow'>
                        <ArrowRightAltIcon />
                      </span>
                    </CategoryItem>
                  </Link>
                ))}
              </ListItemText>
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
    </div>
  );
};

export default Drawer;
