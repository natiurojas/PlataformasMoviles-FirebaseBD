# Firebase Firestore - Productos

Proyecto en Node.js que carga productos de ejemplo en una base de datos **Firestore** de Firebase (Admin SDK) y ofrece una **app web** para agregar productos nuevos desde un formulario.

## Requisitos previos
- Node.js instalado.
- Un proyecto de Firebase (gratuito) con una base de datos **Cloud Firestore** creada.

## Configuracion (una sola vez)
1. Crea un proyecto en https://console.firebase.google.com y crea una base de datos **Cloud Firestore** (modo prueba o produccion).
2. En **Configuracion del proyecto > Cuentas de servicio**, pulsa *Generar nueva clave privada*. Se descarga un archivo JSON.
3. Guarda ese JSON en esta carpeta con el nombre **`serviceAccountKey.json`** (ya esta en `.gitignore`, NUNCA lo subas a git).
4. En `server.js` y `load-products.js`, reemplaza `fir-bd-35991` por el **ID de tu proyecto** de Firebase.

## Instalar dependencias
```
npm install
```

## Cargar los 5 productos de ejemplo
```
npm run load
```
Crea la coleccion `productos` con 5 documentos, cada uno con **a lo sumo 5 atributos**:

| Documento | Atributos |
|-----------|-----------|
| celular-xiaomi-12 | nombre, precio, color, modelo, stock (5) |
| laptop-lenovo-ideapad | nombre, precio, color, modelo, garantia (5) |
| auriculares-sony-wf1000 | nombre, precio, color, modelo, bateria (5) |
| reloj-garmin-forerunner | nombre, precio, color, modelo, resistencia_agua (5) |
| teclado-logitech-mx | nombre, precio, color, modelo, conexion (5) |

## App web para cargar un producto nuevo
```
npm start
```
Abrí http://localhost:3000 y completá el formulario:
- La primera fila es el **nombre** del producto.
- Las filas siguientes son atributos: a la izquierda el nombre del atributo (`precio`, `color`, `modelo`, ...) y a la derecha su valor.
- Maximo **5 atributos** por producto (lo valida el servidor en `server.js`).
- Los valores numericos (`499`) y booleanos (`true`) se guardan como number/boolean; el `nombre` siempre queda como texto.

## Estructura
- `products.js` — datos de ejemplo de los 5 productos.
- `load-products.js` — script de carga inicial (`npm run load`).
- `server.js` — app Express que recibe el formulario y guarda en Firestore (`npm start`).
- `public/index.html` — interfaz del formulario.
- `serviceAccountKey.json` — clave del servicio (no se sube a git).