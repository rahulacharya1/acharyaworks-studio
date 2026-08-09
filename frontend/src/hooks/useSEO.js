import { useEffect } from 'react';

const useSEO = ({ title, description, keywords, ogTitle, ogDescription, ogImage }) => {
  useEffect(() => {
    // 1. Update document title
    if (title) document.title = title;

    // 2. Helper to create or update name-based meta tags
    const updateMeta = (name, content) => {
      if (!content) return;
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // 3. Helper to create or update property-based meta tags (OG tags)
    const updateProperty = (property, content) => {
      if (!content) return;
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Apply main descriptions and keywords
    updateMeta("description", description);
    updateMeta("keywords", keywords);
    
    // Apply Open Graph (Social SEO)
    updateProperty("og:title", ogTitle || title);
    updateProperty("og:description", ogDescription || description);
    updateProperty("og:image", ogImage || "/og-image.jpg");
    updateProperty("og:url", window.location.href);

    // Apply Twitter Cards
    updateMeta("twitter:title", ogTitle || title);
    updateMeta("twitter:description", ogDescription || description);
    updateMeta("twitter:image", ogImage || "/og-image.jpg");

  }, [title, description, keywords, ogTitle, ogDescription, ogImage]);
};

export default useSEO;
