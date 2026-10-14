import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMeta, renderSeoTags } from '../seo';

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    // The build supplies these tags in the initial HTML; keep them in sync on SPA navigation.
    const fragment = document.createElement('template');
    fragment.innerHTML = renderSeoTags(getPageMeta(pathname));
    document.head.querySelectorAll('title, link[rel="canonical"], meta[name="description"], meta[name="robots"], meta[name^="twitter:"], meta[property^="og:"], #structured-data')
      .forEach((element) => element.remove());
    document.head.appendChild(fragment.content);
  }, [pathname]);
  return null;
}
