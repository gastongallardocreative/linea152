// Index de schemas
// Acá registramos todos los schemas que Sanity debe conocer
import channel from './channel';
import clip from './clip';
import estacion from './estacion';
import mix from './mix';

export const schemaTypes = [
  channel,
  clip,
  estacion,
  mix,
];