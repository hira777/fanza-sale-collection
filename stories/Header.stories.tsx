import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Header, HeaderProps } from '../components/Header';
import { HeaderInput, HeaderInputProps } from '../components/HeaderInput';
import { HeaderMenu, HeaderMenuProps } from '../components/HeaderMenu';
import { HeaderTitle } from '../components/HeaderTitle';

import * as HeaderMenuStories from './HeaderMenu.stories';

export default {
  title: 'Components/Header',
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = args => <Header {...args} />;

const menuProps: HeaderMenuProps = {
  categories: HeaderMenuStories.Default.args.categories,
  onChangeCategory: () => {},
};
const inputProps: HeaderInputProps = {
  onChangeInput: () => {},
};

export const Default = Template.bind({});
Default.args = {
  title: <HeaderTitle />,
  menu: <HeaderMenu {...menuProps} />,
  input: <HeaderInput {...inputProps} />,
};
