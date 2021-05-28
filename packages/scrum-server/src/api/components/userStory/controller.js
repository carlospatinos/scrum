// The controller class handles incoming requests, validates them and sends the response data back to the client. It uses the service class to interact with the database.

const UserStoryService = require('./service');

const userStoryServiceSave = async (req, res) => {
  try {
    const serviceResponse = await UserStoryService.save(req.body);
    return res.status(200).json({
      success: true,
      data: serviceResponse.data,
    });
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
  }
};

const userStoryServiceFindAll = async (req, res) => {
  try {
    const serviceResponse = await UserStoryService.findAll(req.params.id);
    return res.status(200).json({
      success: true,
      data: serviceResponse.data,
    });
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
  }
};

module.exports = { userStoryServiceSave, userStoryServiceFindAll };
