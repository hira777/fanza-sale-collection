import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Top, TopProps } from '../screens/Top';
import { Header } from '../components/Header';
import * as ResultStatsStories from './ResultStats.stories';
import { getItems } from '../mocks/items';
import { getCategories } from '../mocks/categories';

export default {
  title: 'Screens/Top',
  component: Top,
} as Meta;

const items = getItems();
const categories = getCategories();

const Template: Story<TopProps> = (args) => <Top {...args} />;

export const Default = Template.bind({});
Default.args = {
  header: <Header categories={categories} onChangeCategory={() => {}} onSubmit={() => {}} />,
  response: {
    items,
    firstPosition: ResultStatsStories.Default.args.response.firstPosition,
    resultCount: ResultStatsStories.Default.args.response.resultCount,
    totalCount: ResultStatsStories.Default.args.response.totalCount,
  },
  keyword: ResultStatsStories.Default.args.keyword,
};
