import React, { useState, useEffect } from "react";
import SidebarFilter from "../components/SideBarFilter";
import SortBar from "../components/Sortbar";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import NavBar from "../../shared/components/navbar";
import Footer from "../../shared/components/Footer";
import { getAllProducts } from "../../services/productService";

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const totalPages = 5;

  useEffect(() => {
  async function fetchProducts() {
    try {
      const products = await getAllProducts();
      setProducts(products.data.products || []);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  }
  
  fetchProducts();
}, []);


  return (
    <div className="pt-28 bg-gradient-to-b from-rose-200 to-gray-100 min-h-screen">
      <NavBar />
      <main className="max-w-10xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-[260px]">
          <SidebarFilter />
        </aside>
        <section className="flex-1 bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Ropa Masculina</h1>
              <p className="text-sm text-gray-500">{products.length} productos</p>
            </div>
            <SortBar />
          </div>
          <ProductGrid products={products} />
          <div className="mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Products;
