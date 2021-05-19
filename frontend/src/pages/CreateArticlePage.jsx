import * as React from 'react';
import { useParams, useHistory } from 'react-router';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
