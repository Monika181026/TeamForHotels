const express = require('express'),
app = express(),
cors = require('cors');
path = require('path');

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), () => console.log('Server listening on port ' + app.get('port')));

app.use(cors());
app.use(express.static(path.join(__dirname, "../FindRestaurants-frontend/dist")));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, "../FindRestaurants-frontend/dist", "index.html"));
});

