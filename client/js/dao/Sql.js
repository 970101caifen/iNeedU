function Sql() {
    var connection;
    this.init=function () {
        var mysql  = require('mysql');  //调用MySQL模块
        //1，创建一个connection
         connection = mysql.createConnection({
            host     : 'localhost',       //主机 ip
            user     : 'root',            //MySQL认证用户名
            password : 'root',                //MySQL认证用户密码
            port: '3306',                 //端口号
            database:'ineedu'          //数据库里面的数据
        });
        //2,建立连接
        connection.connect();
    };
    //插入操作           插入的表名  插入的键值对--对象
    this.insert=function (tablename,table_value,msg_value,call) {
        //1,编写sql语句 users(name,email,passwd)
        var AddSql = 'INSERT INTO '+tablename+'('+table_value+') VALUES('+msg_value+')';
       // var addtable_value = [table_value];
        //var AddSql_Params =[msg_value];
        console.log("插入sql:"+AddSql)
        //2,进行插入操作
        /**
         *query，mysql语句执行的方法
         * 1，userAddSql编写的sql语句
         * 2，userAddSql_Params，sql语句中的值
         * 3，function (err, result)，回调函数，err当执行错误时，回传一个err值，当执行成功时，传回result
         */
        connection.query(AddSql, function (err, result) {
            if (err) {
                //sql语句打印出来没有错，可一直报错？
                console.log("sql......:"+AddSql)
                console.log('[INSERT ERROR] - ', err.message);
            }else {
                call(err,result);
            }

        });
        
    };
    //更新操作
    this.updata=function (tablename,updata_key,where,call) {
        var updataSql = 'UPDATE '+tablename+' SET '+updata_key+' '+where;
        console.log(updataSql);
        //5，更新操作
        connection.query(updataSql,function (err, result) {
            if(err){
                console.log('[UPDATA ERROR] - ',err.message);
                return;
            }else{
                call(err,result);
            }
        });
    };

    //查询操作         返回的属性  查询的表名 查询条件
    this.query=function (selectpro,tablename,where,call) {
            var  GetSql = 'SELECT '+selectpro+' FROM '+tablename+' '+where;
            console.log("查询sql:"+GetSql)
            /**
             *query，mysql语句执行的方法
             * 1，userAddSql编写的sql语句
             * 2，function (err, result)，回调函数，err当执行错误时，回传一个err值，当执行成功时，传回result
             */
            connection.query(GetSql,function (err, result) {
                if(err){
                    console.log('[QUERY ERROR] - ',err.message);
                    return;
                }
                call(err,result);
            });
        //connection.end();
    };

    // //5,连接结束
    // connection.release();
}
module.exports=Sql;