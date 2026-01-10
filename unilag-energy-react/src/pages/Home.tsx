import Layout from '../components/layout/Layout';

const Home = () => {
  return (
    <Layout activePage="home">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary">Home Page</h1>
        <p className="text-subtext mt-4">
          Welcome to the University of Lagos Energy Club
        </p>
      </div>
    </Layout>
  );
};

export default Home;
