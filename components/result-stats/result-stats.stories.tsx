import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ResultStats, ResultStatsProps } from './';

export default {
  title: 'Components-Tailwind/ResultStats',
  component: ResultStats,
} as Meta;

const Template: Story<ResultStatsProps> = (args) => <ResultStats {...args} />;

export const Default = Template.bind({});
Default.args = {
  keyword: '期間限定セール',
  response: {
    status: 200,
    result_count: 100,
    total_count: 1000,
    first_position: 1,
    items: [],
  },
};

export const NotFound = Template.bind({});
NotFound.args = {
  keyword: '期間限定セール',
  response: {
    status: 200,
    result_count: 100,
    total_count: 0,
    first_position: 1,
    items: [],
  },
};
