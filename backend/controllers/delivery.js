const axios = require('axios');
require('dotenv').config();
const cors = require('cors')
const mysql = require('mysql2');
const util = require('util');


//database connection
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});



// function for payment verification table
const unverified_delivery = (req, res) => {
  const sql = `
    SELECT dd.db_name, d.delivery_id, d.cust_mobile, d.db_mobile, d.payment_mode, d.bill, d.paid_amount 
    FROM delivery d 
    JOIN db_details dd ON d.db_mobile = dd.db_mobile 
    WHERE d.payment_verify = '0'
    LIMIT 20;`; // Limiting the number of rows returned to 100

  pool.getConnection((error, connection) => {
    if (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    
    connection.query(sql, (err, result) => {
      connection.release(); // Release the database connection

      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (result.length > 0) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json({ message: 'No unverified deliveries found' });
      }
    });
  });
}





// Corrected and separated delete functions
function deleteRowByAccountId(connection, account_id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM delivery_account WHERE account_id = ?";
    connection.query(sql, [account_id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}


// Corrected payPendingPayment by accoun_id function
async function payPendingPayment(connection, account_id, newRemainingBill) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE delivery_account SET remaining_bill = ? WHERE account_id = ?";
    connection.query(sql, [newRemainingBill, account_id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function payPendingPaymentByDeliveryId(connection, delivery_id, newRemainingBill) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE delivery_account SET remaining_bill = ? WHERE delivery_id = ?";
    connection.query(sql, [newRemainingBill, delivery_id], (err, result) => { // Corrected from account_id to delivery_id
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}


async function deleteRowByDeliveryId(connection, delivery_id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM delivery_account WHERE delivery_id = ?";
    connection.query(sql, [delivery_id], (err, result) => {
      if (err) {
        console.error("Error in deleting row by delivery_id:", err);
        reject(err);
      } else {
        console.log(delivery_id + " row deleted");
        resolve();
      }
    });
  });
}


//handle pending payment options by updating 'payment_verify' = 1 in delivery table
async function paymentVerify(pool, delivery_id) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE delivery SET payment_verify = '1' WHERE delivery_id = ?";
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
      } else {
        connection.query(sql, [delivery_id], (err, result) => {
          connection.release();
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      }
    });
  });
}


