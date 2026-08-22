import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

vi.mock("./db", () => ({
  insertEnquiry: vi.fn().mockResolvedValue(undefined),
  listEnquiries: vi.fn().mockResolvedValue([]),
  getUserByOpenId: vi.fn().mockResolvedValue(undefined),
  upsertUser: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

import { appRouter } from "./routers";
import { insertEnquiry, listEnquiries } from "./db";
import { notifyOwner } from "./_core/notification";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => undefined } as unknown as TrpcContext["res"],
  };
}

const validEnquiry = {
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "+91 98300 00000",
  company: "Example Utilities",
  serviceType: "Operation & maintenance" as const,
  projectStage: "Planned maintenance / O&M" as const,
  siteLocation: "Kolkata, West Bengal",
  message: "We need operation and maintenance support for our pump station.",
};

describe("enquiries.submit", () => {
  beforeEach(() => vi.clearAllMocks());

  it("stores a qualified enquiry and notifies the owner with all answers", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.enquiries.submit(validEnquiry);

    expect(result).toEqual({ success: true });
    expect(insertEnquiry).toHaveBeenCalledWith({ ...validEnquiry });
    expect(notifyOwner).toHaveBeenCalledTimes(1);
    const payload = vi.mocked(notifyOwner).mock.calls[0]?.[0];
    expect(payload?.title).toContain("Jane Doe");
    expect(payload?.content).toContain("pump station");
    expect(payload?.content).toContain("Operation & maintenance");
    expect(payload?.content).toContain("Kolkata, West Bengal");
  });

  it("accepts optional qualification contact fields as absent", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await caller.enquiries.submit({
      name: "Jane Doe",
      email: "jane@example.com",
      serviceType: "Government water supply",
      projectStage: "New requirement",
      message: "Please assess a new distribution line.",
    });

    expect(insertEnquiry).toHaveBeenCalledWith({
      name: "Jane Doe",
      email: "jane@example.com",
      phone: null,
      company: null,
      serviceType: "Government water supply",
      projectStage: "New requirement",
      siteLocation: null,
      message: "Please assess a new distribution line.",
    });
  });

  it("rejects submissions with an invalid email", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.enquiries.submit({ ...validEnquiry, email: "not-an-email" })).rejects.toThrow();
    expect(insertEnquiry).not.toHaveBeenCalled();
  });

  it("rejects empty required fields", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.enquiries.submit({ ...validEnquiry, serviceType: "" as never })).rejects.toThrow();
    expect(insertEnquiry).not.toHaveBeenCalled();
  });

  it("tolerates owner notification failure without rejecting the submission", async () => {
    vi.mocked(notifyOwner).mockRejectedValueOnce(new Error("upstream down"));
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.enquiries.submit(validEnquiry)).resolves.toEqual({ success: true });
    expect(insertEnquiry).toHaveBeenCalledTimes(1);
  });

  it("lists enquiries in reverse chronological order", async () => {
    vi.mocked(listEnquiries).mockResolvedValueOnce([
      { id: 2, name: "B", email: "b@example.com", phone: null, company: null, serviceType: "Government water supply", projectStage: "New requirement", siteLocation: null, message: "two", createdAt: new Date("2026-01-02") },
      { id: 1, name: "A", email: "a@example.com", phone: null, company: null, serviceType: "Government water supply", projectStage: "New requirement", siteLocation: null, message: "one", createdAt: new Date("2026-01-01") },
    ]);
    const caller = appRouter.createCaller(createPublicContext());
    const rows = await caller.enquiries.list();
    expect(rows[0]?.name).toBe("B");
  });
});
