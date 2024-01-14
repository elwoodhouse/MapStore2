import { CONTROL_NAME } from '../constants';
import { createControlEnabledSelector } from '../../../selectors/controls';

export const enabledSelector = createControlEnabledSelector(CONTROL_NAME);
