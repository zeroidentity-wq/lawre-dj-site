export default (ctx) => {
  const file = ctx?.file ?? ''
  const isPayloadUi =
    file.includes('@payloadcms') ||
    file.replace(/\\/g, '/').includes('/node_modules/')
  if (isPayloadUi) {
    return { plugins: {} }
  }
  return {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
}
