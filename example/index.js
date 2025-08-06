const express = require('express');
const {ResponseDTO} = require("./dto/ResponseDTO");
const {validateBody} = require("./middleware/validateBody");
const {UserDTO} = require("./dto/UserDTO");

const app = express();

app.use(express.json());

app.post("/api/user",validateBody(UserDTO), async (req, res) => {
   let response = new ResponseDTO("Request Successful Proceeded", req.body);
   res.status(200).send(response);
});

app.listen(3000, () => console.log('Listening on port 3000'));