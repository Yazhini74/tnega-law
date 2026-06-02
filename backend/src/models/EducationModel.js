const pool = require('../config/database');

class EducationModel {
  static async create(data) {
    const { applicantId, qualification, university, yearOfPassing, percentage } = data;

    const query = `
      INSERT INTO educational_qualification (
        applicant_id, qualification, university, year_of_passing, percentage,
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *;
    `;

    const result = await pool.query(query, [applicantId, qualification, university, yearOfPassing, percentage]);
    return result.rows[0];
  }

  static async findByApplicantId(applicantId) {
    const query = 'SELECT * FROM educational_qualification WHERE applicant_id = $1 ORDER BY created_at';
    const result = await pool.query(query, [applicantId]);
    return result.rows;
  }

  static async update(id, data) {
    const { qualification, university, yearOfPassing, percentage } = data;

    const query = `
      UPDATE educational_qualification SET
        qualification = $1,
        university = $2,
        year_of_passing = $3,
        percentage = $4,
        updated_at = NOW()
      WHERE id = $5
      RETURNING *;
    `;

    const result = await pool.query(query, [qualification, university, yearOfPassing, percentage, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM educational_qualification WHERE id = $1';
    await pool.query(query, [id]);
  }

  static async deleteByApplicantId(applicantId) {
    const query = 'DELETE FROM educational_qualification WHERE applicant_id = $1';
    await pool.query(query, [applicantId]);
  }
}

module.exports = EducationModel;
