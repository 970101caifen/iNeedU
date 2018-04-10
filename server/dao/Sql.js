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
            database:'iNeedU' ,         //数据库里面的数据
            multipleStatements: true    //一次查询多条语句
    });
        //2,建立连接
        connection.connect();
    };
    this.selectMore=function (selectsql,call) {
        connection.query(selectsql, function (err, result) {
            if (err) {
                // console.log('[INSERT ERROR] - ', err.message);
            }else {
                call(err,result);
            }
        });
    };
    //插入操作           插入的表名  插入的键值对--对象
    this.insert=function (tablename,table_value,msg_value,call) {
        var AddSql = 'INSERT INTO '+tablename+'('+table_value+') VALUES('+msg_value+')';
        // console.log("插入sql:"+AddSql)
        connection.query(AddSql, function (err, result) {
            if (err) {
                // console.log('[INSERT ERROR] - ', err.message);
            }else {
                call(err,result);
            }
        });
    };
    //删除操作
    this.delete = function (tablename,where,call) {
        var deleteSql = 'DELETE FROM '+tablename+' '+where;
        // console.log(deleteSql);
        connection.query(deleteSql,function (err, result) {
            if(err){
                // console.log('[DELETE ERROR] - ',err.message);
                return;
            }else{
                call(err,result);
            }
        });
    };
    //更新操作
    this.updata=function (tablename,updata_key,updata_value,call) {
            var updataSql = 'UPDATE '+tablename+' SET '+updata_key+' '+updata_value;
            // console.log(updataSql);
            //5，更新操作
            connection.query(updataSql,function (err, result) {
                if(err){
                    // console.log('[UPDATA ERROR] - ',err.message);
                    return;
                }else{
                    call(err,result);
                }
            });
    };


    //查询操作         返回的属性  查询的表名 查询条件
    this.query=function (selectpro,tablename,where,call) {
            var  GetSql = 'SELECT '+selectpro+' FROM '+tablename+' '+where;
            // console.log(GetSql);
            connection.query(GetSql,function (err, result) {
                // console.log('sql');
                if(err){
                    // console.log('[QUERY ERROR] - ',err.message);
                    return;
                }
                call(err,result);
            });
     };
}
module.exports=Sql;