import { useState, useEffect, useCallback } from "react";
import Modal from "../common/Modal.jsx";
import Input from "../common/Input.jsx";
import Select from "../common/Select.jsx";
import Button from "../common/Button.jsx";
import { LEAD_STATUSES, EMPLOYEES } from "../../constants/index.js";
import { validateLeadForm, isFormValid } from "../../utils/validators.js";

const INITIAL_ERRORS = {
  name: "",
  mobile: "",
  email: "",
  status: "",
  assignedEmployee: "",
};

export default function EditLeadModal({ lead, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    status: "",
    assignedEmployee: "",
  });
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name ?? "",
        mobile: lead.mobile ?? "",
        email: lead.email ?? "",
        status: lead.status ?? "",
        assignedEmployee: lead.assignedEmployee ?? "",
      });
      setErrors(INITIAL_ERRORS);
      setApiError("");
    }
  }, [lead]);

  const handleChange = useCallback((key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }, []);

  const validate = useCallback(() => {
    const errs = validateLeadForm(formData);
    setErrors(errs);
    return isFormValid(errs);
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setApiError("");
    try {
      await onSave(lead._id, formData);
      onClose();
    } catch (err) {
      setApiError(err.response?.data?.message || "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  }, [formData, lead, onSave, onClose, validate]);

  const formIsValid = isFormValid(validateLeadForm(formData));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Lead" maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-5">
        <Input
          id="edit-name"
          label="Full Name *"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          error={errors.name}
          placeholder="Enter full name"
        />

        <Input
          id="edit-email"
          label="Email Address *"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
          placeholder="email@example.com"
        />

        <Input
          id="edit-mobile"
          label="Mobile Number *"
          type="tel"
          value={formData.mobile}
          onChange={(e) => handleChange("mobile", e.target.value)}
          error={errors.mobile}
          placeholder="10-digit mobile number"
          maxLength={10}
        />

        <Select
          id="edit-status"
          label="Lead Status *"
          value={formData.status}
          onChange={(e) => handleChange("status", e.target.value)}
          options={LEAD_STATUSES}
          error={errors.status}
          placeholder="Select status"
        />

        <Select
          id="edit-employee"
          label="Assigned Employee *"
          value={formData.assignedEmployee}
          onChange={(e) => handleChange("assignedEmployee", e.target.value)}
          options={EMPLOYEES}
          error={errors.assignedEmployee}
          placeholder="Select employee"
        />

        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            {apiError}
          </div>
        )}

        <div className="flex gap-3 pt-1 border-t border-slate-100">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={!formIsValid || saving}
          >
            {saving ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
