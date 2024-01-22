const express = require("express");
// const pastes = require("./data/pastes-data");
const pastesRouter = require("./pastes/pastes.router")
const userRouter = require("./users/users.router");

const app = express();
app.use(express.json());

// Pastes router
app.use("/pastes", pastesRouter)

// Users router
app.use("/users", userRouter);

// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  const {status = 500, message = "Something went wrong!"} = error;
  response.status(status).json({error: message});
});

module.exports = app;


// old - pre router
// app.get("/pastes/:pasteId", (req, res, next) => {
//   const { pasteId } = req.params; 
//   const foundPaste = pastes.find((paste) => paste.id === Number(pasteId));
// 
//   if (foundPaste) { 
//     res.status(200).json({data: foundPaste});
//   } else {
//     next({
//       status: 404,
//       message: `Paste id not found: ${pasteId}`
//     });
//   }
// });
// 
// old - pre router
// app.get("/pastes", (req, res) => {
//   res.status(200).json({data: pastes});
// });
// 
// old - pre router
// function bodyHasTextProperty(req, res, next) {
//   const { data: { text } = {} } = req.body;
//   if (text) {
//     return next(); // Call `next()` without an error message if the result exists
//   }
//   next({
//     status: 400,
//     message: "A 'text' property is required."
//   });
// }
// 
// let lastPasteId = pastes.reduce((maxId, paste) => Math.max(maxId, paste.id), 0);
// 
// app.post(
//   "/pastes",
//   bodyHasTextProperty,
//   (req, res, next) => {
//     const { data: { name, syntax, exposure, expiration, text, user_id } = {} } = req.body;
//     const newPaste = {
//       id: ++lastPasteId, // Increment last ID, then assign as the current ID
//       name,
//       syntax,
//       exposure,
//       expiration,
//       text,
//       user_id,
//     };
//     pastes.push(newPaste);
//     res.status(201).json({ data: newPaste });
//   }
// );
