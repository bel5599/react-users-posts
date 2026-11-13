# Notas de uso de IA (borrador para el README)

## Qué le pedí
- Configuración de Vitest + Testing Library.

## Qué acepté
La IA me explicó por qué usar ?? en lugar de || y por qué filtered es estado derivado y no un useState."

## Qué corregí o decidí yo
- Elegí ESLint en lugar de Oxlint por ser el estándar.

Separe las llamadas a la API en src/api/ para que los componentes no sepan nada de fetch, igual que un servicio en .NET.

La IA me señaló la condición de carrera al cambiar rápido de usuario; la resolví con una bandera ignore en la limpieza del useEffect.

La IA me propuso reiniciar loading y error dentro del useEffect; el linter de React lo marcó como mala práctica. Lo resolví dando al componente de publicaciones una key con el id del usuario, para que React lo cree de nuevo al cambiar de usuario y el estado empiece limpio solo.

Pedí a la IA estilos sencillos; sustituí los del ejemplo de Vite.
