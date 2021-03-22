import React from 'react';
import { Story, Meta } from '@storybook/react';

import { HeaderTitle } from '../components/HeaderTitle';

export default {
  title: 'Components/HeaderTitle',
  component: HeaderTitle,
} as Meta;

const Template: Story = () => <HeaderTitle />;

export const Default = Template.bind({});
Default.args = {};
