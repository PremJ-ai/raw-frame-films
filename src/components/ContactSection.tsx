import { useState, type ChangeEvent, type FormEvent } from "react";

type ContactForm = {
  name: string;
  number: string;
  message: string;
  company: string;
};

const initialForm: ContactForm = {
  name: "",
  number: "",
  message: "",
  company: "",
};

export default function ContactSection() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const updateField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setSubmitted(false);
    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.number,
          message: form.message,
          company: form.company,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(
          data.error || "Something went wrong. Please try again.",
        );
      }

      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-section__inner">
        <p className="contact-section__eyebrow">RAW FRAME FILMS / CONTACT</p>
        <h2 id="contact-title">Let&apos;s make a frame worth remembering.</h2>
        <p className="contact-section__intro">
          Tell us what you are making, and we&apos;ll start from there.
        </p>
        <form className="contact-section__form" onSubmit={handleSubmit}>
          {/* Honeypot field — visually hidden, invisible to real users. */}
          <div className="contact-section__honeypot" aria-hidden="true">
            <label>
              Company
              <input
                name="company"
                type="text"
                value={form.company}
                onChange={updateField}
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>
          <label>
            Name
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={updateField}
              required
              autoComplete="name"
            />
          </label>
          <label>
            Number
            <input
              name="number"
              type="tel"
              value={form.number}
              onChange={updateField}
              required
              autoComplete="tel"
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={updateField}
              required
              rows={6}
            />
          </label>
          <button type="submit" disabled={submitting}>
            {submitting ? (
              "Sending\u2026"
            ) : (
              <>
                Send enquiry <span aria-hidden="true">↗</span>
              </>
            )}
          </button>
          {submitted && (
            <p className="contact-section__success" role="status">
              Thanks. Your enquiry is ready for the next step.
            </p>
          )}
          {error && (
            <p className="contact-section__error" role="alert">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
