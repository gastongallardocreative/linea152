export default {
  name: 'mix',
  title: 'Mix',
  type: 'document',

  fields: [
    {
      name: 'titulo',
      title: 'Título del mix',
      type: 'string',
      description: 'Ej: Rock de los 80s — lado A',
      validation: Rule => Rule.required(),
    },
    {
      name: 'estacion',
      title: 'Estación',
      type: 'reference',
      to: [{ type: 'estacion' }],
      description: 'A qué estación pertenece este mix',
      validation: Rule => Rule.required(),
    },
    {
      name: 'soundcloudUrl',
      title: 'URL de SoundCloud',
      type: 'url',
      description: 'URL pública del mix. Ej: https://soundcloud.com/usuario/nombre-del-mix',
      validation: Rule => Rule.required().uri({ scheme: ['https'] }),
    },
    {
      name: 'portada',
      title: 'Portada (artwork)',
      type: 'image',
      description: 'Imagen tipo carátula de cassette. Obligatoria.',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    },
    {
      name: 'duracion',
      title: 'Duración (opcional)',
      type: 'string',
      description: 'Texto libre. Ej: 1h 45min',
    },
    {
      name: 'dj',
      title: 'DJ / Autor (opcional)',
      type: 'string',
      description: 'Ej: DJ Pablito, Colección Mandioca',
    },
  ],

  preview: {
    select: {
      titulo: 'titulo',
      estacionNombre: 'estacion.nombre',
      portada: 'portada',
      dj: 'dj',
    },
    prepare({ titulo, estacionNombre, portada, dj }) {
      return {
        title: titulo,
        subtitle: `${estacionNombre || 'Sin estación'}${dj ? ' · ' + dj : ''}`,
        media: portada,
      };
    },
  },
};
