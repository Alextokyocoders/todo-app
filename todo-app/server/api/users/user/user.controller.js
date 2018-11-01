/**
 * @author ManhNV
 * @description admin controller
 * @version 1.0.0
 * @create 2017/05/03
 */

import _ from 'lodash';
import {UserService} from './user.service';
import {validationParamError} from '../../../common/error_handler/validate.error';
import ForbiddenError from '../../../common/error_handler/base_error/state.error/ForbiddenError';
import {Constants} from '../../../common/constants';


const userService = new UserService();

export class UserController {
  /**
   * @api {GET} /user/:id 1. Profile
   * @apiName user_profile
   * @apiGroup User
   * @apiDescription Get user profile
   * @apiVersion  1.0.0
   * @apiUse failed
   *
   * @apiParam (Headers) {String} Authorization Json Web Token (JWT).
   *
   * @apiSuccessExample {JSON} Response: HTTP/1.1 200 OK
   {
  		 "status": 200,
  		 "message": "Ok",
  		 "data": {
  				 "_id": "5a9d1204bd00641c0855f489",
  				 "updatedAt": "2018-03-05T17:51:34.669Z",
  				 "createdAt": "2018-03-05T09:46:44.673Z",
  				 "email": "nguyenmanhit.mak1@gmail.com",
  				 "osType": "web",
  				 "isActive": false,
  				 "firstLogin": false,
  				 "address": "Gia Lam",
  				 "city": "Ha Noi",
  				 "firstName": "Manh",
  				 "lastName": "Mr",
  				 "state": "HaNoi",
  				 "zipCode": 10010,
  				 "avatar": "1520267245358Male-Avatar-Mustache-icon.png",
  				 "uber": {
  						 "id": "8c5cf0aa-8f9c-4b49-a606-d957264979d5",
  						 "refreshToken": "MA.CAESEJwPMuWcU0dsqJjKz6AyZzgiATEoATIBMQ.zp5jmJQgzS1i3VKLebcY7TqwKI7OHZWIXDHe20KCh88.ZHP32AoKtNnxoUPQEHbygP-tJw0ZgX5MFI54Iyu7y_c",
  						 "token": "KA.eyJ2ZXJzaW9uIjoyLCJpZCI6Ii9HTWNJeFZKUXphK0I1TGg2UUhPd2c9PSIsImV4cGlyZXNfYXQiOjE1MjI4MzcxNzUsInBpcGVsaW5lX2tleV9pZCI6Ik1RPT0iLCJwaXBlbGluZV9pZCI6MX0.ua0qvFmBgRqUvPLzYVGVLYo-lLFW6Ja3xzWqXy9r5IU"
  				 },
  				 "timeLogin": "2018-03-05T09:46:44.671Z",
  				 "receiveNotify": true,
  				 "isLock": false,
  				 "active": {
  						 "isActive": false
  				 },
  				 "provider": "local",
  				 "role": "driver",
  				 "pathImage": "http://52.77.245.195:8888//public/"
  		 }
   }
   *
   */
  profile(req, res) {
    if (req.params.id !== req.user._id && req.user.role !== Constants.ROLES.ADMIN) {
      return res.bad(new ForbiddenError());
    }
    userService.getProfile(req.user._id)
      .then(userProfile => {
        res.ok(userProfile);
      })
      .catch(err => {
        res.bad(err);
      });
  }

