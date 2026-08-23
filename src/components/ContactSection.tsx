import { useState, type ChangeEvent, type FormEvent } from "react";

type ContactForm = {
  name: string;
  number: string;
  message: string;
};

const initialForm: ContactForm = { name: "", number: "", message: "" };

export default function ContactSection() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Contact form payload", form);
    // TODO: Replace this local log with the production submission endpoint.
    setSubmitted(true);
    setForm(initialForm);
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
          <button type="submit">
            Send enquiry <span aria-hidden="true">↗</span>
          </button>
          {submitted && (
            <p className="contact-section__success" role="status">
              Thanks. Your enquiry is ready for the next step.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
