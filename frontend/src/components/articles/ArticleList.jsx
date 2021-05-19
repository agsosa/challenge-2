import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';

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

  // Reset page on articles change
  React.useEffect(() => setPage(1), [articles]);

  return (
    <div className={classes.root}>
      <Grid style={{ overflow: 'hidden' }} container spacing={3} justify='center'>
        {articles.slice((page - 1) * limit, page * limit).map((q, i) => (
          <Grid key={q.id} item xs='auto'>
            <ArticleItem title={q.title} id={q.id} />
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
