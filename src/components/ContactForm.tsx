import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

const WEB3FORMS_KEY = "51a3f213-d632-4d4f-8e64-c931c52fbb69";
const ENDPOINT = "https://api.web3forms.com/submit";

type Fields = {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
};

const empty: Fields = { name: "", email: "", phone: "", company: "", subject: "", message: "" };

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[+\d][\d\s\-()]{6,}$/;

export function ContactForm() {
  const [data, setData] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => setData((p) => ({ ...p, [k]: v }));

  const validate = (): boolean => {
    const errs: Partial<Record<keyof Fields, string>> = {};
    if (data.name.trim().length < 2) errs.name = "Please enter your name";
    if (!emailRe.test(data.email.trim())) errs.email = "Please enter a valid email";
    if (data.phone && !phoneRe.test(data.phone.trim()))
      errs.phone = "Please enter a valid phone number";
    if (data.message.trim().length < 10) errs.message = "Message must be at least 10 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("access_key", WEB3FORMS_KEY);
      payload.append("name", data.name);
      payload.append("email", data.email);
      payload.append("phone", data.phone);
      payload.append("company", data.company);
      payload.append("subject", data.subject || `New enquiry from ${data.name}`);
      payload.append("message", data.message);
      payload.append("from_name", "WWI Website");

      const res = await fetch(ENDPOINT, { method: "POST", body: payload });
      const json = await res.json().catch(() => ({}));
      if (res.ok && (json as { success?: boolean }).success !== false) {
        toast.success("Message sent successfully");
        setData(empty);
        setErrors({});
      } else {
        toast.error("Failed to send message");
      }
    } catch {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "mt-1 w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-foreground transition";

  return (
    <form onSubmit={submit} className="p-7 rounded-2xl bg-card border border-border space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Name *
          </label>
          <input
            value={data.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Your name"
            className={inputCls}
            autoComplete="name"
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Email *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@email.com"
            className={inputCls}
            autoComplete="email"
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Phone
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+91 00000 00000"
            className={inputCls}
            autoComplete="tel"
          />
          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Company
          </label>
          <input
            value={data.company}
            onChange={(e) => set("company", e.target.value)}
            placeholder="Company name"
            className={inputCls}
            autoComplete="organization"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Subject
        </label>
        <input
          value={data.subject}
          onChange={(e) => set("subject", e.target.value)}
          placeholder="What's this about?"
          className={inputCls}
        />
      </div>
      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Message *
        </label>
        <textarea
          rows={4}
          value={data.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Tell us about your project..."
          className={`${inputCls} resize-none`}
        />
        {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background rounded-full px-5 py-2.5 text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
