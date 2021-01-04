// controller.ts
// The controller class handles incoming requests, validates them and sends the response data back to the client. It uses the service class to interact with the database.
const TipsService = require('./service');

const tipFind = async (req, res) => {
  try {
    const serviceResponse = await TipsService.find(req);
    return res.status(200).json({
      success: true,
      data: serviceResponse.data,
    });
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
  }
};

module.exports = { tipFind };
