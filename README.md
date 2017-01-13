# react y handlebars

API REST + REACT + HANDLEBARS (NATIVO)

## Instalar requerimientos

Montar la BD de la carpeta `script bd` nombre y contraseña de la bd mysql en `aux.js`

Instalar dependencias como es habitual con

```bash
npm install
```

Para poder construir el código en el cliente hace falta la herramienta en línea de comandos `watchify`. Si no está instalada, se puede instalar con

```bash
npm install watchify -g
```

 
## En el proceso de desarrollo

Para ejecutar el servidor:

```bash
nodemon
```

Para poner en marcha el *build* del cliente, en una **nueva terminal** (sin cerrar el proceso del servidor):

```bash
npm run watch
```

Esto pondrá en marcha la generación del `bundle.js`. Si modificamos cualquier `.js` se regenerará el *bundle*. No hay que cerrar tampoco esta terminal.

Para probar la aplicación acceder a `http://localhost:3000/web`.