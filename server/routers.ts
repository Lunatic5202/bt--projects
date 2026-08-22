import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { notifyOwner } from "./_core/notification";
import { publicProcedure, router } from "./_core/trpc";
import { insertEnquiry, listEnquiries } from "./db";

const enquirySchema = z.object({
  name: z.string().min(1).max(160),
  email: z.string().email().max(320),
  phone: z.string().max(32).optional(),
  company: z.string().max(160).optional(),
  serviceType: z.enum([
    "Government water supply",
    "Water management",
    "Sewage pumping / STP",
    "Chlorination systems",
    "Pumping systems / repairs",
    "Civil & electrical infrastructure",
    "Operation & maintenance",
    "Not sure yet",
  ]),
  projectStage: z.enum([
    "New requirement",
    "Existing system issue",
    "Planned maintenance / O&M",
    "Upgrade / expansion",
    "Urgent support",
  ]),
  siteLocation: z.string().max(255).optional(),
  message: z.string().min(1).max(10000),
});

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  enquiries: router({
    submit: publicProcedure.input(enquirySchema).mutation(async ({ input }) => {
      await insertEnquiry({
        name: input.name.trim(),
        email: input.email.trim(),
        phone: input.phone?.trim() || null,
        company: input.company?.trim() || null,
        serviceType: input.serviceType,
        projectStage: input.projectStage,
        siteLocation: input.siteLocation?.trim() || null,
        message: input.message.trim(),
      });

      // Notify the project owner by email (delivered to btprojects.official@btprojects.co.in).
      // notifyOwner pushes an owner notification; email delivery is configured
      // in the project's notification settings.
      await notifyOwner({
        title: `New website enquiry from ${input.name.trim()}`,
        content: [
          `From: ${input.name.trim()} <${input.email.trim()}>`,
          `Phone: ${input.phone?.trim() || "Not provided"}`,
          `Organisation: ${input.company?.trim() || "Not provided"}`,
          `Service: ${input.serviceType}`,
          `Project stage: ${input.projectStage}`,
          `Site location: ${input.siteLocation?.trim() || "Not provided"}`,
          "",
          input.message.trim(),
        ].join("\n"),
      }).catch((e) =>
        console.warn("[Enquiries] Owner notification failed:", e),
      );

      return { success: true } as const;
    }),
    list: publicProcedure.query(() => listEnquiries()),
  }),
});

export type AppRouter = typeof appRouter;
