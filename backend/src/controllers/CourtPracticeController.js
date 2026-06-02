const CourtPracticeModel = require('../models/CourtPracticeModel');

class CourtPracticeController {
  static async add(req, res) {
    try {
      const record = await CourtPracticeModel.create(req.body);
      res.status(201).json({
        message: 'Court practice record added',
        data: record
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error adding court practice record',
        error: error.message
      });
    }
  }

  static async getByApplicant(req, res) {
    try {
      const { applicantId } = req.params;
      const records = await CourtPracticeModel.findByApplicantId(applicantId);
      res.json(records);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching court practice records',
        error: error.message
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const record = await CourtPracticeModel.update(id, req.body);
      res.json({
        message: 'Court practice record updated',
        data: record
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating court practice record',
        error: error.message
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await CourtPracticeModel.delete(id);
      res.json({ message: 'Court practice record deleted' });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting court practice record',
        error: error.message
      });
    }
  }
}

module.exports = CourtPracticeController;
