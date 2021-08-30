const Details = (props) => {
  const product = props.product;

  return (
    <div>
      <h1 className="mb-4">{product.name}</h1>
      <h2 className="mb-4">${product.price_range.maximum_price.final_price.value}</h2>
      <div dangerouslySetInnerHTML={{__html: product.description.html}} />
    </div>
  );
};

 
export default Details;