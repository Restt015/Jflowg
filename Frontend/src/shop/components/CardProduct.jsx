
import React from "react";

function CardProduct({ title, description, image }) {
  return (
    <div className="bg-pink-100 rounded-2xl shadow-lg w-full max-w-[340px] mx-auto transition-transform hover:scale-105 duration-300">
    <div className="bg-gray-400 flex items-center justify-center h-[200px] rounded-t-2xl">
        {image ? (
          <img src={image} alt={title} className="h-[100px] object-contain" />
        ) : (
          <span className="text-base text-gray-900">IMAGEN AQUÍ</span>
        )}
      </div>

     <div className="bg-white text-center px-6 py-4 rounded-b-2xl min-h-[120px] flex flex-col justify-center">
  <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
  <p className="text-sm text-gray-600">{description}</p>
</div>

    </div>
  );
}

export default CardProduct;
