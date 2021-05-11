const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const multer = require('multer');
const path = require('path');


/* 걍 외우자 */
const upload = multer({
    storage: multer.diskStorage({
        destination:function(req,file,callback){
            callback(null,'uploads/') // uploads => 폴더명
        },
        filename:function(req,file,callback){
            callback(null,new Date().valueOf() + path.extname(file.originalname)) //파일이름을 어떻게 저장할 건지
        }
    }),
});

router.use('/join',controller.join);
router.use('/login',controller.login);
router.get('/logout',controller.logout);
router.use('/info',controller.info);
router.post('/join_success',upload.single('img'),controller.join_success);
router.post('/login_check',controller.login_check);
router.get('/userid_check',controller.userid_check);

module.exports = router;


/*
nunjucks 구문

{% for[받을 변수] in [반복할배열] %}
{% endfor %}

{% if [조건] %}
    html태그 가능
{% else %}
    html태그 가능
{% endif %}


{{}} == 출력용
{%%} == 언어용
*/