import * as React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 75,
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(3),
    height: '100%',
  },
  animContainer: {
    width: '100%',
    height: '100%',
  },
}));

export default function ({ children, ...props }) {
  const styles = useStyles();

  return (
    <Container maxWidth='xl' className={styles.root} {...props}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={styles.animContainer}>
        {children}
      </motion.div>
    </Container>
  );
}
