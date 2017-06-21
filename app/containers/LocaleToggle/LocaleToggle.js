/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { defineMessages, FormattedMessage } from 'react-intl';

import { setLocale } from 'store/actions/global';
import { getLocale } from 'store/reducers/global';
import { appLocales } from '../../i18n';

const messages = defineMessages({
  locale: {
    id: 'app.containers.locale_toggle.locale_toggle.locale',
    defaultMessage: 'Language',
  },
  en: {
    id: 'app.containers.locale_toggle.locale_toggle.en',
    defaultMessage: 'English',
  },
  de: {
    id: 'app.containers.locale_toggle.locale_toggle.de',
    defaultMessage: 'German',
  },
});

export class LocaleToggle extends React.PureComponent {
  onLocaleToggle = (event, index, value) => {
    this.props.setLocale(value);
  };

  render() {
    return (
      <SelectField
        floatingLabelText={<FormattedMessage {...messages.locale} />}
        value={this.props.locale}
        onChange={this.onLocaleToggle}
        fullWidth
      >
        {appLocales.map((locale) => (
          <MenuItem key={locale} value={locale} primaryText={<FormattedMessage {...messages[locale]} />} />
        ))}
      </SelectField>
    );
  }
}

LocaleToggle.propTypes = {
  setLocale: React.PropTypes.func,
  locale: React.PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: getLocale,
});

const mapDispatchToProps = {
  setLocale,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle);
