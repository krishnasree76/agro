const BASE_URL = "http://127.0.0.1:8000/api";

export const fetchProducts = async () => {
  const res = await fetch(`${BASE_URL}/products/`);
  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories/`);
  return res.json();
};

export const fetchGallery = async () => {
  const res = await fetch(`${BASE_URL}/gallery/`);
  return res.json();
};
