import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import 'antd/dist/antd.css';
import './index.css'
import logo from './2873756.png'
import { Button, Table, Space, Descriptions, Badge, Menu, Select } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { EventEmitter } from 'events'


const { Option } = Select;
const { SubMenu } = Menu;
const eventBus = new EventEmitter()

class Pic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            key: 0,
            level: '学生',
            name: '',
        }
    }
    exit = () => {
        alert('已退出')
        eventBus.emit("changekey", 0)
    }
    componentDidMount() {
        //进行事件监听
        eventBus.addListener("changekey", (message) => {
            message = parseInt(message)
            if (this.state.key >= 3 && message >= 4) {
                this.setState({ key: message }) //没登陆，不能听从菜单的指示，所以判断登录了才听
            } else if (message < 4) {
                this.setState({ key: message })
            }
        })
        eventBus.addListener("changename", (message) => {
            this.setState({ name: message })
        })
        eventBus.addListener("changelevel", (message) => {
            message = parseInt(message)
            if (message === 1) {
                this.setState({ level: '学生' })
            } else if (message === 2) {
                this.setState({ level: '教师' })
            } else {
                this.setState({ level: '管理员' })
            }
        })
    }
    componentWillMount() {
        //取消事件监听
        eventBus.removeListener("changename", (message) => {
            this.setState({ name: message })
        })
        eventBus.removeListener("changekey", (message) => {
            message = parseInt(message)
            if (this.state.key >= 3 && message >= 4) {
                this.setState({ key: message })
            } else if (message < 4) {
                this.setState({ key: message })
            }
        })
        eventBus.removeListener("changelevel", (message) => {
            message = parseInt(message)
            if (message === 1) {
                this.setState({ level: '学生' })
            } else if (message === 2) {
                this.setState({ level: '教师' })
            } else {
                this.setState({ level: '管理员' })
            }
        })
    }
    pic = () => {
        const { key } = this.state
        if (key >= 3) {
            return (
                <div>
                    <img src={logo} alt='logo' />
                    <div style={{ textAlign: "end" }}>
                        <span>欢迎，{this.state.level} {this.state.name}</span>
                        <Button type="primary" onClick={this.exit} shape="round" size='large'>
                            注销
                        </Button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <img src={logo} alt='logo' />
                    <div style={{ textAlign: "end" }}>
                        <span>您还未登录，请先登录再进行下一步操作</span>
                    </div>
                </div>
            )
        }
    }
    render() {
        return (
            <div>{this.pic()}</div>
        )
    }
}

