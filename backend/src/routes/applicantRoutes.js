const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const ApplicantController = require('../controllers/ApplicantController');
const EducationController = require('../controllers/EducationController');
const AdditionalQualificationController = require('../controllers/AdditionalQualificationController');
const BarExperienceController = require('../controllers/BarExperienceController');
const CourtPracticeController = require('../controllers/CourtPracticeController');
const JudgementController = require('../controllers/JudgementController');
const DocumentController = require('../controllers/DocumentController');

// Applicant routes
router.post('/', ApplicantController.createApplication);
router.get('/', ApplicantController.getAllApplications);
router.get('/:id', ApplicantController.getApplication);
router.put('/:id', ApplicantController.updateApplication);
router.delete('/:id', ApplicantController.deleteApplication);

// Education routes
router.post('/:id/education', EducationController.addEducation);
router.get('/:applicantId/education', EducationController.getEducationByApplicant);
router.put('/education/:id', EducationController.updateEducation);
router.delete('/education/:id', EducationController.deleteEducation);

// Additional Qualification routes
router.post('/:id/additional-qualification', AdditionalQualificationController.add);
router.get('/:applicantId/additional-qualification', AdditionalQualificationController.getByApplicant);
router.put('/additional-qualification/:id', AdditionalQualificationController.update);
router.delete('/additional-qualification/:id', AdditionalQualificationController.delete);

// Bar Experience routes
router.post('/:id/bar-experience', BarExperienceController.add);
router.get('/:applicantId/bar-experience', BarExperienceController.getByApplicant);
router.put('/:applicantId/bar-experience', BarExperienceController.update);
router.delete('/:applicantId/bar-experience', BarExperienceController.delete);

// Court Practice routes
router.post('/:id/court-practice', CourtPracticeController.add);
router.get('/:applicantId/court-practice', CourtPracticeController.getByApplicant);
router.put('/court-practice/:id', CourtPracticeController.update);
router.delete('/court-practice/:id', CourtPracticeController.delete);

// Judgement routes
router.post('/:id/judgement', JudgementController.add);
router.get('/:applicantId/judgement', JudgementController.getByApplicant);
router.put('/judgement/:id', JudgementController.update);
router.delete('/judgement/:id', JudgementController.delete);

// Document routes
router.post('/:id/documents/upload', upload.single('file'), DocumentController.uploadDocument);
router.get('/:applicantId/documents', DocumentController.getDocuments);
router.get('/documents/:id/download', DocumentController.downloadDocument);
router.delete('/documents/:id', DocumentController.deleteDocument);

module.exports = router;
