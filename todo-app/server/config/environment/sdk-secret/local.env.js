/**
 * @author: ManhNV
 * @description: config process environment in development
 * @create: 2017/02/15
 * @version: 1.0.0
 */

'use strict';

/*development environment*/
module['exports'] = {
  //common config
  API_URL: 'http://localhost:8000/api',
  SECRET: 'TEAM-9X-MASTER-VMODEV-DEVELOPMENT-SAFEHOLD',
  GCM_API_KEY: 'AIzaSyDsygsaSNz9djgf3i5YqaopkKnQV_8DPQU',

  // Social key manhnguyen
  FACEBOOK_ID: '1082739211869326',
  FACEBOOK_SECRET: '9ce72b1debb2474d535f44334fbcc3bf',

  // Google key manh.nguyen@vmodev.com
  GOOGLE_ID: '361840403428-lk9ftl0q1iu9b62qfs6e47bnd22j8igs.apps.googleusercontent.com',
  GOOGLE_SECRET: '3apoJOHKfFpBIGlvZ4q1TcRJ',

  // Uber key for customer new york
  UBER_ID: 'V4FkCricVbeB-Zz3gUEKvh7ixVYhpC9u',
  UBER_SECRET: '3146CccDnTaeY3uNjUsTK1dD5aFEHRGwPWOartRd',
  UBER_CALLBACK: 'http://localhost:8888/auth/uber/callback',
  UBER_MOBILE_CALLBACK: 'com.safehold://uber_authentication',

  // Lyft key in manh.nguyen@vmodev.com
  LYFT_ID: 'moM0lNk25KY3',
  LYFT_SECRET: 'vWA89KdqAKwNlo3LwGArDyP6-010ee51',
  LYFT_MOBILE_ID: 'ydqta0_S4fmj',
  LYFT_MOBILE_SECRET: 'Tc8u2RGYH2oYciD1JAJPndEtr4PUWJnp',

  // sdk payment
  STRIPE_SECRET_KEY: '',
  STRIPE_PUBLISHABLE_KEY: '',

  // sdk send mail
  MAIL_JET_API_KEY: '',
  MAIL_JET_API_SECRET: '',
};

