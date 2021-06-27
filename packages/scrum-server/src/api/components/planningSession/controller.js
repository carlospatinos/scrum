// The controller class handles incoming requests, validates them and sends the response data back to the client. It uses the service class to interact with the database.

const PlanningSessionService = require('./service');
const { Logger } = require('../../../utils/Logger');

const logger = Logger(__filename);

const planningSessionSave = async (req, res) => {
  try {
    const serviceResponse = await PlanningSessionService.save(req.body);
    return res.status(200).json({
      success: true,
      // TODO HERE IT IS CALLED session, in other api is data, and the model PlanningSession
      session: serviceResponse.planningSession,
      planningRoomId: serviceResponse.planningRoomId,
    });
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
  }
};

const planningSessionFindById = async (req, res) => {
  try {
    const serviceResponse = await PlanningSessionService.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: serviceResponse.planningSession,
    });
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
  }
};

const planningSessionFindByAdmin = async (req, res) => {
  try {
    const serviceResponse = await PlanningSessionService.findAllByAdminId(req.params.adminId);
    return res.status(200).json({
      success: true,
      data: serviceResponse.planningSessions,
    });
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
  }
};

const planningSessionDelete = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`session to delete ${id}`);
    const serviceResponse = await PlanningSessionService.deleteSessionById(id);
    if (serviceResponse) {
      return res.status(200).json({
        success: true,
        data: serviceResponse,
      });
    }
    return res.status(400).json({ success: false, message: 'session not deleted' });
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
  }
};

const planningSessionDeleteAllByAdminId = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`session to delete by adminId ${id}`);
    const serviceResponse = await PlanningSessionService.deleteAllSessionByAdminId(id);
    if (serviceResponse) {
      return res.status(200).json({
        success: true,
        data: serviceResponse,
      });
    }
    return res.status(400).json({ success: false, message: 'sessions not deleted' });
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
  }
};

module.exports = {
  planningSessionSave,
  planningSessionFindById,
  planningSessionFindByAdmin,
  planningSessionDelete,
  planningSessionDeleteAllByAdminId,
};
