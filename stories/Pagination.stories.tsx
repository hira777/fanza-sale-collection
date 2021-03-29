import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Pagination, PaginationProps } from '../components/Pagination';

export default {
  title: 'Components/Pagination',
  component: Pagination,
} as Meta;

const Template: Story<PaginationProps> = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  page: 1,
  count: 5,
};

export const WithTwoPage = Template.bind({});
WithTwoPage.args = {
  page: 2,
  count: 5,
};
