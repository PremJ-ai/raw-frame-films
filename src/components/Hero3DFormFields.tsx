import { useState, type ChangeEvent, type FormEvent } from "react";

type ContactForm = {
  name: string;
  number: string;
  message: string;
};

type FormErrors = Partial<Record<keyof ContactForm, string>> & { form?: string };

const initialForm: ContactForm = { name: "", number: "", message: "" };

interface Hero3DFormFieldsProps {
  onSubmit: (data: ContactForm) => void;
}

function validateForm(data: ContactForm): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) {
    errors.name = "Name is required";
  }
  if (!data.number.trim()) {
    errors.number = "Phone number is required";
  } else if (!/^[\d\s\-+()]{10,}$/.test(data.number)) {
    errors.number = "Please enter a valid phone number (at least 10 digits)";
  }
  if (!data.message.trim()) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }
  return errors;
}

export default function Hero3DFormFields({ onSubmit }: Hero3DFormFieldsProps) {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const updateField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setSubmitted(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    setErrors({});
    try {
      console.log("Hero 3D Form payload", form);
      await new Promise((r) => setTimeout(r, 800));
      onSubmit(form);
      setSubmitted(true);
      setForm(initialForm);
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="hero-3d-form-fields" onSubmit={handleSubmit} noValidate>
      <label htmlFor="hero-name">
        <span>Name</span>
        <input
          id="hero-name"
          name="name"
          type="text"
          value={form.name}
          onChange={updateField}
          required
          autoComplete="name"
          disabled={submitting}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "hero-name-error" : undefined}
          placeholder="Your name"
        />
        {errors.name && (
          <p id="hero-name-error" className="hero-3d-form-error" role="alert">
            {errors.name}
          </p>
        )}
      </label>
      <label htmlFor="hero-number">
        <span>Phone Number</span>
        <input
          id="hero-number"
          name="number"
          type="tel"
          value={form.number}
          onChange={updateField}
          required
          autoComplete="tel"
          disabled={submitting}
          placeholder="+1 (555) 123-4567"
          aria-invalid={!!errors.number}
          aria-describedby={errors.number ? "hero-number-error" : undefined}
        />
        {errors.number && (
          <p id="hero-number-error" className="hero-3d-form-error" role="alert">
            {errors.number}
          </p>
        )}
      </label>
      <label htmlFor="hero-message">
        <span>Message</span>
        <textarea
          id="hero-message"
          name="message"
          value={form.message}
          onChange={updateField}
          required
          rows={5}
          disabled={submitting}
          placeholder="Tell us about your project..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "hero-message-error" : undefined}
        />
        {errors.message && (
          <p id="hero-message-error" className="hero-3d-form-error" role="alert">
            {errors.message}
          </p>
        )}
      </label>
      {errors.form && (
        <p className="hero-3d-form-error" role="alert">
          {errors.form}
        </p>
      )}
      <button type="submit" disabled={submitting} className="btn btn-primary btn-full">
        {submitting ? "Sending..." : submitted ? "Sent" : "Send Enquiry"}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          style={{ display: submitting || submitted ? "none" : "block" }}
        >
          <path
            d="M5 10h10M10 5l5 5-5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {submitted && (
        <p className="hero-3d-form-success" role="status">
          Thanks. Your enquiry is ready for the next step.
        </p>
      )}
    </form>
  );
}
