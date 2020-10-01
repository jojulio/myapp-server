'use strict'

class SessionController {
  async create ({ request, response, auth }) { 
    try {
      const { email, password } = request.all();

      const token = await auth.withRefreshToken().attempt(email, password);
      
      return token;
    } catch(error) {
      console.log(error);
      response.status(400).send('Error to create session');
    }
    
  }

  async user({ response, auth }) {
    try {
      return await auth.getUser()
    } catch (error) {
      console.log(error)
      response.status(401).send('You are not logged in')
    }
  }

  async refreshToken({ request, response, auth }) {
    try {
      const { refreshToken } = request.all();
      return await auth.newRefreshToken().generateForRefreshToken(refreshToken);
    } catch (error) {
      console.log(error)
      response.status(401).send('Error to refresh token');
    }
  }
}

module.exports = SessionController;