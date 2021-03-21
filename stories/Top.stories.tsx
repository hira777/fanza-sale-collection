import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Top, TopProps } from '../screens/Top';
import { getItems } from '../mock/items';
import { getCategories } from '../mock/ctagories';

export default {
  title: 'Top',
  component: Top,
} as Meta;

const items = getItems();
const categories = getCategories();

const Template: Story<TopProps> = args => <Top {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: items,
  categories: categories,
};
