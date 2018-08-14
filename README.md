# Iframe通讯库RTO

用于子iframe与父iframe通讯

## 安装
使用<script>标签引入
或者
`npm install brto`

## 使用

### 初始化

父iframe需要初始化，子firame不需要
`RTO.register([options])`

### 追加消息回调
`
RTO.addEventListener('PAGE_JUMP', function(options) {
                console.log(options);
            });
`

### 发送消息给上层页面

`rto.send(msgType[, options])`

### 打开调试功能（打印日志）
`RTO.openDebugger()`

msgType可选值为：

|    值    |       描述      |
|:-------:|:------------- |
|    'ADD_TO_BAG' |     加入购物车    |
|    'PAGE_JUMP'  |     页面跳转    |


### 调用示例

##### 加入购物车 ADD_TO_BAG

```
   <script src="http://localhost:9002/rto.js"></script>

   <input type="button" value="addToBag" onclick="addToBag(event)"/>
   ....

  function addToBag(event) {
    RTO.send('ADD_TO_BAG', {
                target: {
                  offsetWidth: event.target.offsetWidth,
                  rect: event.target.getBoundingClientRect()
                },
                data: {
                  userid: 1,
                  type: 'xxx',
                  params: {

                  }
                }
              });
  }
```

###### options选项

|    key    |       描述      |
|:-------:|:------------- |
|    target |    触发操作的元素信息，用于控制动效，详情见附表1   |
|    data  |     加入购物车的订单信息，是调用后端接口所需的数据   详情见附表2 |

###### 附表1

|    key    |       描述      |
|:-------:|:------------- |
|    offsetWidth |    固定为 event.target.offsetWidth   |
|    rect  |    固定为 event.target.getBoundingClientRect() |

###### 附表2

|    key    |       描述      |
|:-------:|:------------- |
|    userId |    当前用户id   |
|    type  |    加入购物车接口参数 见http://10.254.2.95:7002/project/122/interface/api/5245 |
|    params  |    加入购物车接口参数，见http://10.254.2.95:7002/project/122/interface/api/5245 |




