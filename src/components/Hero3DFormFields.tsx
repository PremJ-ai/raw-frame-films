import { useState, type ChangeEvent, type FormEvent } from "react";

type ContactForm = {
  name: string;
  number: string;
  message: string;
};

const initialForm: ContactForm = { name: "", number: "", message: "" };

interface Hero3DFormFieldsProps {
  onSubmit: (data: ContactForm) => void;
}

export default function Hero3DFormFields({ onSubmit }: Hero3DFormFieldsProps) {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const updateField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setSubmitted(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    console.log("Hero 3D Form payload", form);
    await new Promise((r) => setTimeout(r, 800));
    onSubmit(form);
    setSubmitted(true);
    setSubmitting(false);
    setForm(initialForm);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form className="hero-3d-form-fields" onSubmit={handleSubmit}>
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
        />
      </label>
      <label htmlFor="hero-number">
        <span>Number</span>
        <input
          id="hero-number"
          name="number"
          type="tel"
          value={form.number}
          onChange={updateField}
          required
          autoComplete="tel"
          disabled={submitting}
        />
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
        />
      </label>
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
