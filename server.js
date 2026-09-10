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
    const claves = req.body["clave[]"] || req.body.clave || [];
    const valores = req.body["valor[]"] || req.body.valor || [];

    const data = {};
    for (let i = 0; i < claves.length; i++) {
      const rawKey = String(claves[i] || "").trim();
      const rawVal = String(valores[i] || "").trim();
      if (rawKey && rawVal) {
        const key = rawKey.toLowerCase() === "nombre" ? "nombre" : rawKey;
        if (!(key in data)) {
          data[key] = key === "nombre" ? rawVal : parseValue(rawVal);
        }
      }
    }

    const attributeCount = Object.keys(data).length;
    const hasNombre = data.nombre !== undefined && data.nombre !== "";
    if (attributeCount === 0 || !hasNombre) {
      return res.status(400).send(page(false, "ERROR: el producto debe tener al menos el atributo \"nombre\"."));
    }
    if (attributeCount > 5) {
      return res.status(400).send(page(false, `ERROR: el producto tiene ${attributeCount} atributos (m&aacute;ximo 5).`));
    }

    const ref = await db.collection("productos").add(data);
    res.send(page(true, `Producto cargado con ID <code>${ref.id}</code>`, data));
  } catch (err) {
    res.status(500).send(page(false, `Error al guardar: ${err.message}`));
  }
});

function page(ok, message, data) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${ok ? "Producto cargado" : "Error"} - Firestore</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: "Segoe UI", system-ui, Arial, sans-serif;
      min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px;
      background: #0b0f2b;
      background-image:
        radial-gradient(circle at 20% 80%, rgba(188, 108, 255, 0.22), transparent 40%),
        radial-gradient(circle at 80% 20%, rgba(0, 240, 255, 0.18), transparent 40%),
        radial-gradient(circle at 15% 15%, rgba(255, 92, 168, 0.18), transparent 40%);
    }
    .card {
      width: 100%; max-width: 520px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(0, 240, 255, 0.18);
      border-radius: 20px; padding: 36px 32px;
      backdrop-filter: blur(12px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      color: #fff;
    }
    h1 {
      font-size: 1.4rem; margin-bottom: 14px;
      background: linear-gradient(90deg, ${ok ? "#00f0ff, #ff5ca8, #bc6cff" : "#ffb86b, #ff5ca8"}, #ff5ca8);
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }
    p { line-height: 1.6; margin-bottom: 16px; color: rgba(255, 255, 255, 0.85); }
    code { color: #00f0ff; }
    pre {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px; padding: 14px; font-size: 0.85rem;
      color: #ffb86b; overflow-x: auto; margin-bottom: 18px;
    }
    a {
      display: inline-block; text-decoration: none; font-weight: 600;
      color: #0b0f2b; background: linear-gradient(90deg, #bc6cff, #00f0ff);
      padding: 12px 20px; border-radius: 12px;
      box-shadow: 0 6px 24px rgba(188, 108, 255, 0.35);
      transition: transform .15s, box-shadow .2s;
    }
    a:hover { transform: translateY(-2px); box-shadow: 0 6px 30px rgba(0, 240, 255, 0.4); }
  </style>
</head>
<body>
  <div class="card">
    <h1>${ok ? "Producto cargado" : "Error"}</h1>
    <p>${message}</p>
    ${data ? `<pre>${JSON.stringify(data, null, 2)}</pre>` : ""}
    <a href="/">&#8592; Cargar otro producto</a>
  </div>
</body>
</html>`;
}

app.listen(PORT, () => {
  console.log(`App corriendo en http://localhost:${PORT}`);
});