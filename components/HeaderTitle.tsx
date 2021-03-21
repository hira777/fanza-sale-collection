import React from 'react';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

export function HeaderTitle() {
  const classes = useStyles();

  return (
    <Typography
      variant="h6"
      variantMapping={{ h6: 'h1' }}
      className={classes.title}
    >
      FANZA Sale Collection
    </Typography>
  );
}
