import Layout from '../components/layout/Layout';

const Gallery = () => {
  return (
    <Layout activePage="gallery">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary">Gallery</h1>
        <p className="text-subtext mt-4">
          View our photos and moments
        </p>
      </div>
    </Layout>
  );
};

export default Gallery;
