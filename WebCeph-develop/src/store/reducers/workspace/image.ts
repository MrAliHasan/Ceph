import { handleActions } from 'utils/store';
import some from 'lodash/some';
import omit from 'lodash/omit';

import { createSelector } from 'reselect';

const KEY_IMAGES: StoreKey = 'images.props';
const KEY_IMAGES_LOAD_STATUS: StoreKey = 'images.status';
const KEY_TRACING: StoreKey = 'images.tracing';

const imagesReducer = handleActions<typeof KEY_IMAGES>(
  {
    SET_IMAGE_PROPS: (state, { payload }) => {
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          ...payload,
        },
      };
    },
    LOAD_IMAGE_SUCCEEDED: (state, { payload }) => {
      return {
        ...state,
        [payload.id]: {
          name: null,
          type: 'ceph_lateral',
          scaleFactor: null,
          flipX: false,
          flipY: false,
          brightness: 0.5,
          contrast: 0.5,
          invertColors: false,
          analysis: {
            activeId: null,
          },
          ...state[payload.id],
          ...payload,
        },
      };
    },
    CLOSE_IMAGE_REQUESTED: (state, { payload: { imageId } }) => {
      return omit(state, imageId) as typeof state;
    },
    SET_SCALE_FACTOR_REQUESTED: (state, { payload: { imageId, value } }) => {
      return {
        ...state,
        [imageId]: {
          ...state[imageId],
          scaleFactor: value,
        },
      };
    },
    UNSET_SCALE_FACTOR_REQUESTED: (state, { payload: { imageId } }) => {
      return {
        ...state,
        [imageId]: {
          ...state[imageId],
          scaleFactor: null,
        },
      };
    },
  },
  {},
);

const loadStatusReducer = handleActions<typeof KEY_IMAGES_LOAD_STATUS>({
  LOAD_IMAGE_FAILED: (state, { payload: { id, error } }) => {
    return {
      ...state,
      [id]: {
        isLoading: false,
        error,
      },
    };
  },
  LOAD_IMAGE_STARTED: (state, { payload: { imageId } }) => {
    return {
      ...state,
      [imageId]: {
        isLoading: true,
        error: null,
      },
    };
  },
  LOAD_IMAGE_SUCCEEDED: (state, { payload: { id } }) => {
    return {
      ...state,
      [id]: {
        isLoading: false,
        error: null,
      },
    };
  },
  CLOSE_IMAGE_REQUESTED: (state, { payload: id }) => {
    return omit(state, id) as typeof state;
  },
}, {});

const tracingReducer = handleActions<typeof KEY_TRACING>({
  SET_IMAGE_PROPS: (state, { payload: { id, tracing } }) => {
    if (tracing) {
      return {
        ...state,
        [id]: {
          ...state[id],
          ...tracing,
        },
      };
    }
    return state;
  },
  SET_TRACING_MODE_REQUESTED: (state, { payload: { imageId, mode } }) => {
    return {
      ...state,
      [imageId]: {
        ...state[imageId],
        mode,
      },
    };
  },
  ADD_MANUAL_LANDMARK_REQUESTED: (state, { payload }) => {
    const { imageId, symbol, value } = payload;
    return {
      ...state,
      [imageId]: {
        ...state[imageId],
        manualLandmarks: {
          ...state[imageId].manualLandmarks,
          [symbol]: value,
        },
      },
    };
  },
  REMOVE_MANUAL_LANDMARK_REQUESTED: (state, { payload }) => {
    const { imageId, symbol } = payload;
    return {
      ...state,
      [imageId]: {
        ...state[imageId],
        manualLandmarks: {
          ...omit(state[imageId].manualLandmarks, symbol),
        },
      },
    };
  },
  SKIP_MANUAL_STEP_REQUESTED: (state, { payload: { imageId, step } }) => {
    return {
      ...state,
      [imageId]: {
        ...state[imageId],
        skippedSteps: {
          ...state[imageId].skippedSteps,
          [step]: true,
        },
      },
    };
  },
  UNSKIP_MANUAL_STEP_REQUESTED: (state, { payload: { imageId, step } }) => {
    return {
      ...state,
      [imageId]: {
        ...state[imageId],
        skippedSteps: {
          ...omit(state[imageId].skippedSteps, step),
        },
      },
    };
  },
}, {});

const reducers: Partial<ReducerMap> = {
  [KEY_IMAGES_LOAD_STATUS]: loadStatusReducer,
  [KEY_IMAGES]: imagesReducer,
  [KEY_TRACING]: tracingReducer,
};

export default reducers;

export const getAllImages = (state: StoreState) => state[KEY_IMAGES];
export const getAllImagesStatus = (state: StoreState) => state[KEY_IMAGES_LOAD_STATUS];

export const getImageProps = createSelector(
  getAllImages,
  (all) => (imageId: string) => all[imageId],
);

export const getImageSrc = createSelector(
  getImageProps,
  (getProps) => (id: string) => getProps(id).data,
);

export const isImageFlippedX = createSelector(
  getImageProps,
  (getProps) => (id: string) => getProps(id).flipX,
);

export const getImageStatus = createSelector(
  getAllImagesStatus,
  (all) => (imageId: string) => all[imageId],
);

export const isImageLoading = createSelector(
  getImageStatus,
  (getStatus) => (imageId: string) => {
    const status = getStatus(imageId);
    return status.isLoading === true && status.error === null;
  },
);

export const isAnyImageLoading = createSelector(
  isImageLoading,
  (isLoading) => (ids: string[]) => some(ids, isLoading),
);

export const hasImageLoadFailed = createSelector(
  getImageStatus,
  (getStatus) => (id: string) => {
    const status = getStatus(id);
    return status.isLoading === false && status.error !== null;
  },
);

export const isImageLoaded = createSelector(
  getImageStatus,
  (getStatus) => (id: string) => {
    const status = getStatus(id);
    return status.isLoading === false && status.error === null;
  },
);

export const getImageName = createSelector(
  isImageLoaded,
  getImageProps,
  (isLoaded, getProps) => (id: string) => isLoaded(id) && getProps(id).name || null,
);

export const hasImage = createSelector(
  getAllImages,
  isImageLoaded,
  (all, isLoaded) => (
    some(all, (_, k: string) => isLoaded(k))
  ),
);

export const getAllTracingData = (state: StoreState) => state[KEY_TRACING];
export const getTracingDataByImageId = createSelector(
  getAllTracingData,
  (all) => (id: string) => all[id],
);

export const getManualLandmarks = createSelector(
  getTracingDataByImageId,
  (getTracing) => (id: string) => getTracing(id).manualLandmarks,
);

export const getSkippedSteps = createSelector(
  getTracingDataByImageId,
  (getTracing) => (id: string) => getTracing(id).skippedSteps,
);

export const getAnalysisId = createSelector(
  getImageProps,
  (getProps) => (id: string) => getProps(id).analysis,
);

export const getScaleFactor = createSelector(
  getImageProps,
  (getProps) => (id: string) => getProps(id).scaleFactor,
);
