import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router';

import ArticleList from '@components/articles/ArticleList';
import Container from '@components/layout/Container';
import FloatingActionButton from '@components/misc/FloatingActionButton';
import { useAPI } from '@lib/useAPI';
import LoadingSkeleton from '@components/misc/LoadingSkeleton';

export default function () {
  const { posts, fetchPosts, originalPosts, loading } = useAPI();
  const history = useHistory();

  const canShowPostsList = !loading && posts && Array.isArray(posts) && posts.length > 0;
  const postsNotLoaded = !loading && !posts;
  const emptyPosts = !loading && originalPosts;

  React.useEffect(() => {
    fetchPosts();
  }, []);

  const handleFloatingBtnClick = () => {
    history.push('/post/new');
  };

  return (
    <Container>
      {/* loading skeleton */}
      {loading && <LoadingSkeleton />}

      {/* posts list */}
      {canShowPostsList ? (
        <ArticleList articles={posts} />
      ) : postsNotLoaded ? (
        <Box justifyContent='center' alignItems='center' textAlign='center' display='flex' flexDirection='column'>
          <Typography>Parece que no se ha cargado ningún post</Typography>
          <br />
          <Button variant='contained' size='small' color='primary' onClick={fetchPosts}>
            Reintentar
          </Button>
        </Box>
      ) : emptyPosts ? (
        <Typography>No se ha encontrado ningún post</Typography>
      ) : null}

      {/* floating button */}
      <FloatingActionButton action='add' onClick={handleFloatingBtnClick} />
    </Container>
  );
}
