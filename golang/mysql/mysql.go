package mysql

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

// var file1, _ = os.OpenFile("../log/log error"+time.Now().Format("2006-01-02")+".log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)

var u struct {
	uid        int64 //学号作为主键
	u_name     string
	u_password string
	u_id       string //身份证号
	class      string
	Date       string //Date学生表示入学日期，教师表示入职日期，管理员表示创建日期
	level      int64  //级别，1级表示学生，2级表示教师，3级表示管理员
}

var c struct {
	courseid   int64
	coursename string
	uid        int64
	stime      int64
	u_name     string
}

var cost struct {
	costid      int64
	uid         int64
	costcontent string
	cost        int64
	deadline    string
	isok        int64
}

var class struct {
	classid   int64
	classname string
	yuan      int64
}

func Checkp(uid int64, s string) (b bool) {
	sqlStr := "select * from users where uid=?"
	_ = db.QueryRow(sqlStr, uid).Scan(&u.uid, &u.Date, &u.u_name, &u.u_password, &u.u_id, &u.class, &u.level)
	// _ = db.QueryRow(sqlStr, uid).Scan(&u.uid, &u.u_password)
	// fmt.Printf("%#v", temp)
	if u.u_password == s {
		return true
	} else {
		return false
	}
}

func Getinfo(uid int64) (Date, name, p, u_id, class string, level int64) {
	sqlStr := "select * from users where uid=?"
	_ = db.QueryRow(sqlStr, uid).Scan(&u.uid, &u.Date, &u.u_name, &u.u_password, &u.u_id, &u.class, &u.level)
	return u.Date, u.u_name, u.u_password, u.u_id, u.class, u.level
}

func Getuser() (uid []int64, Date, name, p, u_id, class []string, level []int64) {
	var uuid []int64
	var date []string
	var uname []string
	var up []string
	var uu_id []string
	var uclass []string
	var ulevel []int64
	sqlStr := "select * from users"
	rows, err := db.Query(sqlStr)
	if err != nil {
		fmt.Printf("%#v", err)
		return uuid, date, uname, up, uu_id, uclass, ulevel
	}
	for rows.Next() {
		_ = rows.Scan(&u.uid, &u.Date, &u.u_name, &u.u_password, &u.u_id, &u.class, &u.level)
		// fmt.Printf("%v,%v,%v,%v,%v,%v,%v", u.uid, u.Date, u.u_name, u.u_password, u.u_id, u.class, u.level)
		uuid = append(uuid, u.uid)
		date = append(date, u.Date)
		uname = append(uname, u.u_name)
		up = append(up, u.u_password)
		uu_id = append(uu_id, u.u_id)
		uclass = append(uclass, u.class)
		ulevel = append(ulevel, u.level)
	}
	return uuid, date, uname, up, uu_id, uclass, ulevel
}

func init() {
	var err error
	dsn := "root:SUIbianla123@tcp(127.0.0.1:3306)/users"
	db, err = sql.Open("mysql", dsn)
	if err != nil {
		fmt.Printf("%#v", err)
	}
	err = db.Ping()
	if err != nil {
		fmt.Printf("%#v", err)
	}
}

func Insert(uid int64, Date, name, p, u_id, class string, level int64) (err error) {
	sqlStr := "insert into users(uid,Date,u_name,u_password,u_id,class,level) values(?,?,?,?,?,?,?)"
	_, err = db.Exec(sqlStr, uid, Date, name, p, u_id, class, level)
	if err != nil {
		return err
	}
	return nil
}

func Deleteuser(uid int64) (err error) {
	sqlStr := "delete from users where uid=?"
	_, err = db.Exec(sqlStr, uid)
	if err != nil {
		return err
	}
	return nil
}

func Edituser(uid int64, name, p, u_id string) (err error) {
	sqlStr := "update users set u_password=?,u_name=?,u_id=? where uid=?"
	_, err = db.Exec(sqlStr, p, name, u_id, uid)
	if err != nil {
		return err
	}
	return nil
}

func Viewcourse() (ccourseid []int64, ccoursename, uuname []string, sstime []int64) {
	sqlStr := "select courseid,coursename,u_name,studytime from courses INNER JOIN users ON courses.uid=users.uid"
	rows, err := db.Query(sqlStr)
	var courseid []int64
	var coursename []string
	var uname []string
	var stime []int64
	if err != nil {
		fmt.Printf("%#v", err)
		return courseid, coursename, uname, stime
	}
	for rows.Next() {
		_ = rows.Scan(&c.courseid, &c.coursename, &c.u_name, &c.stime)
		courseid = append(courseid, c.courseid)
		coursename = append(coursename, c.coursename)
		uname = append(uname, c.u_name)
		stime = append(stime, c.stime)
	}
	return courseid, coursename, uname, stime
}

func Selectcourse(uid, cid int64) (err error) {
	sqlStr := "INSERT INTO selcourse(uid,courseid) VALUES(?,?)"
	_, err = db.Exec(sqlStr, uid, cid)
	if err != nil {
		return err
	}
	return nil
}

