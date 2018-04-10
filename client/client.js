var express = require('express');
var Sql = require('./js/dao/Sql');
var app = express();
//设置跨域访问
 app.all('*', function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "X-Requested-With");
 res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
 res.header("X-Powered-By",' 3.2.1');
 res.header("Content-Type", "application/json;charset=utf-8");
 next();
 });

var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//团队注册
app.get('/team_register',urlencodedParser,function (req,res) {
    //接收传过来的值
    var team_name  = req.query.name;
    var team_leader_email=req.query.email;
    var team_byschool=req.query.school;
    var team_founding_time=req.query.founding_time;
    var team_leader_name=req.query.leader_name;
    var team_leader_tel=req.query.tel;
    var team_passwd=req.query.passwd;
    var team_introduce = req.query.team_introduce;
    var team_regester_time=new Date().getTime();
    //定义一个表名，根据用户角色判断查询哪张表
    // 0 表示个人用户， 1
    var result='';
    var tablename= 'teams_info';
    var table_value = 'team_name,team_leader_email,team_byschool,team_founding_time,team_leader_name,team_leader_tel,team_passwd,team_introduce,team_regester_time,team_state';
    var msg_value = '"'+team_name+'","'+team_leader_email+'","'+team_byschool+'","'+team_founding_time+'","'+team_leader_name+'","'+team_leader_tel+'","'+team_passwd+'","'+team_introduce+'","'+team_regester_time+'",0';
    //测试语句
    //var table_value = 'team_leader_email,team_passwd,team_state';
    //var msg_value   = ''+team_leader_email+','+team_passwd+',1';

    var dao = new Sql();
    dao.init();
    //查询判断数据库有没有此账号注册
    var where = 'where team_leader_email="'+team_leader_email+'"';
    var selectpro='team_leader_email';
    dao.query(selectpro,tablename,where,function (err,data) {
        console.log("判断账号是否存在的data: " + data);
        if (data.length == 0) {
            console.log("执行插入");
            //执行插入
            //Cannot enqueue Query after invoking quit.(插入语句打印出来没有错，可以插入，但是一直报这个错)
            dao.insert(tablename, table_value, msg_value, function (err,data1) {
                if(!err){
                    console.log('data1:'+data1)
                    result = '[{"result":"success"}]';
                }else {
                    result = '[{"result":"fail"}]';
                }
                res.write(JSON.stringify(result));
                res.end();
            });
        } else {
            //回到注册页面，进行提示
            result = '[{"result":"fail"}]';
            res.write(JSON.stringify(result));
            res.end();
        }
    });
});
//注册成功后获取团队的id
app.get('/team_id',urlencodedParser,function (req,res) {
    var team_leader_email=req.query.email;
    var where = 'where team_leader_email="'+team_leader_email+'"';
    var tablename= 'teams_info';
    var result = '';
    var selectpro='team_leader_email,team_id';
    var dao = new Sql();
    dao.init();
    dao.query(selectpro,tablename,where,function (err,data2) {
        if(!err){
            result='[{"result":"success","team_id":"'+data2[0].team_id+'"}]';
            res.write(JSON.stringify(result));
            res.end();
        }
    })
})
//获取团队信息接口
app.get('/team_msg',urlencodedParser,function (req,res) {
    //接收传过来的值

    var team_leader_email  = req.query.email;
    //定义一个表名，根据用户角色判断查询哪张表
    // 0 表示个人用户， 1表示团队
    var tablename= 'teams_info';
    var result = '';
    var dao = new Sql();
    dao.init();
    //通过账号查询信息并返回给前段页面
    var where = 'where team_leader_email="'+team_leader_email+'"';
    var selectpro='*';
    dao.query(selectpro,tablename,where,function (err,data) {
        if(!err){
            result = data;
        }else{
            result = '[{"result":"fail"}]';
        }
        console.log("用户信息："+result);
        res.write(JSON.stringify(result));
        res.end();
    });
});
//团队信息修改接口
app.get('/team_newmsg',urlencodedParser,function (req,res) {
    //接收传过来的值
    var team_name  = req.query.name;
    var team_leader_email=req.query.email;
    var team_byschool=req.query.school;
    var team_founding_time=req.query.founding_time;
    var team_leader_name=req.query.leader_name;
    var team_leader_tel=req.query.tel;
    var team_passwd=req.query.passwd;
    var team_introduce = req.query.team_introduce;
    //定义一个表名，根据用户角色判断查询哪张表
    // 0 表示个人用户， 1表示团队
    var tablename= 'teams_info';
    var result = '';
    var dao = new Sql();
    dao.init();
    //通过账号查询信息并返回给前段页面
    var where = 'where team_leader_email="'+team_leader_email+'"';
    var updata_key='team_name="'+team_name+'",team_byschool="'+team_byschool+'",team_founding_time="'+team_founding_time+'",team_leader_name="'+team_leader_name+'",team_leader_tel="'+team_leader_tel+'",team_passwd="'+team_passwd+'",team_introduce="'+team_introduce+'"';
    dao.updata(tablename,updata_key,where,function (err,data) {
        if(!err){
            result = '[{"result":"success"}]';
        }else{
            result = '[{"result":"fail"}]';
        }
        console.log("用户信息："+result);
        res.write(JSON.stringify(result));
        res.end();
    });
});
//用户注册
app.get('/user_register',urlencodedParser,function (req,res) {
    console.log(111)
    //接收传过来的值
    var user_name  = req.query.name;
    var user_email=req.query.email;
    var user_tel=req.query.tel;
    var user_passwd=req.query.passwd;
    var user_introduce=req.query.user_introduce;
    var user_regester_time=new Date().getTime();
    //定义一个表名，根据用户角色判断查询哪张表
    // 0 表示个人用户， 1
    var result='';
    var tablename= 'users_info';
    var table_value = 'user_name,user_email,user_tel,user_passwd,user_introduce,user_register_time,user_state';
    var msg_value = '"'+user_name+'","'+user_email+'","'+user_tel+'","'+user_passwd+'","'+user_introduce+'","'+user_regester_time+'",1';

    var dao = new Sql();
    dao.init();
    //查询判断数据库有没有此账号注册
    var where = 'where user_email="'+user_email+'"';
    var selectpro='user_email';
    dao.query(selectpro,tablename,where,function (err,data) {
        console.log("判断账号是否存在的data: " + data);
        if (data.length == 0) {
            console.log("执行插入");
            //执行插入
            dao.insert(tablename, table_value, msg_value, function (err,data1) {
                if(!err){
                    console.log('data1:'+data1)
                    result = '[{"result":"success"}]';
                }else {
                    result = '[{"result":"fail"}]';
                }
                res.write(JSON.stringify(result));
                res.end();
            });
        } else {
            //回到注册页面，进行提示
            result = '[{"result":"fail"}]';
            res.write(JSON.stringify(result));
            res.end();
        }
    })
});
//获取用户信息接口
app.get('/user_msg',urlencodedParser,function (req,res) {
    //接收传过来的值
    var user_email  = req.query.email;
    //定义一个表名，根据用户角色判断查询哪张表
    // 0 表示个人用户， 1表示团队
    var tablename= 'users_info';
    var result = '';
    var dao = new Sql();
    dao.init();
    //通过账号查询信息并返回给前段页面
    var where = 'where user_email="'+user_email+'"';
    var selectpro='*';
    dao.query(selectpro,tablename,where,function (err,data) {
        if(!err){
            result = data;
        }else{
            result = '[{"result":"fail"}]';
        }
        console.log("用户信息："+result);
        res.write(JSON.stringify(result));
        res.end();
    });
});
//用户信息修改接口
app.get('/user_newmsg',urlencodedParser,function (req,res) {
    console.log("开始信息修改");
    //接收传过来的值
    var user_name  = req.query.name;
    var user_email=req.query.email;
    var user_tel=req.query.tel;
    var user_passwd=req.query.passwd;
    var user_introduce=req.query.user_introduce;
    //定义一个表名，根据用户角色判断查询哪张表
    // 0 表示个人用户， 1表示团队
    var tablename= 'users_info';
    var result = '';
    var dao = new Sql();
    dao.init();
    //通过账号查询信息并返回给前段页面
    var where = ' where user_email="'+user_email+'"';
    var updata_key='user_name="'+user_name+'",user_tel="'+user_tel+'",user_passwd="'+user_passwd+'",user_introduce="'+user_introduce+'"';
    dao.updata(tablename,updata_key,where,function (err,data) {
        if(!err){
            result = '[{"result":"success"}]';
        }else{
            result = '[{"result":"fail"}]';
        }
        console.log("用户信息："+result);
        res.write(JSON.stringify(result));
        res.end();
    });
});
//登录
app.get('/login',urlencodedParser,function(req,res){
     var email=req.query.email;
     var passwd=req.query.passwd;
     var role=req.query.role;
     console.log(req.query.role)
    //定义一个表名，根据用户角色判断查询哪张表
    // 0 表示个人用户， 1
    var result='';
    var selectpro='';
    var tablename='';
    var where='';
    var dao = new Sql();
    dao.init();

    if(role==0) {
        selectpro='user_passwd,user_email,user_name';
        tablename='users_info';
        where = ' where user_email="'+email+'"';
        dao.query(selectpro,tablename,where,function (err, data) {
            console.log(data[0]);
            if(data.length == 0){
                result='[{"result":"该账号不存在"}]';
            }else{
                if(data[0].user_passwd==passwd){
                    result='[{"result":"'+data[0].user_name+'"}]';
                }else{
                    result='[{"result":"密码错误"}]';
                }
            }
            res.write(JSON.stringify(result));
            res.end();
        });
    }else {
        selectpro='team_id,team_leader_email,team_passwd,team_name,team_state';
        tablename='teams_info';
        where = ' where team_leader_email="'+email+'"';
        dao.query(selectpro,tablename,where,function (err, data) {
            console.log("团队data:"+data[0].team_passwd);
            if(data.length == 0){
                result='[{"result":"该账号不存在"}]';
            }else{
                if(data[0].team_passwd==passwd){
                    if(data[0].team_state==0){
                        result='[{"result":"账号被冻结或还没有认证"}]';
                    }else {
                        //账号密码都正确就返回团队名和团队id
                        result='[{"result":"'+data[0].team_name+'","team_id":"'+data[0].team_id+'"}]';
                    }
                }else{
                    result='[{"result":"密码错误"}]';
                }
            }
            res.write(JSON.stringify(result));
            res.end();
        });
    }
});
app.get('/category',function (req,res) {
    var dao = new Sql();
    dao.init();
    var selectpro='*';
    var tablename='activity_category_info';
    var where='';
    dao.query(selectpro,tablename,where,function (err, data) {
        //console.log(data);
        res.write(JSON.stringify(data));
        res.end();
    });
})
//发布活动接口
app.get('/release_activity',urlencodedParser,function (req,res) {
    //接收传过来的值
    var activity_title  = req.query.activity_title;
    var activitySite=req.query.activitySite;
    var activityMsg=req.query.activityMsg;
    var activityStartTime=req.query.activityStartTime;
    var activityEndTime=req.query.activityEndTime;
    var activityNeedNum=req.query.activityNeedNum
    var activityCategoryId=req.query.activityCategoryId;
    var teamEmail=req.query.teamEmail;
    var activity_create_time=new Date().getTime();
    //定义一个表名，根据用户角色判断查询哪张表
    // 0 表示个人用户， 1
    var result='';
    var tablename= 'activity_info';
    var table_value = 'activity_create_time,activity_category_id,team_id,activity_title,activity_site,activity_content,activity_start_datatime,activity_end_datatime,activity_need_numbers,activity_state';

    var dao = new Sql();
    dao.init();
    //先查到团队的id再执行关联插入
    var selectpro = 'team_id';
    var where = ' where team_leader_email="'+teamEmail+'"';
    var table = 'teams_info';
    dao.query(selectpro,table,where,function (err, data) {
        console.log("发布活动查询的data："+data);
        if(!err){
            var teamId = data[0].team_id;
            var msg_value = '"'+activity_create_time+'","'+activityCategoryId+'","'+teamId+'","'+activity_title+'","'+activitySite+'","'+activityMsg+'","'+activityStartTime+'","'+activityEndTime+'","'+activityNeedNum+'",1';
            //执行插入
            dao.insert(tablename, table_value, msg_value, function (err,data1) {
                console.log("发布活动");
                if(!err){
                    result = '[{"result":"success"}]';
                }else{
                    result = '[{"result":"fail"}]';
                }
                res.write(JSON.stringify(result));
                res.end();
            });
        }else{
            result = '[{"result":"fail"}]';
            res.write(JSON.stringify(result));
            res.end();
        }
    });
});
//获取活动接口access_activity
app.get('/access_activity',urlencodedParser,function (req,res) {
    //接收传过来的值
    var activityCategoryId=req.query.activityCategoryId;
    //定义一个表名，根据用户角色判断查询哪张表
    // 0 表示个人用户， 1
    var result='';
    var tablename= 'activity_info';
    var dao = new Sql();
    dao.init();
    //根据活动类型id查表
    var selectpro = '*';
    var where = ' where activity_category_id="'+activityCategoryId+'"';
    dao.query(selectpro,tablename,where,function (err, data) {
        console.log("查询活动查询的data："+data);
        if(!err){
            res.write(JSON.stringify(data));
            console.log(JSON.stringify(data))
        }else{
            result = '[{"result":"fail"}]';
            res.write(JSON.stringify(result));
        }
        res.end();
    });
});
//首页显示活动记录
app.get('/home_activity',function (req,res) {
    var dao = new Sql();
    dao.init();
    var selectpro='a.activity_id,a.activity_create_time,a.activity_title,a.activity_start_datatime,a.activity_need_numbers,a.activity_registration_numbers,a.team_id';
    var tablename='activity_info as a';
    var where='left join teams_info on a.team_id=teams_info.team_id';
    // var where='where a.team_id=t.team_id';
    dao.query(selectpro,tablename,where,function (err, data) {
        console.log(data);
        console.log(123);
        res.write(JSON.stringify(data));
        res.end();
    });
})
//活动详情页面数据接口
app.get('/activity_details',function (req,res) {
    var activity_id=req.query.activity_id;
    var dao = new Sql();
    dao.init();

    var selectpro='a.activity_title,activity_category_name,team_name,a.activity_site,a.activity_id,a.activity_create_time,a.activity_start_datatime,a.activity_end_datatime,a.activity_need_numbers,a.activity_registration_numbers,a.activity_content';
    var tablename='activity_info as a';
    var where='left join teams_info on a.team_id=teams_info.team_id left join activity_category_info on a.activity_category_id=activity_category_info.activity_category_id';

    // 调用查询方法
    dao.query(selectpro,tablename,where,function (err, data) {
        // console.log(data[0]);
        //如果没有该用户，就返回fail
        if(!err){
            res.write(JSON.stringify(data));
        }else{
            var result='[{"result":"fail"}]';
            res.write(JSON.stringify(result));
        }
        res.end();
    });
})
// 团队接口
app.get('/team_details',function (req,res) {
    var teamId=req.query.team_id;
    console.log(req.query+'222222')
    var dao = new Sql();
    dao.init();

    var selectpro='a.team_name,a.team_leader_email,a.team_byschool,a.team_leader_tel,a.team_founding_time,a.team_leader_name,a.team_regester_time,activity_title,activity_category_id,activity_content';
    var tablename='(SELECT * FROM teams_info where team_id ='+teamId+') as a';
    var where='left join activity_info on a.team_id=activity_info.team_id';
    //SQL语句
    // SELECT a.team_name,a.team_leader_email,a.team_byschool,a.team_leader_tel,a.team_founding_time,a.team_leader_name,a.team_regester_time,a.team_head_img_url,activity_title,activity_category_id,activity_images_url,activity_content
    // FROM (SELECT * FROM teams_info where team_id = 2) as a
    // left join activity_info on a.team_id=activity_info.team_id




    // 调用查询方法
    dao.query(selectpro,tablename,where,function (err, data) {
        // console.log(data[0]);
        //如果没有该用户，就返回fail
        if(!err){
            res.write(JSON.stringify(data));
        }else{
            var result='[{"result":"fail"}]';
            res.write(JSON.stringify(result));
        }
        res.end();
    });
})
//获取活动接口access_activity
app.get('/joinus',function (req,res) {
    //接收传过来的值
    var activity_id=req.query.activity_id;
    var email=req.query.email;
    console.log(email);
    var count=req.query.count;
    console.log(activity_id);
    var dao = new Sql();
    dao.init();
    var updataSql = 'UPDATE '+tablename+' SET '+updata_key+' '+where;

    var updata_key='activity_registration_numbers='+count;
    var tablename= 'activity_info';
    var where='where activity_id='+activity_id;
    
            // 根据email查出用户id
    dao.query('user_id','users_info','where user_email="'+email+'"',function(err,data1){
         if(data1.length!=0){
                    // var AddSql = 'INSERT INTO '+tablename+'('+table_value+') VALUES('+msg_value+')';
                    // console.log(data1[0].user_id);
                var value=data1[0].user_id+','+activity_id;
                    //判断用户是否参与过该活动
                dao.query('*','user_joined_activity','where activity_id='+activity_id+' and user_id='+data1[0].user_id,function(err,data){
                    if(data.length==0){
                        
                        // 在用户活动关系表中插入一条他们之间关系的记录
                        dao.insert('user_joined_activity','user_id,activity_id',value,function(err,data2){
                            if(!err){
                                // console.log('1234');

                                // 修改该活动中参与人数的值
                                     dao.updata(tablename,updata_key,where,function (err, data3) {
                                    // 如果修改成功，就返回一个值，前端判断后提醒用户加入成功
                                        if(!err){
                                            res.send('1');
                                        }
                                        res.end();
                                    });
                                }
                        });
                    }else{
                        res.send('0');
                        res.end();
                    }
                });  
        }
    });    
});

