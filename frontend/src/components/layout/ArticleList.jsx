import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ArticleItem from '@components/layout/ArticleItem';
import Pagination from '@material-ui/lab/Pagination';
import { LIST_POSTS_PER_PAGE } from '@lib/config';

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
}));

export default function ({ articles }) {
  const classes = useStyles();

  const [page, setPage] = React.useState(1);
  const limit = LIST_POSTS_PER_PAGE; // Limite de posts por pagina
  const maxPages = articles && articles.length && limit ? Math.ceil(articles.length / limit) : 1;

  const handlePageChange = (event, page) => {
    window.scrollTo(0, 0);
    setPage(page);
  };

  // TODO: Add loading & empty articles indicator
  /*if (!articles || !Array.isArray(articles)) {
    return 'Loading';
  }*/

  return (
    <div className={classes.root}>
      <Grid style={{ overflow: 'hidden' }} container spacing={3} justify='center'>
        {articles.slice((page - 1) * limit, page * limit).map((q, i) => (
          <Grid key={q.id} item xs='auto'>
            <ArticleItem title={q.title} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        className={classes.pagination}
        page={page}
        onChange={handlePageChange}
        count={maxPages}
        color='primary'
      />
    </div>
  );
}