// Logic for handling payments and remaining bills
async function updateRemainingBill(pool, delivery_id, cust_mobile, paid_amount, bill) {
  let connection;
  try {
    connection = await new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) {
          reject(error);
        } else {
          resolve(conn);
        }
      });
    });

    if (paid_amount >= bill) {
      let extra_amount = paid_amount - bill;
      await deleteRowByDeliveryId(connection, delivery_id);

      const delivery_accounts = await new Promise((resolve, reject) => {
        const sql1 = "SELECT account_id, remaining_bill FROM delivery_account WHERE cust_mobile = ?";
        connection.query(sql1, [cust_mobile], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

      for (let { account_id, remaining_bill } of delivery_accounts) {
        if (extra_amount >= remaining_bill) {
          await deleteRowByAccountId(connection, account_id);
          extra_amount -= remaining_bill;
        } else {
          let newRemainingBill = remaining_bill - extra_amount;
          await payPendingPaymentByDeliveryId(connection, delivery_id, newRemainingBill);
          extra_amount = 0;
          break;
        }
      }
    } 
    else {
      let newRemainingBill = bill - paid_amount;
      await payPendingPaymentByDeliveryId(connection, delivery_id, newRemainingBill);
    }
    connection.release();
  } catch (error) {
    if (connection) connection.release();
    throw error;
  }
}




// Corrected update_payment_status function
const update_payment_status = async (req, res) => {
  try {
    const { delivery_id, cust_mobile, db_mobile, payment_mode, bill, paid_amount } = req.body.paymentDetails;

    // paymentVerify function called to update payment status in delivery table
    const paymentVerified = await paymentVerify(pool, delivery_id);
    if (paymentVerified) {
      // Update the remaining bill
      try {
        await updateRemainingBill(pool, delivery_id, cust_mobile, paid_amount, bill);
        res.status(200).json({ message: 'Payment updated successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error updating remaining bill: ' + error.message });
      }
    } else {
      res.status(500).json({ message: 'Payment verification failed unexpectedly.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'An error occurred: ' + err.message });
  }
};





const delivery_done = async (req, res) => {
  const { mobile, db_mobile, pay_method, bill, payable_amount } = req.body.cloth_details;
  const currentDate = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-');
  const sql = 'INSERT INTO delivery (cust_mobile, db_mobile, payment_mode, bill, paid_amount, payment_verify, delivery_date) VALUES (?, ?, ?, ?, ?, ?, ?)';

  try {
    pool.getConnection((err, connection) => {
      connection.query(sql, [mobile, db_mobile, pay_method, bill, payable_amount, 0, currentDate], async (err, result) => {
        if (err) {
          console.log(err)
          connection.release()
          return
        }
        const lastId = result.insertId;
        console.log(lastId)
        const sql1 = "INSERT INTO delivery_account (delivery_id, cust_mobile, db_mobile, remaining_bill) VALUES (?, ?, ?, ?)";

        connection.query(sql1, [lastId, mobile, db_mobile, bill], async (err, result1) => { // Making the callback function async

          const sql2 = "UPDATE orders SET delivery_status = '1' WHERE cust_mobile=? and bill=?";
          connection.query(sql2, [mobile, bill], async (err, result2) => { // Making the callback function async

            // if payment method pay Later then automatically varify payment in delivery table only
            if (pay_method === 'pending') {
              try {
                const paymentVerified = await paymentVerify(pool, lastId); // Using lastId instead of undefined delivery_id

              } catch (error) {
                console.error("Error:", error);
                res.status(500).json({ message: 'An error occurred while processing the request.' });
              }
            }
            connection.release()
            return res.status(200).json({ message: "Delivery Successful" })
          });
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while processing the request.' });
  }
};




const fetch_delivery_details = (req, res) => {
  const delivery_details = req.body.delivery_details;
  const cust_mobile = delivery_details.mobile;

  const sqlCurrentBill = `SELECT bill FROM orders WHERE cust_mobile = ? AND delivery_status = '0'`;
  const sqlRemainingBills = `SELECT remaining_bill FROM delivery_account WHERE cust_mobile = ?`;

  pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      return res.status(500).json({ message: "Error connecting to the database" });
    }

    // Query to fetch the current bill
    connection.query(sqlCurrentBill, [cust_mobile], (error, currentBillResults) => {
      if (error) {
        connection.release();
        return res.status(500).json({ message: "Error fetching current bill" });
      }

      // Query to fetch all remaining bills
      connection.query(sqlRemainingBills, [cust_mobile], (error, remainingBillResults) => {
        connection.release(); // Release the connection after the second query

        if (error) {
          return res.status(500).json({ message: "Error fetching remaining bills" });
        }

        // Calculate the sum of remaining bills
        const totalRemainingBill = remainingBillResults.reduce((sum, row) => sum + row.remaining_bill, 0);

        // Sending response with current bill and total remaining bill
        return res.status(200).json({
          bill: currentBillResults.length > 0 ? currentBillResults[0].bill : 0,
          PreviousBill: totalRemainingBill
        });
      });
    });
  });
};



const welcome = (req, res) => {
  console.log("welcome route")
  res.send("Welcome to the delivery route");
}

const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000); // Generate 4 digit OTP
};


// place order from order.js file from frontend
// const placeorder = (req, res) => {
//   console.log("hii")
//   const { custMob, clothDetail } = req.body;
//   let bill = 0;
//   let pantPrice = 10;
//   let shirtPrice = 15;

//   // Calculate bill
//   clothDetail.forEach(item => {
//     let price = 0; // Correctly declare price here
//     if (item.clothName == "pant") {
//       price = pantPrice;
//     } else if (item.clothName == 'shirt') {
//       price = shirtPrice;
//     } else {
//       return; // Skip this item
//     }

//     const totalItemPrice = price * item.clothCount;
//     bill += totalItemPrice;
//   });

//   // SQL to insert data in orders table
//   const sql = 'INSERT INTO orders (cust_mobile, bill, delivery_status) VALUES (?, ?, 0)';

//   pool.getConnection((error, con) => {
//     if (error) {
//       console.error("Error getting connection:", error);
//       return res.status(500).json({ message: "Error getting database connection" });
//     }

//     // Start transaction
//     con.beginTransaction(err => {
//       if (err) {
//         console.error("Error starting transaction:", err);
//         con.release();
//         return res.status(500).json({ message: "Failed to start transaction" });
//       }

//       // Insert into orders table
//       con.query(sql, [custMob, bill], (err, result) => {
//         if (err) {
//           console.error("Error inserting order:", err);
//           con.rollback(() => con.release());
//           return res.status(500).json({ message: "Order not placed" });
//         }

//         const orderId = result.insertId; // Corrected variable name
//         // Prepare batch insert for cloth_details
//         const clothDetailsData = clothDetail.map(item => [orderId, item.clothName, item.clothCount]);

//         const sql1 = 'INSERT INTO cloth_details (order_id, cloth_name, cloth_count) VALUES ?'; // Corrected SQL command

//         // Insert cloth details
//         con.query(sql1, [clothDetailsData], (err, result) => {
//           if (err) {
//             console.error("Error inserting cloth details:", err);
//             con.rollback(() => con.release());
//             return res.status(500).json({ message: "Failed to insert cloth details" });
//           }

//           // Commit transaction
//           con.commit(err => {
//             if (err) {
//               console.error("Error committing transaction:", err);
//               con.rollback(() => con.release());
//               return res.status(500).json({ message: "Transaction failed" });
//             }

//             con.release(); // Correct place to release the connection
//             res.status(200).json({ message: "Order placed successfully", bill: bill });
//           });
//         });
//       });
//     });
//   });
// }

// place order from orderByVoice.js file from frontend
const placeorder = (req, res) => {
  console.log("hii")
  const { custMob,bill, clothDetail } = req.body;
  console.log(clothDetail)
 

  // SQL to insert data in orders table
  const sql = 'INSERT INTO orders (cust_mobile, bill, delivery_status) VALUES (?, ?, 0)';

  pool.getConnection((error, con) => {
    if (error) {
      console.error("Error getting connection:", error);
      return res.status(500).json({ message: "Error getting database connection" });
    }

    // Start transaction
    con.beginTransaction(err => {
      if (err) {
        console.error("Error starting transaction:", err);
        con.release();
        return res.status(500).json({ message: "Failed to start transaction" });
      }

      // Insert into orders table
      con.query(sql, [custMob, bill], (err, result) => {
        if (err) {
          console.error("Error inserting order:", err);
          con.rollback(() => con.release());
          return res.status(500).json({ message: "Order not placed" });
        }

        const orderId = result.insertId; // Corrected variable name
        // Prepare batch insert for cloth_details
        const clothDetailsData = clothDetail.map(item => [orderId, item.clothtName, item.clothCount]);

        const sql1 = 'INSERT INTO cloth_details (order_id, cloth_name, cloth_count) VALUES ?'; // Corrected SQL command

        // Insert cloth details
        con.query(sql1, [clothDetailsData], (err, result) => {
          if (err) {
            console.error("Error inserting cloth details:", err);
            con.rollback(() => con.release());
            return res.status(500).json({ message: "Failed to insert cloth details" });
          }

          // Commit transaction
          con.commit(err => {
            if (err) {
              console.error("Error committing transaction:", err);
              con.rollback(() => con.release());
              return res.status(500).json({ message: "Transaction failed" });
            }

            con.release(); // Correct place to release the connection
            res.status(200).json({ message: "Order placed successfully", bill: bill });
          });
        });
      });
    });
  });
}


const customer_pending_payment = (req, res) => {

 const sql =  `SELECT dd.db_name, da.account_id,da.cust_mobile, da.remaining_bill FROM delivery_account da JOIN db_details dd ON da.db_mobile = dd.db_mobile LIMIT 20`;

  // const sql = "select * from delivery_account";

  pool.getConnection((err, connection) => {
    if (err) {
      connection.release()
      return
    } else {
      connection.query(sql, (error, result) => {
        connection.release(); // Release connection if no rows affected
        if (result.length > 0) {
          return res.json(result);
        }
        else {
          return res.json()
        }
      });
    }

  })
}


const delete_database = (req, res) => {
  const sql1 = "DELETE FROM delivery_account";
  const sql2 = 'DELETE FROM delivery';
  const sql3 = 'DELETE FROM cloth_details';
  const sql4 = 'DELETE FROM orders';

  pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      console.error("Error getting connection:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    connection.query(sql1, (error, result1) => {
      if (error) {
        connection.release();
        console.error("Error executing SQL 1:", error);
        res.status(500).send("Internal Server Error");
        return;
      }

      connection.query(sql2, (error, result2) => {
        if (error) {
          connection.release();
          console.error("Error executing SQL 2:", error);
          res.status(500).send("Internal Server Error");
          return;
        }

        connection.query(sql3, (error, result3) => {
          if (error) {
            connection.release();
            console.error("Error executing SQL 3:", error);
            res.status(500).send("Internal Server Error");
            return;
          }

          connection.query(sql4, (error, result4) => {
            connection.release();

            if (error) {
              console.error("Error executing SQL 4:", error);
              res.status(500).send("Internal Server Error");
              return;
            }

            console.log("All queries executed successfully.");
            res.status(200).json({ message: "Database deleted successfully." }); // Send JSON response
          });
        });
      });
    });
  });
};




module.exports = {
  delete_database,
  welcome,
  // submitform,
  placeorder,
  fetch_delivery_details,
  delivery_done,
  unverified_delivery,
  update_payment_status,
  customer_pending_payment
}
