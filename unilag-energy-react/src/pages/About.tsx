import Layout from '../components/layout/Layout';

const About = () => {
  return (
    <Layout activePage="about">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary">About Us</h1>
        <p className="text-subtext mt-4">
          Learn more about the University of Lagos Energy Club
        </p>
      </div>
    </Layout>
  );
};

export default About;
