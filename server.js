const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// mongoose connection
mongoose.connect(process.env.MONGODB_ENDPOINT || 'mongodb://localhost/socialNetworkDb', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
})