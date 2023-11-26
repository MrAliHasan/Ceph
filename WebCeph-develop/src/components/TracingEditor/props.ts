export interface StateProps {
  imageId: string | null;
  imageSrc: string;
  isDemoImageLoading: boolean;
};

export interface DispatchProps {
  onFilesDrop: (files: File[]) => any;
  onDemoButtonClick: () => any;
};

export type ConnectableProps = StateProps & DispatchProps;

export interface OwnProps {
  className?: string;
  workspaceId: string;
};

export type Props = ConnectableProps & OwnProps;

export default Props;
