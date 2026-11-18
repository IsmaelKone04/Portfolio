CREATE TABLE `sections` (
	`key` text PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`visible` integer DEFAULT true NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);

INSERT INTO `sections` (`key`, `label`, `visible`, `sort_order`) VALUES
  ('about', 'Qui suis-je', 1, 0),
  ('skills', 'Compétences', 1, 1),
  ('projects', 'Réalisations', 1, 2),
  ('experience', 'Parcours', 1, 3),
  ('education', 'Formation', 1, 4),
  ('contact', 'Contact', 1, 5);
