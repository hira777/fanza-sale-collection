import React from 'react';
import { Story, Meta } from '@storybook/react';

import { HeaderMenu, HeaderMenuProps } from '../components/HeaderMenu';

export default {
  title: 'Components/HeaderMenu',
  component: HeaderMenu,
} as Meta;

const Template: Story<HeaderMenuProps> = args => <HeaderMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  categories: [
    '春のパンツまつり30％OFF第2弾',
    'SODクリエイト30％OFF',
    'プレステージ30％OFF',
    '妄想族Grp作品30％OFF',
    'VENUS・熟女JAPAN他30％OFF',
    'ブランドストア30％OFF☆',
    '期間限定セール',
  ],
};
