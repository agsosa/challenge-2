import * as React from 'react';
import { toast } from 'react-toastify';

import Container from '@components/layout/Container';
import { useAPI } from '@lib/useAPI';
import LoadingSkeleton from '@components/misc/LoadingSkeleton';
import ArticleForm from '@components/articles/ArticleForm';

export default function () {
  const { loading, createPost } = useAPI();

  const handleFormSubmit = (title, content) => {
    createPost(title, content).then((result) => {
      if (result) {
        toast.success(`Se ha creado el post #${result.id} exitosamente.`);
      } else toast.error('No se ha podido crear el post.');
    });
  };

  return (
    <Container>
      {loading && <LoadingSkeleton />}

      {!loading && <ArticleForm onSubmit={handleFormSubmit} />}
    </Container>
  );
}
