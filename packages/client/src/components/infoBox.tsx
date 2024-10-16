import React from 'react';

type Props = {
  label: string
}

const InfoBox: React.FC<Props>= ({ label }) => {
  return(
    <div className="container">
      <div className="box">
        <h4 className="text-center">{label}</h4>
      </div>
    </div>
  );
};

export default InfoBox;
