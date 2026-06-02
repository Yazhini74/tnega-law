const pool = require('../config/database');

class ApplicantModel {
  static async create(data) {
    const {
      fullName,
      fatherName,
      gender,
      dob,
      nationality,
      religion,
      community,
      mobile,
      email,
      pan,
      aadhaar,
      officeAddress,
      permanentAddress,
      criminalDetails,
      achievements,
    } = data;

    const query = `
      INSERT INTO applicant (
        full_name, father_name, gender, dob, nationality, religion, community,
        mobile, email, pan, aadhaar, office_address, permanent_address,
        criminal_details, achievements, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW(), NOW())
      RETURNING *;
    `;

    const result = await pool.query(query, [
      fullName, fatherName, gender, dob, nationality, religion, community,
      mobile, email, pan, aadhaar, officeAddress, permanentAddress,
      criminalDetails, achievements
    ]);

    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM applicant WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findAll(limit = 10, offset = 0) {
    const query = 'SELECT * FROM applicant ORDER BY created_at DESC LIMIT $1 OFFSET $2';
    const result = await pool.query(query, [limit, offset]);
    return result.rows;
  }

  static async update(id, data) {
    const {
      fullName,
      fatherName,
      gender,
      dob,
      nationality,
      religion,
      community,
      mobile,
      email,
      pan,
      aadhaar,
      officeAddress,
      permanentAddress,
      criminalDetails,
      achievements,
    } = data;

    const query = `
      UPDATE applicant SET
        full_name = $1,
        father_name = $2,
        gender = $3,
        dob = $4,
        nationality = $5,
        religion = $6,
        community = $7,
        mobile = $8,
        email = $9,
        pan = $10,
        aadhaar = $11,
        office_address = $12,
        permanent_address = $13,
        criminal_details = $14,
        achievements = $15,
        updated_at = NOW()
      WHERE id = $16
      RETURNING *;
    `;

    const result = await pool.query(query, [
      fullName, fatherName, gender, dob, nationality, religion, community,
      mobile, email, pan, aadhaar, officeAddress, permanentAddress,
      criminalDetails, achievements, id
    ]);

    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM applicant WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return result.rowCount > 0;
  }
}

module.exports = ApplicantModel;
