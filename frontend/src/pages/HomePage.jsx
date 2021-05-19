import * as React from 'react';
import axios from 'axios';
import ArticleList from '@components/layout/ArticlesList';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 75,
    padding: theme.spacing(3),
    height: '100%',
  },
}));

export default function () {
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

  return (
    <Container maxWidth='xl' className={styles.root}>
      <ArticleList articles={articles} />
    </Container>
  );
}
