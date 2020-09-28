'use strict'

const User = use('App/Models/User');

class UserController {
	/**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  	async index ({ request }) {
		return User.all();
	}

	/**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  	async store( { request } ) {
		const data = request.only(['username', 'email', 'password', 'permission']);
		const user = await User.create(data);

		return user;
	}

	/**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
	async show ({ params, request, response, view }) {
		try {
			const user = await User.findOrFail(params.id)
			
			return user
		} catch (error) {
			console.log(error)
		}
   }
   
   /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async update ({ params, request, response }) {
      try {
			const user = await User.findOrFail(params.id);
         const data = request.only(['username', 'email', 'password', 'permission']);
         
         user.merge(data);
         await user.save();
			return user
		} catch (error) {
			console.log(error)
         response.status(400).send('Error to update user');
		}
   }

   /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async destroy ({ params, request, response }) {
      try {
         const user = await User.findOrFail(params.id)
      
         await user.delete()
         response.status(200);
      } catch(error) {
			console.log(error)
         response.status(400).send('Error to delete user');
      }
   }
}

module.exports = UserController
