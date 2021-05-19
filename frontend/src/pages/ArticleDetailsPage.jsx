import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';

import Container from '@components/layout/Container';

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

  return <Container>{id}</Container>;
}
