// controller.ts
// The controller class handles incoming requests, validates them and sends the response data back to the client. It uses the service class to interact with the database.

const UserService = require('./service');

const signUp = async (req, res) => {
  try {
    const serviceResponse = await UserService.signUp(req);
    return res.status(200).json({
      success: true,
      user: serviceResponse.user,
    });
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
  }
};

module.exports = { signUp };
