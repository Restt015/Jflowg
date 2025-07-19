import React from "react";
import CardProduct from "./CardProduct";  

function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-16">
      {products.map((product) => (
        <CardProduct key={product.id} {...product} showPrice={true} />
      ))}
    </div>
  );
}

export default ProductGrid;
