const pool = require('../config/database');

class CourtPracticeModel {
  static async create(data) {
    const { applicantId, courtName, practiceStartYear, practiceEndYear, description } = data;

    const query = `
      INSERT INTO court_practice (
        applicant_id, court_name, practice_start_year, practice_end_year, description,
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *;
    `;

    const result = await pool.query(query, [applicantId, courtName, practiceStartYear, practiceEndYear, description]);
    return result.rows[0];
  }

  static async findByApplicantId(applicantId) {
    const query = 'SELECT * FROM court_practice WHERE applicant_id = $1 ORDER BY created_at';
    const result = await pool.query(query, [applicantId]);
    return result.rows;
  }

  static async update(id, data) {
    const { courtName, practiceStartYear, practiceEndYear, description } = data;

    const query = `
      UPDATE court_practice SET
        court_name = $1,
        practice_start_year = $2,
        practice_end_year = $3,
        description = $4,
        updated_at = NOW()
      WHERE id = $5
      RETURNING *;
    `;

    const result = await pool.query(query, [courtName, practiceStartYear, practiceEndYear, description, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM court_practice WHERE id = $1';
    await pool.query(query, [id]);
  }

  static async deleteByApplicantId(applicantId) {
    const query = 'DELETE FROM court_practice WHERE applicant_id = $1';
    await pool.query(query, [applicantId]);
  }
}

module.exports = CourtPracticeModel;
