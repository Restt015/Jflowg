
import React from "react";

function CardProduct({ title, description, image }) {
  return (
    <div className="bg-pink-100 rounded-xl shadow-md w-full max-w-[260px] mx-auto transition hover:shadow-lg">
     
      <div className="bg-white flex items-center justify-center h-[140px]">
        {image ? (
          <img src={image} alt={title} className="h-[70px] object-contain" />
        ) : (
          <span className="text-sm text-gray-400">IMAGEN AQUÍ</span>
        )}
      </div>

   
      <div className="bg-pink-200 text-center px-4 py-3 rounded-b-xl">
        <h3 className="text-base font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
}

export default CardProduct;
