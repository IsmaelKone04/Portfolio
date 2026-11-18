CREATE TABLE `certifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`type` text NOT NULL,
	`organization` text,
	`date` text,
	`description` text,
	`file_url` text,
	`file_name` text,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
-- Le site passe d'une page unique à sectionnée à 4 pages dédiées : les anciennes
-- clés de visibilité (about/skills/projects/experience/education) n'ont plus de
-- sens au niveau page. On les remplace par une clé par page pilotable (Accueil
-- reste toujours visible, donc hors de cette table).
DELETE FROM `sections`;--> statement-breakpoint
INSERT INTO `sections` (`key`, `label`, `visible`, `sort_order`) VALUES
	('realisations', 'Réalisations', 1, 0),
	('competences', 'Compétences', 1, 1),
	('certifications', 'Certifications', 1, 2),
	('contact', 'Contact', 1, 3);
