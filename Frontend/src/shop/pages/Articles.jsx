import React, { useState } from "react";
import SidebarFilter from "../components/SideBarFilter";
import SortBar from "../components/Sortbar";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import CardProduct from "../components/CardProduct";
import NavBar from "../../shared/components/navbar";
import Footer from "../../shared/components/Footer";


function Articles() {
  const [currentPage, setCurrentPage] = useState(1);

  // Datos de ejemplo para productos
  const products = [
    { title: "Artículo", brand: "Zara", price: 89.99, image: "" },
    { title: "Artículo", brand: "H&M", price: 45.99, image: "" },
    { title: "Artículo", brand: "Mango", price: 69.99, image: "" },
    { title: "Falda Floral", brand: "Bershka", price: 39.99, image: "" },
    { title: "Blazer Formal", brand: "Bershka", price: 99.99, image: "" },
    { title: "Artículo", brand: "Zara", price: 55.99, image: "" },
    { title: "Artículo", brand: "H&M", price: 79.99, image: "" },
    { title: "Artículo", brand: "Mango", price: 29.99, image: "" },
  ];

  const totalPages = 5;

  return (
   <div className="pt-32 bg-gradient-to-b from-red-100 to-gray-100 min-h-screen">

      <NavBar />
      <section className="flex flex-col lg:flex-row gap-8">
        <SidebarFilter />

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Ropa Masculina</h1>
           
            <SortBar />
          </div>

          <ProductGrid products={products} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Articles;
