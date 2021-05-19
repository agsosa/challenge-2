/* 
  A form to edit or create new articles with basic input validation

  Usage:
    <ArticleForm />

  Props:
    editMode: boolean (optional) - To indicate if the form will be used to edit an existing article or not
    postDetails: object (required if editMode = true, otherwise optional) - The post to edit
    onSubmit: function(title: string, content: string) - Function to be called on submit click
    resetOnSubmit = true: boolean (optional) - To indicate if the form should reset on submit
*/

import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';

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

export default function ({ editMode, postDetails, onSubmit, resetOnSubmit = true }) {
  const classes = useStyles();

  const [title, setTitle] = React.useState(editMode ? postDetails.title : '');
  const [titleError, setTitleError] = React.useState(false);
  const [content, setContent] = React.useState(editMode ? postDetails.body : '');
  const [contentError, setContentError] = React.useState(false);

  React.useEffect(() => {
    if (editMode && postDetails) {
      setTitle(postDetails.title);
      setContent(postDetails.body);
    }
  }, [postDetails]);

  // Reset title input error highlight on title change
  React.useEffect(() => {
    setTitleError(false);
  }, [title]);

  // Reset content input error highlight on content change
  React.useEffect(() => {
    setContentError(false);
  }, [content]);

  // On content input change
  const handleContentChange = (event) => setContent(event.target.value);

  // On title input change
  const handleTitleChange = (event) => setTitle(event.target.value);

  // On reset btn click
  const handleResetBtn = () => {
    setTitle('');
    setContent('');
  };

  // On submit btn click
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
      if (onSubmit) onSubmit(title, content);
      if (resetOnSubmit) handleResetBtn();
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth='md'>
        <Typography className={classes.text} variant='h3'>
          {editMode ? 'Editar Post' : 'Crear nuevo post'}
        </Typography>

        {editMode && (
          <Typography className={classes.text} variant='caption' className={classes.subtitle}>
            Post #{postDetails.id} | Published by user #{postDetails.userId}
          </Typography>
        )}

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
        <Button
          variant='contained'
          disabled={editMode && title === postDetails.title && content === postDetails.body}
          color='primary'
          style={{ marginLeft: 10 }}
          onClick={handleSubmitBtn}>
          {editMode ? 'Editar Post' : 'Crear Post'}
        </Button>
      </Container>
    </div>
  );
}
