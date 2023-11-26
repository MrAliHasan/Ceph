import {
  connect,
  MapStateToProps,
  MapDispatchToPropsFunction,
} from 'react-redux';
import { StateProps, DispatchProps, OwnProps } from './props';
import CephaloToolbar from './index';
import {
  setBrightness,
  setContrast,
  setActiveTool,
  flipX, flipY,
  invertColors,
  redo, undo,
  toggleAnalysisResults,
  exportFile,
} from 'actions/workspace';
import {
  isSummaryShown,
} from 'store/reducers/workspace/analyses';
import {
  canEdit,
  canRedo,
  canUndo,
  hasUnsavedWork,
} from 'store/reducers/workspace';
import {
  isExporting,
} from 'store/reducers/workspace/export';
import {
  hasImage,
} from 'store/reducers/workspace/image';
import {
  getActiveToolId,
} from 'store/reducers/workspace/canvas';

import {
  canShowSummary,
} from 'store/reducers/workspace/analyses';

const mapStateToProps: MapStateToProps<StateProps, OwnProps> =
  (state: StoreState): StateProps => {
    const _isExporting = isExporting(state);
    return {
      activeToolId: getActiveToolId(state),
      brightness: 0.5,
      contrast: 0.5,
      isImageInverted: false,
      canEdit: canEdit(state),
      canRedo: canRedo(state),
      canUndo: canUndo(state),
      canShowSummary: !isSummaryShown(state) && canShowSummary(state),
      canExport: !_isExporting && hasImage(state) && hasUnsavedWork(state),
      isExporting: _isExporting,
    };
  };

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, OwnProps> =
  (dispatch: GenericDispatch): DispatchProps => {
    return {
      onBrightnessChange: (value) => dispatch(setBrightness(value)),
      onContrastChange: (value) => dispatch(setContrast(value)),
      onFlipXClick: () => dispatch(flipX()),
      onFlipYClick: () => dispatch(flipY()),
      onInvertToggle: () => dispatch(invertColors()),
      onRedoClick: () => dispatch(redo(void 0)),
      onUndoClick: () => dispatch(undo(void 0)),
      onToolButtonClick: (id) => dispatch(setActiveTool(id)),
      onShowSummaryClick: () => dispatch(toggleAnalysisResults(void 0)),
      onExportClick: () => dispatch(
        exportFile({
          format: 'wceph_v1',
        }),
      ),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(CephaloToolbar);
