import React from 'react';
import { Story, Meta } from '@storybook/react';

import { HeaderInput, HeaderInputProps } from '../components/HeaderInput';

export default {
  title: 'Components/HeaderInput',
  component: HeaderInput,
} as Meta;

const Template: Story<HeaderInputProps> = args => <HeaderInput {...args} />;

export const Default = Template.bind({});
Default.args = {};
