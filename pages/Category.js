import { useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link'

import PRODUCTS_LIST from '../comps/Category/Category.graphql'

//import { Card } from 'antd';
//const { Meta } = Card;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, green } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutlineOutlined';
import ErrorOutline from '@material-ui/icons/ErrorOutlineOutlined';
import Grid from '@material-ui/core/Grid';

import AddToCart from '../comps/Product/AddToCart';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '100%',//'56.25%', // 16:9
  },
  CardActions: {
    justifyContent: 'space-around',
  }
}));

export default function Category({ filters }) {
  const classes = useStyles();
  const { loading, error, data } = useQuery(PRODUCTS_LIST, {
    variables: { filters }
  });

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error loading products of category {id} {error} .</div>;

  const response = data.products.items;

  return (
    <div>
      <h1>All List</h1>
      <div className="product-list">

        <Grid container spacing={3}>
          {response.map(item => (

            <Grid container item xs={12} sm={6} md={4} lg={3} key={item.url_key}>
              <Card className={classes.root} >
                <Link href={'/' + item.url_key + '.html'} >
                  <a>
                    <CardMedia
                      className={classes.media}
                      image={item.image.url}
                      title={item.name}
                    />
                    <CardHeader
                      title={item.name}
                      subheader={item.sku}
                    />
                  </a>
                </Link>
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p" dangerouslySetInnerHTML={{ __html: item.short_description.html }} />
                </CardContent>
                <CardActions className={classes.CardActions}>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>

                  <AddToCart product={item} />

                  <IconButton aria-label="share" >
                    {/* {(item.stock_status == "OUT_OF_STOCK") ? <ErrorOutline style={{ color: red[500] }} /> : <CheckCircleOutline style={{ color: green[500] }} />} */}
                    <CheckCircleOutline style={{ color: green[500] }} />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

