-- Contenu réel (voir frontend/src/data/mockData.js `certifications`), migré depuis
-- l'ancienne table `education` : diplôme UTA, formation AiCE, baccalauréat. Aucun
-- fichier justificatif n'est encore attaché (à déposer via /admin une fois disponible).
INSERT INTO `certifications` (`title`, `type`, `organization`, `date`, `description`, `sort_order`) VALUES
	('Licence en Informatique — Génie Logiciel', 'diplome', 'Université de Technologie d''Abidjan', '2023 - En cours', 'Formation orientée développement logiciel, bases de données et administration système et réseaux. Moyenne actuelle : 13.5/20.', 0),
	('Formation IA appliquée (AI Career Essentials)', 'formation', 'AiCE — MTN × ALX Africa', 'Septembre 2026 - Novembre 2026', '6 cours et 6 projets de maîtrise sur l''usage professionnel de l''IA — prompting structuré, éthique et responsabilité, création de contenus, analyse de données, personal branding. 100 % aux quiz.', 1),
	('Baccalauréat Série D', 'diplome', 'Collège Privé Jules Ronsard 2', '2022 - 2023', 'Baccalauréat scientifique avec mention Bien.', 2);
