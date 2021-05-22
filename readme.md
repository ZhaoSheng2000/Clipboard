## Clipboard 剪贴板简介

### 简介

一个基于Electron+react+antd构建的剪贴板小工具

### 概述

- 使用场景： 在我们使用word，excel，等编辑工具或者深度阅读文章的时候，每当需要复制一段文字并且记录下来，就要重复切换app或者窗口。或者是在复制繁杂的字段时，想要粘贴上上次甚至上上上次复制的内容，就需要再次找到那段文字，重新复制。使用Clipboard，它会帮你记录每次复制的内容。再次使用选中即可。

- 技术背景：Electron桌面app开发

  

### 介绍

#### 主界面

![image-20210521111656111](https://tva1.sinaimg.cn/large/008i3skNly1gqpwbfpi64j327y0lib29.jpg)

主界面在屏幕下方显示

通过快捷键``command+` ``快速显示/隐藏界面。显示界面后可以通过点击对应卡片复制内容，也可通过`` command+数字键`` 快速复制内容。

#### 隐私

Clipboard 所记录的内容都将保存在本地，不会上传到服务器，所以您可以绝对放心您的数据只会让您自己看到。

### 系统架构

#### 运行环境依赖

![image-20210521113854671](https://tva1.sinaimg.cn/large/008i3skNly1gqpwbu582gj31t20duq4g.jpg)

- 用户侧使用React，使用Antd组件构件界面，快捷键使用 react-hot-keys
- nodejs执行环境使用了Menubar构建菜单样式，使用Nedb实现本地存储数据，electron-clipboard-watcher 监听系统剪贴板。

----

### 处理复制粘贴逻辑的一些思路

首先想到了用Electron监听``command+c`` 来处理复制的内容，后来实际操作过程中发现Electron的快捷键监听的优先级比较大，系统无法捕捉到快捷键的复制命令。后来使用了electron-clipboard-watcher来监听剪贴板内容的变化。通过ipcMain来把复制的消息内容传递给渲染界面。

渲染界面使用react-hot-keys监听快捷键的按下来复制相关内容。

### 后期更新

- 历史复制界面
- 分类界面
- 图片复制

项目地址：https://github.com/ZhaoSheng2000/clipboard

大家有什么好的想法欢迎提交issue，如果对你有帮助的话欢迎star～

