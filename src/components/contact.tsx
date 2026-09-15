"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionWrapper } from "./section-wrapper";
import { SmoothInput, SmoothTextarea } from "@/components/ui/skiper-ui/skiper106";
import { contactSchema, ContactFormData } from "@/lib/validators";
import {
  PaperPlaneRight,
  CheckCircle,
  WarningCircle,
  EnvelopeSimple,
  SpinnerGap,
} from "@phosphor-icons/react";

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<{
    delivered: boolean;
    message: string;
  } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    // Client-side Zod validation
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSuccess(true);
        setDeliveryStatus({
          delivered: Boolean(data.delivered),
          message: data.message || "Message received.",
        });
        setFormData({ name: "", email: "", message: "", honeypot: "" });
      } else {
        setServerError(data.message || "Failed to submit message. Please try again.");
      }
    } catch {
      setServerError("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper id="contact" className="max-w-xl">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="space-y-2 text-center">
          <span className="font-mono text-xs text-accent uppercase tracking-widest">
            05 / Dialogue
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Let&apos;s connect
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
            Have an engineering proposal, inquiry about agent architectures, or
            want to collaborate on a systems project? Reach out directly.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="rounded-2xl p-6 sm:p-8 bg-surface border border-border/80 shadow-sm relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                className="py-12 text-center space-y-4"
              >
                <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-500">
                  <CheckCircle size={44} weight="fill" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {deliveryStatus?.delivered ? "Message sent" : "Form submission validated"}
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  {deliveryStatus?.delivered
                    ? "Thank you for reaching out. I will review your note and get back to you promptly."
                    : deliveryStatus?.message ||
                    "Your message was validated. Note: Automated email dispatch is not configured in this environment."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setDeliveryStatus(null);
                  }}
                  className="mt-4 px-5 py-2 text-xs font-semibold rounded-full bg-muted text-foreground hover:bg-muted/80 press-feedback"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
              >
                {serverError && (
                  <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive flex items-center gap-2">
                    <WarningCircle size={16} />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Honeypot field (hidden from normal view) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website-hp">Website</label>
                  <input
                    id="website-hp"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={(e) =>
                      setFormData({ ...formData, honeypot: e.target.value })
                    }
                  />
                </div>

                {/* Name Field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-foreground/80 mb-1.5"
                  >
                    Name
                  </label>
                  <SmoothInput
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    wrapperClassName={
                      errors.name
                        ? "border-destructive/60 bg-destructive/5"
                        : undefined
                    }
                  />
                  {errors.name && (
                    <p id="name-error" className="text-xs text-destructive mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field (Skiper106 SmoothInput) */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-foreground/80 mb-1.5"
                  >
                    Email
                  </label>
                  <SmoothInput
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    wrapperClassName={
                      errors.email
                        ? "border-destructive/60 bg-destructive/5"
                        : undefined
                    }
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-destructive mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Field (Skiper106 SmoothTextarea) */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-foreground/80 mb-1.5"
                  >
                    Message
                  </label>
                  <SmoothTextarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Project proposal, systems question, or inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    wrapperClassName={
                      errors.message
                        ? "border-destructive/60 bg-destructive/5"
                        : undefined
                    }
                  />
                  {errors.message && (
                    <p id="message-error" className="text-xs text-destructive mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent text-accent-foreground font-semibold text-sm transition-all duration-200 hover:brightness-110 press-feedback focus-visible:outline-2 focus-visible:outline-accent cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-accent/20"
                >
                  {isSubmitting ? (
                    <>
                      <SpinnerGap size={18} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <PaperPlaneRight size={18} weight="bold" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Fallback Contact Note */}
        <div className="text-center pt-2">
          <a
            href="mailto:jkukreja407@gmail.com"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-accent transition-colors duration-150 press-feedback"
          >
            <EnvelopeSimple size={15} />
            <span>Or email directly: jkukreja407@gmail.com</span>
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
