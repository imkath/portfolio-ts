"use client";

import type React from "react";

import { useState } from "react";
import { Container } from "@/components/container";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { VintageTitle } from "@/components/vintage-title";
import { trackContactSubmit } from "@/src/lib/analytics";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "", // Honeypot field for spam protection
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot
    if (formData.honeypot) {
      console.log("Honeypot triggered, likely spam");
      return;
    }

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "", honeypot: "" });

      // Track successful submission
      trackContactSubmit("form");
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <main className="py-16">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="mb-16">
              <VintageTitle
                subtitle="Disponible para proyectos editoriales, comerciales y de cine"
                withOrnament
              >
                Contacto
              </VintageTitle>
            </div>{" "}
            {/* Direct Contact */}
            <div className="mb-12 space-y-4 border-b border-line pb-12">
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-text-dim">
                  Email
                </h3>
                <a
                  href="mailto:hello@tanniasilva.com"
                  className="text-base text-text transition-colors hover:text-accent-2 hover:underline hover:decoration-accent-2"
                >
                  hello@tanniasilva.com
                </a>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-text-dim">
                  Instagram
                </h3>
                <a
                  href="https://instagram.com/bodyssnatchers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-text transition-colors hover:text-accent-2 hover:underline hover:decoration-accent-2"
                >
                  @bodyssnatchers
                </a>
              </div>
            </div>
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-text-dim"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-none border border-line bg-surface px-4 py-3 text-text transition-colors focus:border-accent-2 focus:outline-none focus:ring-2 focus:ring-focus/50"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-text-dim"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-none border border-line bg-surface px-4 py-3 text-text transition-colors focus:border-accent-2 focus:outline-none focus:ring-2 focus:ring-focus/50"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-text-dim"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={6}
                  className="w-full rounded-none border border-line bg-surface px-4 py-3 text-text transition-colors focus:border-accent-2 focus:outline-none focus:ring-2 focus:ring-focus/50"
                  required
                />
              </div>

              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                name="website"
                value={formData.honeypot}
                onChange={(e) =>
                  setFormData({ ...formData, honeypot: e.target.value })
                }
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-none border border-line bg-transparent px-6 py-3 text-text transition-all hover:border-accent-2 hover:bg-transparent hover:text-text disabled:opacity-50"
              >
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </Button>

              {submitStatus === "success" && (
                <p className="text-center text-sm text-accent-2">
                  ¡Mensaje enviado! Te responderé pronto.
                </p>
              )}

              {submitStatus === "error" && (
                <p className="text-center text-sm text-red-400">
                  Por favor completa todos los campos.
                </p>
              )}
            </form>
            {/* Privacy Notice */}
            <div className="mt-12 border-t border-line pt-8">
              <p className="credits text-center">
                Tu información se usa únicamente para responder a tu consulta.
                No se comparte con terceros.
              </p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
