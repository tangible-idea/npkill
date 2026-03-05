<p align="center">
  <img src="./docs/npkill-text-clean.svg" width="380" alt="flutterkill logo" />
</p>
<p align="center">
<img alt="npm" src="https://img.shields.io/npm/dy/flutterkill.svg">
<img alt="npm version" src="https://img.shields.io/npm/v/flutterkill.svg">
<img alt="NPM" src="https://img.shields.io/npm/l/flutterkill.svg">
</p>

### Encuentra y **elimina** fácilmente artefactos de compilación de Flutter :sparkles:

Esta herramienta te permite listar los directorios de compilación de Flutter/Dart (`build`, `.dart_tool`, `.gradle`, `Pods`, etc.) en tu sistema, además del espacio que ocupan. Entonces puedes seleccionar los que quieras borrar para liberar espacio.

> Basado en **npkill** ([github.com/voidcosmos/npkill](https://github.com/voidcosmos/npkill))

## i18n

Nos estamos esforzando por internacionalizar la documentación de Flutterkill. Aquí tienes una lista de las traducciones disponibles:

- [Español](./README.es.md)
- [Indonesian](./README.id.md)
- [한국어](./README.ko.md)
- [Português](./README.pt.md)
- [Turkish](./README.tr.md)

## Table of Contents

- [Características](#features)
- [Instalación](#installation)
- [Uso](#usage)
  - [Opciones](#options)
  - [Ejemplos](#examples)
- [Configuración local](#setup-locally)
- [Roadmap](#roadmap)
- [Bugs conocidos](#known-bugs)
- [Cómo contribuir](#contributing)
- [Invítanos a un café](#donations)
- [Licencia](#license)

<a name="features"></a>

# :heavy_check_mark: Características

- **Libera espacio:** Elimina tus artefactos de compilación de Flutter viejos y polvorientos que le roban espacio a tu máquina.

- **Escaneo inteligente de Flutter:** Solo escanea directorios con `pubspec.yaml` (proyectos Flutter reales). Excluye automáticamente el SDK de Flutter.

- **Último uso del Workspace**: Comprueba cuándo ha sido la última vez que has modificado un fichero en el workspace (indicado en la columna **last_mod**).

- **Rapidez:** Flutterkill está escrito en TypeScript, pero las búsquedas se llevan a cabo a bajo nivel, lo que supone una mejora considerable del rendimiento.

- **Fácil de utilizar:** Despídete de comandos largos y difíciles. Utilizar Flutterkill es tan sencillo como leer la lista de tus carpetas build, y pulsar la tecla Del para eliminarlos. ¿Podría ser más fácil? ;)

- **Minificado:** Apenas tiene dependencias.

<a name="installation"></a>

# :cloud: Instalación

¡Lo mejor es que no tienes que instalar Flutterkill para utilizarlo!
Simplemente utiliza el siguiente comando:

```bash
$ npx flutterkill
```

O, si por alguna razón te apetece instalarlo:

```bash
$ npm i -g flutterkill
# Los usuarios de Unix quizá tengan que ejecutar el comando con sudo. Ve con cuidado
```

<a name="usage"></a>

# :clipboard: Uso

```bash
$ npx flutterkill
# o solo flutterkill si está instalado de forma global
```

Por defecto, Flutterkill comenzará la búsqueda de artefactos de compilación de Flutter comenzando en la ruta donde se ejecute el comando `flutterkill`.

Muévete por los distintos directorios listados con <kbd>↓</kbd> <kbd>↑</kbd>, y utiliza <kbd>Space</kbd> para borrar el directorio seleccionado.

También puedes usar <kbd>j</kbd> y <kbd>k</kbd> para moverte por los resultados.

Puedes abrir el directorio donde se aloja el resultado seleccionado pulsando <kbd>o</kbd>.

Para salir de Flutterkill, utiliza <kbd>Q</kbd>, o si te sientes valiente, <kbd>Ctrl</kbd> + <kbd>c</kbd>.

**¡Importante!** Eliminar carpetas `build` o `.dart_tool` significa que la siguiente compilación requerirá `flutter pub get` y una recompilación completa. Flutterkill te mostrará un :warning: para que sepas que tienes que tener cuidado.

<a name="options"></a>

## Opciones

| ARGUMENTO                        | DESCRIPCIÓN                                                                                                                                                    |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -c, --bg-color                   | Cambia el color de selección de la fila. _(Colores disponibles: **azul**, cyan, magenta, blanco, rojo y amarillo)_                                             |
| -d, --directory                  | Permite seleccionar el directorio desde el que comienza la búsqueda. Por defecto, se empieza en .                                                              |
| -D, --delete-all                 | Borra automáticamente todos los node_modules que se encuentren. Recomendable utilizar junto a `-x`                                                             |
| -e, --hide-errors                | Esconde los errores en el caso de que ocurra alguno                                                                                                            |
| -E, --exclude                    | Excluye directorios de la búsqueda (la lista de directorios debe estar entre comillas dobles "", cada directorio separado por ',' Ejemplo: "ignore1, ignore2") |
| -f, --full                       | Comienza la búsqueda en el home del usuario (ejemplo: "/home/user" en Linux)                                                                                   |
| -gb                              | Muestra el tamaño en Gigabytes en lugar de en Megabytes.                                                                                                       |
| -h, --help, ?                    | Muestra esta página de ayuda y finaliza                                                                                                                        |
| -nu, --no-check-update           | No comprobar si hay actualizaciones al iniciar la aplicación                                                                                                   |
| -s, --sort                       | Ordena los resultados por: `size`, `path` or `last-mod`                                                                                                        |
| -t, --target                     | Especifica el nombre del directorio que se buscará (por defecto es node_modules)                                                                               |
| -x, --exclude-hidden-directories | Excluye directorios ocultos (directorios "dot") de la búsqueda                                                                                                 |
| --dry-run                        | No borra nada (simula un tiempo de borrado aleatorio)                                                                                                          |
| -v, --version                    | Muestra la versión de Flutterkill                                                                                                                              |

**Precaución:** _Algunos comandos pueden cambiar en versiones futuras_

<a name="examples"></a>

## Ejemplo

- Busca los artefactos de compilación de Flutter en un directorio _projects_:

```bash
flutterkill -d ~/projects

# otra alternativa:
cd ~/projects
flutterkill
```

- Excluye directorios específicos de la búsqueda:

```bash
flutterkill -d ~/projects --exclude "flutter_sdk, ignore-this"
```

- Borra automáticamente todos los artefactos de compilación de Flutter en el directorio _backups_:

```bash
flutterkill -d ~/backups/ --delete-all
```

<a name="setup-locally"></a>

# :pager: Configuración local

```bash
# -- Primero, clona el repositorio
git clone https://github.com/tangible-idea/npkill.git

# -- Navega al dir
cd npkill

# -- Instala las dependencias
npm install

# -- ¡Y ejecuta!
npm run start


# -- Si quieres ejecutar con algún parámetro, hay que añadir "--", tal y como se muestra a continuación:
npm run start -- -f -e
```

<a name="roadmap"></a>

# :crystal_ball: Roadmap

- [x] Lanzar la versión 0.1.0 !
- [x] Mejorar el código
  - [x] Mejorar el rendimiento
  - [ ] ¡Mejorar el rendimiento aún más!
- [x] Ordenar los resultados por tamaño y ruta
- [x] Permitir la búsqueda de otro tipo de directorios (targets)
- [ ] Reducir las dependencies para ser un módulo más minimalista
- [ ] Permitir el filtrado por directorios que no se hayan utilizado en un periodo de tiempo determinado
- [ ] Crear una opción para mostrar los directorios en formato árbol
- [x] Añadir menús
- [x] Añadir un servicio de logs
- [ ] Limpieza periódica y automática (?)

<a name="known-bugs"></a>

# :bug: Bugs conocidos :bug:

- A veces, el CLI se bloquea mientras un directorio se está borrando.
- La ordenación, especialmente por rutas, puede ralentizar la terminal cuando haya muchos resultados al mismo tiempo.
- A veces, los cálculos de tamaño son mayores de lo que deberían ser.
- (RESUELTO) Problemas de rendimiento al hacer la búsqueda desde directorios de alto nivel (como / en Linux).
- (RESUELTO) A veces el texto se colapsa al actualizar el CLI.
- (RESUELTO) Analizar el tamaño de los directorios tarda más de lo que debería.

> Si encuentras algún bug, no dudes en abrir un issue :)

<a name="contributing"></a>

# :revolving_hearts: Cómo contribuir

Si quieres contribuir, échale un vistazo al [CONTRIBUTING.md](.github/CONTRIBUTING.es.md)

<a name="donations"></a>

# :coffee: Invítanos a un café

<img align="right" width="300" src="https://npkill.js.org/img/cat-donation-cup.png">
El npkill original fue desarrollado por [Nya García Gallardo](https://github.com/NyaGarcia) y [Juan Torres Gómez](https://github.com/zaldih). Flutterkill es un fork enfocado en Flutter por [Mark Choi](https://github.com/tangible-idea).

<a name="license"></a>

# :scroll: Licencia

MIT © [Mark Choi](https://github.com/tangible-idea)

> npkill original: MIT © [Nya García Gallardo](https://github.com/NyaGarcia) y [Juan Torres Gómez](https://github.com/zaldih)

---
