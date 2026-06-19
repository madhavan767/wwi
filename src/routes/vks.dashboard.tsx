import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Download,
  Plus,
  Trash2,
  Archive,
  Copy,
  Pencil,
  X,
  Eye,
  Loader2,
  Lock,
  FileText,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import {
  api,
  resumeUrl,
  type Application,
  type ApplicationStatus,
  type JobOpening,
} from "../lib/api";

export const Route = createFileRoute("/vks/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard — WWI Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: DashboardPage,
});

const AUTH_KEY = "wwi.vks.auth";
type Tab = "overview" | "applications" | "jobs" | "analytics" | "settings";

function DashboardPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(AUTH_KEY) === "1") setAuthed(true);
  }, []);

  const login = (e: FormEvent) => {
    e.preventDefault();
    const expected = import.meta.env.VITE_DASHBOARD_PASSWORD as string | undefined;
    if (!expected) {
      toast.error("Dashboard password not configured");
      return;
    }
    if (pw === expected) {
      sessionStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
      toast.success("Welcome back");
    } else {
      toast.error("Incorrect password");
    }
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
    setPw("");
  };

  if (!authed) {
    return (
      <div className="min-h-screen grid place-items-center bg-background px-4">
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={login}
          className="w-full max-w-sm bg-card border border-border rounded-2xl p-6 space-y-4"
        >
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <h1 className="font-semibold">WWI Dashboard</h1>
          </div>
          <p className="text-xs text-muted-foreground">Enter the admin password to continue.</p>
          <input
            type="password"
            autoFocus
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-foreground"
          />
          <button className="w-full bg-foreground text-background rounded-full py-2 text-sm font-medium">
            Sign in
          </button>
        </motion.form>
      </div>
    );
  }

  const items: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "applications", label: "Applications", icon: Users },
    { id: "jobs", label: "Job Openings", icon: Briefcase },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border bg-card">
        <div className="h-16 flex items-center px-5 border-b border-border font-semibold">
          WWI · Admin
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => setTab(it.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                tab === it.id
                  ? "bg-foreground text-background"
                  : "hover:bg-secondary text-foreground/80"
              }`}
            >
              <it.icon className="w-4 h-4" /> {it.label}
            </button>
          ))}
        </nav>
        <button
          onClick={logout}
          className="m-3 flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-secondary"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* mobile top tabs */}
        <div className="md:hidden border-b border-border overflow-x-auto">
          <div className="flex gap-1 p-2">
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => setTab(it.id)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs ${tab === it.id ? "bg-foreground text-background" : "bg-secondary"}`}
              >
                {it.label}
              </button>
            ))}
            <button
              onClick={logout}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs bg-secondary"
            >
              Logout
            </button>
          </div>
        </div>

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {tab === "overview" && <Overview />}
          {tab === "applications" && <ApplicationsView />}
          {tab === "jobs" && <JobsView />}
          {tab === "analytics" && <Analytics />}
          {tab === "settings" && <SettingsView onLogout={logout} />}
        </main>
      </div>
    </div>
  );
}

