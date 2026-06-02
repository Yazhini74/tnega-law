const EducationModel = require('../models/EducationModel');

class EducationController {
  static async addEducation(req, res) {
    try {
      const education = await EducationModel.create(req.body);
      res.status(201).json({
        message: 'Education record added',
        data: education
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error adding education record',
        error: error.message
      });
    }
  }

  static async getEducationByApplicant(req, res) {
    try {
      const { applicantId } = req.params;
      const records = await EducationModel.findByApplicantId(applicantId);
      res.json(records);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching education records',
        error: error.message
      });
    }
  }

  static async updateEducation(req, res) {
    try {
      const { id } = req.params;
      const education = await EducationModel.update(id, req.body);
      res.json({
        message: 'Education record updated',
        data: education
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating education record',
        error: error.message
      });
    }
  }

  static async deleteEducation(req, res) {
    try {
      const { id } = req.params;
      await EducationModel.delete(id);
      res.json({ message: 'Education record deleted' });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting education record',
        error: error.message
      });
    }
  }
}

module.exports = EducationController;
