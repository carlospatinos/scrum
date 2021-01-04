// The controller class handles incoming requests, validates them and sends the response data back to the client. It uses the service class to interact with the database.

const PlanningSessionService = require('./service');

const planningSessionSave = async (req, res) => {
  try {
    const serviceResponse = await PlanningSessionService.save(req);
    return res.status(200).json({
      success: true,
      // TODO HERE IT IS CALLED session, in other api is sessionInformation, and the model PlanningSession
      session: serviceResponse.planningSession,
      planningRoomId: serviceResponse.planningRoomId,
    });
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
  }
};

const planningSessionFind = async (req, res) => {
  try {
    const serviceResponse = await PlanningSessionService.find(req);
    return res.status(200).json({
      success: true,
      sessionInformation: serviceResponse.planningSession,
    });
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
  }
};

module.exports = { planningSessionSave, planningSessionFind };
