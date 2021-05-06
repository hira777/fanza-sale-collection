import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Header, HeaderProps } from '../components/Header';

import * as HeaderMenuStories from './HeaderMenu.stories';

export default {
  title: 'Components/Header',
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = args => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  categories: HeaderMenuStories.Default.args.categories,
};
