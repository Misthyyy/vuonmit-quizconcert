import React, { useEffect } from "react";

const NoAccessPage: React.FC = () => {
  useEffect(() => {
    const handleBackButton = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  return (
    <div className="min-h-screen p-4 relative flex flex-col items-center justify-center text-center">
      <div className="dialogue-box bg-white p-4 rounded-lg shadow-lg max-w-md">
        <p>
          Tính ăn gian hả? <br />
          Làm dị mà coi được
        </p>
      </div>
      <img
        src=".\public\img\no-access.png"
        alt="No Access"
        className="no-access-image"
      />
    </div>
  );
};

export default NoAccessPage;
