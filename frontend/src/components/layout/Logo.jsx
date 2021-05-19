import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BookIcon from '@material-ui/icons/Book';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

export default function () {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BookIcon className={classes.icon} />
      <Typography className={classes.title} variant='h6' noWrap>
        Simple blog
      </Typography>
    </div>
  );
}
