import { MongoClient, ObjectId } from "mongodb";

const uri = 'mongodb://localhost:27017';
const cliente = new MongoClient(uri);

const variantes = [
    {
        _id: new ObjectId("68788f0eb0e883b9b85e7a7e"),
        sku: "PRBLO-RED-S",
        color: "red",
        size: "S",
        price: 25.99,
        stock: 45,
        images: [
            "/images/blusa_estampada_rojo_1.jpg"
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        _id: new ObjectId("68788f0eb0e883b9b85e7a7f"),
        sku: "PRBLO-BLUE-M",
        color: "blue",
        size: "M",
        price: 25.99,
        stock: 30,
        images: [
            "/images/blusa_estampada_azul_1.jpg"
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        _id: new ObjectId("68788f0eb0e883b9b85e7a80"),
        sku: "CROPT-BLACK-XS",
        color: "black",
        size: "XS",
        price: 19.99,
        stock: 60,
        images: [
            "/images/crop_top_negro_1.jpg"
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        _id: new ObjectId("68788f0eb0e883b9b85e7a81"),
        sku: "CROPT-WHITE-S",
        color: "white",
        size: "S",
        price: 19.99,
        stock: 75,
        images: [
            "/images/crop_top_blanco_1.jpg"
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        _id: new ObjectId("68788f0eb0e883b9b85e7a82"),
        sku: "BATSH-GREY-L",
        color: "grey",
        size: "L",
        price: 15.50,
        stock: 120,
        images: [
            "/images/camiseta_basica_gris_1.jpg"
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        _id: new ObjectId("68788f0eb0e883b9b85e7a83"),
        sku: "BATSH-BLACK-M",
        color: "black",
        size: "M",
        price: 15.50,
        stock: 150,
        images: [
            "/images/camiseta_basica_negro_1.jpg"
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        _id: new ObjectId("68788f0eb0e883b9b85e7a84"),
        sku: "SPSHO-BLACK-M",
        color: "black",
        size: "M",
        price: 29.99,
        stock: 50,
        images: [
            "/images/short_deportivo_negro_1.jpg"
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        _id: new ObjectId("68788f0eb0e883b9b85e7a85"),
        sku: "SPSHO-GREY-L",
        color: "grey",
        size: "L",
        price: 29.99,
        stock: 40,
        images: [
            "/images/short_deportivo_gris_1.jpg"
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        _id: new ObjectId("68788f0eb0e883b9b85e7a86"),
        sku: "JEANS-BLUE-30",
        color: "blue",
        size: "30",
        price: 49.95,
        stock: 80,
        images: [
            "/images/jeans_skinny_azul_1.jpg"
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        _id: new ObjectId("68788f0eb0e883b9b85e7a87"),
        sku: "JEANS-BLACK-32",
        color: "black",
        size: "32",
        price: 49.95,
        stock: 70,
        images: [
            "/images/jeans_skinny_negro_1.jpg"
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        _id: new ObjectId("68788f0eb0e883b9b85e7a88"),
        sku: "EMCAP-BLACK-U",
        color: "black",
        size: "unique",
        price: 22.00,
        stock: 100,
        images: [
            "/images/gorra_bordada_negro_1.jpg"
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        _id: new ObjectId("68788f0eb0e883b9b85e7a89"),
        sku: "EMCAP-WHITE-U",
        color: "white",
        size: "unique",
        price: 22.00,
        stock: 90,
        images: [
            "/images/gorra_bordada_blanco_1.jpg"
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        _id: new ObjectId("68788f0eb0e883b9b85e7a8a"),
        sku: "DEJAC-BLUE-M",
        color: "blue",
        size: "M",
        price: 65.00,
        stock: 35,
        images: [
            "/images/chaqueta_mezclilla_azul_1.jpg"
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        _id: new ObjectId("68788f0eb0e883b9b85e7a8b"),
        sku: "DEJAC-BLACK-L",
        color: "black",
        size: "L",
        price: 65.00,
        stock: 25,
        images: [
            "/images/chaqueta_mezclilla_negro_1.jpg"
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        _id: new ObjectId("68788f0eb0e883b9b85e7a8c"),
        sku: "CAPAN-GREEN-32",
        color: "green",
        size: "32",
        price: 55.75,
        stock: 65,
        images: [
            "/images/pantalon_cargo_verde_1.jpg"
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        _id: new ObjectId("68788f0eb0e883b9b85e7a8d"),
        sku: "CAPAN-BEIGE-34",
        color: "beige",
        size: "34",
        price: 55.75,
        stock: 55,
        images: [
            "/images/pantalon_cargo_beige_1.jpg"
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        _id: new ObjectId("68788f0eb0e883b9b85e7a8e"),
        sku: "SPTOP-PINK-S",
        color: "pink",
        size: "S",
        price: 24.50,
        stock: 85,
        images: [
            "/images/top_deportivo_rosa_1.jpg"
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        _id: new ObjectId("68788f0eb0e883b9b85e7a8f"),
        sku: "SPTOP-BLACK-M",
        color: "black",
        size: "M",
        price: 24.50,
        stock: 95,
        images: [
            "/images/top_deportivo_negro_1.jpg"
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
];

async function run() {
    try {
        await cliente.connect();
        const db = cliente.db('jflowg_db');
        const coleccion = db.collection('products_variants');

        await coleccion.insertMany(variantes);
        console.log('Datos importados correctamente');
    } catch (error) {
        console.error(error);
    } finally {
        await cliente.close();
    }
}

run();
