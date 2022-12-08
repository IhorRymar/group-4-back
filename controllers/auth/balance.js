// const { User } = require('../../models/user');

// const balance = async (req, res) => {
//   const { currentBalance } = req.body;
//   const { _id } = req.user;
//   await User.findByIdAndUpdate(
//     _id,
//     { currentBalance },
//     {
//       new: true,
//     }
//   );
//   res.json({
//     currentBalance,
//   });
// };

// module.exports = balance;

// "/api/users/balance": {
//   "put": {
//     "tags": ["Users"],
//     "summary": "Update the balance value",
//     "security": [{ "Bearer": [] }],
//     "requestBody": {
//       "description": "User balance update request body",
//       "required": true,
//       "content": {
//         "application/json": {
//           "schema": {
//             "type": "object",
//             "$ref": "#/components/schemas/UserBalanceRequest"
//           }
//         }
//       }
//     },
//     "responses": {
//       "200": {
//         "description": "Success",
//         "content": {
//           "application/json": {
//             "schema": {
//               "type": "object",
//               "$ref": "#/components/schemas/UserBalanceResponse"
//             }
//           }
//         }
//       },
//       "400": {
//         "description": "Bad request (invalid request body)",
//         "content": {}
//       },
//       "401": {
//         "description": "Unauthorized",
//         "content": {}
//       }
//     }
//   }
// },

// "UserBalanceRequest": {
//   "type": "object",
//   "required": ["currentBalance"],
//   "properties": {
//     "currentBalance": {
//       "type": "string",
//       "example": "1000"
//     }
//   }
// },
// "UserBalanceResponse": {
//   "type": "object",
//   "properties": {
//     "currentBalance": {
//       "type": "string",
//       "example": "1000"
//     }
//   }
// },
