-- Create Database
CREATE DATABASE IF NOT EXISTS tnega_law_db;
\c tnega_law_db;

-- Applicant Table
CREATE TABLE applicant (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  father_name VARCHAR(100) NOT NULL,
  gender VARCHAR(20),
  dob DATE,
  nationality VARCHAR(50),
  religion VARCHAR(50),
  community VARCHAR(50),
  mobile VARCHAR(15),
  email VARCHAR(100),
  pan VARCHAR(20),
  aadhaar VARCHAR(20),
  office_address TEXT,
  permanent_address TEXT,
  criminal_details TEXT,
  achievements TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Educational Qualification Table
CREATE TABLE educational_qualification (
  id SERIAL PRIMARY KEY,
  applicant_id INTEGER NOT NULL,
  qualification VARCHAR(100),
  university VARCHAR(100),
  year_of_passing INTEGER,
  percentage DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (applicant_id) REFERENCES applicant(id) ON DELETE CASCADE
);

-- Additional Qualification Table
CREATE TABLE additional_qualification (
  id SERIAL PRIMARY KEY,
  applicant_id INTEGER NOT NULL,
  qualification VARCHAR(100),
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (applicant_id) REFERENCES applicant(id) ON DELETE CASCADE
);

-- Bar Experience Table
CREATE TABLE bar_experience (
  id SERIAL PRIMARY KEY,
  applicant_id INTEGER NOT NULL UNIQUE,
  enrolment_number VARCHAR(50),
  enrollment_date DATE,
  years_of_experience INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (applicant_id) REFERENCES applicant(id) ON DELETE CASCADE
);

-- Court Practice Table
CREATE TABLE court_practice (
  id SERIAL PRIMARY KEY,
  applicant_id INTEGER NOT NULL,
  court_name VARCHAR(100),
  practice_start_year INTEGER,
  practice_end_year INTEGER,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (applicant_id) REFERENCES applicant(id) ON DELETE CASCADE
);

-- Judgement Details Table
CREATE TABLE judgement_details (
  id SERIAL PRIMARY KEY,
  applicant_id INTEGER NOT NULL,
  case_number VARCHAR(50),
  case_details TEXT,
  judgement_details TEXT,
  remarks TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (applicant_id) REFERENCES applicant(id) ON DELETE CASCADE
);

-- Uploaded Documents Table
CREATE TABLE uploaded_documents (
  id SERIAL PRIMARY KEY,
  applicant_id INTEGER NOT NULL,
  document_type VARCHAR(50),
  file_name VARCHAR(255),
  file_path VARCHAR(255),
  uploaded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (applicant_id) REFERENCES applicant(id) ON DELETE CASCADE
);

-- Create Indexes for better performance
CREATE INDEX idx_applicant_email ON applicant(email);
CREATE INDEX idx_applicant_pan ON applicant(pan);
CREATE INDEX idx_applicant_aadhaar ON applicant(aadhaar);
CREATE INDEX idx_education_applicant ON educational_qualification(applicant_id);
CREATE INDEX idx_documents_applicant ON uploaded_documents(applicant_id);
