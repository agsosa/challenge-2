import * as React from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Container from '@components/layout/Container';
import { useAPI } from '@lib/useAPI';
import LoadingSkeleton from '@components/misc/LoadingSkeleton';
import ArticleForm from '@components/articles/ArticleForm';

export default function () {
  const { id } = useParams();
  const { loading, updatePost, getPostDetails } = useAPI();
  const [postDetails, setPostDetails] = React.useState(null);

  const fetchPostDetails = async () => {
    const result = await getPostDetails(id);
    setPostDetails(result);
  };

  React.useEffect(() => {
    fetchPostDetails();
  }, []);

  const handleFormSubmit = (title, content) => {
    updatePost(id, title, content).then((result) => {
      if (result) {
        toast.success(`Se ha editado el post #${result.id} exitosamente.`);
        setPostDetails(result);
        console.log('recibido result', result);
      } else toast.error('No se ha podido editar el post.');
    });
  };

  return (
    <Container>
      {loading && <LoadingSkeleton />}

      {!loading && postDetails && typeof postDetails === 'object' && postDetails.id != null ? (
        <ArticleForm onSubmit={handleFormSubmit} resetOnSubmit={false} editMode postDetails={postDetails} />
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
