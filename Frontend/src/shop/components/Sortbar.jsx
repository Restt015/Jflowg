function SortBar() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
    

      <div className="flex items-center gap-2">
        <select className="border rounded px-2 py-1 text-sm">
          <option>Más relevante</option>
          <option>Precio: menor a mayor</option>
          <option>Precio: mayor a menor</option>
        </select>

        <div className="flex gap-1">
          <button className="p-1 hover:text-red-500">🔳</button>
          <button className="p-1 hover:text-red-500">📃</button>
        </div>
      </div>
    </div>
  );
}

export default SortBar;
