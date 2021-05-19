import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';

import { useAPI } from '@lib/useAPI';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      backgroundColor: 'white',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '75%',
      },
    },
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
  formContainer: {
    display: 'flex',
    padding: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
}));

export default function ({ postDetails }) {
  const classes = useStyles();
  const { createPost } = useAPI();

  const [title, setTitle] = React.useState('');
  const [titleError, setTitleError] = React.useState(false);
  const [content, setContent] = React.useState('');
  const [contentError, setContentError] = React.useState(false);

  // Reset title input error highlight on title change
  React.useEffect(() => {
    setTitleError(false);
  }, [title]);

  // Reset content input error highlight on content change
  React.useEffect(() => {
    setContentError(false);
  }, [content]);

  const handleContentChange = (event) => setContent(event.target.value);

  const handleTitleChange = (event) => setTitle(event.target.value);

  const handleResetBtn = () => {
    setTitle('');
    setContent('');
  };

  const handleSubmitBtn = () => {
    let validationError = false;

    if (!title) {
      setTitleError(true);
      validationError = true;
    }

    if (!content) {
      setContentError(true);
      validationError = true;
    }

    if (validationError) toast.error('Por favor rellena los campos requeridos');
    else {
      createPost(title, content).then((result) => {
        if (result) {
          toast.success(`Se ha creado el post #${result.id} exitosamente.`);
          handleResetBtn();
        } else toast.error('No se ha podido crear el post.');
      });
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth='md'>
        <Typography className={classes.text} variant='h3'>
          Crear nuevo post
        </Typography>
        <form className={classes.formContainer} noValidate autoComplete='off'>
          <TextField
            required
            label='Título del post'
            variant='outlined'
            defaultValue=''
            onChange={handleTitleChange}
            value={title}
            error={titleError}
            fullWidth
          />

          <TextField
            required
            label='Contenido del post'
            defaultValue=''
            variant='outlined'
            value={content}
            onChange={handleContentChange}
            fullWidth
            rows={15}
            error={contentError}
            multiline
          />
        </form>

        <Button variant='outlined' style={{ marginLeft: 10 }} onClick={handleResetBtn}>
          Reiniciar
        </Button>
        <Button variant='contained' color='primary' style={{ marginLeft: 10 }} onClick={handleSubmitBtn}>
          Crear Post
        </Button>
      </Container>
    </div>
  );
}
