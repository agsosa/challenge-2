import * as React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  loadingContainer: {
    width: '100%',
  },
});

export default function () {
  const classes = useStyles();

  return (
    <div className={classes.loadingContainer}>
      {Array.from(Array(10).keys()).map(() => (
        <Skeleton height={50} />
      ))}
    </div>
  );
}
