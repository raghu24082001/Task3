/**
 * Validate an edit-lead form payload.
 * Returns an object of field → error message string (empty string = valid).
 */
export function validateLeadForm(values) {
  const errors = {};

  if (!values.name || !values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.email || !values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.mobile || !values.mobile.trim()) {
    errors.mobile = "Mobile number is required.";
  } else if (!/^\d{10}$/.test(values.mobile.trim())) {
    errors.mobile = "Mobile must be exactly 10 digits.";
  }

  if (!values.status) {
    errors.status = "Status is required.";
  }

  if (!values.assignedEmployee) {
    errors.assignedEmployee = "Assigned employee is required.";
  }

  return errors;
}

/**
 * Returns true if there are no validation errors.
 */
export function isFormValid(errors) {
  return Object.values(errors).every((e) => !e);
}
