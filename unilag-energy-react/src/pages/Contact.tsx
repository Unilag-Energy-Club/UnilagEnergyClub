import Layout from '../components/layout/Layout';

const Contact = () => {
  return (
    <Layout activePage="contact">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary">Contact Us</h1>
        <p className="text-subtext mt-4">
          Get in touch with the University of Lagos Energy Club
        </p>
      </div>
    </Layout>
  );
};

export default Contact;