  /**
   * @api {PUT} /user/:id 2. Update
   * @apiName update_user
   * @apiGroup User
   * @apiDescription Update user account
   * @apiVersion  1.0.0
   * @apiUse failed
   *
   * @apiParam (Headers) {String} Authorization Json Web Token (JWT).
   *
   * @apiParam (Param) {String} id User Id
   *
   * @apiParam (FormData) {String} firstName First name info
   * @apiParam (FormData) {String} lastName Last name info
   * @apiParam (FormData) {String} phone phone number
   * @apiParam (FormData) {String} [middleInitial] middle initial name
   * @apiParam (FormData) {String} address address info
   * @apiParam (FormData) {String} city City info
   * @apiParam (FormData) {String} state State information
   * @apiParam (FormData) {Number} zipCode Zip code data
   * @apiParam (FormData) {String} [ssn] social security number
   * @apiParam (FormData) {File} [avatar] Avatar photo
   *
   * @apiParamExample  {JSON} Body-Example:
   {
  		 "code": "Jbg9ighEsdznwwfYT78WWmTrZhWU1X#_",
   }
   *
   * @apiSuccessExample {JSON} Response: HTTP/1.1 200 OK
   {
  		 "status": 200,
  		 "message": "Ok",
  		 "data": {
  				 "_id": "5a9d1204bd00641c0855f489",
  				 "updatedAt": "2018-03-05T10:19:36.552Z",
  				 "createdAt": "2018-03-05T09:46:44.673Z",
  				 "email": "nguyenmanhit.mak1@gmail.com",
  				 "osType": "web",
  				 "isActive": false,
  				 "lyft": {
  						 "refreshToken": "MA.CAESEJwPMuWcU0dsqJjKz6AyZzgiATEoATIBMQ.zp5jmJQgzS1i3VKLebcY7TqwKI7OHZWIXDHe20KCh88.ZHP32AoKtNnxoUPQEHbygP-tJw0ZgX5MFI54Iyu7y_c",
  						 "token": "KA.eyJ2ZXJzaW9uIjoyLCJpZCI6Ii9HTWNJeFZKUXphK0I1TGg2UUhPd2c9PSIsImV4cGlyZXNfYXQiOjE1MjI4MzcxNzUsInBpcGVsaW5lX2tleV9pZCI6Ik1RPT0iLCJwaXBlbGluZV9pZCI6MX0.ua0qvFmBgRqUvPLzYVGVLYo-lLFW6Ja3xzWqXy9r5IU",
  						 "id": "8c5cf0aa-8f9c-4b49-a606-d957264979d5"
  				 },
  				 "timeLogin": "2018-03-05T09:46:44.671Z",
  				 "receiveNotify": true,
  				 "isLock": false,
  				 "active": {
  						 "isActive": false
  				 },
  				 "provider": "local",
  				 "role": "driver"
  		 }
   }
   *
   * @apiSuccessExample {JSON} Response: HTTP/1.1 400 Bad
   {
  		 "status": 400,
  		 "errorMessage": "First name cannot be empty!",
  		 "error": {
  				 "firstName": {
  						 "location": "params",
  						 "param": "firstName",
  						 "msg": "First name cannot be empty!"
  				 },
  				 "middleInitial": {
  						 "location": "params",
  						 "param": "middleInitial",
  						 "msg": "Middle initial cannot be empty!"
  				 }
  		 }
   }
   */
  update(req, res) {
    req.body.id = req.params.id;
    req.check('id', 'Id invalid').isMongoId();
    req.check('firstName', 'First name cannot be empty!').notEmpty();
    req.check('lastName', 'Last name cannot be empty!').notEmpty();
    req.check('phone', 'Phone number cannot be empty!').notEmpty();
    req.check('address', 'Address cannot be empty!').notEmpty();
    req.check('city', 'City cannot be empty!').notEmpty();
    req.check('state', 'State cannot be empty!').notEmpty();
    req.check('zipCode', 'Zip code is invalid!').isPostalCode('any');
    if (req.body.ssn) {
      req.check('ssn', 'Social security invalid!').isSSN();
    }
    let errors = req.validationErrors(true);
    console.log(errors);
    if (errors) {
      return validationParamError(res, errors);
    }
    if (req.body.id !== req.user._id) {
      return res.bad(new ForbiddenError());
    }
    if (req.files['avatar']) {
      req.body.avatar = req.files['avatar'][0]['filename'];
    }
    req.body['active.profile'] = true;
    const params = _.pick(req.body, ['firstName', 'middleInitial', 'lastName', 'address',
      'city', 'state', 'zipCode', 'avatar', 'active.profile', 'ssn', 'phone'
    ]);
    userService.update(req.user._id, params)
      .then(dataUser => {
        return res.ok(dataUser);
      })
      .catch(err => {
        console.log(err);
        return res.bad(err);
      });
  }

