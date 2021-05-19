import * as React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import ArticleList from '@components/articles/ArticleList';
import Container from '@components/layout/Container';
import FloatingActionButton from '@components/misc/FloatingActionButton';
import { useAPI } from '@lib/useAPI';

const useStyles = makeStyles({
  loadingContainer: {
    width: '100%',
  },
});

export default function () {
  const classes = useStyles();
  const { posts, fetchPosts, loading } = useAPI();

  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container>
      {/* loading skeleton */}
      {loading && (
        <div className={classes.loadingContainer}>
          {Array.from(Array(10).keys()).map(() => (
            <Skeleton height={50} />
          ))}
        </div>
      )}

      {/* posts list */}
      {!loading && posts && Array.isArray(posts) && posts.length > 0 ? (
        <ArticleList articles={posts} />
      ) : (
        !loading && (
          <Box justifyContent='center' alignItems='center' textAlign='center' display='flex' flexDirection='column'>
            <Typography>Parece que no se ha cargado ningún post</Typography>
            <br />
            <Button variant='contained' size='small' color='primary' onClick={fetchPosts}>
              Reintentar
            </Button>
          </Box>
        )
      )}

      {/* floating button */}
      <FloatingActionButton action='add' />
    </Container>
  );
}
