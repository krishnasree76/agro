import { Navigate } from "react-router-dom";

const Gallery = () => {
  // Since gallery is now part of the Home page,
  // visiting /gallery will redirect back to home
  return <Navigate to="/" replace />;
};

export default Gallery;
