import { useState, ChangeEvent, FormEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0px 4px',
      display: 'flex',
      alignItems: 'center',
    },
    inputRoot: {
      width: '100%',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 1),
    },
  })
);

export type HeaderInputProps = {
  onSubmit: (value: string) => void;
};

export function HeaderInput({ onSubmit: onSubmitSearch }: HeaderInputProps) {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const onSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    onSubmitSearch(inputValue);
  };

  return (
    <Paper
      component="form"
      elevation={0}
      variant="outlined"
      className={classes.root}
      onSubmit={onSubmit}
    >
      <InputBase
        placeholder="キーワードから探す"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'keyword search' }}
        value={inputValue}
        onChange={onChange}
      />
      <IconButton type="submit" size="small" aria-label="search">
        <SearchIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
}
