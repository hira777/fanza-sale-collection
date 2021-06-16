import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ItemList, ItemListProps } from './index';
import { getItems } from '../../mocks/items';

export default {
  title: 'Components/ItemList',
  component: ItemList,
} as Meta;

const Template: Story<ItemListProps> = (args) => <ItemList {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: getItems(),
};
