import { describe, expect, it } from "vitest";
import { getEnquiryFeedbackStatus } from "./enquiryFeedback";

describe("getEnquiryFeedbackStatus", () => {
  it("reports idle before an enquiry is sent", () => {
    expect(getEnquiryFeedbackStatus(false, "idle")).toBe("idle");
  });

  it("reports sending while the submission is in progress", () => {
    expect(getEnquiryFeedbackStatus(true, "idle")).toBe("sending");
  });

  it("reports a success acknowledgement once the submission completes", () => {
    expect(getEnquiryFeedbackStatus(false, "success")).toBe("success");
  });

  it("retains an error state after a failed submission", () => {
    expect(getEnquiryFeedbackStatus(false, "error")).toBe("error");
  });
});
