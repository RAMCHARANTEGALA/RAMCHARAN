const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Iterative
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Recursive
function factorialRecursive(n) {
  if (n <= 1) return 1;
  return n * factorialRecursive(n - 1);
}

app.post('/factorial/iterative', (req, res) => {
  const { number } = req.body;
  if (typeof number !== 'number' || number < 0 || !Number.isInteger(number)) {
    return res.status(400).json({ error: 'Please provide a valid non-negative integer.' });
  }
  res.json({ result: factorialIterative(number), method: 'iterative', number });
});

app.post('/factorial/recursive', (req, res) => {
  const { number } = req.body;
  if (typeof number !== 'number' || number < 0 || !Number.isInteger(number)) {
    return res.status(400).json({ error: 'Please provide a valid non-negative integer.' });
  }
  res.json({ result: factorialRecursive(number), method: 'recursive', number });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
