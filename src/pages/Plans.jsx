import React, { useEffect } from 'react';
import Plans from "../components/public/Plans";

const PlansPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-16">
      <Plans />
    </div>
  );
};

export default PlansPage; 