  /**
   * @api {PUT} /user/password/change 3. Change password
   * @apiName change_password
   * @apiGroup User
   * @apiDescription Change password account
   * @apiVersion  1.0.0
   * @apiUse failed
   *
   * @apiParam (Headers) {String} Authorization Json Web Token (JWT).
   *
   * @apiParam (Param) {String} id User Id
   *
   * @apiParam (Body) {String} oldPassword password old
   * @apiParam (Body) {String} newPassword password new
   * @apiParam (Body) {String} retryPassword retry input password
   *
   * @apiParamExample  {JSON} Body-Example:
   {
  		 "oldPassword": "123457",
  		 "newPassword": "123456",
  		 "retryPassword": "123456"
   }
   *
   * @apiSuccessExample {JSON} Response: HTTP/1.1 200 OK
   {
  		 "status": 200,
  		 "message": "Change password success!"
   }
   *
   * @apiSuccessExample {JSON} Response: HTTP/1.1 400 Bad
   {
  		 "status": 400,
  		 "errorMessage": "Password old not match.",
  		 "error": {}
   }
   */
  changePassword(req, res) {
    req.check('oldPassword', 'password old is required.').notEmpty();
    req.check('newPassword', 'password new is required.').notEmpty();
    req.check('retryPassword', 'retry password cannot be empty.').notEmpty();
    let errors = req.validationErrors(true);
    if (errors) {
      return validationParamError(res, errors);
    }
    if (req.body['newPassword'] !== req.body['retryPassword']) {
      return res.bad('Retry password not match.');
    }
    const params = _.pick(req.body, ['oldPassword', 'newPassword']);
    userService.changePassword(req.user._id, params)
      .then(data => {
        return res.ok(data);
      })
      .catch(err => {
        return res.bad(err);
      });
  }

  /**
   * @api {POST} /user/password/forgot 4. Forgot password
   * @apiName forgot_password
   * @apiGroup User
   * @apiDescription Forgot password account
   * @apiVersion  1.0.0
   *
   * @apiParam (Body) {String} email email need forgot password
   *
   * @apiParamExample  {JSON} Body-Example:
   {
  		 "email": "manh.nguyen@vmodev.com"
   }
   *
   * @apiSuccessExample {JSON} Response: HTTP/1.1 200 OK
   {
  		 "status": 200,
  		 "message": "Forgot password success! Please confirm mailbox to get code verify!"
   }
   *
   * @apiSuccessExample {JSON} Response: HTTP/1.1 400 Bad
   {
  		 "status": 400,
  		 "errorMessage": "Account not support in system! Please check account again.",
  		 "error": {}
   }
   */
  forgotPassword(req, res) {
    req.check('email', 'Email invalid!').isEmail();
    let errors = req.validationErrors(true);
    if (errors) {
      return validationParamError(res, errors);
    }
    userService.forgotPassword(req.body.email)
      .then(data => {
        return res.ok(data);
      })
      .catch(err => {
        return res.bad(err);
      });
  }

  /**
   * @api {POST} /user/email/send-verify 5. Send verify
   * @apiName send_verify
   * @apiGroup User
   * @apiDescription Send code verify to email
   * @apiVersion  1.0.0
   * @apiUse failed
   *
   * @apiParam (Headers) {String} Authorization Json Web Token (JWT).
   *
   * @apiParam (Body) {String} email email need send code verify
   *
   * @apiParamExample  {JSON} Body-Example:
   {
  		 "email": "manh.nguyen@vmodev.com"
   }
   *
   * @apiSuccessExample {JSON} Response: HTTP/1.1 200 OK
   {
  		 "status": 200,
  		 "message": "Send code active success! Please confirm mailbox to get code verify!"
   }
   *
   * @apiSuccessExample {JSON} Response: HTTP/1.1 400 Bad
   {
  		 "status": 400,
  		 "errorMessage": "User not found"
   }
   */
  sendVerify(req, res) {
    req.check('email', 'Email is required!').notEmpty();
    req.check('email', 'Email invalid!').isEmail();
    let errors = req.validationErrors(true);
    if (errors) {
      return validationParamError(res, errors);
    }
    userService.sendVerify(req.user._id, req.body.email)
      .then(data => {
        return res.ok(data);
      })
      .catch(err => {
        return res.bad(err);
      });
  }

