import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ResultStats, ResultStatsProps } from '../components/ResultStats';

export default {
  title: 'ResultStats',
  component: ResultStats,
} as Meta;

const Template: Story<ResultStatsProps> = args => <ResultStats {...args} />;

export const Default = Template.bind({});
Default.args = {
  keyword: '期間限定セール',
  response: {
    resultCount: 100,
    totalCount: 1000,
    firstPosition: 1,
    items: [],
  },
};
