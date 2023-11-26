import * as React from 'react';

// import Checkbox from 'material-ui/Checkbox';
// import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
// import Slider from 'material-ui/Slider';
import CircularProgress from 'material-ui/CircularProgress';

import IconAddPoint from 'material-ui/svg-icons/content/add';
import IconSelect from 'material-ui/svg-icons/action/help-outline';
import IconEraser from 'material-ui/svg-icons/content/clear';
import IconFlip from 'material-ui/svg-icons/image/flip';
import IconList from 'material-ui/svg-icons/action/list';
import IconRedo from 'material-ui/svg-icons/content/redo';
import IconUndo from 'material-ui/svg-icons/content/undo';
import IconZoom from 'material-ui/svg-icons/action/zoom-in';
import IconExport from 'material-ui/svg-icons/file/file-download';

import * as cx from 'classnames';

const classes = require('./style.scss');

import Props from './props';

const CephaloEditorToolbar = (props: Props) => {
  const {
    canEdit, canRedo, canUndo,
    contrast, brightness, isImageInverted,
    activeToolId,
    onBrightnessChange,
    onContrastChange,
    onFlipXClick,
    onUndoClick,
    onRedoClick,
    // onFlipYClick,
    // onInvertToggle,
    onExportClick,
    onToolButtonClick,
    onShowSummaryClick,
    canShowSummary,
    canExport,
    isExporting,
  } = props;

  const cannotEdit = !canEdit;
  return (
    <div className={cx(classes.root, props.className)}>
      <FlatButton onTouchTap={onUndoClick} disabled={cannotEdit || !canUndo} label="Undo" icon={<IconUndo/>} />
      <FlatButton onTouchTap={onRedoClick} disabled={cannotEdit || !canRedo} label="Redo" icon={<IconRedo/>} />
      <FlatButton onTouchTap={onFlipXClick} disabled={cannotEdit} label="Flip" icon={<IconFlip/>} />
      <FlatButton
        disabled={cannotEdit || activeToolId === 'SELECT'}
        label=""
        icon={<IconSelect />}
        onTouchTap={onToolButtonClick.bind(null, 'SELECT')}
      />
      <FlatButton
        disabled={cannotEdit || activeToolId === 'ADD_POINT'}
        label=""
        icon={<IconAddPoint />}
        onTouchTap={onToolButtonClick.bind(null, 'ADD_POINT')}
      />
      <FlatButton
        disabled={cannotEdit || activeToolId === 'ERASER'}
        label=""
        icon={<IconEraser />}
        onTouchTap={onToolButtonClick.bind(null, 'ERASER')}
      />
      <FlatButton
        disabled={cannotEdit || activeToolId === 'ZOOM_WITH_CLICK'}
        label=""
        icon={<IconZoom />}
        onTouchTap={onToolButtonClick.bind(null, 'ZOOM_WITH_CLICK')}
      />
      <FlatButton
        disabled={!canShowSummary}
        label="Summary"
        icon={<IconList />}
        onTouchTap={onShowSummaryClick}
      />
      <FlatButton
        disabled={!canExport}
        label="Export"
        icon={!isExporting ? <IconExport /> : <CircularProgress size={24} thickness={2} />}
        onTouchTap={onExportClick}
      />
    </div>
  );
};

// const Corrections = () => (
//   <div>
//     Brightness
//     <Slider
//       style={{ width: 200, margin: 15 }}
//       min={0} max={100}
//       defaultValue={brightness}
//       onChange={(_, v) => onBrightnessChange(v)}
//     />
//     Contrast
//     <Slider
//       style={{ width: 200, margin: 15 }}
//       min={-100} max={100}
//       defaultValue={contrast}
//       onChange={(_, v) => onContrastChange(v)}
//     />
//     <Divider />
//     <Checkbox label="Invert" checked={isImageInverted} onCheck={onInvertToggle} />
//   </div>
// );

export default CephaloEditorToolbar;