  /**
   * @api {POST} /user/email/verify 6. Verify email
   * @apiName verify_email
   * @apiGroup User
   * @apiDescription Verify email
   * @apiVersion  1.0.0
   * @apiUse failed
   *
   * @apiParam (Headers) {String} Authorization Json Web Token (JWT).
   *
   * @apiParam (Body) {String} code code need send code verify
   *
   * @apiParamExample  {JSON} Body-Example:
   {
  		 "code": "23f9eed252"
   }
   *
   * @apiSuccessExample {JSON} Response: HTTP/1.1 200 OK
   {
  		 "status": 200,
  		 "message": "Send code active success! Please confirm mailbox to get code verify!"
   }
   *
   * @apiSuccessExample {JSON} Response: HTTP/1.1 400 Bad
   {
  		 "status": 400,
  		 "errorMessage": "User not found"
   }
   */
  verifyEmail(req, res) {
    req.check('code', 'code verify is required!').notEmpty();
    let errors = req.validationErrors(true);
    if (errors) {
      return validationParamError(res, errors);
    }
    userService.verifyEmail(req.user._id, req.body.code)
      .then(data => {
        return res.ok('Verify email success!', data);
      })
      .catch(err => {
        return res.bad(err);
      });
  }

  /**
   * @api {GET} /user 7. Get all user
   * @apiName list_user
   * @apiGroup User
   * @apiDescription List all user
   * @apiVersion  1.0.0
   * @apiUse failed
   *
   * @apiParam (Headers) {String} Authorization Json Web Token (JWT).
   *
   * @apiParam (QueryString) {number} [page] page number
   * @apiParam (QueryString) {number} [page_size] page size
   * @apiParam (QueryString) {Bollean} [active] User account active status, must be [trua, false]
   * @apiParam (QueryString) {Bollean} [lock] User account status, must be [trua, false]
   * @apiParam (QueryString) {String} [connect] User account link with, must be ['uber','lyft']
   * @apiParam (QueryString) {String} [search] field want to search, must use with keyword
   * @apiParam (QueryString) {String} [keyword] keyword for seaching, must use with search
   * @apiParam (QueryString) {String} [role] User role
   * @apiParam (QueryString) {number} [createdAt] Filter by time. Must be [1, -1]
   * @apiSuccessExample {JSON} Response: HTTP/1.1 200 OK
   {
     {
   "status": 200,
   "message": "Ok",
   "data": {
       "total_item": 1,
       "data": [
           {
               "_id": "5ac59405cb6d2b4443429ac1",
               "firstName": "Văn Duy",
               "lastName": "Bùi",
               "osType": "web",
               "tax": "5ac59405cb6d2b4443429ac2",
               "schedule": [],
               "uber": {
                   "id": "c40fc2b7-65ef-47ab-96bd-e0361683f633",
                   "token": "KA.eyJ2ZXJzaW9uIjoyLCJpZCI6IjU3aWxLNnBDUk1tTHFJYlNqZkc5aEE9PSIsImV4cGlyZXNfYXQiOjE1MjU0ODk5MjMsInBpcGVsaW5lX2tleV9pZCI6Ik1RPT0iLCJwaXBlbGluZV9pZCI6MX0.jo4NYDBf69XXAdH_9JtNYSaLwQcTbJ6YYVimzUNmirI",
                   "refreshToken": "MA.CAESEKOwABHi7EuXq5hPEgOh_GkiATEoATIBMQ.lVA63cfv2lTLFpZYgBmziKh773USX78SxDdkjV8uPEI.oQHXtJB2HqC-6g1h5EkNUUQ-PeNX6Hjlhk1NtwoDJVA",
                   "expiresIn": "2018-05-05T03:12:05.106Z"
               },
               "timeLogin": "2018-04-05T03:12:05.106Z",
               "receiveNotify": true,
               "isLock": false,
               "active": {
                   "linkAccount": true,
                   "verifyEmail": false,
                   "taxProfile": false,
                   "profile": false
               },
               "salt": "b74e8d5660fa12a623e2a79550507e57",
               "provider": "uber",
               "role": "driver",
               "pathImage": "http://api.safehold.xyz:/public/",
               "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWM1OTQwNWNiNmQyYjQ0NDM0MjlhYzEiLCJyb2xlIjoiZHJpdmVyIiwiYWN0aXZlIjp7InByb2ZpbGUiOmZhbHNlLCJ0YXhQcm9maWxlIjpmYWxzZSwidmVyaWZ5RW1haWwiOmZhbHNlLCJsaW5rQWNjb3VudCI6dHJ1ZX0sInJlY2VpdmVOb3RpZnkiOnRydWUsImF2YXRhciI6IiIsInBhdGhJbWFnZSI6Imh0dHA6Ly9hcGkuc2FmZWhvbGQueHl6Oi9wdWJsaWMvIiwiaWF0IjoxNTIzNTI3OTcyLCJleHAiOjE1MjYxMTk5NzJ9.HYpELDwWd16Cxt4giE7jtmv9Z9rBClr-StjQ_HPOWtM",
               "id": "5ac59405cb6d2b4443429ac1"
           }
       ],
       "page": 1,
       "page_size": 20,
       "total_page": 1
   }
}
	 }
   *
   */
  list(req, res) {
    if (req.user.role === 'driver') {
      return res.bad(new ForbiddenError());
    }


    let filter = {
      find: {},
      paginate: {
        page: req.query.page || 1,
        page_size: req.query.page_size || 20
      },
      sort: {
        sort: req.query.createdAt || 1
      }
    };
    let search = [];
    if (req.query.active) {
      filter.find['active.profile'] = req.query.active;
    }
    if (req.query.lock) {
      filter.find.lock = req.query.lock;
    }
    if (req.query.role) {
      filter.find.role = req.query.role;
    }
    if (req.query.connect) {
      filter.find[req.query.connect] = {
        $exists: true
      };
    }
    if (req.query.search && req.query.keyword) {
      let key = req.query.search;
      search.push({
        [key]: new RegExp(req.query.keyword, 'i')
      });
      filter.find['$or'] = search;
    }
    userService.list(filter)
      .then(data => res.ok(data))
      .catch(err => res.bad(err));
  }

