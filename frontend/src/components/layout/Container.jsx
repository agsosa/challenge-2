import * as React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 75,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(3),
    height: '100%',
  },
}));

export default function ({ children, ...props }) {
  const styles = useStyles();

  return (
    <Container maxWidth='xl' className={styles.root} {...props}>
      {children}
    </Container>
  );
}
