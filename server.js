const fs = require('fs'),
      app = require('express')(),
			compression = require('compression'),
			sapper = require('sapper'),
			static = require('serve-static'),
			helmet = require('helmet');

const { PORT = 3000 } = process.env;

// this allows us to do e.g. `fetch('/api/blog')` on the server
const fetch = require('node-fetch');
global.fetch = (url, opts) => {
	if (url[0] === '/') url = `http://localhost:${PORT}${url}`;
	return fetch(url, opts);
};

app.use(helmet());
app.use(compression({ threshold: 0 }));

app.use(static('assets'));

app.use(sapper());

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});