//获取个人用户的志愿历程数据接口
app.get('/volunteer_course',function (req,res) {
    //接收传过来的email值
    var email=req.query.email;
    console.log(email);

    var dao = new Sql();
    dao.init();

    // 根据email查出用户id
    dao.query('user_id','users_info','where user_email="'+email+'"',function(err,data1){
         if(data1.length!=0){
                    console.log(data1);
                //然后通过该id找到该用户参与过的活动，并返回给前端
                var where='left join activity_info on activity_info.activity_id=user_joined_activity.activity_id where user_id='+data1[0].user_id;
                
                dao.query('*','user_joined_activity',where,function(err,data){
                    if(!err){
                        console.log(data);
                        res.write(JSON.stringify(data));
                        res.end();
                    }

                }); 
        }
    });    
});

//获取某个活动里面参与的用户信息
app.get('/userjoinActivity_Info',function (req,res) {
    //接收传过来的email值
    var activity_id=req.query.activity_id;
    console.log(activity_id);

    var dao = new Sql();
    dao.init();

    // var tablename='select * from user_joined_activity where activity_id='+activity_id;
    var where='left join users_info on user_joined_activity.user_id=users_info.user_id where activity_id='+activity_id;
    // 根据email查出用户id
    dao.query('user_name,user_tel','user_joined_activity',where,function(err,data){
         if(data.length!=0){
                console.log(data);
                res.write(JSON.stringify(data));
                res.end(); 
        }
    });    
});
var server = app.listen(8088,function(){
    console.log("服务器创建成功");
});