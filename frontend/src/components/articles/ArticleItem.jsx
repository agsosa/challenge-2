import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from 'react-router';
import { useConfirm } from 'material-ui-confirm';
import { toast } from 'react-toastify';

import { useAPI } from '@lib/useAPI';
import { DialogOptions } from '@lib/Helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
  },
  btnTitle: {
    textTransform: 'none',
  },
}));

export default function ({ title, id }) {
  const { deletePost } = useAPI();
  const confirm = useConfirm();
  const history = useHistory();
  const classes = useStyles();
  const [menuAnchor, setMenuAnchor] = React.useState(null);

  const handleOptionsClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleOptionsClose = (option) => {
    setMenuAnchor(null);

    switch (option) {
      case 'editar':
        break;
      case 'eliminar':
        confirm(DialogOptions.getDeletePost(id, title))
          .then(() => {
            deletePost(id).then((result) => {
              if (result) toast.success(`Se ha eliminado el post #${id} exitosamente.`);
              else toast.error('No se ha podido eliminar el post.');
            });
          })
          .catch(() => {});
        break;
    }
  };

  const handlePostTitleClick = () => {
    if (id) history.push(`/post/${id}`);
  };

  const TitleRender = (
    <Tooltip title={`Ver Post #${id}`}>
      <Button className={classes.btnTitle} variant='text' onClick={handlePostTitleClick}>
        <Typography variant='h6'>{title}</Typography>
      </Button>
    </Tooltip>
  );

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <Tooltip title='Opciones para este post'>
            <IconButton aria-label='settings' onClick={handleOptionsClick}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        }
        title={TitleRender}
      />
      <Menu id='simple-menu' anchorEl={menuAnchor} keepMounted open={Boolean(menuAnchor)} onClose={handleOptionsClose}>
        <MenuItem onClick={() => handleOptionsClose('editar')}>Editar</MenuItem>
        <MenuItem onClick={() => handleOptionsClose('eliminar')}>Eliminar</MenuItem>
      </Menu>
    </Card>
  );
}
