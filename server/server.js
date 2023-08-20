const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

const filePath = path.resolve(__dirname, './data/agents.json');

app.use(express.json());

app.get('/agents', (req, res) => {
  const data = fs.readFileSync(filePath, 'utf8');
  res.json(JSON.parse(data));
});

app.post('/agents', (req, res) => {
  const agents = req.body.agents;
  fs.writeFileSync(filePath, JSON.stringify({ agents }, null, 2));
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
