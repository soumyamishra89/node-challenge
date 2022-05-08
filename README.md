# Implementation

- Login route for authenticating users (basic, can be improved by using JWT)
- Users route update to use authentication
- Added Expenses route with authentication and pagination
	- The pagination can be improved by returning total count and current page which can be used for fetching more pages
- Security: added a rate limiter requests
- Test: added tests for users and expenses route with additional test for security and util functions

## Setup
- create a database `test` for running the acceptance tests