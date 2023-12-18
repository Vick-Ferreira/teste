const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const produtoRouter = require('./routes/produtoRoutes');
const adiminRouter = require('./routes/adiminRoutes');
const vendedorRouter = require('./routes/vendedorRoutes');

app.use('/produto', produtoRouter);
app.use('/adimin', adiminRouter);
app.use('/vendedor', vendedorRouter);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Oi express' });
});

const db_user = 'vitoria';
const db_password = encodeURIComponent('Romeu23*');

mongoose
  .connect(`mongodb+srv://${db_user}:${db_password}@api.fajqg6b.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Conectou ao MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