func Scourse(uid int64) (ccourseid []int64, ccousename []string, sstime []int64) {
	sqlStr := "select selcourse.courseid,coursename,studytime from selcourse INNER JOIN courses ON courses.courseid=selcourse.courseid and selcourse.uid=?"
	rows, err := db.Query(sqlStr, uid)
	var courseid []int64
	var coursename []string
	var stime []int64
	if err != nil {
		fmt.Printf("%#v", err)
		return courseid, coursename, stime
	}
	for rows.Next() {
		_ = rows.Scan(&c.courseid, &c.coursename, &c.stime)
		courseid = append(courseid, c.courseid)
		coursename = append(coursename, c.coursename)
		stime = append(stime, c.stime)
	}
	return courseid, coursename, stime
}

func Cancelcourse(uid, cid int64) (err error) {
	sqlStr := "delete from selcourse where uid=? AND courseid=?"
	_, err = db.Exec(sqlStr, uid, cid)
	if err != nil {
		return err
	}
	return nil
}

func Addcourse(cname string, uid, stime int64) (err error) {
	sqlStr := "INSERT INTO courses(coursename,uid,studytime) VALUES(?,?,?);"
	_, err = db.Exec(sqlStr, cname, uid, stime)
	if err != nil {
		return err
	}
	return nil
}

func Getcost(uid int64) (ccostid []int64) {
	sqlStr := "select costid from cost where uid=?"
	rows, err := db.Query(sqlStr, uid)
	var costid []int64
	if err != nil {
		fmt.Printf("%#v", err)
		return costid
	}
	for rows.Next() {
		_ = rows.Scan(&cost.costid)
		costid = append(costid, cost.costid)
	}
	return costid
}

func Getcostdetail(costid int64) (ccostcontent string, ccostfees int64, ccostdeadline string, ccsotisok int64) {
	sqlStr := "select costcontent,cost,deadline,isok from cost where costid=?"
	_ = db.QueryRow(sqlStr, costid).Scan(&cost.costcontent, &cost.cost, &cost.deadline, &cost.isok)
	return cost.costcontent, cost.cost, cost.deadline, cost.isok
}

func Addcost(uid, costid int64) (err error) {
	sqlStr := "UPDATE cost set isok=1 where uid=? AND costid=?"
	_, err = db.Exec(sqlStr, uid, costid)
	if err != nil {
		return err
	}
	return nil
}

func Givegrade(uid int64) (ccoursename, uusername []string) {
	sqlStr := "select a.coursename,c.u_name from courses a,selcourse b,users c where a.courseid=b.courseid AND a.uid=? AND b.uid=c.uid"
	rows, err := db.Query(sqlStr, uid)
	var coursename []string
	var username []string
	if err != nil {
		return coursename, username
	}
	for rows.Next() {
		_ = rows.Scan(&c.coursename, &u.u_name)
		coursename = append(coursename, c.coursename)
		username = append(username, u.u_name)
	}
	return coursename, username
}

func Addgrade(coursename, uname string, grade int64) (err error) {
	sqlStr := " INSERT INTO grade(uid,courseid,grade) VALUES((select users.uid from users,courses where coursename=? AND u_name=?),(select courseid from users,courses where coursename=? AND u_name=?),?)"
	_, err = db.Exec(sqlStr, coursename, uname, coursename, uname, grade)
	if err != nil {
		return err
	}
	return nil
}

func Viewgrade(uid int64) (ccoursename []string, ggrade []int64) {
	sqlStr := "SELECT coursename,grade FROM courses,grade where grade.uid=? AND courses.courseid=grade.courseid"
	rows, err := db.Query(sqlStr, uid)
	var g int64
	var coursename []string
	var grade []int64
	if err != nil {
		return coursename, grade
	}
	for rows.Next() {
		_ = rows.Scan(&c.coursename, &g)
		coursename = append(coursename, c.coursename)
		grade = append(grade, g)
	}
	return coursename, grade
}

func Viewcost(uid int64) (ccoursename []string, ggrade []int64) {
	sqlStr := "select costid,costcontent from cost where uid=? AND isok=1"
	rows, err := db.Query(sqlStr, uid)
	var costname []string
	var costid []int64
	if err != nil {
		return costname, costid
	}
	for rows.Next() {
		_ = rows.Scan(&cost.costid, &cost.costcontent)
		costname = append(costname, cost.costcontent)
		costid = append(costid, cost.costid)
	}
	return costname, costid
}

func Getclass() (cclassid []int64, cclassname []string) {
	sqlStr := "select class,classname from classes"
	rows, err := db.Query(sqlStr)
	var classname []string
	var classid []int64
	if err != nil {
		return classid, classname
	}
	for rows.Next() {
		_ = rows.Scan(&class.classid, &class.classname)
		classname = append(classname, class.classname)
		classid = append(classid, class.classid)
	}
	return classid, classname
}

func Addcostinfo(costcontent string, classid int64, costdeadline string, costfees int64) (err error) {
	sqlStr := "select users.uid from users where class=?"
	rows, err := db.Query(sqlStr, classid)
	if err != nil {
		return err
	}
	for rows.Next() {
		_ = rows.Scan(&u.uid)
		sqlStr2 := "INSERT INTO cost(uid,costcontent,cost,deadline,isok) VALUES(?,?,?,?,0)"
		_, err = db.Exec(sqlStr2, u.uid, costcontent, costfees, costdeadline)
		if err != nil {
			return err
		}
	}
	return nil

}
