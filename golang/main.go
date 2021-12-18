package main

import (
	"dream/mysql"
	// "fmt"
	"github.com/gin-gonic/gin"
	"strconv"
	"time"
)

type msg struct {
	Date, Uname, Up, Uu_id, Uclass string
	Uuid, Ulevel                   int64
}

type cmsg struct {
	Courseid, Stime   int64
	Coursename, Uname string
}

type costmsg struct {
	Costid, Uid, Cost int64
	Costcontent       string
}

type givegrademsg struct {
	Coursename, Uname string
}

type viewgrademsg struct {
	Coursename string
	Grade      int64
}

type classmsg struct {
	Classid   int64
	Classname string
}

func main() {
	router := gin.Default()
	var v1 = router.Group("/api/v1")
	// v1.GET("/get", get)
	v1.GET("/login", func(c *gin.Context) {
		uid, err := strconv.ParseInt(c.Query("uid"), 10, 64)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
			return
		}
		if mysql.Checkp(uid, c.Query("upassword")) {
			Date, name, _, u_id, class, level := mysql.Getinfo(uid)
			c.JSON(200, gin.H{
				"uid":     uid,
				"message": "OK",
				"status":  200,
				"Date":    Date,
				"name":    name,
				"u_id":    u_id,
				"class":   class,
				"level":   level,
			})
		} else {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		}
	})
	v1.GET("register", func(c *gin.Context) {
		uid, err := strconv.ParseInt(c.Query("uid"), 10, 64)
		mysql.Insert(uid, time.Now().Format("2006/01/02 15:04"), c.Query("uname"), c.Query("upassword"), c.Query("u_id"), "", 1)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
			return
		} else {
			c.JSON(200, gin.H{
				"message": "OK",
				"status":  200,
			})
		}
	})
	v1.GET("getuser", func(c *gin.Context) {
		// var uuid []int64
		// var date []string
		// var uname []string
		// var up []string
		// var uu_id []string
		// var uclass []string
		// var ulevel []int64
		uuid, date, uname, up, uu_id, uclass, ulevel := mysql.Getuser()
		// uuid, _, _, _, _, _, _ := mysql.Getuser()
		// c.JSON(200, gin.H{
		// 	"uuid":   uuid,
		// 	"date":   date,
		// 	"uname":  uname,
		// 	"up":     up,
		// 	"uu_id":  uu_id,
		// 	"uclass": uclass,
		// 	"ulevel": ulevel,
		// })
		var data []msg
		for i := 0; i < len(uuid); i = i + 1 {
			temp := msg{
				Date:   date[i],
				Uname:  uname[i],
				Up:     up[i],
				Uu_id:  uu_id[i],
				Uclass: uclass[i],
				Uuid:   uuid[i],
				Ulevel: ulevel[i],
			}
			data = append(data, temp)
		}
		c.JSON(200, data)
	})
	v1.GET("edituser", func(c *gin.Context) {
		uid, err := strconv.ParseInt(c.Query("uid"), 10, 64)
		mysql.Edituser(uid, c.Query("uname"), c.Query("upassword"), c.Query("u_id"))
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
			return
		} else {
			c.JSON(200, gin.H{
				"message": "OK",
				"status":  200,
			})
		}
	})
	v1.GET("deleteuser", func(c *gin.Context) {
		uid, err := strconv.ParseInt(c.Query("uid"), 10, 64)
		mysql.Deleteuser(uid)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		} else {
			c.JSON(200, gin.H{
				"message": "OK",
				"status":  200,
			})
		}
	})
	v1.GET("viewcourse", func(c *gin.Context) {
		courseid, coursename, uname, stime := mysql.Viewcourse()
		var data []cmsg
		for i := 0; i < len(courseid); i = i + 1 {
			temp := cmsg{
				Courseid:   courseid[i],
				Stime:      stime[i],
				Coursename: coursename[i],
				Uname:      uname[i],
			}
			// fmt.Printf("%v", temp)
			data = append(data, temp)
		}
		c.JSON(200, data)
	})
	v1.GET("selectcourse", func(c *gin.Context) {
		uid, err := strconv.ParseInt(c.Query("uid"), 10, 64)
		cid, err := strconv.ParseInt(c.Query("cid"), 10, 64)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		}
		err = mysql.Selectcourse(uid, cid)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		} else {
			c.JSON(200, gin.H{
				"message": "OK",
				"status":  200,
			})
		}
	})
	v1.GET("scourse", func(c *gin.Context) {
		uid, err := strconv.ParseInt(c.Query("uid"), 10, 64)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		}
		courseid, coursename, stime := mysql.Scourse(uid)
		var data []cmsg
		for i := 0; i < len(courseid); i = i + 1 {
			temp := cmsg{
				Courseid:   courseid[i],
				Stime:      stime[i],
				Coursename: coursename[i],
			}
			// fmt.Printf("%v", temp)
			data = append(data, temp)
		}
		c.JSON(200, data)
	})
	v1.GET("cancelcourse", func(c *gin.Context) {
		uid, err := strconv.ParseInt(c.Query("uid"), 10, 64)
		cid, err := strconv.ParseInt(c.Query("cid"), 10, 64)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		}
		err = mysql.Cancelcourse(uid, cid)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		} else {
			c.JSON(200, gin.H{
				"message": "OK",
				"status":  200,
			})
		}
	})
	v1.GET("addcourse", func(c *gin.Context) {
		uid, err := strconv.ParseInt(c.Query("uid"), 10, 64)
		stime, err := strconv.ParseInt(c.Query("studytime"), 10, 64)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		}
		err = mysql.Addcourse(c.Query("cname"), uid, stime)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		} else {
			c.JSON(200, gin.H{
				"message": "OK",
				"status":  200,
			})
		}
	})
	v1.GET("getcost", func(c *gin.Context) {
		uid, err := strconv.ParseInt(c.Query("uid"), 10, 64)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		}
		costid := mysql.Getcost(uid)
		var data []costmsg
		for i := 0; i < len(costid); i = i + 1 {
			temp := costmsg{
				Costid: costid[i],
			}
			// fmt.Printf("%v", temp)
			data = append(data, temp)
		}
		c.JSON(200, data)
	})
	v1.GET("getcostdetail", func(c *gin.Context) {
		costid, err := strconv.ParseInt(c.Query("costid"), 10, 64)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		}
		costcontent, cost, costdeadline, costisok := mysql.Getcostdetail(costid)
		c.JSON(200, gin.H{
			"Costcontent":  costcontent,
			"Cost":         cost,
			"Costdeadline": costdeadline,
			"Costisok":     costisok,
		})
	})
	v1.GET("addcost", func(c *gin.Context) {
		uid, err := strconv.ParseInt(c.Query("uid"), 10, 64)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		}
		costid, err := strconv.ParseInt(c.Query("costid"), 10, 64)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		}
		err = mysql.Addcost(uid, costid)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		} else {
			c.JSON(200, gin.H{
				"message": "OK",
				"status":  200,
			})
		}
	})
	v1.GET("givegrade", func(c *gin.Context) {
		uid, err := strconv.ParseInt(c.Query("uid"), 10, 64)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		}
		coursename, uname := mysql.Givegrade(uid)
		var data []givegrademsg
		for i := 0; i < len(coursename); i = i + 1 {
			temp := givegrademsg{
				Coursename: coursename[i],
				Uname:      uname[i],
			}
			data = append(data, temp)
		}
		c.JSON(200, data)
	})
	v1.GET("addgrade", func(c *gin.Context) {
		grade, err := strconv.ParseInt(c.Query("grade"), 10, 64)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		}
		err = mysql.Addgrade(c.Query("coursename"), c.Query("uname"), grade)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		} else {
			c.JSON(200, gin.H{
				"message": "OK",
				"status":  200,
			})
		}
	})
	v1.GET("viewgrade", func(c *gin.Context) {
		uid, err := strconv.ParseInt(c.Query("uid"), 10, 64)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		}
		coursename, grade := mysql.Viewgrade(uid)
		var data []viewgrademsg
		for i := 0; i < len(coursename); i = i + 1 {
			temp := viewgrademsg{
				Coursename: coursename[i],
				Grade:      grade[i],
			}
			data = append(data, temp)
		}
		c.JSON(200, data)
	})
	v1.GET("viewcost", func(c *gin.Context) {
		uid, err := strconv.ParseInt(c.Query("uid"), 10, 64)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		}
		costname, costid := mysql.Viewcost(uid)
		var data []costmsg
		for i := 0; i < len(costname); i = i + 1 {
			temp := costmsg{
				Costcontent: costname[i],
				Costid:      costid[i],
			}
			data = append(data, temp)
		}
		c.JSON(200, data)
	})
	v1.GET("getclass", func(c *gin.Context) {
		classid, classname := mysql.Getclass()
		var data []classmsg
		for i := 0; i < len(classid); i = i + 1 {
			temp := classmsg{
				Classid:   classid[i],
				Classname: classname[i],
			}
			data = append(data, temp)
		}
		c.JSON(200, data)
	})
	v1.GET("addcostinfo", func(c *gin.Context) {
		classid, err := strconv.ParseInt(c.Query("classid"), 10, 64)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		}
		costfees, err := strconv.ParseInt(c.Query("costfees"), 10, 64)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		}
		err = mysql.Addcostinfo(c.Query("costcontent"), classid, c.Query("costdeadline"), costfees)
		if err != nil {
			c.JSON(200, gin.H{
				"message": "NO",
				"status":  200,
			})
		} else {
			c.JSON(200, gin.H{
				"message": "OK",
				"status":  200,
			})
		}
	})
	router.Run(":8008")
}
