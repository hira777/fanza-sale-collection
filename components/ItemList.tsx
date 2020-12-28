import Grid from '@material-ui/core/Grid';

export function ItemList({ children }) {
  return (
    <Grid item xs={12}>
      <Grid container justify="center" spacing={2}>
        {children}
      </Grid>
    </Grid>
  );
}
