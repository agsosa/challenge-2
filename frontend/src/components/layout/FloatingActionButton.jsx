import * as React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  root: {
    margin: 0,
    top: 'auto',
    right: 30,
    bottom: 30,
    left: 'auto',
    position: 'fixed',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

export default function ({ action, ...props }) {
  const classes = useStyle();
  let icon = <AddIcon />;

  // TODO
  switch (action) {
    case 'add':
      break;
    case 'edit':
      break;
    default:
      <AddIcon />;
  }

  return (
    <Fab color='primary' aria-label='add' className={classes.root} {...props}>
      {icon}
    </Fab>
  );
}
