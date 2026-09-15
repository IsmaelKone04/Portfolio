import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from './ui/carousel';
import { getVideoEmbed } from '../lib/media';

// Lightbox d'un projet : galerie d'images (carousel) et, si renseignée, une
// vidéo de démo — fichier local lu nativement, ou lien YouTube/Vimeo embarqué.
const ProjectGallery = ({ project, open, onOpenChange }) => {
  const images = project.images || [];
  const embedUrl = getVideoEmbed(project.video);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
        </DialogHeader>

        {images.length > 0 && (
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem key={index}>
                  <img
                    src={src}
                    alt={`${project.title} — capture ${index + 1}`}
                    className="w-full max-h-[70vh] object-contain rounded-lg bg-gray-100"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        )}

        {project.video && (
          <div className={images.length > 0 ? 'mt-4' : undefined}>
            {embedUrl ? (
              <div className="relative w-full aspect-video">
                <iframe
                  src={embedUrl}
                  title={`Démo vidéo — ${project.title}`}
                  className="absolute inset-0 w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <video
                src={project.video}
                controls
                className="w-full max-h-[70vh] rounded-lg bg-black"
              />
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectGallery;
