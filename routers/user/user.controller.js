const { User } = require('../../models/index');
const Sequelize = require('sequelize');

let join = (req, res) => {
    res.render('./user/join.html');
}

let login = (req, res) => {
    let flag = req.query.flag;
    res.render('./user/login.html',{flag});
};

let info = async (req, res) => {
    let userList = await User.findAll({
        // attributes: ['id', 'userid', 'userpw', 'username', 'gender', 'userimage',
        // [Sequelize.fn('date_format', Sequelize.col('userdt'), '%Y-%m-%d'), 'userdt']]
    });
    res.render('./user/info.html', {
        list: userList,
    });
    // res.json({
    //     userList,
    // });
}

let join_success = async (req, res) => {
    let userid = req.body.userid;
    let userpw = req.body.userpw;
    let username = req.body.username;
    let gender = req.body.gender;
    //let userimage = req.file.path; //req.file => 객체
    let userimage = req.file == undefined ? '' : req.file.path

    try {
        let results = await User.create({ userid, userpw, username, gender, userimage})
    } catch(e){
        console.log(e);
    }
    res.render('./user/join_success.html',{ userid, username,});
}

let login_check = async (req,res)=>{
    let userid = req.body.userid;
    let userpw = req.body.userpw;

    let result = await User.findOne({
        where:{ userid, userpw }
    });

    if(result == null){
        res.redirect('/user/login?flag=0');
    } else {
        req.session.uid = userid;
        req.session.isLogin = true;
    
        req.session.save(()=>{
            res.redirect('/');
        })
    }

}

let logout = (req,res)=>{
    delete req.session.isLogin;
    delete req.session.uid;
    req.session.save(()=>{
        res.redirect('/');
    })
}

let userid_check = async (req,res)=>{
    let userid = req.query.userid;
    let flag = false;
    let result = await User.findOne({
        where:{ userid }
    })
    //result 가 undefined면 아이디 생성가능 / defined면 불가능

    if(result == undefined){
        flag=true;
    }else{
        flag=false;
    }

    res.json({
        login:flag,
        userid,
    })
}

module.exports = {
    join: join,
    login: login,
    info: info,
    join_success:join_success,
    login_check:login_check,
    logout:logout,
    userid_check,
}