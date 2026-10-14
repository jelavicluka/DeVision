import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import ScrollTopButton from '../src/components/ScrollTopButton';
import Home from '../src/components/Home';
import Services from '../src/components/Services';
import Contact from '../src/components/Contact';
import Privacy from '../src/components/Privacy';
import NotFound from '../src/components/NotFound';

export function render(pathname) {
  // Import pages directly so the saved HTML needs no Suspense reveal scripts.
  const Page = { '/': Home, '/services': Services, '/contact': Contact, '/privatnost': Privacy }[pathname] || NotFound;
  return renderToString(
    <MemoryRouter initialEntries={[pathname]}>
      <div className="app"><Navbar /><Page /><Footer /><ScrollTopButton /></div>
    </MemoryRouter>
  );
}
