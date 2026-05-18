import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'q9smgvtw',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

export const channelsQuery = `
  *[_type == "channel"] | order(order asc) {
    "id": slug.current,
    number,
    name,
    color,
    colorSecondary,
    "clips": *[_type == "clip" && references(^._id)] | order(order asc) {
      youtubeId,
      startSeconds,
      endSeconds,
      filename,
      date,
      title,
      artist
    }
  }
`;

export const estacionesQuery = `
  *[_type == "estacion"] | order(orden asc) {
    "id": slug.current,
    nombre,
    genero,
    frecuencia,
    colorPrimario,
    descripcion,
    orden,
    "mixes": *[_type == "mix" && references(^._id)] {
      _id,
      titulo,
      soundcloudUrl,
      "portada": portada.asset->url,
      duracion,
      dj
    }
  }
`;
