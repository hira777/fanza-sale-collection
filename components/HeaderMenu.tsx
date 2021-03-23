import { useState, MouseEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
    },
    buttonLabel: {
      margin: theme.spacing(0, 1, 0, 1),
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    menuItem: {
      width: '100%',
    },
  })
);

export type HeaderMenuProps = {
  categories: string[];
  onChangeCategory: (value: string) => void;
};

export function HeaderMenu({ categories, onChangeCategory }: HeaderMenuProps) {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [categoryMenu, setCategoryMenu] = useState(null);
  const onClickCategory = (event: MouseEvent<HTMLButtonElement>) => {
    setCategoryMenu(event.currentTarget);
  };
  const onCloseCategoryMenu = event => {
    if (event.currentTarget.nodeName === 'BUTTON') {
      setSelectedCategory(event.currentTarget.getAttribute('data-category'));
      onChangeCategory(event.currentTarget.getAttribute('data-category'));
    }
    setCategoryMenu(null);
  };

  return (
    <>
      <Tooltip title="カテゴリ" enterDelay={300}>
        <Button
          color="inherit"
          variant="contained"
          disableElevation
          aria-owns={categoryMenu ? 'category-menu' : undefined}
          aria-haspopup="true"
          onClick={onClickCategory}
          className={classes.button}
        >
          <span className={classes.buttonLabel}>
            {categories.filter(category => category === selectedCategory)[0]}
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
        {categories.map(category => (
          <MenuItem
            component="button"
            key={category}
            selected={selectedCategory === category}
            onClick={onCloseCategoryMenu}
            data-category={category}
            className={classes.menuItem}
          >
            {category}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
