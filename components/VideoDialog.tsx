import Dialog from '@material-ui/core/Dialog';

export type VideoDialogProps = {
  open: boolean;
  videoUrl: string;
  onClose: () => void;
};

export function VideoDialog({ open, videoUrl, onClose }: VideoDialogProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      <iframe src={videoUrl} width="560" height="360" scrolling="no"></iframe>
    </Dialog>
  );
}
