import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Top, TopProps } from '../screens/Top';
import * as ResultStatsStories from './ResultStats.stories';
import { getItems } from '../mock/items';
import { getCategories } from '../mock/categories';

export default {
  title: 'Top',
  component: Top,
} as Meta;

const items = getItems();
const categories = getCategories();

const Template: Story<TopProps> = args => <Top {...args} />;

export const Default = Template.bind({});
Default.args = {
  response: {
    items,
    firstPosition: ResultStatsStories.Default.args.response.firstPosition,
    resultCount: ResultStatsStories.Default.args.response.resultCount,
    totalCount: ResultStatsStories.Default.args.response.totalCount,
  },
  keyword: ResultStatsStories.Default.args.keyword,
  categories: categories,
};
