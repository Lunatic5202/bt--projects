ALTER TABLE `enquiries` ADD `phone` varchar(32);--> statement-breakpoint
ALTER TABLE `enquiries` ADD `company` varchar(160);--> statement-breakpoint
ALTER TABLE `enquiries` ADD `serviceType` varchar(80) DEFAULT 'Not specified' NOT NULL;--> statement-breakpoint
ALTER TABLE `enquiries` ADD `projectStage` varchar(80) DEFAULT 'Not specified' NOT NULL;--> statement-breakpoint
ALTER TABLE `enquiries` ADD `siteLocation` varchar(255);