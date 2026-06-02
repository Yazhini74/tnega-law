const pool = require('../config/database');

class DocumentModel {
  static async create(data) {
    const { applicantId, documentType, fileName, filePath, uploadedAt } = data;

    const query = `
      INSERT INTO uploaded_documents (
        applicant_id, document_type, file_name, file_path, uploaded_at,
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *;
    `;

    const result = await pool.query(query, [applicantId, documentType, fileName, filePath, uploadedAt || new Date()]);
    return result.rows[0];
  }

  static async findByApplicantId(applicantId) {
    const query = 'SELECT * FROM uploaded_documents WHERE applicant_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [applicantId]);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM uploaded_documents WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM uploaded_documents WHERE id = $1 RETURNING file_path';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async deleteByApplicantId(applicantId) {
    const query = 'SELECT file_path FROM uploaded_documents WHERE applicant_id = $1';
    const result = await pool.query(query, [applicantId]);
    
    const deleteQuery = 'DELETE FROM uploaded_documents WHERE applicant_id = $1';
    await pool.query(deleteQuery, [applicantId]);
    
    return result.rows;
  }
}

module.exports = DocumentModel;
