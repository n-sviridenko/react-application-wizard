import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import AutoComplete from 'material-ui/AutoComplete';

export default function createAutoComplete(dataSourceHandler, dataSourceConfig, debounceDelay = 500) {
  class EnhancedAutoComplete extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        dataSource: [],
      };

      if (debounceDelay) {
        this.callDataSourceHandler = debounce(this.callDataSourceHandler, debounceDelay);
      }
    }

    onUpdateInput = (query) => {
      if (this.props.onUpdateInput && typeof this.props.onUpdateInput === 'function') {
        this.props.onUpdateInput(query);
      }

      this.callDataSourceHandler(query);
    };

    callDataSourceHandler(query) {
      if (query !== '') {
        dataSourceHandler(query).then((dataSource) => {
          this.setState({
            dataSource,
          });
        });
      } else {
        this.setState({
          dataSource: [],
        });
      }
    }

    render() {
      return (
        <AutoComplete
          {...this.props}
          dataSourceConfig={dataSourceConfig}
          dataSource={this.state.dataSource}
          onUpdateInput={this.onUpdateInput}
          filter={() => true}
        />
      );
    }
  }

  EnhancedAutoComplete.propTypes = {
    onUpdateInput: PropTypes.func,
  };

  return EnhancedAutoComplete;
}
