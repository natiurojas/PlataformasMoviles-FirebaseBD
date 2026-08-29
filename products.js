// =====================================================
//  PRODUCTOS DE EJEMPLO PARA FIRESTORE
//  Cada producto tiene a lo sumo 5 atributos.
//  El campo "id" se usa como identificador del documento.
// =====================================================

const products = [
  {
    id: "celular-xiaomi-12",
    nombre: "Xiaomi 12",
    precio: 499,
    color: "Azul",
    modelo: "Mi 12",
    stock: 25
  },
  {
    id: "laptop-lenovo-ideapad",
    nombre: "Laptop Lenovo IdeaPad 3",
    precio: 729,
    color: "Negro",
    modelo: "IdeaPad 3",
    garantia: "2 años"
  },
  {
    id: "auriculares-sony-wf1000",
    nombre: "Auriculares Sony WF-1000XM4",
    precio: 279,
    color: "Negro",
    modelo: "WF-1000XM4",
    bateria: "8 horas"
  },
  {
    id: "reloj-garmin-forerunner",
    nombre: "Reloj Garmin Forerunner 245",
    precio: 349,
    color: "Gris",
    modelo: "Forerunner 245",
    resistencia_agua: true
  },
  {
    id: "teclado-logitech-mx",
    nombre: "Teclado Logitech MX Keys",
    precio: 119,
    color: "Grafito",
    modelo: "MX Keys",
    conexion: "Bluetooth"
  }
];

module.exports = products;
