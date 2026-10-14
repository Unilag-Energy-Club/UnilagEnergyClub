import { useEffect } from 'react';
import { MEMBERSHIP_FORM_URL } from '../components/layout/Header';

// Short link for the Instagram bio: unilagenergyclub.com/apply -> membership form.
const Apply = () => {
  useEffect(() => {
    window.location.replace(MEMBERSHIP_FORM_URL);
  }, []);

  return (
    <p className="p-8 text-center">
      Redirecting to the application form…{' '}
      <a href={MEMBERSHIP_FORM_URL} className="underline">
        Click here if nothing happens
      </a>
    </p>
  );
};

export default Apply;
