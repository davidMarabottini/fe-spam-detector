import type { Meta, StoryObj } from '@storybook/react-vite';

import RadioBtn from '@components/atoms/RadioBtn/RadioBtn';
import Button from '@/components/atoms/Button/Button';

const meta = {
  title: 'atoms/RadioBtn',
  component: RadioBtn,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    name: 'radiobtntest',
    // children: (opt, isChecked) => <Button color={isChecked ? 'primary' : 'secondary'}>{opt.label}</Button>,
    children: (opt, isChecked) => <Button color={isChecked ? 'primary' : 'secondary'} asChild rounded><div>{opt.label}</div></Button>,
    options: [{
      label: 'lab1',
      value: 'val1',
    }, {
      label: 'lab2',
      value: 'val2',
    }]
  },
};

