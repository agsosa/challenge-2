/* 
  A component to display a complete post

  Usage:
    <ArticleDetails />

  Props:
    postDetails: object (required) - The article to display

    the postDetails object should be of shape { id: number, title: string, userId: number, body: string }
*/

import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useConfirm } from 'material-ui-confirm';
import { useHistory } from 'react-router';

import { DialogOptions } from '@lib/Helpers';
import { useAPI } from '@lib/useAPI';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  text: {
    padding: theme.spacing(2),
  },
}));

export default function ({ postDetails }) {
  const classes = useStyles();
  const { deletePost } = useAPI();
  const confirm = useConfirm();
  const history = useHistory();

  const handleDeleteBtn = () => {
    confirm(DialogOptions.getDeletePost(postDetails.id, postDetails.title))
      .then(() => {
        deletePost(postDetails.id).then((result) => {
          if (result) {
            toast.success(`Se ha eliminado el post #${postDetails.id} exitosamente.`);
            history.push('/');
          } else toast.error('No se ha podido eliminar el post.');
        });
      })
      .catch(() => {});
  };

  const handleEditBtn = () => {
    history.push(`/post/edit/${postDetails.id}`);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth='md'>
        <Typography className={classes.text} variant='h3'>
          {postDetails.title}
        </Typography>

        <Typography className={classes.text} variant='caption' className={classes.subtitle}>
          Post #{postDetails.id} | Published by user #{postDetails.userId}
        </Typography>

        <Typography className={classes.text} variant='body1'>
          {postDetails.body}
        </Typography>

        <Button size='small' onClick={handleDeleteBtn}>
          Eliminar
        </Button>
        <Button size='small' style={{ marginLeft: 10 }} onClick={handleEditBtn}>
          Editar
        </Button>
      </Container>
    </div>
  );
}
