# GDPUSIMS

## 使用说明：

请先自行配备node.js运行环境

对于react：npm start即可

golang后端初始化，执行以下命令

go mod init

go tidy

go build

Nginx添加跨域规则：

以本项目为例

Nginx监听localhost:3002，将localhost:3002/api/v1的请求全部转发到localhost:8008（即golang的端口），实际根据自己的端口进行调整即可
