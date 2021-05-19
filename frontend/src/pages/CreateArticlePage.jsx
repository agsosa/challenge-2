import * as React from 'react';
import axios from 'axios';
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

  const [articles, setArticles] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(({ data }) => {
        console.log(data);
        setArticles(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return <Container>{id}</Container>;
}
