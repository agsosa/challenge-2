import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import FloatingActionButton from '@components/misc/FloatingActionButton';
import Container from '@components/layout/Container';
import { useAPI } from '@lib/useAPI';
import LoadingSkeleton from '@components/misc/LoadingSkeleton';
import ArticleDetails from '@components/articles/ArticleDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 75,
    padding: theme.spacing(3),
    height: '100%',
  },
}));

export default function () {
  const { id } = useParams();
  const styles = useStyles();
  const { loading, getPostDetails } = useAPI();
  const [postDetails, setPostDetails] = React.useState(null);

  const fetchPostDetails = async () => {
    const result = await getPostDetails(id);
    setPostDetails(result);
  };

  React.useEffect(() => {
    fetchPostDetails();
  }, []);

  return (
    <Container>
      {loading && <LoadingSkeleton />}

      {/* posts details */}
      {!loading && postDetails && typeof postDetails === 'object' && postDetails.id != null ? (
        <ArticleDetails postDetails={postDetails} />
      ) : (
        !loading && (
          <Box justifyContent='center' alignItems='center' textAlign='center' display='flex' flexDirection='column'>
            <Typography>
              Parece que no se ha podido cargar los detalles de este post. ¿Estás seguro/a de que existe un post con el
              ID #{id}?
            </Typography>
            <br />
            <Button variant='contained' size='small' color='primary' onClick={fetchPostDetails}>
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
