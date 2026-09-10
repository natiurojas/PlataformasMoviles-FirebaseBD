// =====================================================
//  APP WEB PARA CARGAR PRODUCTOS EN FIRESTORE
//  Uso: npm install && npm start
// =====================================================

const path = require("path");
const express = require("express");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert("serviceAccountKey.json"),
  projectId: "fir-bd-35991"
});

const db = admin.firestore();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Convierte un string a number/boolean cuando corresponde
function parseValue(value) {
  if (value === "true") return true;
  if (value === "false") return false;
  if (value.trim() !== "" && !isNaN(Number(value))) return Number(value);
  return value;
}

app.post("/add-product", async (req, res) => {
  try {
    const claves = req.body.clave || [];
    const valores = req.body.valor || [];

    const data = {};
    for (let i = 0; i < claves.length; i++) {
      const key = String(claves[i] || "").trim();
      const val = String(valores[i] || "").trim();
      if (key && val && !(key in data)) {
        data[key] = parseValue(val);
      }
    }

    const attributeCount = Object.keys(data).length;
    if (attributeCount === 0 || !data.nombre) {
      return res.status(400).send("ERROR: el producto debe tener al menos el atributo \"nombre\".");
    }
    if (attributeCount > 5) {
      return res.status(400).send(`ERROR: el producto tiene ${attributeCount} atributos (m&aacute;ximo 5).`);
    }

    const ref = await db.collection("productos").add(data);
    res.send(`
      <h1>Producto cargado</h1>
      <p>ID: <code>${ref.id}</code></p>
      <pre>${JSON.stringify(data, null, 2)}</pre>
      <a href="/">&larr; Cargar otro producto</a>
    `);
  } catch (err) {
    res.status(500).send(`Error al guardar: ${err.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`App corriendo en http://localhost:${PORT}`);
});