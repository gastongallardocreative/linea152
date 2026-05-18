// Schema: Canal
// Define la estructura de un canal de TV en Línea 152
export default {
  name: 'channel',
  title: 'Canal',
  type: 'document',

  fields: [
    {
      name: 'name',
      title: 'Nombre del canal',
      type: 'string',
      description: 'Ej: El Pibe de oro, Rompan todo',
      validation: Rule => Rule.required(),
    },
    {
      name: 'number',
      title: 'Número (CH XX)',
      type: 'string',
      description: 'Dos dígitos, ej: 01, 02, 03',
      validation: Rule => Rule.required().max(2),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Identificador único, generado automáticamente',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'color',
      title: 'Color principal (hex)',
      type: 'string',
      description: 'Ej: #FFD700 (incluí el #)',
      validation: Rule => Rule.required(),
    },
    {
      name: 'colorSecondary',
      title: 'Color secundario (hex)',
      type: 'string',
      description: 'Color de apoyo, también con #',
    },
    {
      name: 'order',
      title: 'Orden en el dropdown',
      type: 'number',
      description: 'Más bajo = aparece primero (1, 2, 3...)',
      validation: Rule => Rule.required().integer().positive(),
    },
  ],

  // Cómo se ve cada canal en la lista del Studio
  preview: {
    select: {
      name: 'name',
      number: 'number',
      color: 'color',
    },
    prepare(selection) {
      const { name, number, color } = selection;
      return {
        title: name,
        subtitle: `CH ${number} · ${color}`,
      };
    },
  },

  // Orden por default en la lista
  orderings: [
    {
      title: 'Orden manual',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
};