  /**
   * @api {PUT} /user/admin/:id 7. Change admin
   * @apiName add_remove_admin
   * @apiGroup User
   * @apiDescription Change admin role
   * @apiVersion  1.0.0
   * @apiUse failed
   *
   * @apiParam (Headers) {String} Authorization Json Web Token (JWT).
   *
   * @apiParam (Param) {String} id User will be changed role
   *
   * @apiParam (QueryString) {String} role Role will become, must be ['admin','driver']
   *
   * @apiSuccessExample {JSON} Response: HTTP/1.1 200 OK
   {
			{
		"status": 200,
		"message": "Ok",
		"data": {
				"_id": "5ab1c26487ebed67c0bd5849",
				"updatedAt": "2018-04-12T10:33:46.948Z",
				"createdAt": "2018-03-21T02:24:36.873Z",
				"email": "mayvimaru@gmail.com",
				"password": "16e47283c9d91b846d52593ab73e197f88c940b56fdee013c005c7e2eba841496bb86b597f256bba23982c08c4aeeaa0a2a7f9b3467f310734686bbce3c02842",
				"osType": "web",
				"__v": 1,
				"tax": "5ab1c26487ebed67c0bd584a",
				"address": "127 Nguyen Ngoc Nai",
				"avatar": "1522306376935file_name1522306375094.jpg",
				"city": "Ha Noi",
				"firstName": "Luong",
				"lastName": "May",
				"state": "GA",
				"zipCode": "12344",
				"firstLogin": false,
				"middleInitial": "AAAA",
				"schedule": [],
				"uber": {
						"expiresIn": "2018-04-26T09:15:45.822Z",
						"refreshToken": "MA.CAESEOlqbCpZs0aKpLde669TqRwiATEoATIBMQ.o-eRpDlW3Wh8cCqDZCZ7_2xUI0PVjU-NED46MtVFnRQ.PhnSBV6CtoRBYKKStuH6jEOruoFc9e5495gFNBJO3Rw",
						"token": "KA.eyJ2ZXJzaW9uIjoyLCJpZCI6ImFlNnFpNnBoU3phYmR2UHpjdU1jM1E9PSIsImV4cGlyZXNfYXQiOjE1MjQ3MzQxNDQsInBpcGVsaW5lX2tleV9pZCI6Ik1RPT0iLCJwaXBlbGluZV9pZCI6MX0.f0M-7uj-agNnjyrcpVC8K4dMu7j_C2u12uZ1T8avuIk",
						"id": "9fe91ba7-8308-4eb6-99e0-9fd33bb0b48f"
				},
				"facebook": {
						"token": "EAAPYvt4bnI4BAH7riEgxSCZA4H1IW3uhqQSpCz3YoiXtkKbRZArImDh7KlancO14RUUhue13GRogUOTIPI35IFHWw4OGEgZCwp95vkrnYybWXoAFem0BQEEPhscAreDIsZAEG0Bc3ZB8uTZAxGgnj97HXt7nCSYRBZCFyM0XgkKy1pxNdX1zGOZAj24xRC2WLc2gZCmPbBAqY5QZDZD",
						"id": "1548321635274981"
				},
				"timeLogin": "2018-03-21T02:24:36.872Z",
				"receiveNotify": true,
				"isLock": false,
				"mailActivated": {
						"timeExpire": 1522403683,
						"code": "909324"
				},
				"active": {
						"linkAccount": true,
						"verifyEmail": true,
						"taxProfile": true,
						"profile": true
				},
				"salt": "b071715c838e9cb321de65ec8b93238f",
				"provider": "facebook",
				"role": "admin",
				"pathImage": "http://api.safehold.xyz:/public/",
				"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWIxYzI2NDg3ZWJlZDY3YzBiZDU4NDkiLCJyb2xlIjoiYWRtaW4iLCJhY3RpdmUiOnsicHJvZmlsZSI6dHJ1ZSwidGF4UHJvZmlsZSI6dHJ1ZSwidmVyaWZ5RW1haWwiOnRydWUsImxpbmtBY2NvdW50Ijp0cnVlfSwicmVjZWl2ZU5vdGlmeSI6dHJ1ZSwiYXZhdGFyIjoiMTUyMjMwNjM3NjkzNWZpbGVfbmFtZTE1MjIzMDYzNzUwOTQuanBnIiwicGF0aEltYWdlIjoiaHR0cDovL2FwaS5zYWZlaG9sZC54eXo6L3B1YmxpYy8iLCJpYXQiOjE1MjM1MjkyMjcsImV4cCI6MTUyNjEyMTIyN30.PD_O75_VheAZs-2ziEZRUr6TXxbZcRphfdk1wEtbWI0",
				"id": "5ab1c26487ebed67c0bd5849"
		}
}
   */
  updateAdmin(req, res) {
    if (req.user.role === 'driver') {
      return res.bad(new ForbiddenError());
    }

    req.body.role = req.query.role;
    req.body.id = req.params.id;
    req.check('id', 'User id invalid').isMongoId();
    req.check('role', ' Role is missing').notEmpty();

    let errors = req.validationErrors(true);
    if (errors) {
      return validationParamError(res, errors);
    }

    userService.updateRole(req.params.id, req.body.role)
      .then(data => res.ok(data))
      .catch(err => res.bad(err));
  }


