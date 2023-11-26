import { createSelector } from 'reselect';
import canvas, { getHighlightedStep } from './canvas';
import analyses, {
  getMappedValue,
  getAllGeoObjects,
  findStepBySymbol,
} from './analyses';
import treatment from './treatment';
import image, {
  hasImage, getManualLandmarks,
  isAnyImageLoading,
  getImageName,
} from './image';
import settings, {
  getWorkspaceImageIds, getWorkspaceMode, getTracingImageId,
  isImporting,
} from './settings';
import workers from './workers';
import order from './order';
import activeId, { getActiveWorkspaceId } from './activeId';
import { getWorkspacesIdsInOrder } from './order';

import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import mapValues from 'lodash/mapValues';
import every from 'lodash/every';
import last from 'lodash/last';

export default {
  ...analyses,
  ...image,
  ...canvas,
  ...workers,
  ...treatment,
  ...settings,
  ...order,
  ...activeId,
};

export const canEdit = hasImage;

export const getHighlightedLandmarks = createSelector(
  getHighlightedStep,
  findStepBySymbol,
  getAllGeoObjects,
  getMappedValue,
  (symbol, findStep, all, getMapped) => {
    if (symbol === null) {
      return { };
    }
    const unhighlighted = mapValues(all, () => false);
    const step = findStep(symbol);
    if (step !== null) {
      const highlighted = mapValues(getMapped(step), () => true);
      return { ...unhighlighted, ...highlighted };
    }
    return unhighlighted;
  },
);

export const getLandmarksToDisplay = getAllGeoObjects;

export const isHighlightMode = createSelector(
  getHighlightedLandmarks,
  (highlightedLandmarks) => !isEmpty(highlightedLandmarks),
);

export const isManualObject = createSelector(
  getManualLandmarks,
  (manual) => (symbol: string) => manual[symbol] !== undefined,
);

export const isHighlightedObject = createSelector(
  getHighlightedLandmarks,
  (highlighted) => (symbol: string) => highlighted[symbol] === true,
);

export const getSortedLandmarksToDisplay = createSelector(
  isManualObject,
  isHighlightedObject,
  getLandmarksToDisplay,
  (isManual, isHighlighted, landmarksToDisplay) => {
    return sortBy(
      map(
        landmarksToDisplay,
        (value: GeoObject, symbol: string) => ({ symbol, value }),
      ),
      ({ symbol }) => (
        isManual(symbol) || isHighlighted(symbol)
      ),
    );
  },
);

// export const hasUnsavedWork = createSelector(
//   getActiveManualLandmarks,
//   ({ present, past }) => !isEmpty(present) || !isEmpty(past),
// );

// export const canUndo = hasUnsavedWork;
// export const canRedo = createSelector(
//   getActiveManualLandmarks,
//   ({ future }) => !isEmpty(future),
// );

// export const workspaceHasError = createSelector(
//   hasExportError,
//   (exportError) => exportError,
// );

// export const getWorkspaceErrorMessage = createSelector(
//   getExportError,
//   (error) => error !== null ? error.message : null,
// );

export const getActiveTracingImageId = createSelector(
  getTracingImageId,
  getActiveWorkspaceId,
  (getImageId, workspaceId) => getImageId(workspaceId!),
);

export { getWorkspaceImageIds };

export const getActiveWorkspaceMode = createSelector(
  getWorkspaceMode,
  getActiveWorkspaceId,
  (getMode, workspaceId) => getMode(workspaceId!),
);

export const getActiveWorkspaceImageIds = createSelector(
  getWorkspaceImageIds,
  getActiveWorkspaceId,
  (getImages, workspaceId) => getImages(workspaceId!),
);

export const shouldShowLoadingFileIndicator = createSelector(
  getWorkspaceImageIds,
  isImporting,
  isAnyImageLoading,
  (getIds, isFileImporting, isAnyLoading) => (workspaceId: string) => {
    return (
      isFileImporting(workspaceId) && !(isAnyLoading(getIds(workspaceId)))
    );
  },
);

export const hasMultipleWorkspaces = createSelector(
  getWorkspacesIdsInOrder,
  (workspaces) => workspaces.length > 1,
);

export const doesWorkspaceHaveImages = createSelector(
  getWorkspaceImageIds,
  (getImages) => (workspaceId: string) => getImages(workspaceId).length > 0,
);
export const isWorkspaceUsed = doesWorkspaceHaveImages;

export const areAllWorkspacesUsed = createSelector(
  isWorkspaceUsed,
  getWorkspacesIdsInOrder,
  (isUsed, workspaces) => every(workspaces, isUsed),
);

export const getLastWorkspaceId = createSelector(
  getWorkspacesIdsInOrder,
  (workspaces) => last(workspaces) || null,
);

export const isLastWorkspaceUsed = createSelector(
  isWorkspaceUsed,
  getLastWorkspaceId,
  (isUsed, lastWorkspace) => lastWorkspace !== null ? isUsed(lastWorkspace) : true,
);

export const getWorkspaceTitle = createSelector(
  getWorkspaceMode,
  getWorkspaceImageIds,
  getTracingImageId,
  getImageName,
  (getMode, getImages, getTracingImage, getName) => (workspaceId: string) => {
    const mode = getMode(workspaceId);
    if (mode === 'tracing') {
      const tracingImage = getTracingImage(workspaceId);
      return tracingImage !== null ? getName(tracingImage) : null;
    } else {
      const images = getImages(workspaceId);
      return getName(images[0]);
    }
  },
);

export const getActiveWorkspaceTitle = createSelector(
  getActiveWorkspaceId,
  getWorkspaceTitle,
  (id, getTitle) => id !== null ? getTitle(id) : null,
);
