import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import PageShell from '../components/PageShell.jsx'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import NotFound from '../components/NotFound.jsx'
import appCss from '../index.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'theme-color', content: '#09090b' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ],
  }),
  shellComponent: RootDocument,
  component: RootComponent,
  notFoundComponent: NotFound,
})

// App chrome shared by every route — the ambient background, custom cursor,
// nav and footer. Routes render into the Outlet.
function RootComponent() {
  return (
    <PageShell>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </PageShell>
  )
}

function RootDocument({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
