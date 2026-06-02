-- Sample data for testing

-- Insert sample applicant
INSERT INTO applicant (
  full_name, father_name, gender, dob, nationality, religion, community,
  mobile, email, pan, aadhaar, office_address, permanent_address,
  criminal_details, achievements
) VALUES (
  'Rajesh Kumar Singh',
  'Kumar Singh',
  'Male',
  '1985-03-15',
  'Indian',
  'Hindu',
  'General',
  '9876543210',
  'rajesh@example.com',
  'ABCDE1234F',
  '123456789012',
  '123 Court Building, New Delhi, Delhi 110001',
  '456 Residential Area, Noida, Uttar Pradesh 201301',
  'No criminal or disciplinary records',
  'Awarded Best Lawyer Award 2020, Senior Advocate since 2015'
);

-- Insert sample education records
INSERT INTO educational_qualification (
  applicant_id, qualification, university, year_of_passing, percentage
) VALUES
  (1, 'B.A. (Hons)', 'Delhi University', 2007, 75.5),
  (1, 'LL.B', 'National Law University', 2010, 82.3),
  (1, 'LL.M', 'Delhi University', 2012, 88.0);

-- Insert sample bar experience
INSERT INTO bar_experience (
  applicant_id, enrolment_number, enrollment_date, years_of_experience
) VALUES (
  1, 'BAR/2010/00123', '2010-06-15', 14
);

-- Insert sample court practice
INSERT INTO court_practice (
  applicant_id, court_name, practice_start_year, practice_end_year, description
) VALUES
  (1, 'Delhi High Court', 2010, 2015, 'Senior Advocate, specialized in Corporate Law'),
  (1, 'Supreme Court of India', 2015, NULL, 'Senior Advocate and Supreme Court counsel');

-- Insert sample judgement details
INSERT INTO judgement_details (
  applicant_id, case_number, case_details, judgement_details, remarks
) VALUES
  (1, 'CS(OS) 2020/1234', 'XYZ Corp vs ABC Industries', 'Judgment in favor of plaintiff', 'Important commercial law case'),
  (1, 'W.P. 2021/5678', 'Public Interest Litigation', 'Petition allowed partially', 'Constitutional law matter');

-- Insert sample additional qualification
INSERT INTO additional_qualification (
  applicant_id, qualification, details
) VALUES
  (1, 'Diploma in International Business Law', 'Completed from Yale Law School, 2018'),
  (1, 'Certificate in Intellectual Property Rights', 'WIPO certified, 2019');
