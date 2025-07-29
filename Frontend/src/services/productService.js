import axios from 'axios';

export async function getAllProducts() {
    try{
  const res = await axios.get('http://localhost:3001/api/v1/products',{
    withCredentials: true});
    console.log(res);
  if (res.status === 200) {
    return res;
  }
} catch (error) {
  if (error.response && error.response.data && error.response.data.message) {
    throw new Error(error.response.data.message);
    }
    throw new Error("Error al obtener productos"); 
}
}


export async function getProductById(id) {
    try {
        const res = await axios.get(`http://localhost:3001/api/v1/products/${id}`, {
            withCredentials: true
        });
        if (res.status === 200) {
            return res.data.product;
        }
    }
    catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error al obtener el producto");
    }
}


