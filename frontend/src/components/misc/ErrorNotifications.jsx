import * as React from 'react';
import { useAPI } from '@lib/useAPI';
import { toast } from 'react-toastify';

export default function () {
  const { subscribeToErrorEvents, unsubscribeFromErrorEvents } = useAPI();

  React.useEffect(() => {
    const apiErrorHandler = (error) => toast.error('Ha ocurrido un error en la solicitud ' + error);

    subscribeToErrorEvents(apiErrorHandler);

    return () => unsubscribeFromErrorEvents(apiErrorHandler);
  }, []);

  return null;
}
