import { useState, useCallback, type ChangeEvent, type DragEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight, Loader2, Upload, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "../lib/api";

interface Props {
  role: string;
  jobId?: string | number;
  onClose: () => void;
}

interface Step1 {
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  currentPlace: string;
  state: string;
  country: string;
}
interface Step2 {
  qualification: string;
  college: string;
  university: string;
  passingYear: string;
  cgpa: string;
  skills: string;
  experience: string;
  currentCompany: string;
  linkedin: string;
  github: string;
  portfolio: string;
  expectedSalary: string;
  workMode: "Remote" | "Hybrid" | "Onsite" | "";
}

const emptyStep1: Step1 = {
  name: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  currentPlace: "",
  state: "",
  country: "",
};
const emptyStep2: Step2 = {
  qualification: "",
  college: "",
  university: "",
  passingYear: "",
  cgpa: "",
  skills: "",
  experience: "",
  currentCompany: "",
  linkedin: "",
  github: "",
  portfolio: "",
  expectedSalary: "",
  workMode: "",
};

const ACCEPT = [".pdf", ".doc", ".docx"];
const MAX_BYTES = 10 * 1024 * 1024;

export function ApplyWizard({ role, jobId, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [s1, setS1] = useState<Step1>(emptyStep1);
  const [s2, setS2] = useState<Step2>(emptyStep2);
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [drag, setDrag] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  const validStep1 = () => {
    if (!s1.name.trim()) return "Full name is required";
    if (!/^\S+@\S+\.\S+$/.test(s1.email)) return "Enter a valid email";
    if (!/^[+\d][\d\s\-()]{6,}$/.test(s1.phone)) return "Enter a valid phone number";
    if (!s1.dob) return "Date of birth is required";
    if (!s1.gender) return "Select a gender";
    if (!s1.currentPlace.trim() || !s1.state.trim() || !s1.country.trim())
      return "Location fields are required";
    return null;
  };
  const validStep2 = () => {
    if (!s2.qualification.trim()) return "Qualification is required";
    if (!s2.college.trim()) return "College is required";
    if (!s2.skills.trim()) return "Add at least one skill";
    if (!s2.workMode) return "Choose preferred work mode";
    return null;
  };

  const next = () => {
    const err = step === 1 ? validStep1() : step === 2 ? validStep2() : null;
    if (err) {
      toast.error(err);
      return;
    }
    setStep((n) => Math.min(3, n + 1));
  };
  const back = () => setStep((n) => Math.max(1, n - 1));

  const onFiles = useCallback((f: File | undefined | null) => {
    if (!f) return;
    const ext = "." + (f.name.split(".").pop() ?? "").toLowerCase();
    if (!ACCEPT.includes(ext)) {
      toast.error("Only PDF, DOC, or DOCX files are accepted");
      return;
    }
    if (f.size > MAX_BYTES) {
      toast.error("File must be 10 MB or smaller");
      return;
    }
    setFile(f);
  }, []);

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
    onFiles(e.dataTransfer.files?.[0]);
  };

  const submit = async () => {
    if (!file) {
      toast.error("Please attach your resume");
      return;
    }
    if (!consent) {
      toast.error("Please confirm the consent checkbox");
      return;
    }

    setSubmitting(true);
    setProgress(0);
    // Animated progress while uploading
    const ticker = window.setInterval(() => setProgress((p) => Math.min(90, p + 7)), 180);

    const form = new FormData();

    form.append(
      "jobTitle",

      role,
    );

    if (jobId !== undefined)
      form.append(
        "jobId",

        String(jobId),
      );

    form.append(
      "fullName",

      s1.name,
    );

    form.append(
      "email",

      s1.email,
    );

    form.append(
      "phone",

      s1.phone,
    );

    form.append(
      "dob",

      s1.dob,
    );

    form.append(
      "gender",

      s1.gender,
    );

    form.append(
      "location",

      `${s1.currentPlace}, ${s1.state}, ${s1.country}`,
    );

    form.append(
      "education",

      `${s2.qualification} — ${s2.college}${s2.university ? `, ${s2.university}` : ""}`,
    );

    form.append(
      "university",

      s2.university,
    );

    form.append(
      "graduationYear",

      s2.passingYear,
    );

    form.append(
      "experience",

      s2.experience,
    );

    form.append(
      "currentCompany",

      s2.currentCompany,
    );

    form.append(
      "currentRole",

      role,
    );

    form.append(
      "linkedin",

      s2.linkedin,
    );

    form.append(
      "portfolio",

      s2.portfolio,
    );

    form.append(
      "coverLetter",

      `Skills : ${s2.skills}

Expected Salary : ${s2.expectedSalary}

Preferred Work Mode : ${s2.workMode}

Github : ${s2.github}`,
    );

    console.log("Resume file :", file);
    console.log("Is File object :", file instanceof File);
    form.append(
      "resume",

      file,
    );

    try {
      await api.uploadApplication(form);
      setProgress(100);
      toast.success("Application Submitted Successfully");
      setTimeout(onClose, 600);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Submission failed. Please try again.");
      setProgress(0);
    } finally {
      clearInterval(ticker);
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm grid place-items-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-background rounded-2xl w-full max-w-2xl border border-border max-h-[92vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start p-6 pb-4 border-b border-border">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Apply for</div>
            <h3 className="text-lg font-bold mt-1">{role}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-6 pt-4">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex-1 flex items-center gap-2">
                <div
                  className={`w-7 h-7 grid place-items-center rounded-full text-xs font-semibold transition-colors ${
                    step >= n
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {step > n ? <CheckCircle2 className="w-4 h-4" /> : n}
                </div>
                {n < 3 && (
                  <div
                    className={`h-px flex-1 transition-colors ${step > n ? "bg-foreground" : "bg-border"}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Step {step} of 3 —{" "}
            {step === 1
              ? "Personal Information"
              : step === 2
                ? "Education & Professional"
                : "Resume & Review"}
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid sm:grid-cols-2 gap-3"
              >
                <Field
                  label="Full Name *"
                  value={s1.name}
                  onChange={(v) => setS1({ ...s1, name: v })}
                />
                <Field
                  label="Email Address *"
                  type="email"
                  value={s1.email}
                  onChange={(v) => setS1({ ...s1, email: v })}
                />
                <Field
                  label="Phone Number *"
                  type="tel"
                  value={s1.phone}
                  onChange={(v) => setS1({ ...s1, phone: v })}
                />
                <Field
                  label="Date of Birth *"
                  type="date"
                  value={s1.dob}
                  onChange={(v) => setS1({ ...s1, dob: v })}
                />
                <Select
                  label="Gender *"
                  value={s1.gender}
                  onChange={(v) => setS1({ ...s1, gender: v })}
                  options={["Male", "Female", "Other", "Prefer not to say"]}
                />
                <Field
                  label="Current Place *"
                  value={s1.currentPlace}
                  onChange={(v) => setS1({ ...s1, currentPlace: v })}
                />
                <Field
                  label="State *"
                  value={s1.state}
                  onChange={(v) => setS1({ ...s1, state: v })}
                />
                <Field
                  label="Country *"
                  value={s1.country}
                  onChange={(v) => setS1({ ...s1, country: v })}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid sm:grid-cols-2 gap-3"
              >
                <Field
                  label="Highest Qualification *"
                  value={s2.qualification}
                  onChange={(v) => setS2({ ...s2, qualification: v })}
                />
                <Field
                  label="College Name *"
                  value={s2.college}
                  onChange={(v) => setS2({ ...s2, college: v })}
                />
                <Field
                  label="University"
                  value={s2.university}
                  onChange={(v) => setS2({ ...s2, university: v })}
                />
                <Field
                  label="Passing Year"
                  type="number"
                  value={s2.passingYear}
                  onChange={(v) => setS2({ ...s2, passingYear: v })}
                />
                <Field
                  label="CGPA / %"
                  value={s2.cgpa}
                  onChange={(v) => setS2({ ...s2, cgpa: v })}
                />
                <Field
                  label="Years of Experience"
                  value={s2.experience}
                  onChange={(v) => setS2({ ...s2, experience: v })}
                />
                <div className="sm:col-span-2">
                  <Field
                    label="Skills (comma separated) *"
                    value={s2.skills}
                    onChange={(v) => setS2({ ...s2, skills: v })}
                  />
                </div>
                <Field
                  label="Current Company"
                  value={s2.currentCompany}
                  onChange={(v) => setS2({ ...s2, currentCompany: v })}
                />
                <Field
                  label="Expected Salary"
                  value={s2.expectedSalary}
                  onChange={(v) => setS2({ ...s2, expectedSalary: v })}
                />
                <Field
                  label="LinkedIn URL"
                  type="url"
                  value={s2.linkedin}
                  onChange={(v) => setS2({ ...s2, linkedin: v })}
                />
                <Field
                  label="GitHub URL"
                  type="url"
                  value={s2.github}
                  onChange={(v) => setS2({ ...s2, github: v })}
                />
                <div className="sm:col-span-2">
                  <Field
                    label="Portfolio URL"
                    type="url"
                    value={s2.portfolio}
                    onChange={(v) => setS2({ ...s2, portfolio: v })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <div className="text-xs text-muted-foreground mb-2">Preferred Work Mode *</div>
                  <div className="flex gap-2">
                    {(["Remote", "Hybrid", "Onsite"] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setS2({ ...s2, workMode: m })}
                        className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                          s2.workMode === m
                            ? "bg-foreground text-background border-foreground"
                            : "bg-card border-border hover:bg-secondary"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDrag(true);
                  }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={onDrop}
                  className={`rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
                    drag ? "border-foreground bg-secondary" : "border-border bg-card"
                  }`}
                >
                  {file ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="w-6 h-6" />
                      <div className="text-left">
                        <div className="text-sm font-medium">{file.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="text-xs underline text-muted-foreground hover:text-foreground"
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-7 h-7 mx-auto text-muted-foreground" />
                      <div className="mt-2 text-sm font-medium">Drag & drop your resume here</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        PDF, DOC, DOCX · max 10 MB
                      </div>
                      <label className="mt-4 inline-block cursor-pointer bg-foreground text-background rounded-full px-4 py-2 text-xs font-medium">
                        Choose file
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            onFiles(e.target.files?.[0])
                          }
                        />
                      </label>
                    </>
                  )}
                </div>

                {progress > 0 && (
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      className="h-full bg-foreground"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                )}

                <div className="rounded-xl border border-border bg-card p-4 text-sm space-y-1">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Review
                  </div>
                  <Row k="Name" v={s1.name} />
                  <Row k="Email" v={s1.email} />
                  <Row k="Phone" v={s1.phone} />
                  <Row k="Location" v={`${s1.currentPlace}, ${s1.state}, ${s1.country}`} />
                  <Row k="Qualification" v={`${s2.qualification} — ${s2.college}`} />
                  <Row k="Skills" v={s2.skills} />
                  <Row k="Experience" v={s2.experience || "—"} />
                  <Row k="Work Mode" v={s2.workMode} />
                </div>

                <label className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-muted-foreground">
                    I confirm the information above is accurate and consent to Work Wizards
                    Innovations processing my data for recruitment purposes.
                  </span>
                </label>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 pt-4 border-t border-border flex justify-between gap-3">
          <button
            type="button"
            onClick={step === 1 ? onClose : back}
            disabled={submitting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border border-border hover:bg-secondary disabled:opacity-50"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> {step === 1 ? "Cancel" : "Back"}
          </button>
          {step < 3 ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-5 py-2 text-sm font-medium"
            >
              Next <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-5 py-2 text-sm font-medium disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting…
                </>
              ) : (
                <>
                  Submit Application <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs text-muted-foreground mb-1">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-foreground transition-colors"
      />
    </label>
  );
}
function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="block text-xs text-muted-foreground mb-1">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-foreground"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3 py-1 border-b border-border/50 last:border-0">
      <span className="text-muted-foreground text-xs">{k}</span>
      <span className="text-right truncate max-w-[60%]">{v}</span>
    </div>
  );
}
