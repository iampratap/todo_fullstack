const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json())
const pass = 'octoedge';

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'todo'
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        process.exit();
    } else {
        console.log("database Connected")
    }
});

app.post('/login', (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const sql = `SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`;
    connection.query(sql, (err, result) => {
        console.log(err, result);
        if (err != null) {
            res.status(500).send({
                success: false,
                message: "Error",
                data: err
            })
        } else {
            if (result.length == 1) {
                const token = jwt.sign({
                    username: result[0].username,
                    full_name: result[0].full_name,
                    id: result[0].id
                }, pass, {
                    expiresIn: '1w'
                });

                res.status(200).send({
                    success: true,
                    message: "Login Success",
                    data: token
                })
            } else {
                res.status(404).send({
                    success: false,
                    message: "Login Failed",
                    data: result
                })
            }
        }
    });
});


app.get('/get_todo', (request, responce) => {
    const token = request.headers.authorization;
    jwt.verify(token, pass, (err, decoded) => {
        console.log(err, decoded);
        if (err) {
            responce.status(401).send({
                success: false,
                message: "Please Login again",
                data: err
            })
        } else {
            const query = `SELECT * FROM list WHERE user_id = ${decoded.id}`;
            connection.query(query, (err, result) => {
                responce.status(200).send(result);
            })
        }
    });
})

app.post('/add_task', (request, responce) => {
    const token = request.headers.authorization;
    jwt.verify(token, pass, (err, decoded) => {
        console.log(err, decoded);
        if (err) {
            responce.status(401).send({
                success: false,
                message: "Please Login again",
                data: err
            })
        } else {
            const task = request.body.task;
            const query = `INSERT INTO list (user_id, task) VALUES ('${decoded.id}', '${task}')`;
            connection.query(query, (error, result) => {
                if (error) {
                    console.log(error);
                    responce.status(500).send({
                        success: false,
                        msg: error
                    });
                } else {
                    if (result.affectedRows) {
                        responce.status(200).send({
                            success: true,
                            msg: "Task added"
                        });
                    } else {
                        responce.status(400).send({
                            success: false,
                            msg: "Task not added"
                        });
                    }
                }
            })
        }
    })
});

app.post('/done_task', (request, responce) => {
    const id = request.body.id;
    const is_done = request.body.is_done;
    const query = `UPDATE list SET is_done = '${is_done}' WHERE id = ${id}`;
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            responce.status(500).send({
                success: false,
                msg: err
            });
        } else {
            if (result.affectedRows === 1) {
                responce.status(200).send({
                    success: true,
                    msg: "Task Done"
                })
            } else {
                responce.status(400).send({
                    success: false,
                    msg: 'Error to change task status'
                });
            }
        }
    })
})

app.post('/update_task', (request, responce) => {
    const id = request.body.id;
    const task = request.body.task;
    const query = `UPDATE list SET task = '${task}' WHERE id = ${id}`;
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            responce.status(500).send({
                success: false,
                msg: err
            });
        } else {
            if (result.affectedRows === 1) {
                responce.status(200).send({
                    success: true,
                    msg: "Task Updated"
                })
            } else {
                responce.status(400).send({
                    success: false,
                    msg: 'Error to update task'
                });
            }
        }
    })
})

app.post('/delete_task', (request, responce) => {
    const id = request.body.id;
    const query = `DELETE FROM list WHERE id = ${id}`;
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            responce.status(500).send({
                success: false,
                msg: err
            });
        } else {
            if (result.affectedRows === 1) {
                responce.status(200).send({
                    success: true,
                    msg: "Task Deleted"
                })
            } else {
                responce.status(400).send({
                    success: false,
                    msg: 'Error to Delete task'
                });
            }
        }
    })
})

app.listen(5000, () => { console.log('app is running on port 5000') })