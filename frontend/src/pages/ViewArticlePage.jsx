import * as React from 'react';
import { useParams } from 'react-router';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Container from '@components/layout/Container';
import { useAPI } from '@lib/useAPI';
import LoadingSkeleton from '@components/misc/LoadingSkeleton';
import ArticleDetails from '@components/articles/ArticleDetails';

export default function () {
  const { id } = useParams();
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
    </Container>
  );
}
