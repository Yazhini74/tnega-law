const ApplicantModel = require('../models/ApplicantModel');
const EducationModel = require('../models/EducationModel');
const AdditionalQualificationModel = require('../models/AdditionalQualificationModel');
const BarExperienceModel = require('../models/BarExperienceModel');
const CourtPracticeModel = require('../models/CourtPracticeModel');
const JudgementModel = require('../models/JudgementModel');
const DocumentModel = require('../models/DocumentModel');

class ApplicantController {
  static async createApplication(req, res) {
    try {
      const applicant = await ApplicantModel.create(req.body);
      res.status(201).json({
        message: 'Application created successfully',
        data: applicant
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error creating application',
        error: error.message
      });
    }
  }

  static async getApplication(req, res) {
    try {
      const { id } = req.params;
      const applicant = await ApplicantModel.findById(id);

      if (!applicant) {
        return res.status(404).json({ message: 'Applicant not found' });
      }

      // Fetch all related data
      const [education, additionalQualifications, barExperience, courtPractice, judgements, documents] = await Promise.all([
        EducationModel.findByApplicantId(id),
        AdditionalQualificationModel.findByApplicantId(id),
        BarExperienceModel.findByApplicantId(id),
        CourtPracticeModel.findByApplicantId(id),
        JudgementModel.findByApplicantId(id),
        DocumentModel.findByApplicantId(id)
      ]);

      res.json({
        applicant,
        education,
        additionalQualifications,
        barExperience,
        courtPractice,
        judgements,
        documents
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching application',
        error: error.message
      });
    }
  }

  static async getAllApplications(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const applications = await ApplicantModel.findAll(limit, offset);

      res.json({
        data: applications,
        page,
        limit
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching applications',
        error: error.message
      });
    }
  }

  static async updateApplication(req, res) {
    try {
      const { id } = req.params;
      const applicant = await ApplicantModel.update(id, req.body);

      res.json({
        message: 'Application updated successfully',
        data: applicant
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating application',
        error: error.message
      });
    }
  }

  static async deleteApplication(req, res) {
    try {
      const { id } = req.params;

      // Delete all related data
      await Promise.all([
        EducationModel.deleteByApplicantId(id),
        AdditionalQualificationModel.deleteByApplicantId(id),
        BarExperienceModel.deleteByApplicantId(id),
        CourtPracticeModel.deleteByApplicantId(id),
        JudgementModel.deleteByApplicantId(id),
        DocumentModel.deleteByApplicantId(id)
      ]);

      await ApplicantModel.delete(id);

      res.json({ message: 'Application deleted successfully' });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting application',
        error: error.message
      });
    }
  }
}

module.exports = ApplicantController;
