import { defineConfig, type Plugin } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

function contactApiDevPlugin(): Plugin {
  return {
    name: 'contact-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk
          })
          req.on('end', () => {
            let parsed: Record<string, unknown> = {}
            try {
              if (body && typeof body === 'string') {
                parsed = JSON.parse(body)
              }
            } catch {
              parsed = { rawBody: body }
            }

            console.log('\n📬 [Dev Server] Contact Form Enquiry Received:')
            console.log('  Name:   ', parsed.name || 'N/A')
            console.log('  Phone:  ', parsed.phone || parsed.number || 'N/A')
            console.log('  Message:', parsed.message || 'N/A')
            console.log('  Time:   ', new Date().toLocaleString())
            console.log('-------------------------------------------')

            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(JSON.stringify({ ok: true, message: 'Enquiry received successfully' }))
          })
        } else {
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    contactApiDevPlugin(),
  ],
})

