import Button1 from "../../shared/components/Button1";
import CardProduct from "../components/CardProduct";
import Footer from "../../shared/components/Footer";
import Navbar from "../../shared/components/navbar";

function Colecction() {
  const ropaData = [
    { title: "Ropa", description: "Descubre nuestra ropa de moda", image: "" },
    { title: "Sudaderas", description: "Mantente abrigado con estilo", image: "" },
    { title: "Camisas", description: "Elegancia y comodidad en cada prenda", image: "" },
  ];

  const zapatillasData = [
    { title: "Zapatillas", description: "Complementa tu look con zapatillas", image: "" },
    { title: "Zapatillas deportivas", description: "Para un rendimiento óptimo", image: "" },
    { title: "Zapatillas casuales", description: "Comodidad para el día a día", image: "" },
  ];

  const gorrasData = [
    { title: "Gorras", description: "Encuentra la gorra perfecta para ti", image: "" },
    { title: "Gorras de béisbol", description: "Estilo clásico y versátil", image: "" },
    { title: "Gorras de moda", description: "Añade un toque único a tu outfit", image: "" },
  ];

  const accesoriosData = [
    { title: "Accesorios", description: "Accesorios para cada ocasión", image: "" },
    { title: "Bolsos", description: "Practicidad y estilo en uno", image: "" },
    { title: "Cinturones", description: "Complementa tu look con elegancia", image: "" },
  ];

  return (
    <div className="pt-32 bg-gradient-to-tr from-rose-50 to-white min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto px-6 mb-16">
        <Button1>Ropa</Button1>
        <Button1>Zapatillas</Button1>
        <Button1>Gorras</Button1>
        <Button1>Accesorios</Button1>
      </div>

      <hr className="h-px w-full max-w-5xl mx-auto my-10 border-gray-500 shadow-md" />

      {[
        { title: "Ropa", data: ropaData },
        { title: "Zapatillas", data: zapatillasData },
        { title: "Gorras", data: gorrasData },
        { title: "Accesorios", data: accesoriosData },
      ].map((section, idx) => (
        <section key={idx} className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="text-3xl font-bold text-center text-red-900 mb-8">{section.title}</h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
            {section.data.map((item, i) => (
              <CardProduct key={i} {...item} />
            ))}
          </div>
        </section>
      ))}

      <Footer />
    </div>
  );
}

export default Colecction;
