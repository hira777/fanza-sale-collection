import { createStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { HeaderInput, HeaderInputProps } from './HeaderInput';
import { HeaderMenu, HeaderMenuProps } from './HeaderMenu';
import { HeaderTitle } from './HeaderTitle';

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  })
);

export type HeaderProps = {
  categories: HeaderMenuProps['categories'];
  onChangeCategory: HeaderMenuProps['onChangeCategory'];
  onChangeInput: HeaderInputProps['onChangeInput'];
};

export function Header({ categories, onChangeCategory, onChangeInput }: HeaderProps) {
  const classes = useStyles();

  return (
    <AppBar position="static" elevation={0}>
      <Container fixed maxWidth="md">
        <Toolbar className={classes.toolbar}>
          <HeaderTitle />
          <HeaderMenu categories={categories} onChangeCategory={onChangeCategory} />
          <HeaderInput onChangeInput={onChangeInput} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
