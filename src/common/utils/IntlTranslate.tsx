import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

const InjectTranslate = (props: any) => <FormattedMessage {...props} />;

export default injectIntl(InjectTranslate, { forwardRef: true });
