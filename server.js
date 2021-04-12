const express = require('express');
const oracledb = require('oracledb');
require('dotenv').config();
const cors = require('cors');

const app = express()
app.use(cors());

async function selectAppID(req, res) {
    try {
      connection = await oracledb.getConnection({
          user: process.env.USER,
          password: process.env.PASSWORD,
          connectString: process.env.CONNECT_STRING
      });
  
      console.log('connected to database');
      const appID = req.params.id;
      result = await connection.execute(`SELECT appName FROM App WHERE appID = ${appID}`);
  
    } catch (err) {
      return res.send(err.message);
    } finally {
      if (connection) {
        try {
          await connection.close();
          console.log('close connection success');
        } catch (err) {
          console.error(err.message);
        }
      }
      if (result.rows.length == 0) {
        return res.send('Query sent no rows!');
      } else {
        return res.send(result.rows[0][0]);
      }
  
    }
  }

app.get('/api/app/:id', (req, res) => {
    console.log('attempting connection');
    selectAppID(req, res);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`))