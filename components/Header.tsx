import { useState, ChangeEvent, MouseEvent } from 'react';
import {
  fade,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CATEGORIES_LABEL } from '../constants/categoriesOfSearch';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolbar: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    title: {
      flexGrow: 1,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 1),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    category: {
      margin: theme.spacing(0, 0.5, 0, 1),
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    categoryItem: {
      width: '100%',
    },
    formControl: {
      minWidth: 120,
      color: theme.palette.common.white,
    },
  })
);

type HeaderProps = {
  inputValue: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  category: string;
  onChangeCategory: (e: MouseEvent<HTMLButtonElement>) => void;
};

export function Header({
  inputValue,
  onChangeInput,
  category,
  onChangeCategory,
}: HeaderProps) {
  const classes = useStyles();
  const [categoryMenu, setCategoryMenu] = useState(null);
  const onClickCategory = event => {
    setCategoryMenu(event.currentTarget);
  };
  const onCloseCategoryMenu = event => {
    if (event.currentTarget.nodeName === 'BUTTON') {
      onChangeCategory(event);
    }

    setCategoryMenu(null);
  };

  return (
    <AppBar position="static">
      <Container fixed maxWidth="md">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            FANZA Sale Collection
          </Typography>
          <Tooltip title="カテゴリ" enterDelay={300}>
            <Button
              color="inherit"
              aria-owns={categoryMenu ? 'category-menu' : undefined}
              aria-haspopup="true"
              onClick={onClickCategory}
            >
              <span className={classes.category}>
                {
                  CATEGORIES_LABEL.filter(({ value }) => value === category)[0]
                    .text
                }
              </span>
              <ExpandMoreIcon fontSize="small" />
            </Button>
          </Tooltip>
          <Menu
            id="category-menu"
            anchorEl={categoryMenu}
            open={Boolean(categoryMenu)}
            onClose={onCloseCategoryMenu}
          >
            {CATEGORIES_LABEL.map(({ value, text }) => (
              <MenuItem
                component="button"
                key={value}
                selected={category === value}
                onClick={onCloseCategoryMenu}
                data-category={value}
                className={classes.categoryItem}
              >
                {text}
              </MenuItem>
            ))}
          </Menu>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="キーワードから探す"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'keyword search' }}
              value={inputValue}
              onChange={onChangeInput}
            />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
