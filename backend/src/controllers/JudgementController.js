const JudgementModel = require('../models/JudgementModel');

class JudgementController {
  static async add(req, res) {
    try {
      const record = await JudgementModel.create(req.body);
      res.status(201).json({
        message: 'Judgement record added',
        data: record
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error adding judgement record',
        error: error.message
      });
    }
  }

  static async getByApplicant(req, res) {
    try {
      const { applicantId } = req.params;
      const records = await JudgementModel.findByApplicantId(applicantId);
      res.json(records);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching judgement records',
        error: error.message
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const record = await JudgementModel.update(id, req.body);
      res.json({
        message: 'Judgement record updated',
        data: record
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating judgement record',
        error: error.message
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await JudgementModel.delete(id);
      res.json({ message: 'Judgement record deleted' });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting judgement record',
        error: error.message
      });
    }
  }
}

module.exports = JudgementController;
