import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from 'react-router';

import Logo from '@components/layout/Logo';
import Search from '@components/articles/ArticleSearch';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  logoLink: {
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function () {
  const history = useHistory();
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // On new post nav link click
  const handleNewPostLink = () => {
    history.push('/post/new');
    handleMobileMenuClose();
  };

  // On home nav link click
  const handleHomeLink = () => {
    history.push('/');
    handleMobileMenuClose();
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const mobileLinks = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem onClick={handleHomeLink}>
        <p>Ir a inicio</p>
      </MenuItem>
      <MenuItem onClick={handleNewPostLink}>
        <p>Crear Post</p>
      </MenuItem>
      <MenuItem>
        <p>Editar Post</p>
      </MenuItem>
    </Menu>
  );

  const desktopLinks = (
    <>
      <Tooltip title='Lista de Posts'>
        <IconButton aria-label='inicio' color='inherit' onClick={handleHomeLink}>
          <HomeIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Crear nuevo post'>
        <IconButton aria-label='agregar post' color='inherit' onClick={handleNewPostLink}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Editar un post'>
        <IconButton aria-label='editar post' color='inherit'>
          <EditIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='fixed'>
        <Toolbar>
          <Logo className={classes.logoLink} onClick={handleHomeLink} />

          <Search />

          <div className={classes.grow} />

          {/* Navigation Desktop */}
          <div className={classes.sectionDesktop}>{desktopLinks}</div>

          {/* Navigation Mobile */}
          <div className={classes.sectionMobile}>
            {/* Open menu button */}
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'>
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {mobileLinks}
    </div>
  );
}
