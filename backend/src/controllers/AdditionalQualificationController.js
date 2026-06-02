const AdditionalQualificationModel = require('../models/AdditionalQualificationModel');

class AdditionalQualificationController {
  static async add(req, res) {
    try {
      const record = await AdditionalQualificationModel.create(req.body);
      res.status(201).json({
        message: 'Additional qualification added',
        data: record
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error adding additional qualification',
        error: error.message
      });
    }
  }

  static async getByApplicant(req, res) {
    try {
      const { applicantId } = req.params;
      const records = await AdditionalQualificationModel.findByApplicantId(applicantId);
      res.json(records);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching additional qualifications',
        error: error.message
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const record = await AdditionalQualificationModel.update(id, req.body);
      res.json({
        message: 'Additional qualification updated',
        data: record
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating additional qualification',
        error: error.message
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await AdditionalQualificationModel.delete(id);
      res.json({ message: 'Additional qualification deleted' });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting additional qualification',
        error: error.message
      });
    }
  }
}

module.exports = AdditionalQualificationController;
