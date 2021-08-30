import { useQuery, useMutation } from '@apollo/client';
import Image from 'next/image';

import PRODUCT_QUERY from '../comps/Product/Product.graphql'




import Gallery from '../comps/Product/Gallery';
import Details from '../comps/Product/Details';
import AddToCart from '../comps/Product/AddToCart';

export default function Product({ filters }) {
  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: { filters }
  });

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error loading products of category {error} .</div>;

  if (data.products.items.length < 1) {
    return <div style={{ color: 'red' }}>Product could not be loaded.</div>;
  }



  const product = data.products.items[0];

  /* to show add to cart just in case simple products */
  let addToCartComp;
  if (product.__typename == "SimpleProduct") {
    addToCartComp = <AddToCart product={product} />;
  } else {
    addToCartComp = '';
  }


  return (
    <div className="container mx-auto py-4">
      <div className="product">
        <div className="w-1/2">
          <Gallery
            image={product.image}
            images={product.media_gallery}
          />
        </div>
        <div className="w-1/2">
          <Details product={product} />
          {addToCartComp}
        </div>
      </div>

    </div>
  );
}

