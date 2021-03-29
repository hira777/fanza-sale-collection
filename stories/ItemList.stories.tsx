import React from 'react';
import { Story, Meta } from '@storybook/react/';

import { ItemList, ItemListProps } from '../components/ItemList';
import { ItemListItem, ItemListItemProps } from '../components/ItemListItem';
import { getItems } from '../mocks/items';

export default {
  title: 'Components/ItemList',
  component: ItemList,
} as Meta;

const items = getItems();

type TemplateType = { items: ItemListItemProps['item'][] } & ItemListProps;

const Template: Story<TemplateType> = ({ items, ...args }) => (
  <ItemList {...args}>
    {items.map((item) => (
      <ItemListItem key={item.product_id} item={item} />
    ))}
  </ItemList>
);

export const Default = Template.bind({});
Default.args = {
  items: items,
};
