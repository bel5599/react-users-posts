# Usuarios y publicaciones

Pequeña app en React + TypeScript que consume la API pública
[JSONPlaceholder](https://jsonplaceholder.typicode.com): lista de usuarios con búsqueda,
publicaciones de cada usuario y creación de nuevas publicaciones con un formulario validado.

## Cómo ejecutarlo

Requisitos: Node 20 o superior.

```bash
npm install
npm run dev        # app en http://localhost:5173
npx vitest run     # tests
npm run lint       # linter
```

## Funcionalidades

- Lista de usuarios con búsqueda por nombre (sin distinguir mayúsculas).
- Al elegir un usuario se cargan sus publicaciones.
- Formulario para crear una publicación: título y texto obligatorios, con mensajes de error.
  La API simula la creación y la publicación nueva aparece la primera en la lista.
- Estados de carga, error y lista vacía visibles en cada petición.
- Diseño adaptable (dos columnas en escritorio, una en móvil) y modo oscuro.

## Estructura

```
src/
  api/client.ts         llamadas a la API (los componentes no usan fetch directamente)
  hooks/useUsers.ts     carga de usuarios con estados de carga y error
  hooks/usePosts.ts     carga de publicaciones de un usuario + addPost
  components/           UserList, UserPosts, PostList, NewPostForm
  types.ts              tipos User, Post y NewPost
```

## Decisiones

- **Capa de API separada** (`src/api/`): los componentes no saben nada de `fetch`, como un
  servicio en .NET. Facilita los tests, porque se puede simular entera.
- **Hooks propios** (`useUsers`, `usePosts`) para separar la lógica de carga de la vista.
- **Condición de carrera:** si se cambia rápido de usuario, una respuesta antigua podría
  pintarse con el usuario nuevo seleccionado. Lo evito con una bandera `ignore` en la
  limpieza del `useEffect`.
- **`key={user.id}` en el panel de publicaciones:** al cambiar de usuario, React crea el
  componente de nuevo y el estado (carga, error, formulario) empieza limpio.
- **IDs repetidos de la API:** JSONPlaceholder siempre devuelve `id: 101` al crear. Si se
  crean dos publicaciones se repetirían las `key` de React, así que asigno un id local único.
- **Búsqueda como estado derivado:** la lista filtrada se calcula en cada render a partir de
  los usuarios y el texto de búsqueda, sin guardar una copia en otro estado.
- **Validación propia sin librerías:** con dos campos no compensa añadir dependencias.
  `trim()` evita que un texto con solo espacios cuente como válido.
- **Accesibilidad:** botones reales para elegir usuario (funcionan con teclado),
  `aria-pressed` para el seleccionado, `label` en los campos y `role="alert"` en los errores.
  Los tests y los estilos usan esos mismos atributos.
- **Tests de comportamiento** con Testing Library: buscan elementos como lo haría un usuario
  (por rol y etiqueta) y la API está simulada para no depender de la red.

## Qué haría con más tiempo

- Usar **TanStack Query** para caché, reintentos y no repetir peticiones al volver a un usuario.
- Paginación o virtualización si la lista de usuarios fuera grande.
- Mostrar el error de cada campo junto a él con `aria-describedby` y mover el foco al primer error.
- Tests del caso de error al crear una publicación y de la condición de carrera.
- Tests end-to-end con Playwright.

## Cómo usé la IA

Trabajé con **Claude Code** como compañero de programación, con un `CLAUDE.md` con las reglas
del proyecto: TypeScript sin `any`, componentes pequeños, estados de carga y error, y tests de comportamiento.

**Qué le pedí:** la configuración de Vitest y Testing Library, explicaciones de TypeScript
(vengo de JavaScript y C#), revisión de mi código, propuestas para el formulario, los estilos y
los tests.

**Qué escribí yo con su guía:** los tipos, el cliente de la API, el hook `useUsers`, la lista
con búsqueda y la integración en `App`. La IA revisó cada paso y me señaló errores (tipos
equivocados, imports sin usar, `||` en lugar de `??`).

**Qué acepté:** el formulario, los estilos y los tests los propuso la IA; los revisé, los
probé en el navegador y entiendo cada parte.

**Qué corregí o decidí yo:**
- Elegí ESLint en lugar de Oxlint por ser el estándar.
- La IA propuso reiniciar `loading` y `error` dentro del `useEffect`; el linter de React lo
  marcó como mala práctica (renders en cascada). Lo resolví con la `key` por usuario.
- La IA me avisó de que la API repite el id: 101; lo comprobé y asigno un id local único.
- La IA me señaló la condición de carrera al cambiar de usuario; la resolví con la bandera `ignore`.

## Tiempo

Unas 2 h y 30 min - 3 h, incluyendo la configuración del entorno.
