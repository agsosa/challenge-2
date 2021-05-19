import * as React from 'react';
import axios from 'axios';
import ArticleList from '@components/layout/ArticleList';
import Container from '@components/layout/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FloatingActionButton from '@components/layout/FloatingActionButton';
import { useAPI } from '@lib/useAPI';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

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
      {loading && (
        <div className={classes.loadingContainer}>
          {Array.from(Array(10).keys()).map(() => (
            <Skeleton height={50} />
          ))}
        </div>
      )}
      {!loading && posts && Array.isArray(posts) && posts.length > 0 && <ArticleList articles={posts} />}
      <FloatingActionButton action='add' />
    </Container>
  );
}
