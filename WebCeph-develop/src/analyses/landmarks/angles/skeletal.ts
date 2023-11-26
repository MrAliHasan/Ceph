import { S, N, A, B, Ar, Pog, Go, Me, Gn, ANS } from 'analyses/landmarks/points/skeletal';
import { Xi } from 'analyses/landmarks/points/skeletal-custom';
import {
  FH, NPog, dentalPlane,
  SN,
  MP, SPP, U1Axis, L1Axis,
} from 'analyses/landmarks/lines/skeletal';
import {
  line,
  angleBetweenLines,
  angleBetweenPoints,
  flipVector,
  defaultInterpetLandmark,
  composeInterpretation,
} from 'analyses/helpers';
import {
  getVectorPoints,
  createVectorFromPoints,
  radiansToDegrees,
  calculateAngle,
  isBehind,
} from 'utils/math';

/**
 * SNA (sella, nasion, A point) indicates whether or not the maxilla is normal, prognathic, or retrognathic.
 */
export const SNA: CephAngle = {
  ...angleBetweenPoints(S, N, A),
  interpret: defaultInterpetLandmark(
    'maxilla',
    ['retrognathic', 'normal', 'prognathic'],
  ),
};

/**
 * SNB (sella, nasion, B point) indicates whether or not the mandible is normal, prognathic, or retrognathic.
 */
export const SNB: CephAngle = {
  ...angleBetweenPoints(S, N, B),
  interpret: defaultInterpetLandmark(
    'mandible',
    ['retrognathic', 'normal', 'prognathic'],
  ),
};

/**
 * ANB (A point, nasion, B point) indicates whether the skeletal relationship between
 * the maxilla and mandible is a normal skeletal class I (+2 degrees),
 * a skeletal Class II (+4 degrees or more), or skeletal class III (0 or negative) relationship.
 */
export const ANB: CephAngle = {
  ...angleBetweenLines(line(N, A), line(N, B)),
  calculate: () => (lineNA: GeoVector, lineNB: GeoVector) => (angle: GeoAngle) => {
    const [, A] = getVectorPoints(lineNA);
    const positiveValue = Math.abs(radiansToDegrees(calculateAngle(angle)));
    if (isBehind(A, lineNB)) {
      return -1 * positiveValue;
    }
    return positiveValue;
  },
  interpret(value, min, max, mean): Array<LandmarkInterpretation<'skeletalPattern'>> {
    if (value > 0 && value < 2) {
      return [{
        category: 'skeletalPattern',
        indication: 'tendency_for_class3',
        value, min, max, mean,
      }];
    }
    return defaultInterpetLandmark(
      'skeletalPattern',
      ['class3', 'class1', 'class2'],
    )(value, min || 2, max || 4, 2);
  },
};

/**
 * Angle between Frankfort horizontal line and the line intersecting Gonion-Menton
 */
export const FMPA: CephAngle = {
  ...angleBetweenLines(
    FH, MP,
    'Frankfort Mandibular Plane Angle',
    'FMPA',
  ),
  interpret: defaultInterpetLandmark(
    'mandibularRotation',
    ['counterclockwise', 'normal', 'clockwise'],
  ),
};

/**
 * Angle between Frankfort horizontal line and the line intersecting Gonion-Menton
 */
export const FMA = FMPA;

/**
 * Angle between SN and the mandibular plane
 */
export const SN_MP: CephAngle = angleBetweenLines(
  SN, MP,
  'SN-MP',
  'SN-MP',
);

/**
 * Saddle Angle
 */
export const NSAr = angleBetweenPoints(N, S, Ar, 'Saddle Angle');

/**
 * Articular Angle
 */
export const SArGo = angleBetweenPoints(S, Ar, Go, 'Articular Angle');

/**
 * Gonial Angle
 */
export const ArGoMe = angleBetweenPoints(Ar, Go, Me, 'Gonial Angle');

/**
 * 
 */
export const MM: CephAngle = {
  ...angleBetweenLines(SPP, MP, undefined, 'MM'),
  interpret: defaultInterpetLandmark(
    'skeletalBite',
    ['closed', 'normal', 'open'],
  ),
};

/**
 * Angle between the upper incisor to S-N line
 */
export const U1_SN: CephAngle = {
  ...angleBetweenLines(line(N, S), U1Axis, undefined, 'U1-SN'),
  interpret: defaultInterpetLandmark(
    'upperIncisorInclination',
    ['palatal', 'normal', 'labial'],
  ),
};

/**
 * Incisor Mandibular Plane Angle
 * Angle between the lower incisor to the mandibular plane
 */
export const L1_MP: CephAngle = {
  ...angleBetweenLines(
    line(Me, Go), L1Axis,
    'Incisor Mandibular Plane Angle',
    'IMPA',
  ),
  interpret: defaultInterpetLandmark(
    'lowerIncisorInclination',
    ['lingual', 'normal', 'labial'],
  ),
};

/**
 * The interincisal angulation relates the relative position of the maxillary
 * incisor to that of the mandibular incisor.
 */
export const interincisalAngle: CephAngle = {
  ...angleBetweenLines(
    flipVector(U1Axis),
    flipVector(L1Axis),
    'Interincisal Angle',
    'U1-L1',
  ),
  // @TODO: add interpretation
};

