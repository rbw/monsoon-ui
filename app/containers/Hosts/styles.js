export const styles = theme => ({
  root: {
    height: 'calc(100vh - 40px)',
    padding: 20,
    margin: 20,
    marginBottom: 0,
    borderRadius: 2,
  },
  cellStatus: {
    width: '10px',
    padding: 0,
    margin: 0,
  },
  cellStatusCritical: {
    backgroundColor: '#d47d7d',
  },
  cellStatusWarning: {
    backgroundColor: '#ffca94',
  },
  cellStatusPending: {
    backgroundColor: '#9091b7',
  },
  cellStatusUnknown: {
    backgroundColor: '#d47d7d',
  },
  cellStatusHealthy: {
    backgroundColor: '#90b790',
  },
});
