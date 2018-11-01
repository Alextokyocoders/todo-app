/**
 * @apiDefine failed
 * @apiSuccessExample {JSON} Response: HTTP/1.1 401
 {
     "status": 401,
     "errorMessage": "Unauthorized error",
     "error": {
         "name": "UnauthorizedError",
         "message": "No authorization token was found",
         "code": "credentials_required",
         "status": 401,
         "inner": {
             "message": "No authorization token was found"
         }
     }
 }
 *
 * @apiSuccessExample {JSON} Response: HTTP/1.1 403
 {
    "status": 403,
    "errorMessage": "User has no permission to access this resource.",
    "error": {
        "name": "ForbiddenError",
        "message": "User has no permission to access this resource.",
        "code": "permission_denied",
        "status": 403,
        "inner": {
            "message": "User has no permission to access this resource."
        }
    }
 }
 *
 */

/**
 * @apiDefine header
 *
 * @apiHeaderExample {JSON} Header-Example:
 {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTlmNjcwZDRhZjYxZjA3OGUyODY1ODkiLCJyb2xlIjoiZHJpdmVyIiwiYWN0aXZlIjp7InByb2ZpbGUiOnRydWUsInRheFByb2ZpbGUiOmZhbHNlLCJ2ZXJpZnlFbWFpbCI6ZmFsc2UsImxpbmtBY2NvdW50Ijp0cnVlfSwicmVjZWl2ZU5vdGlmeSI6dHJ1ZSwiYXZhdGFyIjoiMTUyMDQxMDI3NzM5Nk1hbGUtQXZhdGFyLU11c3RhY2hlLWljb24ucG5nIiwicGF0aEltYWdlIjoiaHR0cDovLzUyLjc3LjI0NS4xOTU6ODg4OC9wdWJsaWMvIiwiaWF0IjoxNTIwODU1MjgzLCJleHAiOjE1MjM0NDcyODN9.y5ir-Hn2oiwwekObIHtXfPB__V2WqMjSwwx8fr0PReU",
    "Content-Type": "application/json"
 }
 *
 */

import stateData from '../../config/other/state';

/**
 *
 * @api {GET} /common/state 1. Get State
 * @apiName state
 * @apiGroup Common
 * @apiDescription list state us
 * @apiVersion  1.0.0
 *
 * @apiSuccessExample {JSON} Response: HTTP/1.1 200 OK
 {
     "status": 200,
     "message": "Ok",
     "data": {
         "state": [
             {
                 "name": "Alabama",
                 "abbreviation": "AL"
             },
             {
                 "name": "Alaska",
                 "abbreviation": "AK"
             },
             {
                 "name": "American Samoa",
                 "abbreviation": "AS"
             }
             ...........
         ]
     }
 }
 *
 */
export function getState(req, res) {
  return res.ok(stateData);
}