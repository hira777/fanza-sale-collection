import React from 'react';
import { Story, Meta } from '@storybook/react/';

import { ItemListItem, ItemListItemProps } from './item-list-item';
import { getItems } from '../../mocks/items';

export default {
  title: 'Components/ItemListItem',
  component: ItemListItem,
} as Meta;

const items = getItems();
const Template: Story<ItemListItemProps> = (args) => <ItemListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  item: items[0],
};
