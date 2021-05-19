import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';

import ArticleItem from '@components/articles/ArticleItem';
import { LIST_POSTS_PER_PAGE } from '@lib/Config';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  pagination: {
    marginTop: theme.spacing(5),
  },
  subtitle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  text: {
    padding: theme.spacing(2),
  },
}));

export default function ({ postDetails }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth='md'>
        <Typography className={classes.text} variant='h3'>
          {postDetails.title}
        </Typography>
        <Typography className={classes.text} variant='body1'>
          {postDetails.body}
        </Typography>
        <Typography className={classes.text} variant='caption' className={classes.subtitle}>
          Post #{postDetails.id} | Published by user #{postDetails.userId}
        </Typography>
      </Container>
    </div>
  );
}
