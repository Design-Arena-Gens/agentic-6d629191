"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type IntakePayload = {
  company: string;
  email: string;
  objective: string;
  budget: string;
  timeline: string;
  compliance: boolean;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SecureIntakeForm() {
  const [step, setStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState<IntakePayload>({
    company: "",
    email: "",
    objective: "",
    budget: "",
    timeline: "",
    compliance: false,
  });

  const canNext = () => {
    if (step === 0) return form.company.trim().length >= 2 && emailRegex.test(form.email);
    if (step === 1) return form.objective.trim().length >= 20 && !!form.budget && !!form.timeline;
    if (step === 2) return form.compliance;
    return false;
  };

  const submit = async () => {
    setSubmitting(true); setError(null);
    try {
      const res = await fetch("/api/secure-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSuccess(true);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="card" style={{ padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 18 }}>
          <div>
            <div className="h2" style={{ letterSpacing: ".08em", textTransform: "uppercase" }}>Gold-Standard</div>
            <div className="h1" style={{ fontWeight: 600 }}>Secure Intake</div>
            <div className="helper">Encrypted at-rest and in-transit. Zero tracking. Frictionless execution.</div>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-primary" onClick={() => setIsOpen(true)}>
            <LockIcon /> Unlock Vault
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal card" initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }} transition={{ type: "spring", stiffness: 160, damping: 20 }}>
              <div style={{ padding: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="h2" style={{ letterSpacing: ".08em", textTransform: "uppercase" }}>Vault Access</div>
                  <button className="btn" onClick={() => setIsOpen(false)}>Close</button>
                </div>

                <div style={{ height: 14 }} />
                <Progress step={step} />
                <div style={{ height: 18 }} />

                <div className="form-grid">
                  {step === 0 && (
                    <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="form-grid">
                      <div>
                        <div className="label">Company</div>
                        <input className="input" placeholder="Acme Advanced Systems" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                      </div>
                      <div>
                        <div className="label">Work Email</div>
                        <input className="input" placeholder="name@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        {!emailRegex.test(form.email) && form.email.length > 0 && (<div className="error">Enter a valid email</div>)}
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="form-grid">
                      <div>
                        <div className="label">Objective</div>
                        <textarea className="input" rows={5} placeholder="In 3-6 sentences, describe the decision or system you need a dossier for" value={form.objective} onChange={(e) => setForm({ ...form, objective: e.target.value })} />
                        {form.objective.trim().length > 0 && form.objective.trim().length < 20 && (<div className="error">Please provide at least 20 characters</div>)}
                      </div>
                      <div className="grid-2">
                        <div>
                          <div className="label">Budget</div>
                          <select className="input" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
                            <option value="">Select...</option>
                            <option value="15k">$15k (single dossier)</option>
                            <option value="30k-60k">$30k?$60k (programmatic)</option>
                            <option value=">60k">$60k+ (enterprise)</option>
                          </select>
                        </div>
                        <div>
                          <div className="label">Timeline</div>
                          <select className="input" value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })}>
                            <option value="">Select...</option>
                            <option value="7d">? 7 days</option>
                            <option value="14d">? 14 days</option>
                            <option value=">14d">Flexible</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="form-grid">
                      <div className="card" style={{ padding: 14 }}>
                        <div className="label">Security & Compliance</div>
                        <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.8 }}>
                          <li>Transport: TLS 1.3</li>
                          <li>At-rest: AES-256 (Vercel-managed)</li>
                          <li>PII: Minimized, never sold</li>
                        </ul>
                        <label style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 10 }}>
                          <input type="checkbox" checked={form.compliance} onChange={(e) => setForm({ ...form, compliance: e.target.checked })} />
                          I agree to the secure processing of submitted data.
                        </label>
                      </div>
                      <div className="helper">Submission triggers vault-side processing; no human contact unless explicitly requested.</div>
                    </motion.div>
                  )}

                  {error && <div className="error">{error}</div>}
                </div>

                <div style={{ height: 18 }} />
                <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
                  <button className="btn" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>Back</button>
                  <div style={{ display: "flex", gap: 10 }}>
                    {step < 2 && (
                      <button className="btn btn-primary" onClick={() => canNext() && setStep((s) => s + 1)} disabled={!canNext()}>Next</button>
                    )}
                    {step === 2 && !success && (
                      <button className="btn btn-primary" onClick={submit} disabled={!canNext() || submitting}>
                        {submitting ? "Submitting?" : "Submit Securely"}
                      </button>
                    )}
                    {success && (
                      <div className="label" style={{ color: "#7be3a3" }}>Received. Vault processing initiated.</div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Progress({ step }: { step: number }) {
  return (
    <div className="card" style={{ padding: 10 }}>
      <div className="label" style={{ marginBottom: 8 }}>Stage {step + 1} of 3</div>
      <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 999 }}>
        <div style={{ height: 6, width: `${((step + 1) / 3) * 100}%`, background: "linear-gradient(90deg, #7aa2ff, #28d8c1)", borderRadius: 999 }} />
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 10V8a5 5 0 1 1 10 0v2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="15" r="1.6" fill="currentColor" />
    </svg>
  );
}
