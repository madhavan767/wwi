// src/api.ts

const _rawApi = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "");
export const API_URL = (() => {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return "/api";
    }
  }
  return _rawApi ?? "";
})();

export const R2_PUBLIC_URL =
  (import.meta.env.VITE_R2_PUBLIC_URL as string | undefined)?.replace(/\/$/, "") ?? "";

const ADMIN_TOKEN = (import.meta.env.VITE_ADMIN_TOKEN as string | undefined) ?? "";

export type ApplicationStatus = "NEW" | "SHORTLISTED" | "INTERVIEW" | "HIRED" | "REJECTED";

export interface JobOpening {
  id: string;

  title: string;

  department?: string;

  location?: string;

  employmentType?: string;

  experience?: string;

  salaryRange?: string;

  description?: string;

  skills?: string;

  deadline?: string;

  published?: boolean;

  status?: string;

  createdAt?: string;

  updatedAt?: string;
}

export interface Application {
  id: string;

  jobId?: string | null;

  jobTitle?: string | null;

  fullName: string;

  email: string;

  phone: string;

  location?: string | null;

  linkedin?: string | null;

  portfolio?: string | null;

  education?: string | null;

  university?: string | null;

  graduationYear?: string | null;

  experience?: string | null;

  currentRole?: string | null;

  currentCompany?: string | null;

  coverLetter?: string | null;

  resume?: {
    key: string;

    name: string;

    size: number;

    type: string;

    url: string | null;
  };

  status?: ApplicationStatus;

  notes?: string;

  createdAt?: string;

  updatedAt?: string;
}

async function request<T>(
  path: string,

  init?: RequestInit,
): Promise<T> {
  const headers: HeadersInit = {
    ...(init?.body && !(init.body instanceof FormData)
      ? {
          "Content-Type": "application/json",
        }
      : {}),

    ...(ADMIN_TOKEN
      ? {
          Authorization: `Bearer ${ADMIN_TOKEN}`,
        }
      : {}),

    ...(init?.headers ?? {}),
  };

  const response = await fetch(
    `${API_URL}${path}`,

    {
      ...init,

      headers,
    },
  );

  if (!response.ok) {
    const txt = await response.text().catch(() => "");

    throw new Error(`API ${response.status}: ${txt}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return await response.json();
}

export const api = {
  /* =====================

JOBS

===================== */

  listJobs: () => request<JobOpening[]>("/jobs"),

  listOpenJobs: () => request<JobOpening[]>("/jobs/open"),

  listArchivedJobs: () => request<JobOpening[]>("/jobs/archived"),

  createJob: (job: Partial<JobOpening>) =>
    request<JobOpening>(
      "/jobs",

      {
        method: "POST",

        body: JSON.stringify(job),
      },
    ),

  updateJob: (
    id: string,

    job: Partial<JobOpening>,
  ) =>
    request<JobOpening>(
      `/jobs/${id}`,

      {
        method: "PUT",

        body: JSON.stringify(job),
      },
    ),

  deleteJob: (id: string) =>
    request<void>(
      `/jobs/${id}`,

      {
        method: "DELETE",
      },
    ),

  /* =====================

APPLICATIONS

===================== */

  listApplications: () => request<Application[]>("/applications"),
  countJobs: () => request("/jobs/count"),

  getApplication: (id: string) => request<Application>(`/applications/${id}`),

  updateApplicationStatus: (
    id: string,

    status: ApplicationStatus,
  ) =>
    request(
      `/applications/${id}/status`,

      {
        method: "PUT",

        body: JSON.stringify({
          status,
        }),
      },
    ),

  updateApplicationNotes: (
    id: string,

    notes: string,
  ) =>
    request(
      `/applications/${id}/notes`,

      {
        method: "PUT",

        body: JSON.stringify({
          notes,
        }),
      },
    ),

  deleteApplication: (id: string) =>
    request<void>(
      `/applications/${id}`,

      {
        method: "DELETE",
      },
    ),

  /* =====================

UPLOAD

===================== */

  uploadApplication: async (formData: FormData) => {
    const res = await fetch(
      `${API_URL}/upload`,

      {
        method: "POST",

        body: formData,

        headers: {
          ...(ADMIN_TOKEN
            ? {
                Authorization: `Bearer ${ADMIN_TOKEN}`,
              }
            : {}),
        },
      },
    );

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    return res.json();
  },
};

export function resumeUrl(app: Application) {
  if (!app.resume) return null;

  if (app.resume.url) return app.resume.url;

  if (R2_PUBLIC_URL && app.resume.key) {
    return `${R2_PUBLIC_URL}/${app.resume.key}`;
  }

  return null;
}