// ============== Overview ==============
function Overview() {
  const apps = useQuery({ queryKey: ["apps"], queryFn: api.listApplications });
  const jobs = useQuery({ queryKey: ["jobs"], queryFn: api.listJobs });
  const total = apps.data?.length ?? 0;
  const newCount = apps.data?.filter((a) => (a.status ?? "NEW") === "NEW").length ?? 0;
  const shortlisted = apps.data?.filter((a) => a.status === "SHORTLISTED").length ?? 0;
  const active = jobs.data?.filter((j) => !j.archived && j.published !== false).length ?? 0;

  const stats = [
    { label: "Total Applications", value: total },
    { label: "New", value: newCount },
    { label: "Shortlisted", value: shortlisted },
    { label: "Active Openings", value: active },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 rounded-2xl bg-card border border-border"
          >
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="mt-2 text-3xl font-bold">
              {apps.isLoading || jobs.isLoading ? "—" : s.value}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl bg-card border border-border p-5">
        <h2 className="font-semibold mb-3">Recent Applications</h2>
        {apps.isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <ul className="text-sm divide-y divide-border">
            {(apps.data ?? []).slice(0, 6).map((a) => (
              <li key={a.id} className="py-2 flex justify-between gap-3">
                <span className="truncate">
                  {a.fullName}·<span className="text-muted-foreground">{a.jobTitle ?? "—"}</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : ""}
                </span>
              </li>
            ))}
            {(apps.data ?? []).length === 0 && (
              <li className="py-4 text-muted-foreground text-center">No applications yet.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

// ============== Applications ==============
const STATUSES: ApplicationStatus[] = ["NEW", "SHORTLISTED", "INTERVIEW", "HIRED", "REJECTED"];

function ApplicationsView() {
  const qc = useQueryClient();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["apps"],
    queryFn: api.listApplications,
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ApplicationStatus | "ALL">("ALL");
  const [sort, setSort] = useState<"new" | "old" | "name">("new");
  const [page, setPage] = useState(1);
  const [preview, setPreview] = useState<Application | null>(null);

  const update = useMutation({
    mutationFn: async ({
      id,

      patch,
    }) => {
      if (patch.status) {
        await api.updateApplicationStatus(
          id,

          patch.status,
        );
      }

      if (patch.notes !== undefined) {
        await api.updateApplicationNotes(
          id,

          patch.notes,
        );
      }

      return true;
    },

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["apps"],
      });
    },

    onError: (e) => {
      toast.error(e instanceof Error ? e.message : "Update failed");
    },
  });

  const filtered = useMemo(() => {
    let xs = data ?? [];
    if (filter !== "ALL") xs = xs.filter((a) => (a.status ?? "NEW") === filter);
    if (search) {
      const q = search.toLowerCase();
      xs = xs.filter((a) =>
        [a.fullName, a.email, a.phone, a.jobTitle, a.education].some((v) =>
          v?.toLowerCase().includes(q),
        ),
      );
    }
    xs = [...xs].sort((a, b) => {
      if (sort === "name") return (a.fullName ?? "").localeCompare(b.fullName ?? "");
      const ta = a.createdAt ? +new Date(a.createdAt) : 0;
      const tb = b.createdAt ? +new Date(b.createdAt) : 0;
      return sort === "new" ? tb - ta : ta - tb;
    });
    return xs;
  }, [data, filter, search, sort]);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const slice = filtered.slice((page - 1) * pageSize, page * pageSize);

  const exportCsv = () => {
    const headers = [
      "Name",

      "Email",

      "Phone",

      "Role",

      "Education",

      "Experience",

      "Status",

      "Applied",

      "Resume",
    ];
    const rows = filtered.map((a) => [
      a.fullName ?? "",

      a.email ?? "",

      a.phone ?? "",

      a.jobTitle ?? "",

      a.education ?? "",

      a.experience ?? "",

      a.status ?? "NEW",

      a.createdAt ?? "",

      resumeUrl(a) ?? "",
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `applications-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Applications</h1>
        <div className="flex gap-2">
          <button
            onClick={() => refetch()}
            className="px-3 py-2 text-xs rounded-full border border-border hover:bg-secondary"
          >
            Refresh
          </button>
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs rounded-full bg-foreground text-background"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search name, email, skills…"
            className="w-full bg-card border border-border rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-foreground"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value as ApplicationStatus | "ALL");
            setPage(1);
          }}
          className="bg-card border border-border rounded-lg px-3 py-2 text-sm"
        >
          <option value="ALL">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="bg-card border border-border rounded-lg px-3 py-2 text-sm"
        >
          <option value="new">Newest first</option>
          <option value="old">Oldest first</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase text-muted-foreground border-b border-border">
            <tr>
              <th className="text-left p-3">Applicant</th>
              <th className="text-left p-3 hidden md:table-cell">Email</th>
              <th className="text-left p-3 hidden lg:table-cell">Phone</th>
              <th className="text-left p-3 hidden lg:table-cell">Education</th>
              <th className="text-left p-3 hidden md:table-cell">Exp</th>
              <th className="text-left p-3 hidden md:table-cell">Applied</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Resume</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={9} className="p-8 text-center">
                  <Loader2 className="w-5 h-5 animate-spin inline" />
                </td>
              </tr>
            )}
            {isError && (
              <tr>
                <td colSpan={9} className="p-8 text-center text-muted-foreground">
                  Failed to load. Make sure the API is reachable.
                </td>
              </tr>
            )}
            {!isLoading && !isError && slice.length === 0 && (
              <tr>
                <td colSpan={9} className="p-8 text-center text-muted-foreground">
                  No applications match your filters.
                </td>
              </tr>
            )}
            {slice.map((a) => {
              const url = resumeUrl(a);
              return (
                <tr
                  key={a.id}
                  className="border-b border-border last:border-0 hover:bg-secondary/30"
                >
                  <td className="p-3 font-medium">
                    {a.fullName}

                    <div className="text-xs text-muted-foreground md:hidden">{a.email}</div>
                  </td>
                  <td className="p-3 hidden md:table-cell text-muted-foreground">{a.email}</td>
                  <td className="p-3 hidden lg:table-cell text-muted-foreground">{a.phone}</td>
                  <td className="p-3 hidden lg:table-cell text-muted-foreground truncate max-w-[200px]">
                    {a.education ?? "—"}
                  </td>
                  <td className="p-3 hidden md:table-cell text-muted-foreground">
                    {a.experience || "—"}
                  </td>
                  <td className="p-3 hidden md:table-cell text-muted-foreground text-xs">
                    {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="p-3">
                    <select
                      value={a.status ?? "NEW"}
                      onChange={(e) =>
                        update.mutate({
                          id: a.id,
                          patch: { status: e.target.value as ApplicationStatus },
                        })
                      }
                      className="bg-background border border-border rounded-md px-2 py-1 text-xs"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3">
                    {url ? (
                      <button
                        onClick={() => setPreview(a)}
                        className="inline-flex items-center gap-1 text-xs underline"
                      >
                        <FileText className="w-3.5 h-3.5" /> View
                      </button>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setPreview(a)}
                      className="p-1.5 rounded hover:bg-secondary"
                      aria-label="Open"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>
            Page {page} of {totalPages} · {filtered.length} results
          </span>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 rounded border border-border disabled:opacity-40"
            >
              Prev
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 rounded border border-border disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {preview && (
          <ApplicationModal
            app={preview}
            onClose={() => setPreview(null)}
            onSave={(patch) => update.mutate({ id: preview.id, patch })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ApplicationModal({
  app,
  onClose,
  onSave,
}: {
  app: Application;
  onClose: () => void;
  onSave: (patch: Partial<Application>) => void;
}) {
  const [notes, setNotes] = useState(app.notes ?? "");
  const [status, setStatus] = useState<ApplicationStatus>(app.status ?? "NEW");
  const url = resumeUrl(app);
  return (
    <div
      className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm grid place-items-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="bg-background rounded-2xl w-full max-w-5xl border border-border max-h-[92vh] overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:w-1/2 border-b md:border-b-0 md:border-r border-border bg-card min-h-[300px] grid place-items-center">
          {url ? (
            <iframe src={url} title="Resume" className="w-full h-[60vh] md:h-full" />
          ) : (
            <div className="text-sm text-muted-foreground p-6">No resume uploaded</div>
          )}
        </div>
        <div className="md:w-1/2 p-6 overflow-y-auto space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold">{app.fullName}</h2>

              <p>{app.jobTitle ?? "—"}</p>
            </div>
            <button onClick={onClose} aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          <dl className="text-sm space-y-1.5">
            <Info k="Email" v={app.email} />
            <Info k="Phone" v={app.phone} />
            <Info k="Location" v={app.location} />
            <Info
              k="Education"
              v={app.education ?? `${app.qualification ?? ""} ${app.college ?? ""}`.trim()}
            />
            <Info k="Experience" v={app.experience} />
            <Info k="Current Company" v={app.currentCompany} />
            <Info k="LinkedIn" v={app.linkedin} link />
            <Info k="Portfolio" v={app.portfolio} link />
          </dl>

          <div className="flex gap-2 items-center">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
              className="bg-card border border-border rounded-lg px-3 py-2 text-sm"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {url && (
              <a
                href={url}
                download
                className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-full border border-border hover:bg-secondary"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </a>
            )}
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Internal Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-foreground resize-none"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full text-sm border border-border"
            >
              Close
            </button>
            <button
              onClick={async () => {
                await onSave({
                  status,
                  notes,
                });

                toast.success("Saved");

                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm bg-foreground text-background"
            >
              <Save className="w-3.5 h-3.5" />
              Save
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Info({ k, v, link }: { k: string; v?: string; link?: boolean }) {
  if (!v) return null;
  return (
    <div className="flex gap-3 justify-between border-b border-border/40 py-1">
      <dt className="text-xs text-muted-foreground">{k}</dt>
      <dd className="text-right max-w-[60%] truncate">
        {link ? (
          <a href={v} target="_blank" rel="noopener noreferrer" className="underline">
            {v}
          </a>
        ) : (
          v
        )}
      </dd>
    </div>
  );
}

// ============== Jobs ==============
function JobsView() {
  const qc = useQueryClient();
  const { data, isLoading, isError } = useQuery({ queryKey: ["jobs"], queryFn: api.listJobs });
  const [editing, setEditing] = useState<Partial<JobOpening> | null>(null);

  const create = useMutation({
    mutationFn: api.createJob,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs"] }),
  });
  const update = useMutation({
    mutationFn: ({ id, patch }: { id: JobOpening["id"]; patch: Partial<JobOpening> }) =>
      api.updateJob(id, patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs"] }),
  });
  const del = useMutation({
    mutationFn: api.deleteJob,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs"] }),
  });

  const save = async (job: Partial<JobOpening>) => {
    try {
      if (job.id !== undefined) await update.mutateAsync({ id: job.id, patch: job });
      else await create.mutateAsync(job);
      toast.success("Saved & published");
      setEditing(null);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Openings</h1>
        <button
          onClick={() =>
            setEditing({ published: true, employmentType: "Full Time", location: "Remote" })
          }
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs rounded-full bg-foreground text-background"
        >
          <Plus className="w-3.5 h-3.5" /> New Opening
        </button>
      </div>

      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : isError ? (
        <p className="text-sm text-muted-foreground">Failed to load openings.</p>
      ) : (
        <div className="grid gap-3">
          {(data ?? []).map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-border bg-card p-5 flex flex-wrap gap-3 items-start"
            >
              <div className="flex-1 min-w-[240px]">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold">{job.title}</h3>
                  {job.archived && (
                    <span className="text-[10px] uppercase bg-secondary px-2 py-0.5 rounded-full">
                      Archived
                    </span>
                  )}
                  {!job.published && !job.archived && (
                    <span className="text-[10px] uppercase bg-secondary px-2 py-0.5 rounded-full">
                      Draft
                    </span>
                  )}
                </div>
                <div className="mt-1 text-xs text-muted-foreground flex flex-wrap gap-3">
                  {job.department && <span>{job.department}</span>}
                  {job.location && <span>· {job.location}</span>}
                  {job.employmentType && <span>· {job.employmentType}</span>}
                </div>
                {job.description && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {job.description}
                  </p>
                )}
              </div>
              <div className="flex gap-1.5">
                <button
                  title="Edit"
                  onClick={() => setEditing(job)}
                  className="p-2 rounded-lg hover:bg-secondary"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  title="Duplicate"
                  onClick={() => {
                    const { id: _id, ...rest } = job;
                    void _id;
                    setEditing({ ...rest, title: `${job.title} (copy)` });
                  }}
                  className="p-2 rounded-lg hover:bg-secondary"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  title={job.status === "ARCHIVED" ? "Unarchive" : "Archive"}
                  onClick={() =>
                    update.mutate({
                      id: job.id,

                      patch: {
                        status: job.status === "ARCHIVED" ? "OPEN" : "ARCHIVED",
                      },
                    })
                  }
                  className="p-2 rounded-lg hover:bg-secondary"
                >
                  <Archive className="w-4 h-4" />
                </button>
                <button
                  title="Delete"
                  onClick={() => {
                    if (confirm(`Delete "${job.title}"?`)) del.mutate(job.id);
                  }}
                  className="p-2 rounded-lg hover:bg-secondary text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {(data ?? []).length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              No openings yet. Click "New Opening" to create one.
            </p>
          )}
        </div>
      )}

      <AnimatePresence>
        {editing && (
          <JobModal
            job={editing}
            onClose={() => setEditing(null)}
            onSave={save}
            saving={create.isPending || update.isPending}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function JobModal({
  job,
  onClose,
  onSave,
  saving,
}: {
  job: Partial<JobOpening>;
  onClose: () => void;
  onSave: (j: Partial<JobOpening>) => void;
  saving: boolean;
}) {
  const [f, setF] = useState<Partial<JobOpening>>(job);
  const setK = <K extends keyof JobOpening>(k: K, v: JobOpening[K]) =>
    setF((p) => ({ ...p, [k]: v }));

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm grid place-items-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="bg-background rounded-2xl w-full max-w-2xl border border-border max-h-[92vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="font-bold">{job.id ? "Edit Opening" : "New Opening"}</h2>
          <button onClick={onClose} aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-3 grid sm:grid-cols-2 gap-3">
          <In label="Title *" v={f.title ?? ""} on={(v) => setK("title", v)} />
          <In label="Department" v={f.department ?? ""} on={(v) => setK("department", v)} />
          <In label="Location" v={f.location ?? ""} on={(v) => setK("location", v)} />
          <In
            label="Employment Type"
            v={f.employmentType ?? ""}
            on={(v) => setK("employmentType", v)}
          />
          <In
            label="Experience Required"
            v={f.experience ?? ""}
            on={(v) => setK("experience", v)}
          />
          <In label="Salary Range" v={f.salaryRange ?? ""} on={(v) => setK("salaryRange", v)} />
          <div className="sm:col-span-2">
            <In label="Required Skills" v={f.skills ?? ""} on={(v) => setK("skills", v)} />
          </div>
          <In label="Deadline" type="date" v={f.deadline ?? ""} on={(v) => setK("deadline", v)} />
          <label className="flex items-center gap-2 text-sm mt-6">
            <input
              type="checkbox"
              checked={f.published !== false}
              onChange={(e) => setK("published", e.target.checked)}
            />{" "}
            Published
          </label>
          <div className="sm:col-span-2">
            <label className="block text-xs text-muted-foreground mb-1">Description</label>
            <textarea
              rows={5}
              value={f.description ?? ""}
              onChange={(e) => setK("description", e.target.value)}
              className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-foreground resize-none"
            />
          </div>
        </div>
        <div className="p-6 border-t border-border flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-full text-sm border border-border">
            Cancel
          </button>
          <button
            onClick={() => {
              if (!f.title?.trim()) {
                toast.error("Title is required");
                return;
              }
              onSave(f);
            }}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm bg-foreground text-background disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}{" "}
            Publish
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function In({
  label,
  v,
  on,
  type = "text",
}: {
  label: string;
  v: string;
  on: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs text-muted-foreground mb-1">{label}</span>
      <input
        type={type}
        value={v}
        onChange={(e) => on(e.target.value)}
        className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-foreground"
      />
    </label>
  );
}

// ============== Analytics ==============
function Analytics() {
  const apps = useQuery({ queryKey: ["apps"], queryFn: api.listApplications });
  const buckets = useMemo(() => {
    const out: Record<ApplicationStatus, number> = {
      NEW: 0,
      SHORTLISTED: 0,
      INTERVIEW: 0,
      HIRED: 0,
      REJECTED: 0,
    };
    for (const a of apps.data ?? []) out[a.status ?? "NEW"]++;
    return out;
  }, [apps.data]);
  const max = Math.max(1, ...Object.values(buckets));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <div className="rounded-2xl bg-card border border-border p-6">
        <h2 className="font-semibold mb-4">Applications by status</h2>
        <div className="space-y-3">
          {STATUSES.map((s) => (
            <div key={s}>
              <div className="flex justify-between text-xs mb-1">
                <span>{s}</span>
                <span className="text-muted-foreground">{buckets[s]}</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(buckets[s] / max) * 100}%` }}
                  transition={{ duration: 0.6 }}
                  className="h-full bg-foreground"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============== Settings ==============
function SettingsView({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
        <h2 className="font-semibold">API Configuration</h2>
        <div className="text-sm space-y-1">
          <div>
            <span className="text-muted-foreground">API URL:</span>{" "}
            <code className="text-xs">{import.meta.env.VITE_API_URL as string}</code>
          </div>
          <div>
            <span className="text-muted-foreground">R2 Public URL:</span>{" "}
            <code className="text-xs">{import.meta.env.VITE_R2_PUBLIC_URL as string}</code>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Change these in <code>.env.local</code> and redeploy.
        </p>
      </div>
      <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
        <h2 className="font-semibold">Session</h2>
        <button
          onClick={onLogout}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border border-border hover:bg-secondary"
        >
          <LogOut className="w-4 h-4" /> Sign out of this device
        </button>
      </div>
    </div>
  );
}
