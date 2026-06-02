# Frontend Components Documentation

## Folder Structure

### `/src/components`
Reusable UI components
- `Header.js` - Application header with branding
- `StepIndicator.js` - Visual progress indicator for multi-step form
- `Input.js` - Text input component with validation
- `Select.js` - Dropdown select component
- `TextArea.js` - Multi-line text input component
- `Button.js` - Reusable button with variants
- `DynamicTableRow.js` - Row component for dynamic table entries
- `FileUpload.js` - File upload component

### `/src/pages`
Page components (full page views)
- `HomePage.js` - Application list and dashboard
- `ApplicationFormStepper.js` - Multi-step form container
- `PersonalDetailsForm.js` - Step 1: Personal information
- `EducationForm.js` - Step 2: Education records (dynamic)
- `AdditionalQualificationForm.js` - Step 3: Additional qualifications
- `BarExperienceForm.js` - Step 4: Bar experience
- `CourtPracticeForm.js` - Step 5: Court practice history
- `AdditionalDetailsForm.js` - Step 6: Criminal/Disciplinary & Achievements
- `AddressDetailsForm.js` - Step 7: Address information
- `JudgementForm.js` - Step 8: Judgement details (dynamic)
- `DocumentsForm.js` - Step 9: File uploads
- `ViewApplicationPage.js` - Application detail view with print/download

### `/src/utils`
Utility functions
- `api.js` - API calls and fetch utilities
- `validation.js` - Form validation functions

### `/src/styles`
CSS files
- `index.css` - Tailwind CSS and custom styles

## Component Props

### Input Component
```jsx
<Input
  label="Field Label"
  name="fieldName"
  type="text"
  value={value}
  onChange={handleChange}
  error={error}
  required
  placeholder="Enter value"
/>
```

### Select Component
```jsx
<Select
  label="Field Label"
  name="fieldName"
  value={value}
  onChange={handleChange}
  options={[
    { value: 'val1', label: 'Label 1' },
    { value: 'val2', label: 'Label 2' }
  ]}
  error={error}
  required
/>
```

### Button Component
```jsx
<Button
  type="button"
  variant="primary" // primary, secondary, danger, success
  onClick={handleClick}
  disabled={false}
>
  Button Text
</Button>
```

## Styling

### Tailwind CSS Classes

Custom classes defined in `index.css`:
- `.container-main` - Main container with max-width
- `.form-section` - Form section styling
- `.form-group` - Form field group
- `.form-input` - Text input styling
- `.form-select` - Select dropdown styling
- `.form-textarea` - Textarea styling
- `.btn-primary`, `.btn-secondary`, `.btn-danger`, `.btn-success` - Button variants
- `.card` - Card component styling
- `.error-message` - Error text styling
- `.success-message` - Success text styling

## API Integration

All API calls use `apiCall()` function:
```javascript
import { apiCall } from '../utils/api';

// GET request
const data = await apiCall('/endpoint');

// POST request
const response = await apiCall('/endpoint', 'POST', { data });

// PUT request
await apiCall('/endpoint/:id', 'PUT', { data });

// DELETE request
await apiCall('/endpoint/:id', 'DELETE');
```

## Form Validation

Validation rules in `utils/validation.js`:
- Email format
- Mobile (10 digits)
- PAN (AAAAA9999A)
- Aadhaar (12 digits)
- Date validation

## Routing

React Router setup:
- `/` - Home page (applications list)
- `/new-application` - Create new application
- `/view-application/:id` - View application details

## State Management

- Uses React hooks (useState, useEffect)
- LocalStorage for applicant ID persistence
- Props drilling for data passing

## Performance Tips

1. Memoize expensive components
2. Use useCallback for event handlers
3. Lazy load routes if needed
4. Optimize re-renders with React.memo

## Adding New Form Fields

1. Add input state in component
2. Create input element with component
3. Add validation in validateForm()
4. Include in API request payload
