import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ArticleItem from '@components/layout/ArticleItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function AutoGrid({ articles }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {articles &&
          Array.isArray(articles) &&
          articles.map((q) => (
            <Grid item xs>
              <ArticleItem />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
