const DocumentModel = require('../models/DocumentModel');
const fs = require('fs');
const path = require('path');

class DocumentController {
  static async uploadDocument(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const { applicantId, documentType } = req.body;

      const document = await DocumentModel.create({
        applicantId,
        documentType,
        fileName: req.file.originalname,
        filePath: `/uploads/${req.file.filename}`,
        uploadedAt: new Date()
      });

      res.status(201).json({
        message: 'File uploaded successfully',
        data: document
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error uploading file',
        error: error.message
      });
    }
  }

  static async getDocuments(req, res) {
    try {
      const { applicantId } = req.params;
      const documents = await DocumentModel.findByApplicantId(applicantId);
      res.json(documents);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching documents',
        error: error.message
      });
    }
  }

  static async downloadDocument(req, res) {
    try {
      const { id } = req.params;
      const document = await DocumentModel.findById(id);

      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }

      const filePath = path.join(__dirname, '../../' + document.file_path);
      res.download(filePath, document.file_name);
    } catch (error) {
      res.status(500).json({
        message: 'Error downloading document',
        error: error.message
      });
    }
  }

  static async deleteDocument(req, res) {
    try {
      const { id } = req.params;
      const document = await DocumentModel.delete(id);

      if (document) {
        const filePath = path.join(__dirname, '../../' + document.file_path);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      res.json({ message: 'Document deleted successfully' });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting document',
        error: error.message
      });
    }
  }
}

module.exports = DocumentController;
