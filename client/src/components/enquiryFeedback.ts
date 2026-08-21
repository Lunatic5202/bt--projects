export type EnquiryFeedbackStatus = "idle" | "sending" | "success" | "error";
export type EnquirySubmissionOutcome = "idle" | "success" | "error";

export function getEnquiryFeedbackStatus(
  isSubmitting: boolean,
  outcome: EnquirySubmissionOutcome,
): EnquiryFeedbackStatus {
  if (isSubmitting) return "sending";
  return outcome;
}
