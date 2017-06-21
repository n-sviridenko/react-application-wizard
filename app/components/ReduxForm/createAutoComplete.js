import { createAutoComplete as createAutoCompleteBase } from 'components/Form';
import createComponent from './createComponent';
import mapError from './mapError';

function getSearchText(value, dataSourceConfig) {
  return value && dataSourceConfig ? value[dataSourceConfig.text] : value;
}

export default function createAutoComplete(dataSourceHandler, dataSourceConfig, ...args) {
  const AutoComplete = createAutoCompleteBase(dataSourceHandler, dataSourceConfig, ...args);

  return createComponent(
    AutoComplete,
    ({
      input: {
        value,
        onChange,
        onBlur: onBlurFunc,
        ...inputProps
      },
      onNewRequest: onNewRequestFunc,
      ...props
    }) => ({
      ...mapError(props),
      ...inputProps,
      dataSourceConfig,
      searchText: getSearchText(value, dataSourceConfig),
      onNewRequest: (val, index) => {
        // do not trigger onChange if value is not from dataSource
        if (index !== -1) {
          onChange(val);
        }

        if (onNewRequestFunc && typeof onNewRequestFunc === 'function') {
          onNewRequestFunc(val);
        }
      },
      onBlur: (event) => {
        const finalValue = !value || getSearchText(value, dataSourceConfig) === event.target.value ? value : null;

        onBlurFunc(finalValue);
      },
    })
  );
}
