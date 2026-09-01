// =====================================================
//  SCRIPT DE CARGA DE PRODUCTOS EN FIRESTORE
//  Uso: node load-products.js
//
//  ANTES DE EJECUTAR:
//  1. Crea un proyecto en https://console.firebase.google.com
//  2. Crea una base de datos Firestore (modo: producción o prueba)
//  3. En Configuracion > Cuentas de servicio, genera una
//     nueva clave privada (archivo JSON) y guardala como
//     "serviceAccountKey.json" en esta misma carpeta.
//  4. Completa la variable FIRESTORE_PROJECT_ID con el ID
//     de tu proyecto de Firebase.
// =====================================================

const admin = require("firebase-admin");
const products = require("./products");

const FIRESTORE_PROJECT_ID = "fir-bd-35991";

admin.initializeApp({
  credential: admin.credential.cert("serviceAccountKey.json"),
  projectId: FIRESTORE_PROJECT_ID
});

const db = admin.firestore();

async function loadProducts() {
  const collection = db.collection("productos");
  let count = 0;

  for (const product of products) {
    try {
      const { id, ...data } = product;
      // Se valida que ningun producto tenga mas de 5 atributos
      const attributeCount = Object.keys(data).length;
      if (attributeCount > 5) {
        console.warn(`Omitido "${product.nombre}": tiene ${attributeCount} atributos (max 5).`);
        continue;
      }
      await collection.doc(id).set(data);
      count++;
      console.log(`Producto cargado: "${product.nombre}" (${attributeCount} atributos)`);
    } catch (err) {
      console.error(`Error al cargar "${product.nombre}":`, err.message);
    }
  }

  console.log(`\nListo. Se cargaron ${count} productos en la coleccion "productos".`);
  process.exit(0);
}

loadProducts();
