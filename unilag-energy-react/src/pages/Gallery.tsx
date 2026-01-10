import Layout from '../components/layout/Layout';

const Gallery = () => {
  const UploadIcon = () => (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M14.2499 15.8333C15.9988 15.8333 17.4166 14.4156 17.4166 12.6667C17.4166 10.9178 15.9988 9.5 14.2499 9.5C12.501 9.5 11.0833 10.9178 11.0833 12.6667C11.0833 14.4156 12.501 15.8333 14.2499 15.8333Z"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5834 3.16675H14.2501C6.33341 3.16675 3.16675 6.33341 3.16675 14.2501V23.7501C3.16675 31.6667 6.33341 34.8334 14.2501 34.8334H23.7501C31.6667 34.8334 34.8334 31.6667 34.8334 23.7501V15.8334"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g opacity="0.4">
        <path
          d="M28.5 12.6667V3.16675L31.6667 6.33341"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28.4999 3.16675L25.3333 6.33341"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        opacity="0.4"
        d="M4.22754 30.0042L12.0334 24.7634C13.2842 23.9242 15.0892 24.0192 16.2134 24.9851L16.7359 25.4442C17.9709 26.5051 19.9659 26.5051 21.2009 25.4442L27.7875 19.7917C29.0225 18.7309 31.0175 18.7309 32.2525 19.7917L34.8334 22.0084"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const UploadBox = ({ aosDelay, fullHeight = false }: { aosDelay: string; fullHeight?: boolean }) => (
    <div 
      className={`bg-white border border-border rounded-xl p-8 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:shadow-lg ${fullHeight ? 'h-full' : ''}`}
      data-aos="fade-down"
      data-aos-delay={aosDelay}
    >
      <div className="text-secondary">
        <UploadIcon />
      </div>
      <span className="text-secondary font-medium text-lg">Upload photo</span>
      <span className="text-subtext text-sm">accepted formats: jpeg, pdf, png</span>
    </div>
  );

  const MilestoneSection = ({ title, aosDelay }: { title: string; aosDelay: string }) => (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h5 
          className="text-2xl font-semibold text-mainText mb-6" 
          data-aos="fade-right" 
          data-aos-delay={aosDelay}
        >
          {title}
        </h5>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <UploadBox aosDelay="400" />
              <UploadBox aosDelay="500" />
            </div>
            <UploadBox aosDelay="600" />
          </div>
          <div className="lg:col-span-1">
            <UploadBox aosDelay="500" fullHeight />
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <Layout activePage="gallery">
      {/* Back Link */}
      <section className="bg-sectionBg2 py-5">
        <div className="container mx-auto px-4 lg:px-8">
          <a href="#" className="inline-flex items-center gap-4 text-mainText hover:text-primary transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>
            <span className="text-xl font-semibold">Projects</span>
          </a>
        </div>
      </section>

      {/* Milestone Sections */}
      <MilestoneSection title="Milestone 1" aosDelay="300" />
      <MilestoneSection title="Milestone 2" aosDelay="300" />
    </Layout>
  );
};

export default Gallery;
