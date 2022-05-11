import { shopStatusOptions } from './configs';

export const getStatusLabel = (statusId) => {
  let _label = '';

  for (const option of shopStatusOptions) {
    if (option.value === statusId) {
      _label = option.label;
      break;
    }
  }

  return _label;
};
