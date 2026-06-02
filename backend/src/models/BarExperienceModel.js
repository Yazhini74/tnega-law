const pool = require('../config/database');

class BarExperienceModel {
  static async create(data) {
    const { applicantId, enrolmentNumber, enrollmentDate, yearsOfExperience } = data;

    const query = `
      INSERT INTO bar_experience (
        applicant_id, enrolment_number, enrollment_date, years_of_experience,
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING *;
    `;

    const result = await pool.query(query, [applicantId, enrolmentNumber, enrollmentDate, yearsOfExperience]);
    return result.rows[0];
  }

  static async findByApplicantId(applicantId) {
    const query = 'SELECT * FROM bar_experience WHERE applicant_id = $1';
    const result = await pool.query(query, [applicantId]);
    return result.rows[0];
  }

  static async update(applicantId, data) {
    const { enrolmentNumber, enrollmentDate, yearsOfExperience } = data;

    const query = `
      UPDATE bar_experience SET
        enrolment_number = $1,
        enrollment_date = $2,
        years_of_experience = $3,
        updated_at = NOW()
      WHERE applicant_id = $4
      RETURNING *;
    `;

    const result = await pool.query(query, [enrolmentNumber, enrollmentDate, yearsOfExperience, applicantId]);
    return result.rows[0];
  }

  static async deleteByApplicantId(applicantId) {
    const query = 'DELETE FROM bar_experience WHERE applicant_id = $1';
    await pool.query(query, [applicantId]);
  }
}

module.exports = BarExperienceModel;