  /**
   * @api {PUT} /user/admin/:id 8. List admin
   * @apiName list_admin
   * @apiGroup User
   * @apiDescription List all admin
   * @apiVersion  1.0.0
   * @apiUse failed
   *
   * @apiParam (Headers) {String} Authorization Json Web Token (JWT).
   *
   * @apiSuccessExample {JSON} Response: HTTP/1.1 200 OK
   {
  						 "_id": "5ac59405cb6d2b4443429ac1",
  						 "firstName": "Văn Duy",
  						 "lastName": "Bùi",
  						 "osType": "web",
  						 "tax": "5ac59405cb6d2b4443429ac2",
  						 "schedule": [],
  						 "uber": {
  								 "id": "c40fc2b7-65ef-47ab-96bd-e0361683f633",
  								 "token": "KA.eyJ2ZXJzaW9uIjoyLCJpZCI6IjU3aWxLNnBDUk1tTHFJYlNqZkc5aEE9PSIsImV4cGlyZXNfYXQiOjE1MjU0ODk5MjMsInBpcGVsaW5lX2tleV9pZCI6Ik1RPT0iLCJwaXBlbGluZV9pZCI6MX0.jo4NYDBf69XXAdH_9JtNYSaLwQcTbJ6YYVimzUNmirI",
  								 "refreshToken": "MA.CAESEKOwABHi7EuXq5hPEgOh_GkiATEoATIBMQ.lVA63cfv2lTLFpZYgBmziKh773USX78SxDdkjV8uPEI.oQHXtJB2HqC-6g1h5EkNUUQ-PeNX6Hjlhk1NtwoDJVA",
  								 "expiresIn": "2018-05-05T03:12:05.106Z"
  						 },
  						 "timeLogin": "2018-04-05T03:12:05.106Z",
  						 "receiveNotify": true,
  						 "isLock": false,
  						 "active": {
  								 "linkAccount": true,
  								 "verifyEmail": false,
  								 "taxProfile": false,
  								 "profile": false
  						 },
  						 "salt": "b74e8d5660fa12a623e2a79550507e57",
  						 "provider": "uber",
  						 "role": "driver",
  						 "pathImage": "http://api.safehold.xyz:/public/",
  						 "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWM1OTQwNWNiNmQyYjQ0NDM0MjlhYzEiLCJyb2xlIjoiZHJpdmVyIiwiYWN0aXZlIjp7InByb2ZpbGUiOmZhbHNlLCJ0YXhQcm9maWxlIjpmYWxzZSwidmVyaWZ5RW1haWwiOmZhbHNlLCJsaW5rQWNjb3VudCI6dHJ1ZX0sInJlY2VpdmVOb3RpZnkiOnRydWUsImF2YXRhciI6IiIsInBhdGhJbWFnZSI6Imh0dHA6Ly9hcGkuc2FmZWhvbGQueHl6Oi9wdWJsaWMvIiwiaWF0IjoxNTIzNTI3OTcyLCJleHAiOjE1MjYxMTk5NzJ9.HYpELDwWd16Cxt4giE7jtmv9Z9rBClr-StjQ_HPOWtM",
  						 "id": "5ac59405cb6d2b4443429ac1"
  				 }
   */
  listAdmin(req, res) {
    if (req.user.role === Constants.ROLES.ADMIN || req.user.role === Constants.ROLES.ROOT) {
      userService.listAdmin()
        .then(data => res.ok(data))
        .catch(err => res.bad(err));
    }
  }


