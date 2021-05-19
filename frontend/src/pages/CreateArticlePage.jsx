import * as React from 'react';

import Container from '@components/layout/Container';
import { useAPI } from '@lib/useAPI';
import LoadingSkeleton from '@components/misc/LoadingSkeleton';
import ArticleForm from '../components/articles/ArticleForm';

export default function () {
  const { loading } = useAPI();

  return (
    <Container>
      {loading && <LoadingSkeleton />}

      {!loading && <ArticleForm />}
    </Container>
  );
}
