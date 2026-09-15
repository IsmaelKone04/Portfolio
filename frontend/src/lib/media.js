// Reconnaît une URL YouTube ou Vimeo et la convertit en URL d'embed.
// Retourne null si `video` est un chemin local (mp4/webm) : dans ce cas
// l'appelant utilise une balise <video> native plutôt qu'un <iframe>.
export function getVideoEmbed(video) {
  if (!video) return null;

  const youtube = video.match(
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([\w-]+)/
  );
  if (youtube) {
    return `https://www.youtube.com/embed/${youtube[1]}`;
  }

  const vimeo = video.match(/vimeo\.com\/(\d+)/);
  if (vimeo) {
    return `https://player.vimeo.com/video/${vimeo[1]}`;
  }

  return null;
}
