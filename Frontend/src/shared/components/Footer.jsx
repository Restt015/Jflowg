import { FaFacebookF, FaTwitter, FaInstagram, FaChevronUp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-red-200 text-rose-900 py-10 px-6">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
    <div>
      <h4 className="font-bold text-lg text-rose-950 mb-2">Logo</h4>
      <p className="text-sm">Copyright © 2024, Jflowg. Todos los derechos reservados.</p>
    </div>
    <div>
      <h5 className="font-semibold text-rose-950 mb-2">Servicios</h5>
      <ul className="space-y-1 text-sm">
        <li><a href="#" className="hover:text-white">Home</a></li>
        <li><a href="#" className="hover:text-white">Artículos</a></li>
      </ul>
    </div>
    <div>
      <h5 className="font-semibold text-rose-950 mb-2">Sobre</h5>
      <ul className="space-y-1 text-sm">
        <li><a href="#" className="hover:text-white">Dev Team</a></li>
        <li><a href="#" className="hover:text-white">Ayuda</a></li>
        <li><a href="#" className="hover:text-white">Nosotros</a></li>
      </ul>
    </div>
    <div className="flex md:justify-end items-start space-x-4 text-rose-900">
      <a href="#" className="hover:text-white"><FaFacebookF /></a>
      <a href="#" className="hover:text-white"><FaTwitter /></a>
      <a href="#" className="hover:text-white"><FaInstagram /></a>
    </div>
  </div>
</footer>

  );
}

export default Footer;
