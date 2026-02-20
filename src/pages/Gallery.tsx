import { useState } from 'react';
import Layout from '../components/layout/Layout';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const milestone1Images = [
    '/assets/media/gallery/1741281393475.jpeg',
    '/assets/media/gallery/1741281405421.jpeg',
    '/assets/media/gallery/1741281405496.jpeg',
    '/assets/media/gallery/1741281405536.jpeg',
    '/assets/media/gallery/1741281407878.jpeg',
  ];

  const milestone2Images = [
    '/assets/media/gallery/PXL_20250902_170706140.PORTRAIT.ORIGINAL.jpg',
    '/assets/media/gallery/PXL_20250902_170827366.PORTRAIT.jpg',
    '/assets/media/gallery/PXL_20250902_171015838.PORTRAIT.jpg',
    '/assets/media/gallery/Snapchat-459063225 (1).jpg',
  ];

  const ImageCard = ({ src, aosDelay, fullHeight = false }: { src: string; aosDelay: string; fullHeight?: boolean }) => (
    <div
      className={`rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer ${fullHeight ? 'h-full min-h-[300px]' : 'h-64'}`}
      data-aos="fade-up"
      data-aos-delay={aosDelay}
      onClick={() => setSelectedImage(src)}
    >
      <img
        src={src}
        alt="Gallery"
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
      />
    </div>
  );

  const MilestoneSection = ({ title, images, aosDelay }: { title: string; images: string[]; aosDelay: string }) => (
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <h5
          className="text-2xl font-bold text-mainText mb-8 border-l-4 border-primary pl-4"
          data-aos="fade-right"
          data-aos-delay={aosDelay}
        >
          {title}
        </h5>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {images[0] && <ImageCard src={images[0]} aosDelay="100" />}
              {images[1] && <ImageCard src={images[1]} aosDelay="200" />}
            </div>
            {images[2] && <ImageCard src={images[2]} aosDelay="300" />}
          </div>
          <div className="lg:col-span-1">
            {images[3] && <ImageCard src={images[3]} aosDelay="400" fullHeight />}
          </div>
        </div>
        {/* Remaining images for this milestone if any */}
        {images.length > 4 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {images.slice(4).map((img, idx) => (
              <ImageCard key={idx} src={img} aosDelay="500" />
            ))}
          </div>
        )}
      </div>
    </section>
  );

  return (
    <Layout activePage="gallery">
      {/* Header / Breadcrumb */}
      <section className="bg-sectionBg2 py-10">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-bold text-mainText mb-2" data-aos="fade-down">Our Events</h1>
          <p className="text-subtext" data-aos="fade-up">Capturing memories from our journey.</p>
        </div>
      </section>

      {/* Milestone Sections */}
      <MilestoneSection title="Club Activities & Workshops" images={milestone1Images} aosDelay="300" />
      <MilestoneSection title="Community & Outreach" images={milestone2Images} aosDelay="300" />

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-50"
            onClick={() => setSelectedImage(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <img
            src={selectedImage}
            alt="Full view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
