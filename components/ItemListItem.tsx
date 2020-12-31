import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ItemInfo } from '../types/api';

const useStyles = makeStyles({
  gridItem: {
    margin: '0 -1px -1px 0',
  },
  CardRoot: {
    width: 153,
    height: '100%',
  },
  cardMedia: {
    margin: '0 auto',
    marginTop: 19,
    width: 110,
    height: 152,
  },
  cardContent: {
    padding: 5,
    '&:last-child': {
      paddingBottom: 10,
    },
  },
  cardTitle: {
    display: '-webkit-box',
    overflow: 'hidden',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    lineHeight: 1.4,
  },
});

type ItemListItemProps = {
  item: ItemInfo;
};

export function ItemListItem({ item }: ItemListItemProps) {
  const { title } = item;
  const classes = useStyles();

  return (
    <Grid item className={classes.gridItem}>
      <Card
        className={classes.CardRoot}
        square
        variant="outlined"
        elevation={0}
      >
        <CardActionArea>
          <Link
            href={item.URL}
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            underline="none"
          >
            <CardMedia
              className={classes.cardMedia}
              image={item.imageURL.small}
              title={title}
            />
            <CardContent className={classes.cardContent}>
              <Typography
                gutterBottom
                variant="caption"
                component="h2"
                className={classes.cardTitle}
              >
                {title}
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
