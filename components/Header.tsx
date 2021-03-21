import { ReactNode } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  })
);

export type HeaderProps = {
  title: ReactNode;
  menu: ReactNode;
  input: ReactNode;
};

export function Header({ title, menu, input }: HeaderProps) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Container fixed maxWidth="md">
        <Toolbar className={classes.toolbar}>
          {title}
          {menu}
          {input}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
