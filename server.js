const { Nuxt, Builder } = require('nuxt')
const app = require('express')()


// オプションと併せて Nuxt.js をインスタンス化
const isProd = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 8081
const nuxt = new Nuxt({ dev: !isProd })

// No build in production
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build()
}

function handleRequest(req, res) {
  if (isProd) {
    res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  }

  try {
    nuxt.render(req, res);
  } catch (err) {
    console.error(err);
  }
}

app.use(handleRequest);
const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Server listening at http://${host}:${port}`);
})
