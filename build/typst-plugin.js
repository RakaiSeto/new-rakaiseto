import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { NodeCompiler } from '@myriaddreamin/typst-ts-node-compiler'

// The CV is a Typst document in content/cv/, compiled to the PDF the site
// serves. There is no checked-in PDF: public/ used to hold a hand-exported
// CV_RAKAI.pdf, and a generated file next to the hand-written ones drifts the
// moment someone edits one and forgets the other.
//
// The PDF is built from the same source in both modes:
//   npm run dev   → served straight from the dev server, recompiled per request
//   npm run build → written to dist/client/CV_RAKAI.pdf, i.e. the same URL the
//                   static deploy serves it from
const CV_SOURCE = 'content/cv/cv.typ'
const CV_OUTPUT = 'CV_RAKAI.pdf'

// One A4 page compiles and renders to PDF in ~40 ms, so a per-request compile
// in dev is simpler than a watcher and cannot serve a stale PDF: an edit is
// picked up on the next refresh, always.
export function typstCv() {
  let root
  let outDir

  const compileCv = () => {
    const compiler = NodeCompiler.create({ workspace: root })
    const mainFilePath = path.join(root, CV_SOURCE)
    const result = compiler.compile({ root, mainFilePath, inputs: {} })

    const diagnostics = result.takeDiagnostics()
    if (result.hasError() || !result.result) {
      const problems = (diagnostics?.shortDiagnostics ?? [])
        .filter((d) => d.severity === 1)
        .map((d) => `  ${path.relative(root, d.path ?? CV_SOURCE)}: ${d.message}`)
      throw new Error(`Typst could not compile ${CV_SOURCE}:\n${problems.join('\n') || '  (no diagnostics reported)'}`)
    }

    return compiler.pdf(result.result)
  }

  return {
    name: 'rakaiseto:typst-cv',
    // `enforce: 'post'` puts this after TanStack's prerender step, so the
    // compiled PDF is the last thing written to its path and always the bytes
    // the compiler produced. That matters: the prerender crawler follows the
    // site's internal links and writes what it fetched through `res.text()`,
    // which turns the PDF into a corrupt file when it is already there. The
    // `filter` in vite.config.js keeps the crawler off `.pdf` paths; writing
    // afterwards means a missed filter still cannot ship a broken download.
    enforce: 'post',
    configResolved(config) {
      root = path.resolve(config.root)
      outDir = path.resolve(config.root, config.environments.client.build.outDir)
    },
    // Dev serves the PDF from memory at the URL the pages link to. A file
    // written into public/ instead would trip Vite's watcher and reload the
    // page on every CV edit.
    configureServer(server) {
      server.middlewares.use(`/${CV_OUTPUT}`, (req, res, next) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') return next()
        try {
          const pdf = compileCv()
          res.setHeader('Content-Type', 'application/pdf')
          res.setHeader('Cache-Control', 'no-store')
          res.end(req.method === 'HEAD' ? undefined : pdf)
        } catch (error) {
          // Surface the Typst error in the terminal and in the browser rather
          // than as an opaque 500 from the middleware chain.
          server.config.logger.error(error.message)
          res.statusCode = 500
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end(error.message)
        }
      })
    },
    // Build writes the PDF into the client output directory, after the
    // prerender step (see `enforce: 'post'` above). `assertPdfIsIntact` is the
    // last thing to run on the file, so it checks what actually ships.
    buildApp: {
      order: 'post',
      async handler() {
        const pdf = compileCv()
        await mkdir(outDir, { recursive: true })
        const target = path.join(outDir, CV_OUTPUT)
        await writeFile(target, pdf)
        await assertPdfIsIntact(target, pdf.length)
        console.log(`[cv] Compiled ${CV_SOURCE} → ${path.relative(process.cwd(), target)} (${(pdf.length / 1024).toFixed(0)} KB)`)
      },
    },
  }
}

// Guards the two ways the download links break silently: the build finishing
// without the PDF next to the HTML that links to it, and something else
// rewriting the file on the way out. A PDF that has been through a UTF-8
// round-trip keeps its "%PDF" header but grows and stops opening, so the length
// check is the one that matters.
async function assertPdfIsIntact(file, expectedBytes) {
  let written
  try {
    written = await readFile(file)
  } catch {
    throw new Error(`${file} was not written — every "download cv" link on the site would 404.`)
  }
  if (!written.subarray(0, 5).toString('latin1').startsWith('%PDF-')) {
    throw new Error(`${file} is not a PDF — something overwrote the compiled CV.`)
  }
  if (written.length !== expectedBytes) {
    throw new Error(
      `${file} is ${written.length} bytes but the compiler produced ${expectedBytes} — something rewrote the compiled CV.`
    )
  }
}
