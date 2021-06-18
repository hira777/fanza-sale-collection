import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Spinner } from './';

export default {
  title: 'Components/Spinner',
  component: Spinner,
} as Meta;

const Template: Story = () => <Spinner />;

export const Default = Template.bind({});
Default.args = {};
