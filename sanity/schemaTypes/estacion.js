export default {
  name: 'estacion',
  title: 'Estación de radio',
  type: 'document',

  fields: [
    {
      name: 'nombre',
      title: 'Nombre de la estación',
      type: 'string',
      description: 'Ej: La Balsa, Enganchados, Café Tortoni',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nombre', maxLength: 96 },
      validation: Rule => Rule.required(),
    },
    {
      name: 'genero',
      title: 'Género',
      type: 'string',
      description: 'Ej: Rock nacional, Cumbia, Tango / Folklore',
      validation: Rule => Rule.required(),
    },
    {
      name: 'frecuencia',
      title: 'Frecuencia (decorativa)',
      type: 'string',
      description: 'Ej: 88.5 FM — solo para el display, no tiene que ser real',
      validation: Rule => Rule.required(),
    },
    {
      name: 'colorPrimario',
      title: 'Color primario (hex)',
      type: 'string',
      description: 'Color del LED del boombox. Ej: #FF6B00 (incluí el #)',
      validation: Rule => Rule.required(),
    },
    {
      name: 'descripcion',
      title: 'Descripción corta',
      type: 'text',
      rows: 2,
      description: 'Tagline breve que aparece en el display. Ej: El rock que hizo historia',
    },
    {
      name: 'orden',
      title: 'Orden en el dial',
      type: 'number',
      description: 'Más bajo = aparece primero en los presets (1, 2, 3...)',
      validation: Rule => Rule.required().integer().positive(),
    },
  ],

  preview: {
    select: { nombre: 'nombre', frecuencia: 'frecuencia', genero: 'genero' },
    prepare({ nombre, frecuencia, genero }) {
      return {
        title: nombre,
        subtitle: `${frecuencia} · ${genero}`,
      };
    },
  },

  orderings: [
    {
      title: 'Orden en el dial',
      name: 'ordenAsc',
      by: [{ field: 'orden', direction: 'asc' }],
    },
  ],
};
