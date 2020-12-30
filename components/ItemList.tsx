import Grid from '@material-ui/core/Grid';

export function ItemList({ children }) {
  return (
    <Grid item xs={12}>
      <Grid container justify="flex-start" spacing={0}>
        {children}
      </Grid>
    </Grid>
  );
}
