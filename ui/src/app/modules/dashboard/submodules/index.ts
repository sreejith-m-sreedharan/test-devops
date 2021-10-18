import * as profile from './profile/components';
import * as fundrequest from './fundrequest/components';

export const components = [...profile.components, ...fundrequest.components];

export * from './profile/components';
export * from './fundrequest/components';
