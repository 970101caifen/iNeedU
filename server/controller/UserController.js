/**
 * Created by Administrator on 2018/3/29.
 */

exports.login=function (req,res) {
    var email=req.body.email;
    var passwd=req.body.passwd;
    var selectpro='*';
    var tablename='admin_info';
    var where='';
    var dao = new Sql();
    dao.init();
    dao.query(selectpro,tablename,where,function (err, data) {
        if(data[0].admin_email==email&&data[0].admin_passwd==passwd){
            // 用户登录成功，设置session
            req.session.loginUser = data[0].admin_name;
            // 返回用户名
            res.render('index', {loginName:{name:req.session.loginUser}});
        }else{
            res.redirect('/');
        }
    });
};