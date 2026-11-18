-- Réintroduit la page Parcours (stages/missions, retirée par erreur lors du passage
-- aux pages dédiées) : décale les pages existantes et insère `parcours` en tête,
-- juste après Accueil. Pas de changement de schéma, juste des données.
UPDATE `sections` SET `sort_order` = `sort_order` + 1;
INSERT INTO `sections` (`key`, `label`, `visible`, `sort_order`) VALUES
	('parcours', 'Parcours', 1, 0);
