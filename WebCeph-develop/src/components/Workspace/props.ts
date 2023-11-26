export interface StateProps {
  mode: WorkspaceMode;
};

export interface DispatchProps {
  onResize(rect: ContentRect): any;
};

export type ConnectableProps = StateProps & DispatchProps;

export interface OwnProps {
  className?: string;
  workspaceId: string;
};

export type Props = ConnectableProps & OwnProps;

export default Props;
