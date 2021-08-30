//import { Component } from 'react';
//import getConfig from 'next/config';
import Image from 'next/image';


export default function Gallery({ image, images }) {


  return (
    <div>
      <Image
        src={image.url}
        className="product__gallery-primary"
        width="500"
        height="620"
      />
      {/* <div>
        {images.map(img => {
          return <img
            src={img.url}
            key={img.position}
          />
        })}
      </div> */}
    </div>
  );

}
