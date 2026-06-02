const pool = require('../config/database');

class AdditionalQualificationModel {
  static async create(data) {
    const { applicantId, qualification, details } = data;

    const query = `
      INSERT INTO additional_qualification (
        applicant_id, qualification, details, created_at, updated_at
      ) VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING *;
    `;

    const result = await pool.query(query, [applicantId, qualification, details]);
    return result.rows[0];
  }

  static async findByApplicantId(applicantId) {
    const query = 'SELECT * FROM additional_qualification WHERE applicant_id = $1 ORDER BY created_at';
    const result = await pool.query(query, [applicantId]);
    return result.rows;
  }

  static async update(id, data) {
    const { qualification, details } = data;

    const query = `
      UPDATE additional_qualification SET
        qualification = $1,
        details = $2,
        updated_at = NOW()
      WHERE id = $3
      RETURNING *;
    `;

    const result = await pool.query(query, [qualification, details, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM additional_qualification WHERE id = $1';
    await pool.query(query, [id]);
  }

  static async deleteByApplicantId(applicantId) {
    const query = 'DELETE FROM additional_qualification WHERE applicant_id = $1';
    await pool.query(query, [applicantId]);
  }
}

module.exports = AdditionalQualificationModel;
