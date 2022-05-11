/* eslint-disable */
/* stylelint-disable */
import { Button as GButton } from 'ant-design-vue';

export default {
  component: GButton,
  title: 'Components',
  argTypes: {
    size: {
      control: 'select',
      description: 'set the size of button',
      options: ['large', 'middle', 'small'],
      defaultValue: 'middle',
      type: { name: 'string' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'middle' },
      },
    },
    type: {
      control: 'select',
      options: ['primary', 'ghost', 'danger'],
      defaultValue: 'primary',
      description: 'set the size of button',
      type: { name: 'string' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    text: {
      control: 'text',
      defaultValue: 'Click me!',
      type: { name: 'string' },
      description: 'set the text of button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Click me!' },
      },
    },
  },
};

export const Button = (args) => ({
  components: { GButton },
  setup() {
    return args;
  },
  template: '<g-button v-bind="args">{{ text }}</g-button>',
});
