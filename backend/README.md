# Backend Components Documentation

## Folder Structure

### `/src/models`
Database query functions for each entity
- `ApplicantModel.js` - Applicant CRUD operations
- `EducationModel.js` - Educational qualification operations
- `AdditionalQualificationModel.js` - Additional qualification operations
- `BarExperienceModel.js` - Bar experience operations
- `CourtPracticeModel.js` - Court practice operations
- `JudgementModel.js` - Judgement details operations
- `DocumentModel.js` - Document operations

### `/src/controllers`
Request handlers and business logic
- `ApplicantController.js` - Applicant endpoints
- `EducationController.js` - Education endpoints
- `AdditionalQualificationController.js` - Qualification endpoints
- `BarExperienceController.js` - Bar experience endpoints
- `CourtPracticeController.js` - Court practice endpoints
- `JudgementController.js` - Judgement endpoints
- `DocumentController.js` - File upload/download endpoints

### `/src/routes`
API route definitions
- `applicantRoutes.js` - All application routes

### `/src/middleware`
Custom middleware and utilities
- `validation.js` - Form validation rules

### `/src/config`
Configuration files
- `database.js` - PostgreSQL connection
- `multer.js` - File upload configuration

## Adding New Features

1. **Create Model** in `/src/models/NewModel.js`
2. **Create Controller** in `/src/controllers/NewController.js`
3. **Add Routes** in `/src/routes/applicantRoutes.js`
4. **Update Database Schema** in `/database/schema.sql`

## Error Handling

All endpoints return structured responses:
- Success: `{ message: "...", data: {...} }`
- Error: `{ message: "Error description", error: {...} }`

HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Server Error

## File Upload

- Files stored in `/uploads` directory
- Maximum size: 10MB
- Supported types: JPEG, PNG, PDF, DOC, DOCX
