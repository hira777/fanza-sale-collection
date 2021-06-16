import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Pagination, PaginationProps } from './';

export default {
  title: 'Components/Pagination',
  component: Pagination,
} as Meta;

const Template: Story<PaginationProps> = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  page: 3,
  count: 10,
  pagerCount: 5,
};

export const WithTwoPage = Template.bind({});
WithTwoPage.args = {
  page: 1,
  count: 2,
  pagerCount: 5,
};

export const OnlyOnePage = Template.bind({});
OnlyOnePage.args = {
  page: 1,
  count: 1,
  pagerCount: 5,
};
