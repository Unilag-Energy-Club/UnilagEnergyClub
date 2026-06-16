import Layout from '../components/layout/Layout';
import ET360Hero from '../components/et360/ET360Hero';
import ET360About from '../components/et360/ET360About';
import ET360Timeline from '../components/et360/ET360Timeline';
import ET360Schedule from '../components/et360/ET360Schedule';
/* We will add the ET360Tutors component later when we have the tutors' information. */
// import ET360Tutors from '../components/et360/ET360Tutors';
import ET360Sponsors from '../components/et360/ET360Sponsors';
import ET360Registration from '../components/et360/ET360Registration';

const ET360 = () => {
  return (
    <Layout activePage="et360">
      <ET360Hero />
      <ET360About />
      <ET360Timeline />
      <ET360Schedule />
      {/* <ET360Tutors /> */}
      <ET360Sponsors />
      <ET360Registration />
    </Layout>
  );
};

export default ET360;
