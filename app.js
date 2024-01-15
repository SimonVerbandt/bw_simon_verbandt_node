import express from 'express';
import { urlencoded, json } from 'body-parser';
import { createConnection } from 'mysql';

const app = express();
const port = 3000;

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  database: 'laravel',
});

connection.connect();

app.use(urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });

app.use(json());

app.get('/contact-forms', (req, res) => {
  connection.query('SELECT * FROM contact_forms', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/contact-forms/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM contact_forms WHERE id = ?', [id], (error, results) => {
    if (error) throw error;
    res.json(results[0]);
  });
});

app.post('/contact-forms', (req, res) => {
  const form = req.body;
  connection.query('INSERT INTO contact_forms SET ?', form, (error, results) => {
    if (error) throw error;
    res.json({ id: results.insertId, ...form });
  });
});

app.put('/contact-forms/:id', (req, res) => {
  const { id } = req.params;
  const form = req.body;
  connection.query('UPDATE contact_forms SET ? WHERE id = ?', [form, id], (error) => {
    if (error) throw error;
    res.json({ id, ...form });
  });
});

app.delete('/contact-forms/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM contact_forms WHERE id = ?', [id], (error) => {
    if (error) throw error;
    res.json({ message: 'Record deleted successfully' });
  });
});

app.get('/faqs', (req, res) => {
  connection.query('SELECT * FROM faqs', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/faqs/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM faqs WHERE id = ?', [id], (error, results) => {
    if (error) throw error;
    res.json(results[0]);
  });
});

app.post('/faqs', (req, res) => {
  const faq = req.body;
  connection.query('INSERT INTO faqs SET ?', faq, (error, results) => {
    if (error) throw error;
    res.json({ id: results.insertId, ...faq });
  });
});

app.put('/faqs/:id', (req, res) => {
  const { id } = req.params;
  const updatedFaq = req.body;
  connection.query('UPDATE faqs SET ? WHERE id = ?', [updatedFaq, id], (error) => {
    if (error) throw error;
    res.json({ id, ...updatedFaq });
  });
});

app.delete('/faqs/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM faqs WHERE id = ?', [id], (error) => {
    if (error) throw error;
    res.json({ message: 'Record deleted successfully' });
  });
});
