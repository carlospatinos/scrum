// controller.ts
// The controller class handles incoming requests, validates them and sends the response data back to the client. It uses the service class to interact with the database.

const UserService = require('./service');
const { Logger } = require('../../../utils/Logger');

const logger = Logger(__filename);

const signUp = async (req, res) => {
  try {
    const serviceResponse = await UserService.signUp(req.body);
    return res.status(200).json({
      success: true,
      // TODO wrap data into data field?
      user: serviceResponse.user,
    });
  } catch (e) {
    // TODO why the error is not progagated
    return res.status(400).json({ success: false, message: e.message });
  }
};

const logout = async (req, res) => {
  try {
    const result = await req.user.deleteToken(req.token);
    if (result) {
      req.logout();
      return res.status(200).json({
        success: true,
        user: undefined,
      });
    }
    return res.status(400).json({ success: false, message: 'error deleting the token' });
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const { id } = req.body.user;
    logger.info(`userId to delete ${id}`);
    const result = await UserService.deleteProfileById(id);
    if (result) {
      return res.status(200).json({
        success: true,
      });
    }
    return res.status(400).json({ success: false, message: 'user not deleted' });
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
  }
};

module.exports = { signUp, logout, deleteProfile };
