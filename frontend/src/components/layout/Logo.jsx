import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BookIcon from '@material-ui/icons/Book';
import { APP_NAME } from '@lib/config';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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

export default function ({ ...props }) {
  const classes = useStyles();

  return (
    <div className={classes.root} {...props}>
      <BookIcon className={classes.icon} />
      <Typography className={classes.title} variant='h6' noWrap>
        {APP_NAME}
      </Typography>
    </div>
  );
}
