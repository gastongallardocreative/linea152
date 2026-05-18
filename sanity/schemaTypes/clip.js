// Schema: Clip
// Define un clip individual dentro de un canal
export default {
  name: 'clip',
  title: 'Clip',
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Título del clip',
      type: 'string',
      description: 'Ej: Hay que ser muy cagon para no defender a los jubilados',
      validation: Rule => Rule.required(),
    },
    {
      name: 'artist',
      title: 'Subtítulo / Banda / Artista',
      type: 'string',
      description: 'Ej: Diego, Charly, Flaco',
    },
    {
      name: 'channel',
      title: 'Canal',
      type: 'reference',
      to: [{ type: 'channel' }],
      description: 'A qué canal pertenece este clip',
      validation: Rule => Rule.required(),
    },
    {
      name: 'youtubeId',
      title: 'YouTube ID',
      type: 'string',
      description: 'La parte después de v= en la URL. Ej: HxjuMPMC4gM',
      validation: Rule => Rule.required(),
    },
    {
      name: 'startSeconds',
      title: 'Inicio (segundos)',
      type: 'number',
      description: 'Desde qué segundo arranca el clip. Ej: 83 (= 1:23)',
      validation: Rule => Rule.required().min(0),
    },
    {
      name: 'endSeconds',
      title: 'Fin (segundos)',
      type: 'number',
      description: 'En qué segundo termina. Ej: 225 (= 3:45)',
      validation: Rule => Rule.required().min(0),
    },
    {
      name: 'filename',
      title: 'Filename fake',
      type: 'string',
      description: 'Ej: maradona_jubilados.avi (minúsculas, sin espacios)',
      validation: Rule => Rule.required(),
    },
    {
      name: 'date',
      title: 'Fecha fake',
      type: 'string',
      description: 'Año o texto libre. Ej: 1992, \'07, OCT 1998',
      validation: Rule => Rule.required(),
    },
    {
      name: 'order',
      title: 'Orden dentro del canal',
      type: 'number',
      description: 'Más bajo = aparece primero en el canal',
      validation: Rule => Rule.required().integer().positive(),
    },
  ],

  preview: {
    select: {
      title: 'title',
      filename: 'filename',
      channelName: 'channel.name',
    },
    prepare(selection) {
      const { title, filename, channelName } = selection;
      return {
        title: title || filename,
        subtitle: `${channelName || 'Sin canal'} · ${filename}`,
      };
    },
  },

  orderings: [
    {
      title: 'Orden manual',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Por canal',
      name: 'byChannel',
      by: [
        { field: 'channel.name', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
};