/**
 * Incisor Mandibular Plane Angle
 * Angle between the lower incisor to the mandibular plane
 */
export const IMPA = L1_MP;

/**
 * Frankfort–mandibular incisor angle
 * Angle between the lower incisor to the Frankfort plane
 */
export const FMIA = angleBetweenLines(
  FH, L1Axis,
  'Frankfort–mandibular incisor angle',
  'FMIA',
);

/**
 * The y-axis is measured as the acute angle formed by the intersection of a line
 * from the sella turcica to gnathion with the FH.
 * This angle is larger in Class II facial patterns than in Class III tendencies.
 * The y-axis indicates the degree of the downward, rearward, or forward position
 * of the chin in relation to the upper face.
 */
export const yAxis: CephAngle = {
  ...angleBetweenLines(
    line(S, Gn),
    FH,
    'Y Axis-FH Angle',
    'Y-FH Angle',
  ),
  interpret: defaultInterpetLandmark(
    'growthPattern',
    ['horizontal', 'normal', 'vertical'],
  ),
};

/**
 * The angle of convexity is formed by the intersection of line N–point A
 * to point A–Pog. This angle measures the degree of the maxillary basal arch
 * at its anterior limit (point A) relative to the total facial profile (N-Pog).
 */
export const downsAngleOfConvexity: CephAngle = {
  ...angleBetweenLines(line(A, N), flipVector(dentalPlane), 'Angle of Convexity', 'NAPog'),
  /**
   * This angle is read in positive or negative degrees from zero.
   * If the line Pog–point A is extended and located anterior to the N-A
   * line, the angle is read as positive.
   */
  calculate: () => (AN: GeoVector, PogA: GeoVector) => (angle: GeoAngle) => {
    const [Pog, A] = getVectorPoints(PogA);
    const [   , N] = getVectorPoints(AN);
    const NPog = createVectorFromPoints(N, Pog);
    const positiveValue = Math.abs(
      radiansToDegrees(calculateAngle(angle)),
    );
    if (isBehind(A, NPog)) {
      return -1 * positiveValue;
    }
    return positiveValue;
  },
  /**
   * A positive angle suggests prominence of the maxillary dental base
   * relative to the mandible. A negative angle of convexity is associated
   * with a prognathic profile. The range extends from a minimum of –8.5
   * to a maximum of 10 degrees, with a mean reading of 0 degrees.
   */
  interpret: defaultInterpetLandmark(
    'skeletalProfile',
    ['concave', 'normal', 'convex'],
  ),
};

/**
 * The A-B plane is a measure of the relation of the anterior limit of the
 * apical bases to each other relative to the facial line.
 * It represents an estimate of the difficulty in obtaining the correct
 * axial inclination and incisor relationship when using orthodontic therapy.
 */
export const downsABPlaneAngle: CephAngle = {
  ...angleBetweenLines(line(B, A), line(Pog, N), 'A-B Plane Angle'),
  calculate: () => (lineBA: GeoVector, linePogN: GeoVector) => (angle: GeoAngle) => {
    const [, A] = getVectorPoints(lineBA);
    const positiveValue = Math.abs(
      radiansToDegrees(calculateAngle(angle)),
    );
    if (!isBehind(A, linePogN)) {
      return -1 * positiveValue;
    }
    return positiveValue;
  },

  /**
   * Because point B is positioned behind point A, this angle is usually negative in value,
   * except in Class III malocclusions or Class I occlusions with prominence of the mandible.
   * A large negative value suggests a Class II facial pattern. The readings extend from
   * a maximum of 0 degrees to a minimum of –9 degrees, with a mean reading of -4.6 degrees.
   */
  interpret: defaultInterpetLandmark(
    'skeletalPattern',
    ['class3', 'class1', 'class2'],
  ),
};

/**
 * The facial angle is used to measure the degree of retrusion or protrusion of the mandible.
 * This is the inferior inside angle in which the facial line (nasion-pogonion).
 */
export const facialAngle: CephAngle = {
  ...angleBetweenLines(flipVector(FH), NPog, 'Facial Angle'),
  interpret: composeInterpretation(
    defaultInterpetLandmark('skeletalProfile', ['concave', 'normal', 'convex']),
    defaultInterpetLandmark('chin', ['recessive', 'normal', 'prominent']),
  ),
};

/**
 * Mandibular incisor inclination.
 * The angle between the long axis of the mandibular incisor
 * and the A-Pog line (1 to A-Pog) is measured to provide some idea
 * of mandibular incisor procumbency.
 */
export const L1ToDentalPlaneAngle: CephAngle = {
  ...angleBetweenLines(L1Axis, flipVector(dentalPlane)),
  interpret: defaultInterpetLandmark(
    'lowerIncisorInclination',
    ['lingual', 'normal', 'labial'],
  ),
};

export const lowerFacialHeightAngle: CephAngle = {
  ...angleBetweenPoints(
    ANS, Xi, Pog,
    'Lower facial height angle',
  ),
  interpret: defaultInterpetLandmark(
    'lowerIncisorInclination',
    ['lingual', 'normal', 'labial'],
  ),
};
