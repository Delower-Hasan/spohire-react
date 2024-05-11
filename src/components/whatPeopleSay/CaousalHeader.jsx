/* eslint-disable react/prop-types */
const CaousalHeader = ({ color }) => {
  return (
    <div>
      <div className="sayHeader">
        <p className="mb-1 mb-lg-3" style={{ color: color }}>
          What people say
        </p>
        <span className="d-block" style={{ color: color }}>
          Opinions about our Spohire and our activity
        </span>
      </div>
    </div>
  );
};

export default CaousalHeader;
