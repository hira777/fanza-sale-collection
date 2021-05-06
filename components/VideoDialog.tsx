import Dialog from '@material-ui/core/Dialog';

export type VideoDialogProps = {
  open: boolean;
  videoUrl: string;
};

export function VideoDialog({ open, videoUrl }: VideoDialogProps) {
  const handleClose = () => {};

  return (
    <Dialog onClose={handleClose} open={open}>
      <iframe src="" width="644" height="414" scrolling="no"></iframe>
    </Dialog>
  );
}
