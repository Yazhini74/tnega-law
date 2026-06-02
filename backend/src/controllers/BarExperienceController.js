const BarExperienceModel = require('../models/BarExperienceModel');

class BarExperienceController {
  static async add(req, res) {
    try {
      const record = await BarExperienceModel.create(req.body);
      res.status(201).json({
        message: 'Bar experience added',
        data: record
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error adding bar experience',
        error: error.message
      });
    }
  }

  static async getByApplicant(req, res) {
    try {
      const { applicantId } = req.params;
      const record = await BarExperienceModel.findByApplicantId(applicantId);
      res.json(record || {});
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching bar experience',
        error: error.message
      });
    }
  }

  static async update(req, res) {
    try {
      const { applicantId } = req.params;
      const record = await BarExperienceModel.update(applicantId, req.body);
      res.json({
        message: 'Bar experience updated',
        data: record
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating bar experience',
        error: error.message
      });
    }
  }

  static async delete(req, res) {
    try {
      const { applicantId } = req.params;
      await BarExperienceModel.deleteByApplicantId(applicantId);
      res.json({ message: 'Bar experience deleted' });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting bar experience',
        error: error.message
      });
    }
  }
}

module.exports = BarExperienceController;
