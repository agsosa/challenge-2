import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, purple } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: purple[800],
  },
  btnTitle: {
    textTransform: 'none',
  },
}));

export default function ({ title }) {
  const classes = useStyles();
  const [menuAnchor, setMenuAnchor] = React.useState(null);

  const handleOptionsClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleOptionsClose = () => {
    setMenuAnchor(null);
  };

  const TitleRender = (
    <Button className={classes.btnTitle} variant='text'>
      <Typography variant='h6'>{title}</Typography>
    </Button>
  );

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label='settings' onClick={handleOptionsClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={TitleRender}
      />
      <Menu id='simple-menu' anchorEl={menuAnchor} keepMounted open={Boolean(menuAnchor)} onClose={handleOptionsClose}>
        <MenuItem onClick={handleOptionsClose}>Editar</MenuItem>
        <MenuItem onClick={handleOptionsClose}>Eliminar</MenuItem>
      </Menu>
    </Card>
  );
}
