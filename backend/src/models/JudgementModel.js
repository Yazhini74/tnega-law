const pool = require('../config/database');

class JudgementModel {
  static async create(data) {
    const { applicantId, caseNumber, caseDetails, judgementDetails, remarks } = data;

    const query = `
      INSERT INTO judgement_details (
        applicant_id, case_number, case_details, judgement_details, remarks,
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *;
    `;

    const result = await pool.query(query, [applicantId, caseNumber, caseDetails, judgementDetails, remarks]);
    return result.rows[0];
  }

  static async findByApplicantId(applicantId) {
    const query = 'SELECT * FROM judgement_details WHERE applicant_id = $1 ORDER BY created_at';
    const result = await pool.query(query, [applicantId]);
    return result.rows;
  }

  static async update(id, data) {
    const { caseNumber, caseDetails, judgementDetails, remarks } = data;

    const query = `
      UPDATE judgement_details SET
        case_number = $1,
        case_details = $2,
        judgement_details = $3,
        remarks = $4,
        updated_at = NOW()
      WHERE id = $5
      RETURNING *;
    `;

    const result = await pool.query(query, [caseNumber, caseDetails, judgementDetails, remarks, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM judgement_details WHERE id = $1';
    await pool.query(query, [id]);
  }

  static async deleteByApplicantId(applicantId) {
    const query = 'DELETE FROM judgement_details WHERE applicant_id = $1';
    await pool.query(query, [applicantId]);
  }
}

module.exports = JudgementModel;
