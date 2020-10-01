'use strict'

const { RouteResource } = require('@adonisjs/framework/src/Route/Manager');

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
});

Route.post('/sessions', 'SessionController.create');
Route.get('/sessions/user', 'SessionController.user');
Route.post('/sessions/refreshToken', 'SessionController.refreshToken');

Route.resource('/properties', 'PropertyController').apiOnly().middleware('auth');
Route.post('properties/:id/images', 'ImageController.store').middleware('auth');
Route.get('images/:path', 'ImageController.show').middleware('auth');
Route.resource('/users', 'UserController').apiOnly().middleware('auth');