  /**
   * @api {PUT} /user/admin/lock/:id 9. Lock user
   * @apiName lock_user
   * @apiGroup User
   * @apiDescription Lock user account
   * @apiVersion  1.0.0
   * @apiUse failed
   *
   * @apiParam (Headers) {String} Authorization Json Web Token (JWT).
   *
   * @apiParam (Param) {String} id User will be locked
   * @apiParam (QueryString) {String} lock Must be ['true', 'false']
   *
   * @apiSuccessExample {JSON} Response: HTTP/1.1 200 OK
   {
  			{
  		"status": 200,
  		"message": "Ok"5ac748786b270c10bc2121f4,
  		"data": {
  				"_id": "5ab1c26487ebed67c0bd5849",
  				"updatedAt": "2018-04-12T10:33:46.948Z",
  				"createdAt": "2018-03-21T02:24:36.873Z",
  				"email": "mayvimaru@gmail.com",
  				"password": "16e47283c9d91b846d52593ab73e197f88c940b56fdee013c005c7e2eba841496bb86b597f256bba23982c08c4aeeaa0a2a7f9b3467f310734686bbce3c02842",
  				"osType": "web",
  				"__v": 1,
  				"tax": "5ab1c26487ebed67c0bd584a",
  				"address": "127 Nguyen Ngoc Nai",
  				"avatar": "1522306376935file_name1522306375094.jpg",
  				"city": "Ha Noi",
  				"firstName": "Luong",
  				"lastName": "May",
  				"state": "GA",
  				"zipCode": "12344",
  				"firstLogin": false,
  				"middleInitial": "AAAA",
  				"schedule": [],
  				"uber": {
  						"expiresIn": "2018-04-26T09:15:45.822Z",
  						"refreshToken": "MA.CAESEOlqbCpZs0aKpLde669TqRwiATEoATIBMQ.o-eRpDlW3Wh8cCqDZCZ7_2xUI0PVjU-NED46MtVFnRQ.PhnSBV6CtoRBYKKStuH6jEOruoFc9e5495gFNBJO3Rw",
  						"token": "KA.eyJ2ZXJzaW9uIjoyLCJpZCI6ImFlNnFpNnBoU3phYmR2UHpjdU1jM1E9PSIsImV4cGlyZXNfYXQiOjE1MjQ3MzQxNDQsInBpcGVsaW5lX2tleV9pZCI6Ik1RPT0iLCJwaXBlbGluZV9pZCI6MX0.f0M-7uj-agNnjyrcpVC8K4dMu7j_C2u12uZ1T8avuIk",
  						"id": "9fe91ba7-8308-4eb6-99e0-9fd33bb0b48f"
  				},
  				"facebook": {
  						"token": "EAAPYvt4bnI4BAH7riEgxSCZA4H1IW3uhqQSpCz3YoiXtkKbRZArImDh7KlancO14RUUhue13GRogUOTIPI35IFHWw4OGEgZCwp95vkrnYybWXoAFem0BQEEPhscAreDIsZAEG0Bc3ZB8uTZAxGgnj97HXt7nCSYRBZCFyM0XgkKy1pxNdX1zGOZAj24xRC2WLc2gZCmPbBAqY5QZDZD",
  						"id": "1548321635274981"
  				},
  				"timeLogin": "2018-03-21T02:24:36.872Z",
  				"receiveNotify": true,
  				"isLock": false,
  				"mailActivated": {
  						"timeExpire": 1522403683,
  						"code": "909324"
  				},
  				"active": {
  						"linkAccount": true,
  						"verifyEmail": true,
  						"taxProfile": true,
  						"profile": true
  				},
  				"salt": "b071715c838e9cb321de65ec8b93238f",
  				"provider": "facebook",
  				"role": "admin",
  				"pathImage": "http://api.safehold.xyz:/public/",
  				"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWIxYzI2NDg3ZWJlZDY3YzBiZDU4NDkiLCJyb2xlIjoiYWRtaW4iLCJhY3RpdmUiOnsicHJvZmlsZSI6dHJ1ZSwidGF4UHJvZmlsZSI6dHJ1ZSwidmVyaWZ5RW1haWwiOnRydWUsImxpbmtBY2NvdW50Ijp0cnVlfSwicmVjZWl2ZU5vdGlmeSI6dHJ1ZSwiYXZhdGFyIjoiMTUyMjMwNjM3NjkzNWZpbGVfbmFtZTE1MjIzMDYzNzUwOTQuanBnIiwicGF0aEltYWdlIjoiaHR0cDovL2FwaS5zYWZlaG9sZC54eXo6L3B1YmxpYy8iLCJpYXQiOjE1MjM1MjkyMjcsImV4cCI6MTUyNjEyMTIyN30.PD_O75_VheAZs-2ziEZRUr6TXxbZcRphfdk1wEtbWI0",
  				"id": "5ab1c26487ebed67c0bd5849"
  		}
  }
   */

  lock(req, res) {
    req.body.user = req.params.id;
    req.body.lock = req.query.lock;
    req.check('user', 'User id invalid').isMongoId();
    req.check('lock', 'User lock status must be true/false').isIn(['true', 'false']);

    let errors = req.validationErrors(true);
    if (errors) {
      return validationParamError(res, errors);
    }

    userService.lock(req.params.id, req.body.lock)
      .then(data => res.ok(data))
      .catch(err => res.bad(err));
  }

  /**
   * @api {GET} /user/sms/resend 8. Resend SMS code
   * @apiName send_sms_code
   * @apiGroup User
   * @apiDescription Send sms code
   * @apiVersion  1.0.0
   *
   * @apiParam (QueryString) {String} email User email
   *
   */
  resend(req, res) {
    req.body.email = req.query.email;
    req.check('email', "Email is missing").notEmpty();
    let errors = req.validationErrors(true);
    if (errors) {
      return validationParamError(res, errors);
    }

    userService.resend(req.body.email)
      .then(data => res.ok(data))
      .catch(err => res.bad(err));
  }
}