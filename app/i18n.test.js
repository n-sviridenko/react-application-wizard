import { defaultLocale } from './config';
import { formatTranslationMessages } from './i18n';

jest.mock('./translations/en.json', () => (
  {
    message1: 'default message',
    message2: 'default message 2',
  }
));

const esTranslationMessages = {
  message1: 'mensaje predeterminado',
  message2: '',
};

describe('formatTranslationMessages', () => {
  it('should build only defaults when defaultLocale', () => {
    const result = formatTranslationMessages(defaultLocale, { a: 'a' });

    expect(result).toEqual({ a: 'a' });
  });


  it('should combine default locale and current locale when not defaultLocale', () => {
    const result = formatTranslationMessages('', esTranslationMessages);

    expect(result).toEqual({
      message1: 'mensaje predeterminado',
      message2: 'default message 2',
    });
  });
});
