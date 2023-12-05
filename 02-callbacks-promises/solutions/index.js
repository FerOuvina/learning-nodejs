// 1 - Arregla esta función para que el código posterior funcione como se espera:

import net from 'node:net';
import fs from 'node:fs';

export const ping = (ip, callback) => {
  const startTime = process.hrtime();

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end();
    callback(null, { time: process.hrtime(startTime), ip });
  });

  client.on('error', (err) => {
    callback(err);
    client.end();
  });
};

ping('midu.dev', (err, info) => {
  if (err) console.error(err);
  console.log(info);
});

// 2 - Transforma la siguiente función para que funcione con promesas en lugar de callbacks:

export function obtenerDatosPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve({ data: 'datos importantes' });
      } catch (error) {
        reject(error);
      }
    }, 2000);
  });
}

// Promise.then()
obtenerDatosPromise()
  .then((info) => console.log(info))
  .catch((error) => {
    console.error(error);
  });

// await, try, catch
try {
  const info = await obtenerDatosPromise();
  console.log(info);
} catch (error) {
  console.error(error);
}

// 3 - Explica qué hace la funcion. Identifica y corrige los errores en el siguiente código. Si ves algo innecesario, elimínalo. Luego mejoralo para que siga funcionando con callback y luego haz lo que consideres para mejorar su legibilidad.

export function procesarArchivo(callback) {
  // La funcion lee el archivo "input.txt", si hay un error devuelve el error por la consola, caso contrario convierte el contenido del archivo a mayusculas, seguido de eso intenta escribir el resultado en otro archivo "output.txt", de haber un error lo escribe en la consola, caso contrario se escribe en la consola que el proceso ha tenido exito.

  fs.readFile('input.txt', 'utf8', (error, contenido) => {
    if (error) {
      console.error('Error leyendo archivo:', error.message);
      callback(error);
    }

    const textoProcesado = contenido.toUpperCase();

    fs.writeFile('output.txt', textoProcesado, (error) => {
      if (error) {
        console.error('Error guardando archivo:', error.message);
        callback(error);
      }
      console.log('Archivo procesado y guardado con éxito');
      callback(null);
    });
  });
}
