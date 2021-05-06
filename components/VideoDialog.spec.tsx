import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import { VideoDialog, VideoDialogProps } from './VideoDialog';
import { getItems } from '../mocks/items';

afterEach(cleanup);

describe('VideoDialog', () => {
  const item = getItems()[0];
  const props: VideoDialogProps = {
    open: true,
    videoUrl: item.sampleMovieURL.size_644_414,
  };

  test('動画モーダルがレンダリングされる', () => {
    render(<VideoDialog {...props} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
