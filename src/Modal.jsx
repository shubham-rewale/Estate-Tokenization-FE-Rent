const LoadingModal = ({ show, children }) => {
  return (
    <div
      className={`bg-black bg-opacity-50 
        justify-center items-center ${show ? "flex" : "hidden"}
        fixed top-0 left-0 h-full w-full
        `}
    >
      <div className="w-72 h-72 relative rounded-md">{show && children}</div>
    </div>
  );
};
export { LoadingModal };
