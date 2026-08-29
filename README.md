# Firebase Firestore - Carga de Productos

Script en Node.js para cargar productos de ejemplo en una base de datos **Firestore** de Firebase mediante el **Admin SDK**.

## Requisitos previos
- Node.js instalado.
- Un proyecto de Firebase (gratuito).

## Configuracion (una sola vez)
1. Crea un proyecto en https://console.firebase.google.com
2. Dentro del proyecto, crea una base de datos **Cloud Firestore** (modo prueba o produccion).
3. En **Configuracion del proyecto > Cuentas de servicio**, pulsa *Generar nueva clave privada*. Se descarga un archivo JSON.
4. Guarda ese JSON en esta carpeta con el nombre **`serviceAccountKey.json`** (NUNCA lo subas a git).
5. Abre `load-products.js` y reemplaza `tu-project-id-aqui` por el **ID de tu proyecto** de Firebase (aparece en la consola).

## Instalar dependencias
```
npm install
```

## Cargar los productos
```
npm run load
```

## Resultado
Se crea la coleccion `productos` con 5 documentos, cada uno con **a lo sumo 5 atributos**:

| Documento | Atributos |
|-----------|-----------|
| celular-xiaomi-12 | nombre, precio, color, modelo, stock (5) |
| laptop-lenovo-ideapad | nombre, precio, color, modelo, garantia (5) |
| auriculares-sony-wf1000 | nombre, precio, color, modelo, bateria (5) |
| reloj-garmin-forerunner | nombre, precio, color, modelo, resistencia_agua (5) |
| teclado-logitech-mx | nombre, precio, color, modelo, conexion (5) |

Todos los productos cumplen la consigna de **max 5 atributos**.
