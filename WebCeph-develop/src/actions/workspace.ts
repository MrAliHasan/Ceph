import { createActionCreator } from 'utils/store';

export const setActiveTool = createActionCreator('SET_ACTIVE_TOOL_REQUESTED');

export const ignoreWorkspaceError = createActionCreator('IGNORE_WORKSPACE_ERROR_REQUESTED');

export const addManualLandmark = createActionCreator('ADD_MANUAL_LANDMARK_REQUESTED');
export const addUnnamedManualLandmark = createActionCreator('ADD_UNKOWN_MANUAL_LANDMARK_REQUESTED');
export const removeManualLandmark = createActionCreator('REMOVE_MANUAL_LANDMARK_REQUESTED');

export const setScale = createActionCreator('SET_SCALE_REQUESTED');

export const importFileRequested = createActionCreator('IMPORT_FILE_REQUESTED');
export const importFileSucceeded = createActionCreator('IMPORT_FILE_SUCCEEDED');
export const importFileFailed = createActionCreator('IMPORT_FILE_FAILED');

export const loadImageStarted = createActionCreator('LOAD_IMAGE_STARTED');
export const loadImageSucceeded = createActionCreator('LOAD_IMAGE_SUCCEEDED');
export const loadImageFailed = createActionCreator('LOAD_IMAGE_FAILED');

export const loadImageFromURL = createActionCreator('LOAD_IMAGE_FROM_URL_REQUESTED');

export const exportFile = createActionCreator('EXPORT_FILE_REQUESTED');
export const exportFileSucceeded = createActionCreator('EXPORT_FILE_SUCCEEDED');
export const exportFileFailed = createActionCreator('EXPORT_FILE_FAILED');
export const setExportProgress = createActionCreator('EXPORT_PROGRESS_CHANGED');

export const flipX = createActionCreator('FLIP_IMAGE_X_REQUESTED');
export const flipY = createActionCreator('FLIP_IMAGE_Y_REQUESTED');
export const setBrightness = createActionCreator('SET_IMAGE_BRIGHTNESS_REQUESTED');
export const setContrast = createActionCreator('SET_IMAGE_CONTRAST_REQUESTED');
export const invertColors = createActionCreator('INVERT_IMAGE_REQUESTED');

export const resetWorkspace = createActionCreator('RESET_WORKSPACE_REQUESTED');
export const canvasResized = createActionCreator('CANVAS_RESIZED');
export const setMousePosition = createActionCreator('MOUSE_POSITION_CHANGED');

export const setImageProps = createActionCreator('SET_IMAGE_PROPS');

export const setAnalysis = createActionCreator('SET_ANALYSIS_REQUESTED');
export const toggleAnalysisResults = createActionCreator('TOGGLE_ANALYSIS_RESULTS_REQUESTED');

export const highlightStep = createActionCreator('HIGHLIGHT_STEP_ON_CANVAS_REQUESTED');
export const unhighlightStep = createActionCreator('UNHIGHLIGHT_STEP_ON_CANVAS_REQUESTED');

export const redo = createActionCreator('REDO_REQUESTED');
export const undo = createActionCreator('UNDO_REQUESTED');

export const addWorker = createActionCreator('WORKER_CREATED');
export const updateWorker = createActionCreator('WORKER_STATUS_CHANGED');
export const removeWorker = createActionCreator('WORKER_TERMINATED');

export const fetchAnalysisSucceeded = createActionCreator('FETCH_ANALYSIS_SUCCEEDED');
export const fetchAnalysisFailed = createActionCreator('FETCH_ANALYSIS_FAILED');

export const setWorkspaceMode = createActionCreator('SET_WORKSPACE_MODE_REQUESTED');
export const setActiveImageId = createActionCreator('SET_ACTIVE_IMAGE_ID');

export const setSuperimpositionMode = createActionCreator('SET_SUPERIMPOSITION_MODE_REQUESTED');
export const superimposeImages = createActionCreator('SUPERIMPOSE_IMAGES_REQUESTED');

export const setActiveWorkspace = createActionCreator('SET_ACTIVE_WORKSPACE');
export const addNewWorkspace = createActionCreator('ADD_NEW_WORKSPACE');
export const removeWorkspace = createActionCreator('REMOVE_WORKSPACE');

export const traceImage = createActionCreator('TRACE_IMAGE_REQUESTED');
