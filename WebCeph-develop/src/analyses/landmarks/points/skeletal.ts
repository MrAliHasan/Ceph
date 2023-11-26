import { point } from 'analyses/helpers';

/**
 * Most anterior point on foramen magnum
 */
export const Ba = point('Ba', 'Basion');

/**
 * Most superior point of outline of external auditory meatus
 */
export const Po = point('Po', 'Porion');

/**
 * Most inferior point on margin of orbit
 */
export const Or = point('Or', 'Orbitale');

/**
 * Midpoint of sella turcica
 */
export const S = point('S', 'Sella');

/**
 * Most anterior point on frontonasal suture
 */
export const N = point('N', 'Nasion');
export const Na = N;

/**
 * Most concave point of anterior maxilla
 */
export const A = point('A', 'Subspinale');

/**
 * Most concave point on mandibular symphysis
 */
export const B = point('B', 'Supramentale');

/**
 * Most anterior point of mandibular symphysis
 */
export const Pog = point('Pog', 'Pogonion');

/**
 * Point located perpendicular on madibular symphysis midway between pogonion and menton
 */
export const Gn = point('Gn', 'Gnathion');

/**
 * Junction between inferior surface of the cranial base and the posterior border of the ascending rami of the mandible
 */
export const Ar = point(
  'Ar',
  'Articulare',
  'Junction between inferior surface of the cranial base ' +
  'and the posterior border of the ascending rami of the mandible',
);

/**
 * Most posterior inferior point on angle of mandible.
 * Can also be constructed by bisecting the angle formed by 
 * intersection of mandibular plane and ramus of mandible 
 */
export const Go = point('Go', 'Gonion', 'Most posterior inferior point on angle of mandible');

/**
 * Lowest point on mandibular symphysis
 */
export const Me = point('Me', 'Menton', 'Lowest point on mandibular symphysis');

/**
 * Anterior point on maxillary bone
 */
export const ANS = point(
  'ANS',
  'Anterior nasal spine',
  'Anterior point on maxillary bone',
);

/**
 * Posterior limit of bony palate or maxilla
 */
export const PNS = point(
  'PNS',
  'Poseterior nasal spine', 'Posterior limit of bony palate or maxilla',
);

/** Apex of Upper Incisor */
export const U1_APEX = point(
  'U1 Apex',
  undefined,
  'Apex of Upper Incisor',
);

/** Incisal Edge of Upper Incisor */
export const U1_INCISAL_EDGE = point(
  'U1 Incisal Edge',
  undefined,
  'Incisal Edge of Upper Incisor',
);

/** Apex of Lower Incisor */
export const L1_APEX = point(
  'L1 Apex',
  undefined,
  'Apex of Lower Incisor',
);

/** Incisal Edge of Lower Incisor */
export const L1_INCISAL_EDGE = point(
  'L1 Incisal Edge',
  undefined,
  'Incisal Edge of Lower Incisor',
);

/**
 * The intersection of the inferior border of the foramen rotundum with
 * the posterior wall of the pterygomaxillary fissure.
 */
export const Pt = point(
  'Pt',
  'Pterygomaxillary',
);

/**
 * Protuberance menti or supragonion
 */
export const PM = point(
  'PM',
  'Protuberance menti',
  'Protuberance menti or supragonion',
);

/**
 * The deepest point on the curve of the anterior border of the ramus,
 * one half the distance between the inferior and superior curves.
 */
export const R1 = point('R1-mandible');

/**
 * A point located on the posterior border of the ramus of the mandible.
 */
export const R2 = point('R2-mandible');

/**
 * A point located at the center and most inferior aspect of the sigmoid
 * notch of the ramus of the mandible.
 */
export const R3 = point('R3-mandible');

/**
 * A point on the lower border of the mandible, directly inferior
 * to the center of the sigmoid notch of the ramus.
 */
export const R4 = point('R4-mandible');
