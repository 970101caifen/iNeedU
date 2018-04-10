var express = require('express');
var router=express.Router();
var upload=require('./dao/fileuploads');
var cookieParser = require('cookie-parser');
var Sql = require('./dao/Sql');
var session = require('express-session');
var app = express();
app.use(cookieParser());
app.use(session({
    secret: '433445655ddxszsfdf',
    name: 'COOKIESTORAGE',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    resave: false,   //强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false
    saveUninitialized: true,
    cookie: {maxAge: 1000*60*60*24*7 },     //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
}));
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    // res.header("Content-Type", "application/json;charset=utf-8");

   // res.header("Last-Modified",(new Date()).toUTCString());
    next();
});
app.use(express.static('public'));
//指定模板引擎
app.set("views engine", 'ejs');
//指定模板位置
app.set('views', __dirname + '/views');

var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/',function(req,res){
    res.render('login', {});
});
// var userController = require('./controller/UserController');
// // 页面跳转的接口
// app.post('/login',urlencodedParser,userController.login());
// 页面跳转的接口
app.post('/login',urlencodedParser,function(req,res){
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
});
app.get('/index',function (req, res) {
    if(req.session.loginUser){
        res.render('index', {
            loginName:{name:req.session.loginUser}
        });
    }else{
        res.redirect('/');
    }
});
app.get('/logout',function (req, res) {
    // 销毁session
    req.session.destroy();
    res.redirect('/');
});
app.get('/chart', function (req, res) {
    if(req.session.loginUser){
        var dao = new Sql();
        dao.init();
        var team_nums='select count(*) as team_nums from teams_info';
        var boy_users='select count(*) as boy_users from users_info where user_sex=0';
        var girl_users='select count(*) as girl_users from users_info where user_sex=1';
        var activities='select count(*) as activities from activity_info';
        dao.selectMore(team_nums+";"+boy_users+";"+girl_users+";"+activities,function (err,data) {
            if(!err){
                res.render('chart', {
                    loginName:{name:req.session.loginUser},
                    chartData:data
                });
            }
        });

    }else{
        res.redirect('/');
    }
});
app.get('/form-user', function (req, res) {
    if(req.session.loginUser){
        if(req.query.user_id){
            var id=req.query.user_id;
            var dao = new Sql();
            dao.init();
            var tablename='users_info';
            var where='where user_id='+id;
            dao.query('*',tablename,where,function (err,data) {
                if(data.length!=0){
                    var regester=new Date(parseInt(data[0].user_register_time));
                    var regester_time=regester.getFullYear()+'年'+(regester.getMonth()+1)+'月'+regester.getDate()+'日  '+regester.getHours()+'时'+regester.getMinutes()+'分'+regester.getSeconds()+'秒';
                    res.render('form-user',{
                        loginName:{name:req.session.loginUser},
                        returndata:data[0],
                        regester_time:regester_time
                    });
                }
                res.end();
            });
        }else{
            res.render('form-user', {
                loginName:{name:req.session.loginUser}
            });
        }
    }else{
        res.redirect('/');
    }
});
app.get('/form-amazeui', function (req, res) {
    if(req.session.loginUser){
        if(req.query.team_id){
            var id=req.query.team_id;
            var dao = new Sql();
            dao.init();
            var tablename='teams_info';
            var where='where team_id='+id;
            dao.query('*',tablename,where,function (err,data) {
                if(data.length!=0){
                    var founding = new Date(parseInt(data[0].team_founding_time));
                    var founding_time=founding.getFullYear()+'年'+(founding.getMonth()+1)+'月'+founding.getDate()+'日 ';
                    var regester=new Date(parseInt(data[0].team_regester_time));
                    var regester_time=regester.getFullYear()+'年'+(regester.getMonth()+1)+'月'+regester.getDate()+'日 ';
                    res.render('form-amazeui',{
                        loginName:{name:req.session.loginUser},
                        returndata:data[0],
                        founding_time:founding_time,
                        regester_time:regester_time
                    });
                }
                res.end();
            });
        }else{
            res.render('form-amazeui', {
                loginName:{name:req.session.loginUser}
            });
        }
    }else{
        res.redirect('/');
    }
});
app.get('/form-line', function (req, res) {
    if(req.session.loginUser){
        if(req.query.activity_id){
            var id=req.query.activity_id;
            var dao = new Sql();
            dao.init();
            var tablename='activity_info';
            var where='left join teams_info on teams_info.team_id=activity_info.team_id left join activity_category_info on activity_category_info.activity_category_id=activity_info.activity_category_id where activity_id='+id;
            dao.query('*',tablename,where,function (err,data) {
                if(data.length!=0){
                    var startdate = new Date(parseInt(data[0].activity_start_datatime));
                    var start=(startdate.getMonth()+1)+'月'+startdate.getDate()+'日 '+startdate.getHours()+':'+startdate.getMinutes()+':'+startdate.getSeconds();
                    var enddate=new Date(parseInt(data[0].activity_end_datatime));
                    var end=(enddate.getMonth()+1)+'月'+enddate.getDate()+'日 '+enddate.getHours()+':'+enddate.getMinutes()+':'+enddate.getSeconds();
                    console.log(start);
                    console.log(end);
                    res.render('form-line',{
                        loginName:{name:req.session.loginUser},
                        returndata:data[0],
                        start:start,
                        end:end
                    });
                }
                res.end();
            });
        }else{
            res.render('form-line', {
                loginName:{name:req.session.loginUser}
            });
        }
    }else{
        res.redirect('/');
    }
});
app.get('/form-news', function (req, res) {
    console.log(req.query.page);
    var page=req.query.page;
    page=(page==undefined?'1':page);
    // console.log(page);
    var returndata={};

    //定义每页显示的记录数
    var pagenum    = 10;
    if(req.session.loginUser){
        var dao = new Sql();
        dao.init();
        var selectpro='*';
        var tablename='activity_category_info';
        var where='order by activity_category_id asc limit '+(page-1)*pagenum+','+pagenum;
        // var  GetSql = 'SELECT '+selectpro+' FROM '+tablename+' '+where;
        //计算总页数
        var num='';
        var totalpage='';

        dao.query('*',tablename,'',function (err,data1) {
            if (err) {
                return;
            }
            num = data1.length;
            totalpage = Math.ceil(num / pagenum);
            dao.query(selectpro, tablename,where , function (err, data) {
                if (err) {
                    return ;
                }
                returndata.pagenum = pagenum;
                returndata.totalpage = totalpage;
                returndata.page = page;
                returndata.array = data;
                res.render('form-news', {returndata: returndata,loginName:{name:req.session.loginUser}});
            });
        });
    }else{
        res.redirect('/');
    }
});
app.get('/form-news-list', function (req, res) {
    // console.log(req.query.page);
    var page=req.query.page;
    page=(page==undefined?'1':page);
    // console.log(page);
    var returndata={};
    //定义每页显示的记录数
    var pagenum    = 10;
    if(req.session.loginUser){
        var dao = new Sql();
        dao.init();
        var selectpro='*';
        var tablename='activity_info';
        var where='left join teams_info on teams_info.team_id=activity_info.team_id order by activity_id asc limit '+(page-1)*pagenum+','+pagenum;
        // var where='left join teams_info on teams_info.team_id=activity_info.team_id where activity_state=1 order by activity_id asc limit '+(page-1)*pagenum+','+pagenum;
        // var  GetSql = 'SELECT '+selectpro+' FROM '+tablename+' '+where;
        //计算总页数
        var num='';
        var totalpage='';

        dao.query('*',tablename,'',function (err,data1) {
            if (err) {
                return;
            }
            num = data1.length;
            totalpage = Math.ceil(num / pagenum);
            dao.query(selectpro, tablename,where , function (err, data) {
                if (err) {
                    return ;
                }
                returndata.pagenum = pagenum;
                returndata.totalpage = totalpage;
                returndata.page = page;
                returndata.array = data;
                res.render('form-news-list', {returndata: returndata,loginName:{name:req.session.loginUser}});
            });
        });
    }else{
        res.redirect('/');
    }
});
app.get('/table-font-list', function (req, res) {
    // console.log(req.query.page);
    var page=req.query.page;
    page=(page==undefined?'1':page);
    // console.log(page);
    var returndata={};

    //定义每页显示的记录数
    var pagenum    = 10;
    if(req.session.loginUser){
        var dao = new Sql();
        dao.init();

        var selectpro='*';
        var tablename='teams_info';
        var where='order by team_id asc limit '+(page-1)*pagenum+','+pagenum;

        //计算总页数
        var num='';
        var totalpage='';
        dao.query('*',tablename,'',function (err,data1) {
            if (err) {
                return;
            }
            num = data1.length;
            totalpage = Math.ceil(num / pagenum);
            dao.query(selectpro, tablename, where, function (err, data) {
                    if (err) {
                        return ;
                    }
                    returndata.pagenum = pagenum;
                    returndata.totalpage = totalpage;
                    returndata.page = page;
                    returndata.array = data;
                    res.render('table-font-list', {loginName: {name: req.session.loginUser}, returndata: returndata});
            });
        });
    }else{
        res.redirect('/');
    }
});
// var getData=function(call){
//     var returndata={};
//     //开始控制显示信息的条数
//     //接收当前页数
//     // var  page       = req.query.page;
//     var  page       = 1;
//     //定义每页显示的记录数
//     var pagenum    = 10;
//     //通过LIMIT来查询当前要显示的记录
//     var dao = new Sql();
//     dao.init();
//
//     var selectpro='*';
//     var tablename='teams_info';
//     var where='limit '+(page-1)*pagenum+','+pagenum;
//     //计算总页数
//     var num='';
//     var totalpage='';
//     dao.query(selectpro,tablename,where,function (err,data) {
//         if(!err){
//             num=data.length;
//             totalpage  = Math.ceil(num/pagenum);
//
//             returndata.pagenum=pagenum;
//             returndata.totalpage=totalpage;
//             returndata.page=page;
//             returndata.array=data;
//             call(returndata);
//         }else{
//             redata = '[{"result":"err"}]';
//             call(redata);
//         }
//     });
//
app.get('/table-images-list', function (req, res) {
    // console.log(req.query.page);
    var page=req.query.page;
    page=(page==undefined?'1':page);
    // console.log(page);
    var returndata={};

    //定义每页显示的记录数
    var pagenum    = 10;
    if(req.session.loginUser){
        var dao = new Sql();
        dao.init();

        var selectpro='*';
        var tablename='users_info';
        var where='order by user_id asc limit '+(page-1)*pagenum+','+pagenum;

        //计算总页数
        var num='';
        var totalpage='';
        dao.query('*',tablename,'',function (err,data1) {
            if (err) {
                return;
            }
            num = data1.length;
            totalpage = Math.ceil(num / pagenum);
            dao.query(selectpro, tablename, where, function (err, data) {
                if (err) {
                    return ;
                }
                returndata.pagenum = pagenum;
                returndata.totalpage = totalpage;
                returndata.page = page;
                returndata.array = data;
                res.render('table-images-list', {loginName: {name: req.session.loginUser}, returndata: returndata});
            });
        });
    }else{
        res.redirect('/');
    }
});