class Box extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            key: 0,
        }
    }
    emmitEvent() {
        eventBus.emit("changekey", this.state.key)
    }
    componentDidMount() {
        //进行事件监听
        eventBus.addListener("changekey", (message) => {
            this.setState({ key: message })
        })
        eventBus.addListener("changename", (message) => {
            this.setState({ name: message })
        })
        eventBus.addListener("changelevel", (message) => {
            this.setState({ level: message })
        })
    }
    componentWillMount() {
        //取消事件监听
        eventBus.removeListener("changename", (message) => {
            this.setState({ name: message })
        })
        eventBus.removeListener("changekey", (message) => {
            this.setState({ key: message })
        })
        eventBus.removeListener("changelevel", (message) => {
            this.setState({ level: message })
        })
    }
    handleClick = e => {
        // console.log('click ', e);
        this.setState({ key: e.key });
        eventBus.emit("changekey", e.key)
    };
    render() {
        const { key } = this.state;
        return (
            <div>
                <Menu onClick={this.handleClick} selectedKeys={[key]} mode="horizontal">
                    <SubMenu key="SubMenu1" icon={<MailOutlined />} title="用户信息管理">
                        <Menu.ItemGroup title="学生">
                            <Menu.Item key="4">更改密码</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="管理员">
                            <Menu.Item key="5">用户信息更改</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                    <SubMenu key="SubMenu2" icon={<AppstoreOutlined />} title="课程信息管理">
                        <Menu.ItemGroup title="学生">
                            <Menu.Item key="6">查看课程</Menu.Item>
                            <Menu.Item key="7">选择课程</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="管理员">
                            <Menu.Item key="8">新增课程内容</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                    <SubMenu key="SubMenu3" icon={<SettingOutlined />} title="学生缴费信息管理">
                        <Menu.ItemGroup title="学生">
                            <Menu.Item key="9">学生缴费</Menu.Item>
                            <Menu.Item key="10">缴费记录查询</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="管理员">
                            <Menu.Item key="11">新增缴费内容</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                    <SubMenu key="SubMenu4" icon={<AppstoreOutlined />} title="成绩信息管理">
                        <Menu.ItemGroup title="学生">
                            <Menu.Item key="12">查看课程成绩</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="管理员">
                            <Menu.Item key="13">录入课程成绩</Menu.Item>
                            <Menu.Item key="14">课程成绩修改</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: '',
            upassword: '',
            key: 0,
            name: '',
            id: '',
            Euid: '',
            Euname: '',
            Eupassword: '',
            Eu_id: '',
            Cid: '',
            Cname: '',
            Ctime: '',
            COSTid: 0,
            COSTcontent: '',
            COSTfees: 0,
            COSTdeadline: '',
            COSTisok: 0,
            Coursename: '',
            Courseuname: '',
            Cuid: '',
            Class: [],
            Classid: 1,
            valid: 0,
            Grade: 0,
            NCOSTcontent: '',
            NCOSTfees: '',
            NCOSTdeadline: '',
            columns: [
                {
                    title: '账户ID',
                    dataIndex: 'Uuid',
                    key: 'Uuid',
                },
                {
                    title: '姓名',
                    dataIndex: 'Uname',
                    key: 'Uname',
                },
                {
                    title: '身份证号',
                    dataIndex: 'Uu_id',
                    key: 'Uu_id',
                },
                {
                    title: '账户权限',
                    key: 'Ulevel',
                    dataIndex: 'Ulevel',
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (row) => (
                        <Space size="middle">
                            <Button type="primary" onClick={() => {
                                this.setState({
                                    Euid: row.Uuid,
                                    Euname: row.Uname,
                                    Eu_id: row.Uu_id,
                                    key: 4,
                                })
                            }} shape="round" size='large'>
                                修改此用户信息
                            </Button>
                            <Button type="primary" onClick={() => {
                                axios({
                                    url: "http://localhost:3002/api/v1/deleteuser",
                                    params: {
                                        uid: row.Uuid,
                                    },
                                }).then(res => {
                                    alert('已删除')
                                }).catch(err => {
                                    console.error(err)
                                })
                            }} shape="round" size='large'>
                                删除此用户
                            </Button>
                        </Space>
                    ),
                },
            ],
            data: [],
            columns2: [
                {
                    title: '课程ID',
                    dataIndex: 'Courseid',
                    key: 'Courseid',
                },
                {
                    title: '课程名称',
                    dataIndex: 'Coursename',
                    key: 'Coursename',
                },
                {
                    title: '授课老师',
                    dataIndex: 'Uname',
                    key: 'Uname',
                },
                {
                    title: '学时',
                    key: 'Stime',
                    dataIndex: 'Stime',
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (row) => (
                        <Space size="middle">
                            <Button type="primary" onClick={() => {
                                axios({
                                    url: "http://localhost:3002/api/v1/selectcourse",
                                    params: {
                                        uid: this.state.uid,
                                        cid: row.Courseid
                                    },
                                }).then(res => {
                                    alert('选择成功')
                                }).catch(err => {
                                    console.error(err)
                                })
                            }} shape="round" size='large'>
                                选课
                            </Button>
                        </Space>
                    ),
                },
            ],
            data2: [],
            columns3: [
                {
                    title: '课程ID',
                    dataIndex: 'Courseid',
                    key: 'Courseid',
                },
                {
                    title: '课程名称',
                    dataIndex: 'Coursename',
                    key: 'Coursename',
                },
                {
                    title: '学时',
                    key: 'Stime',
                    dataIndex: 'Stime',
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (row) => (
                        <Space size="middle">
                            <Button type="primary" onClick={() => {
                                axios({
                                    url: "http://localhost:3002/api/v1/cancelcourse",
                                    params: {
                                        uid: this.state.uid,
                                        cid: row.Courseid
                                    },
                                }).then(res => {
                                    alert('退选成功')
                                }).catch(err => {
                                    console.error(err)
                                })
                            }} shape="round" size='large'>
                                退选
                            </Button>
                        </Space>
                    ),
                },
            ],
            data3: [],
            columns4: [
                {
                    title: '缴费ID',
                    dataIndex: 'Costid',
                    key: 'Costid',
                },
                {
                    title: '操作',
                    key: 'Action',
                    render: (row) => (
                        <Space size="middle">
                            <Button type="primary" onClick={() => {
                                this.setState({
                                    COSTid: row.Costid,
                                    valid: 1,
                                })
                                axios({
                                    url: "http://localhost:3002/api/v1/getcostdetail",
                                    params: {
                                        costid: row.Costid,
                                    },
                                }).then(res => {
                                    this.setState({
                                        COSTcontent: res.data.Costcontent,
                                        COSTfees: res.data.Cost,
                                        COSTdeadline: res.data.Costdeadline,
                                        COSTisok: res.data.Costisok,
                                    })
                                }).catch(err => {
                                    console.error(err)
                                })
                            }} shape="round" size='large'>
                                查看详情
                            </Button>
                        </Space>
                    ),
                },
            ],
            data4: [],
            columns5: [
                {
                    title: '课程名称',
                    dataIndex: 'Coursename',
                    key: 'Coursename',
                },
                {
                    title: '学生名称',
                    dataIndex: 'Uname',
                    key: 'Uname',
                },
                {
                    title: '操作',
                    key: 'Action',
                    render: (row) => (
                        <Space size="middle">
                            <Button type="primary" onClick={() => {
                                axios({
                                    url: "http://localhost:3002/api/v1/getgrade",
                                    params: {
                                        coursename: row.Coursename,
                                        uname: row.Uname,
                                    },
                                }).then(res => {
                                    this.setState({
                                        Grade: res.data.grade
                                    })
                                }).catch(err => {
                                    console.error(err)
                                })
                                this.setState({
                                    Coursename: row.Coursename,
                                    Courseuname: row.Uname,
                                    key: 14,
                                })
                            }} shape="round" size='large'>
                                给予/修改成绩
                            </Button>
                        </Space>
                    ),
                },
            ],
            data5: [],
            columns6: [
                {
                    title: '课程名称',
                    dataIndex: 'Coursename',
                    key: 'Coursename',
                },
                {
                    title: '成绩',
                    dataIndex: 'Grade',
                    key: 'Grade',
                },
            ],
            data6: [],
            columns7: [
                {
                    title: '缴费ID',
                    dataIndex: 'Costid',
                    key: 'Costid',
                },
                {
                    title: '缴费内容',
                    dataIndex: 'Costcontent',
                    key: 'Costcontent',
                },
            ],
            data7: [],
        }
    }
    getUserInfo = () => {
        axios({
            url: "http://localhost:3002/api/v1/getuser",
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.error(err)
        })
    }
    componentDidMount() {
        //进行事件监听
        eventBus.addListener("changekey", (message) => {
            message = parseInt(message)
            if (this.state.key >= 3) {
                this.setState({ key: message })
            }
            if (message === 0) {
                this.setState({
                    data: [],
                    data2: [],
                    data3: [],
                    data4: [],
                    data5: [],
                    data6: [],
                    data7: [],
                    valid: 0,
                    u_id: '',
                    uname: '',
                    uid: '',
                    Cuid: '',
                    Cname: '',
                    Ctime: '',
                })
            }
            if (message === 5) {
                axios({
                    url: "http://localhost:3002/api/v1/getuser",
                }).then(res => {
                    this.setState({
                        data: res.data,
                    })
                }).catch(err => {
                    console.error(err)
                })
            }
            if (message === 6) {
                axios({
                    url: "http://localhost:3002/api/v1/viewcourse",
                }).then(res => {
                    this.setState({
                        data2: res.data
                    })
                }).catch(err => {
                    console.error(err)
                })
            }
            if (message === 7) {
                axios({
                    url: "http://localhost:3002/api/v1/scourse",
                    params: {
                        uid: this.state.uid,
                    },
                }).then(res => {
                    this.setState({
                        data3: res.data
                    })
                }).catch(err => {
                    console.error(err)
                })
            }
            if (message === 9) {
                axios({
                    url: "http://localhost:3002/api/v1/getcost",
                    params: {
                        uid: this.state.uid,
                    },
                }).then(res => {
                    this.setState({
                        data4: res.data
                    })
                }).catch(err => {
                    console.error(err)
                })
            }
            if (message === 10) {
                axios({
                    url: "http://localhost:3002/api/v1/viewcost",
                    params: {
                        uid: this.state.uid,
                    },
                }).then(res => {
                    this.setState({
                        data7: res.data
                    })
                }).catch(err => {
                    console.error(err)
                })
            }
            if (message === 11) {
                axios({
                    url: "http://localhost:3002/api/v1/getclass",
                }).then(res => {
                    this.setState({
                        Class: res.data
                    })
                }).catch(err => {
                    console.error(err)
                })
            }
            if (message === 12) {
                axios({
                    url: "http://localhost:3002/api/v1/viewgrade",
                    params: {
                        uid: this.state.uid,
                    },
                }).then(res => {
                    this.setState({
                        data6: res.data
                    })
                }).catch(err => {
                    console.error(err)
                })
            }
            if (message === 13) {
                axios({
                    url: "http://localhost:3002/api/v1/givegrade",
                    params: {
                        uid: this.state.uid,
                    },
                }).then(res => {
                    this.setState({
                        data5: res.data
                    })
                }).catch(err => {
                    console.error(err)
                })
            }
        })
    }
    componentWillMount() {
        //取消事件监听
        eventBus.removeListener("changekey", (message) => {
            message = parseInt(message)
            if (this.state.key >= 3) {
                this.setState({ key: message })
            }
            if (message === 6) {
                axios({
                    url: "http://localhost:3002/api/v1/viewcourse",
                }).then(res => {
                    this.setState({
                        data2: res.data
                    })
                }).catch(err => {
                    console.error(err)
                })
            }
            if (message === 7) {
                axios({
                    url: "http://localhost:3002/api/v1/scourse",
                    params: {
                        uid: this.state.uid,
                    },
                }).then(res => {
                    this.setState({
                        data3: res.data
                    })
                }).catch(err => {
                    console.error(err)
                })
            }
            if (message === 9) {
                axios({
                    url: "http://localhost:3002/api/v1/getcost",
                    params: {
                        uid: this.state.uid,
                    },
                }).then(res => {
                    this.setState({
                        data4: res.data
                    })
                }).catch(err => {
                    console.error(err)
                })
            }
            if (message === 11) {
                axios({
                    url: "http://localhost:3002/api/v1/getclass",
                }).then(res => {
                    this.setState({
                        Class: res.data
                    })
                }).catch(err => {
                    console.error(err)
                })
            }
            if (message === 12) {
                axios({
                    url: "http://localhost:3002/api/v1/viewgrade",
                    params: {
                        uid: this.state.uid,
                    },
                }).then(res => {
                    this.setState({
                        data6: res.data
                    })
                }).catch(err => {
                    console.error(err)
                })
            }
            if (message === 13) {
                axios({
                    url: "http://localhost:3002/api/v1/givegrade",
                    params: {
                        uid: this.state.uid,
                    },
                }).then(res => {
                    this.setState({
                        data5: res.data
                    })
                }).catch(err => {
                    console.error(err)
                })
            }
        })
    }
    changeinputuid = (e) => {
        this.setState({
            uid: e.target.value,
        })
    }
    changeinputCuid = (e) => {
        this.setState({
            Cuid: e.target.value,
        })
    }
    changeinputCname = (e) => {
        this.setState({
            Cname: e.target.value,
        })
    }
    changeinputCtime = (e) => {
        this.setState({
            Ctime: e.target.value,
        })
    }
    changeinputid = (e) => {
        this.setState({
            uid: e.target.value,
        })
    }
    changeinputpawd = (e) => {
        this.setState({
            upassword: e.target.value,
        })
    }
    changeinputname = (e) => {
        this.setState({
            name: e.target.value,
        })
    }
    changeinputid = (e) => {
        this.setState({
            id: e.target.value,
        })
    }
    changeinputEname = (e) => {
        this.setState({
            Euname: e.target.value,
        })
    }
    changeinputEpawd = (e) => {
        this.setState({
            Eupassword: e.target.value,
        })
    }
    changeinputEuid = (e) => {
        this.setState({
            Eu_id: e.target.value,
        })
    }
    changeinputCoursename = (e) => {
        this.setState({
            Coursename: e.target.value,
        })
    }
    changeinputCourseuname = (e) => {
        this.setState({
            Courseuname: e.target.value,
        })
    }
    handleChange = (value) => {
        this.setState({
            classid: value,
        })
    }
    changeinputGrade = (e) => {
        this.setState({
            Grade: e.target.value,
        })
    }
    changeinputNCOSTcontent = (e) => {
        this.setState({
            NCOSTcontent: e.target.value,
        })
    }
    changeinputNCOSTdeadline = (e) => {
        this.setState({
            NCOSTdeadline: e.target.value,
        })
    }
    changeinputNCOSTfees = (e) => {
        this.setState({
            NCOSTfees: e.target.value,
        })
    }
    sendLogin = () => {
        axios({
            url: "http://localhost:3002/api/v1/login",
            params: {
                uid: this.state.uid,
                upassword: this.state.upassword,
            },

        }).then(res => {
            console.log(res.data.message)
            console.log(res.data.name)
            if (res.data.message === 'NO') {
                alert("账号或密码不正确")
            } else {
                alert("登录成功！")
                this.setState({
                    res: res.status,
                    key: 3,
                    name: res.data.name,
                    class: res.data.class,
                    level: res.data.level,
                    Euid: res.data.uid,
                    Eu_id: res.data.u_id,
                    Euname: res.data.name,
                })
                eventBus.emit("changekey", this.state.key)
                eventBus.emit("changename", this.state.name)
                eventBus.emit("changelevel", this.state.level)
            }
        }).catch(err => {
            console.error(err)
        })
        this.setState({
            upassword: '',
        })
    }
    sendRegister = () => {
        axios({
            url: "http://localhost:3002/api/v1/register",
            params: {
                uid: this.state.uid,
                upassword: this.state.upassword,
                uname: this.state.name,
                u_id: this.state.id,
            },
        }).then(res => {
            console.log(res.data.message)
            if (res.data.message === 'NO') {
                alert("此学号已存在或不合法")
            } else {
                alert("注册成功！现在跳转到登录页面")
                this.setState({
                    res: res.status,
                    key: 0,
                })
            }
        }).catch(err => {
            console.error(err)
        })
        this.setState({
            uid: '',
            upassword: '',
            name: '',
            id: '',
        })
    }
    sendEdit = () => {
        axios({
            url: "http://localhost:3002/api/v1/edituser",
            params: {
                uid: this.state.Euid,
                upassword: this.state.Eupassword,
                uname: this.state.Euname,
                u_id: this.state.Eu_id,
            },
        }).then(res => {
            console.log(res.data.message)
            alert("已修改")
            this.setState({
                Eupassword: '',
            })
        }).catch(err => {
            console.error(err)
            alert("Error")
        })
    }
    sendCost = () => {
        this.setState({
            COSTisok: 1,
        })
        axios({
            url: "http://localhost:3002/api/v1/addcost",
            params: {
                uid: this.state.uid,
                costid: this.state.COSTid
            },
        }).then(res => {
            alert("已提交")
        }).catch(err => {
            console.error(err)
            alert("Error")
        })
    }
    sendAddcourse = () => {
        axios({
            url: "http://localhost:3002/api/v1/addcourse",
            params: {
                cname: this.state.Cname,
                uid: this.state.Cuid,
                studytime: this.state.Ctime
            },
        }).then(res => {
            console.error(res)
            alert("已提交")
        }).catch(err => {
            console.error(err)
            alert("Error")
        })
    }
    clickToLogin = () => {
        this.setState({
            key: 0,
        })
    }
    clickToRegister = () => {
        this.setState({
            key: 1,
        })
    }
    costclick = () => {
        if (this.state.COSTisok === 0) {
            return (
                <Button type="primary" onClick={this.sendCost} shape="round" size='large'>
                    我已完成缴费，下一步
                </Button>
            )
        } else {
            return (
                <span>您已完成缴费，感谢您的支持。</span>
            )
        }
    }
    sendAddgrade = () => {
        axios({
            url: "http://localhost:3002/api/v1/addgrade",
            params: {
                coursename: this.state.Coursename,
                uname: this.state.Courseuname,
                grade: this.state.Grade,
            },
        }).then(res => {
            alert("已提交")
        }).catch(err => {
            console.error(err)
            alert("Error")
        })
    }
    sendAddcost = () => {
        axios({
            url: "http://localhost:3002/api/v1/addcostinfo",
            params: {
                costcontent: this.state.NCOSTcontent,
                classid: this.state.classid,
                costdeadline: this.state.NCOSTdeadline,
                costfees: this.state.NCOSTfees
            },
        }).then(res => {
            alert("已提交")
        }).catch(err => {
            console.error(err)
            alert("Error")
        })
    }
    login = () => {
        const { key } = this.state
        if (key === 0) {
            return (
                <div style={{ textAlign: 'center', border: '2px solid red', height: 220, width: '25%', margin: '30px auto' }}>
                    <h1>登录</h1>
                    <input type="text" placeholder='学号' value={this.state.uid} onChange={this.changeinputuid}></input>
                    <br />
                    <br />
                    <input type="password" placeholder='密码' value={this.state.upassword} onChange={this.changeinputpawd}></input>
                    <br />
                    <br />
                    <Button type="primary" onClick={this.sendLogin} shape="round" size='large'>
                        确认登录
                    </Button>
                    <br></br>
                    <br></br>
                    <Button type="primary" onClick={this.clickToRegister} shape="round" size='large'>
                        注册账号
                    </Button>
                </div>
            )
        } else if (key === 1) {
            return (
                <div style={{ textAlign: 'center', border: '2px solid red', height: 400, width: '25%', margin: '30px auto' }}>
                    <h1>注册</h1>
                    <input type="text" placeholder='学号' value={this.state.uid} onChange={this.changeinputuid}></input>
                    <br />
                    <br />
                    <input type="password" placeholder='密码' value={this.state.upassword} onChange={this.changeinputpawd}></input>
                    <br />
                    <br />
                    <input type="text" placeholder='姓名' value={this.state.name} onChange={this.changeinputname}></input>
                    <br />
                    <br />
                    <input type="text" placeholder='身份证号' value={this.state.id} onChange={this.changeinputid}></input>
                    <br />
                    <br />
                    <Button type="primary" onClick={this.sendRegister} shape="round" size='large'>
                        确认注册
                    </Button>
                    <br />
                    <br />
                    <Button type="primary" onClick={this.clickToLogin} shape="round" size='large'>
                        返回登录界面
                    </Button>
                </div>
            )
        } else if (key === 3) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <span>登陆成功！请点击左上角的菜单栏进行操作</span>
                </div>
            )
        } else if (key === 4) {
            return (
                <div style={{ textAlign: 'center', border: '2px solid red', height: 400, width: '25%', margin: '30px auto' }}>
                    <h1>信息编辑</h1>
                    <input type="text" disabled placeholder='学号' value={this.state.Euid} onChange={this.changeinputuid}></input>
                    <br />
                    <br />
                    <input type="password" placeholder='密码' value={this.state.Eupassword} onChange={this.changeinputEpawd}></input>
                    <br />
                    <br />
                    <input type="text" placeholder='姓名' value={this.state.Euname} onChange={this.changeinputEname}></input>
                    <br />
                    <br />
                    <input type="text" placeholder='身份证号' value={this.state.Eu_id} onChange={this.changeinputEuid}></input>
                    <br />
                    <br />
                    <Button type="primary" onClick={this.sendEdit} shape="round" size='large'>
                        确认修改
                    </Button>
                </div>
            )
        } else if (key === 5) {
            if (this.state.level >= 3) {
                return (
                    <div>
                        <Table columns={this.state.columns} dataSource={this.state.data} />
                    </div>
                )
            } else {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <span>你无权访问此页面</span>
                    </div>
                )
            }
        } else if (key === 6) {
            return (
                <div>
                    <Table columns={this.state.columns2} dataSource={this.state.data2} />
                </div>
            )
        } else if (key === 7) {
            return (
                <div>
                    <Table columns={this.state.columns3} dataSource={this.state.data3} />
                </div>
            )
        } else if (key === 8) {
            if (this.state.level >= 3) {
                return (
                    <div style={{ textAlign: 'center', border: '2px solid red', height: 400, width: '25%', margin: '30px auto' }}>
                        <h1>新增课程</h1>
                        <input type="text" placeholder='课程名称' value={this.state.Cname} onChange={this.changeinputCname}></input>
                        <br />
                        <br />
                        <input type="text" placeholder='授课老师id' value={this.state.Cuid} onChange={this.changeinputCuid}></input>
                        <br />
                        <br />
                        <input type="text" placeholder='学时' value={this.state.Ctime} onChange={this.changeinputCtime}></input>
                        <br />
                        <br />
                        <Button type="primary" onClick={this.sendAddcourse} shape="round" size='large'>
                            提交
                        </Button>
                    </div>
                )
            } else {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <span>你无权访问此页面</span>
                    </div>
                )
            }
        } else if (key === 9) {
            if (this.state.valid === 1) {
                return (
                    <div>
                        <Table columns={this.state.columns4} dataSource={this.state.data4} />
                        <Descriptions title="费用详情" bordered>
                            <Descriptions.Item label="费用ID">{this.state.COSTid}</Descriptions.Item>
                            <Descriptions.Item label="费用名称">{this.state.COSTcontent}</Descriptions.Item>
                            <Descriptions.Item label="发票样式">标准增值税发票</Descriptions.Item>
                            <Descriptions.Item label="截止时间">{this.state.COSTdeadline}</Descriptions.Item>
                            <Descriptions.Item label="状态" span={3}>
                                <Badge status="processing" text={this.state.COSTisok === 0 ? "未缴费" : "已完成"} />
                            </Descriptions.Item>
                            <Descriptions.Item label="总计费用">￥{this.state.COSTfees}</Descriptions.Item>
                        </Descriptions>
                        <div style={{ textAlign: 'center' }}>
                            {this.costclick()}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Table columns={this.state.columns4} dataSource={this.state.data4} />
                    </div>
                )
            }
        } else if (key === 10) {
            return (
                <div>
                    <Table columns={this.state.columns7} dataSource={this.state.data7} />
                </div>
            )
        } else if (key === 11) {
            if (this.state.level >= 3) {
                return (
                    <div style={{ textAlign: 'center', border: '2px solid red', height: 400, width: '25%', margin: '30px auto' }}>
                        <h1>新增缴费</h1>
                        <input type="text" placeholder='缴费内容' value={this.state.NCOSTcontent} onChange={this.changeinputNCOSTcontent}></input>
                        <br />
                        <br />
                        <Select style={{ width: 120 }} onChange={this.handleChange}>
                            {this.state.Class.map(item => (
                                <Option value={item.Classid}>{item.Classname}</Option>
                            ))}
                        </Select>
                        <br />
                        <br />
                        <input type="text" placeholder='截止日期' value={this.state.NCOSTdeadline} onChange={this.changeinputNCOSTdeadline}></input>
                        <br />
                        <br />
                        <input type="text" placeholder='缴费金额' value={this.state.NCOSTfees} onChange={this.changeinputNCOSTfees}></input>
                        <br />
                        <br />
                        <Button type="primary" onClick={this.sendAddcost} shape="round" size='large'>
                            提交
                        </Button>
                    </div>
                )
            } else {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <span>你无权访问此页面</span>
                    </div>
                )
            }
        } else if (key === 12) {
            return (
                <div>
                    <Table columns={this.state.columns6} dataSource={this.state.data6} />
                </div>
            )
        } else if (key === 13) {
            if (this.state.level >= 2) {
                return (
                    <div>
                        <Table columns={this.state.columns5} dataSource={this.state.data5} />
                    </div>
                )
            } else {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <span>你无权访问此页面</span>
                    </div>
                )
            }
        } else if (key === 14) {
            if (this.state.level >= 2) {
                return (
                    <div style={{ textAlign: 'center', border: '2px solid red', height: 400, width: '25%', margin: '30px auto' }}>
                        <h1>成绩评定</h1>
                        <input type="text" placeholder='课程名称' disabled value={this.state.Coursename} onChange={this.changeinputCoursename}></input>
                        <br />
                        <br />
                        <input type="text" placeholder='学生名称' disabled value={this.state.Courseuname} onChange={this.changeinputCourseuname}></input>
                        <br />
                        <br />
                        <input type="text" placeholder='分数' value={this.state.Grade} onChange={this.changeinputGrade}></input>
                        <br />
                        <br />
                        <Button type="primary" onClick={this.sendAddgrade} shape="round" size='large'>
                            提交
                        </Button>
                    </div>
                )
            } else {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <span>你无权访问此页面</span>
                    </div>
                )
            }
        }
    }
    render() {
        return (
            <div>
                {this.login()}
                <br />
                <br />
                <footer style={{textAlign:"center"}}>
                    <span>Designed by Ant 2021-2021</span>
                    <br />
                    <span>学生信息管理系统-广东药科大学</span>
                </footer>
            </div>
        )
    }
}

ReactDOM.render(<Pic />, document.getElementById('pic'))
ReactDOM.render(<Box />, document.getElementById('box'))
ReactDOM.render(<App />, document.getElementById('root'))