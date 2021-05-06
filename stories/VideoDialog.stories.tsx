import React from 'react';
import { Story, Meta } from '@storybook/react';

import { VideoDialog, VideoDialogProps } from '../components/VideoDialog';
import { getItems } from '../mocks/items';

export default {
  title: 'Components/VideoDialog',
  component: VideoDialog,
} as Meta;

const Template: Story<VideoDialogProps> = (args) => <VideoDialog {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: true,
  videoUrl: getItems()[0].sampleMovieURL.size_560_360,
};
