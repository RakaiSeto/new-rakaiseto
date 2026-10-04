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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
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
