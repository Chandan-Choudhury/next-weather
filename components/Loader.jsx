const Loader = ({ size }) => {
  return (
    <div
      className={`spinner-border text-info ${
        size === "small" ? "spinner-border-sm" : ""
      }`}
      role="status"
    >
      {/* <span className="sr-only">Loading...</span> */}
    </div>
  );
};

export default Loader;
