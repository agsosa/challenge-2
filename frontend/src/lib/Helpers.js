// Helper functions to get common dialog options
export const DialogOptions = {
  getDeletePost: (id, title) => ({
    description: `Por favor confirma la eliminación del post titulado "${title}"`,
    title: `Eliminar Post #${id}`,
    confirmationText: 'Eliminar',
    cancellationText: 'Cancelar',
  }),
};
