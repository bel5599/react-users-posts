# Reglas del proyecto

- React + TypeScript estricto: no usar `any`; tipar props, estado y respuestas de la API.
- Componentes pequeños, con una sola responsabilidad. La lógica de llamadas a la API va en `src/api/`.
- Cada petición debe mostrar los estados de carga, error y vacío.
- Tests con Testing Library centrados en el comportamiento visible (lo que ve y hace el usuario), no en detalles internos.
- Sin librerías extra si no son necesarias.
- Textos de la interfaz en español.
