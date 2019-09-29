# Aja Backend Repository
This is the backend repository of the Aja team. For more information on the generell project please visit the [frontend README](https://github.com/dohack-io/aja-frontend/blob/master/README.md).

The here included server runs on NodeJs and uses the express framework to create a small API.

Other technologies
* Authentication: Json web tokens
* Logging: Winston
* Database: PostgreSQL

## Endpoints
*POST*   **/auth/register**\
Register a new user. A 1h-valid JWT is returned together with the profile info of the user.


*POST*   **/auth/login**\
Login with email and password. A 1h-valid JWT is returned together with the profile info of the user.


*GET*   **/garden/:id**\
Get garden details.


*GET*   **/garden/:id**\
Get garden details.


*POST*   **/gardens/search**\
Post a `radius`, `longitude`, and `latitude` to recieve all gardens in the given radius around the gps position.


*GET*   **/user/:id**\
Get the user details.


*GET*   **/user/:id/gardens**\
Get the gardens the user is taking care of.


*POST*   **/user/:id/garden/:id**\
Add the garden to the user to take care of.


*DELETE*   **/user/:id/garden/:id**\
Remove the garden from the ones the user takes care of.


*POST*   **/user/:id/garden/:id/posts**\
Add a new post to a garden.
