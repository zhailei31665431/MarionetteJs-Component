# MarionetteJs-Component
Use MaionetteJs make Component

代码仅供参考结构

# Updating……



## CMRI公共评论组件

######介绍
使用Marionette封装的评论组件，包含发表评论，评论列表展示（带分页）；

MarionetteJs依赖Jquery、underscore、backbone,考虑到由于有的机器没有加载这四个框架，所以在引用本文件的时候，自动判断有没有这一个框架，如果没有自己加载文件。
***

1.文件引用

`<script type="text/javascript" src="/tools/gulp/src/scripts/juggler/src/widgets/publicReport.js?app_type=osns_app_as" id="reportJS" main="main" sendMain="post" listMain='list'></script>`


2.参数介绍：


| 参数           | Are
| ------------- |:-------------
| app_type      | 应用类型
| app_id        | 应用Id
| id            | 这个是获取属性的依据（必须为reportJS）
| main          | 主容器（如果Post和List为一体的,main存在时，不考虑下面两种选择）
| sendMain      | post容器（分体使用）
| listMain      | list容器（分体使用）


3.Css样式

默认容器的Css是谁调用谁写，组件Css默认封装在Js中，会在HEAD最后面追加一个Style标签

4.在线Demo

 [点击跳转]()

 
