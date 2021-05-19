import * as React from 'react';
import axios from 'axios';
import ArticleList from '@components/layout/ArticleList';
import Container from '@components/layout/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FloatingActionButton from '@components/layout/FloatingActionButton';

export default function () {
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
    <Container>
      <ArticleList articles={articles} />
      <FloatingActionButton action='add' />
    </Container>
  );
}