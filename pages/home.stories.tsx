import React from 'react';
import { Story, Meta } from '@storybook/react';

import Home, { HomeProps } from './';
import { getItems } from '../mocks/items';

export default {
  title: 'Pages/Home',
  component: Home,
} as Meta;

const items = getItems();

const Template: Story<HomeProps> = (args) => <Home {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialResponse: {
    status: 200,
    result_count: 100,
    total_count: 100,
    first_position: 1,
    items,
  },
};
