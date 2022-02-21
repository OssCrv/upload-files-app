const app = require('./app/server.config');

const port = app.get('port')

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