// 业务处理的接口
// 1.处理团队注册审核
app.get('/team_through',function(req,res){
    var id=req.query.team_id;
    var statevalue=req.query.state;
    var dao = new Sql();
    dao.init();

    var tablename='teams_info';
    var updata_key='';
    var updata_value='where team_id='+id;
    if(statevalue=='allow'){
        // var dao = new Sql();
        // dao.init();
        // var updataSql = 'UPDATE '+tablename+' SET '+updata_key+' '+updata_value;
        updata_key='team_state=1';
        // var  GetSql = 'SELECT '+selectpro+' FROM '+tablename+' '+where;
        dao.updata(tablename, updata_key,updata_value , function (err, data) {
            if (!err){
                res.send('1');
            }
             res.end();
        });
    }else{
        updata_key='team_state=0';
        // var  GetSql = 'SELECT '+selectpro+' FROM '+tablename+' '+where;
        dao.updata(tablename, updata_key,updata_value , function (err, data) {
            if (!err){
                res.send('1');
            }
            res.end();
        });
    }
});
// 1.处理用户审核，激活或禁言
app.get('/user_through',function(req,res){
    var id=req.query.user_id;
    var statevalue=req.query.state;
    var dao = new Sql();
    dao.init();

    var tablename='users_info';
    var updata_key='';
    var updata_value='where user_id='+id;
    if(statevalue=='allow'){
        // var dao = new Sql();
        // dao.init();
        // var updataSql = 'UPDATE '+tablename+' SET '+updata_key+' '+updata_value;
        updata_key='user_state=1';
        // var  GetSql = 'SELECT '+selectpro+' FROM '+tablename+' '+where;
        dao.updata(tablename, updata_key,updata_value , function (err, data) {
            if (!err){
                res.send('1');
            }
            res.end();
        });
    }else{
        updata_key='user_state=0';
        // var  GetSql = 'SELECT '+selectpro+' FROM '+tablename+' '+where;
        dao.updata(tablename, updata_key,updata_value , function (err, data) {
            if (!err){
                res.send('1');
            }
            res.end();
        });
    }
});
//处理活动类型的删除
app.get('/category_delete',function(req,res){
    var id=req.query.category_id;
    var dao = new Sql();
    dao.init();
  console.log(id);
    var tablename='activity_category_info';
   var where='where activity_category_id='+id;
        // var  GetSql = 'SELECT '+selectpro+' FROM '+tablename+' '+where;
    dao.delete(tablename, where,function (err, data) {
            if (!err){
                res.send('1');
                res.end();
            }
        });

});
//处理活动类型的新增
app.post('/category_insert',upload.single('avatar'),function(req,res){
    if (req.file) {
        var dao = new Sql();
        dao.init();
        var activity_name = req.body.activity_name;
        var imgurl = req.file.filename;
        var table_value = 'activity_category_name,activity_category_img_url';
        var msg_value = '"'+activity_name+'","'+imgurl+'"';
        var tablename = 'activity_category_info';
        var where = 'where activity_category_name="'+activity_name+'"';
        dao.query('*', tablename, where, function (err, data1) {
            if (data1.length == 0) {
                dao.insert(tablename, table_value, msg_value, function (err, data) {
                    if (!err) {
                        res.redirect('/form-news');
                    }
                });
            }
        });
    }
});
module.exports=router;
//处理活动的禁用
app.get('/forbid_activity',function(req,res){
    var id=req.query.activity_id;
    var dao = new Sql();
    dao.init();
    var tablename='activity_info';
    // var updataSql = 'UPDATE '+tablename+' SET '+updata_key+' '+updata_value;
    var updata_key='activity_state=0';
    var updata_value='where activity_id='+id;
    dao.updata(tablename,updata_key,updata_value,function (err, data) {
        if (!err){
            res.send('1');
        }
        res.end();
    });
});
//处理解除活动的禁用
app.get('/allow_activity',function(req,res){
    var id=req.query.activity_id;
    var dao = new Sql();
    dao.init();
    var tablename='activity_info';
    // var updataSql = 'UPDATE '+tablename+' SET '+updata_key+' '+updata_value;
    var updata_key='activity_state=1';
    var updata_value='where activity_id='+id;
    dao.updata(tablename,updata_key,updata_value,function (err, data) {
        if (!err){
            res.send('1');
        }
        res.end();
    });
});


app.listen(8888,function(){
    console.log("服务器创建成功");
});