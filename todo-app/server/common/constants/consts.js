/**
 * @author ManhNV
 * @description define constant
 */
'use strict';

exports.ContantsSetup = {
  AUTH_TYPES: {
    GOOGLE: 'google',
    UBER: 'uber',
    LYFT: 'lyft',
    FACEBOOK: 'facebook',
    LOCAL: 'local'
  },
  ROLES: {
    ADMIN: 'admin',
    DRIVER: 'driver',
    ROOT: 'super admin'
  },
  PAGE_SIZE: 20,
  envIOS: ['production', 'sandbox'],
  ACTIVATE_TIME_EXPIRE: "Activate expiration time. Please re-register your account from Easy Push system!",
  LINK_NOT_AVAILABLE: 'This link has expired, or is invalid, or has been used.',
  ACTIVE_SUCCESS: 'Active account success! Please click login button to redirect page login!',
  CHANGE_PASS_SUCCESS: 'Change password success!',
  APPLICATION_NOT_CONFIG: `Your push subscription service is not currently configured on any platform. Please configure at least one application platform before performing this action.`,
  APPLICATION_EXECUTE: 'Application -> Select the application to config with button Detail -> Config your application here',
  RESULT_DEV_API: `<h1 style="text-align: center;color: darkred;margin-top: 150px;">
        <a style="text-decoration: none;font-size: 45px;color: darkred" href="/apidocs">Welcome Safehold's API Development</a></h1>`,
  RESULT_PROD_API: `<h1 style="text-align: center;color: darkred;margin-top: 150px;">
        <a style="text-decoration: none;font-size: 45px;color:darkred;" href="/apidocs">Welcome Safehold's API Production</a></h1>`
};
