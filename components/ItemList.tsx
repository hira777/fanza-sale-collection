import { ReactNode } from 'react';
import Grid from '@material-ui/core/Grid';

type ItemListProps = {
  children: ReactNode;
};

export function ItemList({ children }: ItemListProps) {
  return (
    <Grid item xs={12}>
      <Grid container justify="flex-start" spacing={0}>
        {children}
      </Grid>
    </Grid>
  );
}
