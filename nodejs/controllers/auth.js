const util = require('util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const mysql = require('mysql');
const promisify = util.promisify;
const db = mysql.createConnection({
    host: process.env.DATABSE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req,res)=>{
    console.log(req.body);

    const{name, email, password, passwordConfirm} = req.body;
    db.query('SELECT email FROM users WHERE email = ?', [email],async (error,result) =>{
        if (error){
            console.log(error);
        }
        if (result.length > 0){
            return res.render('register',{
                message: 'This email is already registered'
            }
    )}
        else if(password != passwordConfirm){
            return res.render('register',{
                message: 'Passwords do not match'
            });
        }

        let hashPassword = await bcrypt.hash(password,8);
        console.log(hashPassword);


        db.query('INSERT INTO users SET ?',{username:name, email:email, password:hashPassword}, (error, result) =>{
            if(error){
                console.log(error);
            }
            else{
                console.log(result);
                return res.render('register',{
                    message:'User registration successful'
                });
            }
        })
    });
}

exports.login = async (req,res) =>{
    try{
        const{email, password} = req.body;

        if( !email || !password ){
            return res.status(400).render('login',{
                message:'Please provide an email and password'
            })
    }
    db.query('SELECT * FROM users WHERE email = ?',[email],async(error, result) =>{
        console.log(result);
        if(!result || !(await bcrypt.compare(password,result[0].password))){
            res.status(401).render('login',{
                message: 'Email or Password is incorrect'
            })
             
        }else{
            const id = result[0].id;

            const token = jwt.sign({id},process.env.JWT_SECRET,{
                expiresIn: process.env.JWT_EXPIRES_IN
            });
            console.log("The token is: " + token);

            const cookieOptions = {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 *60 * 60 * 1000),
                httpOnly:true
            }
            res.cookie('jwt',token, cookieOptions);
            res.status(200).redirect('/profile'); 
        }

    })
}catch(error) {
    console.log(error); 
} 
}

exports.logout = async (req, res) =>{
    res.cookie('jwt','logout',{
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    });

    res.status(200).redirect('/');
}

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // Promisify the jwt.verify function
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

            console.log(decoded);
           
            db.query('SELECT * FROM users WHERE id =?',[decoded.id],(error,result) => {
                console.log(result);

                if (!result){
                    return next();
                }
                req.user = result[0];
                console.log("user is")
                console.log(req.user);
                return next();
            });
        }catch (error) {
            console.log(error);
            return next();
    } 
}else{
    next();
}

}