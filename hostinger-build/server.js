const path = require('path')

// The standalone build is in .next/standalone
const dir = path.join(__dirname, '.next', 'standalone')

process.env.NODE_ENV = 'production'
process.chdir(dir)

const currentPort = parseInt(process.env.PORT, 10) || 3000
const hostname = process.env.HOSTNAME || '0.0.0.0'

let keepAliveTimeout = parseInt(process.env.KEEP_ALIVE_TIMEOUT, 10)

if (
  Number.isNaN(keepAliveTimeout) ||
  !Number.isFinite(keepAliveTimeout) ||
  keepAliveTimeout < 0
) {
  keepAliveTimeout = undefined
}

// Use the standalone server directly
require('./.next/standalone/server.js')