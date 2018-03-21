### ubantu上面部署服务器
#### 部署node和npm
1. 到node官网下载源码包（source code）到本地。写此文档时node最新版本为`6.10.0`,故下载之后的文件为`node-v6.10.0.tar.gz`
2. 上传`node-v6-6.10.9.tar.gz`到服务器上。我用的上传工具是`FileZilla`,我上传到的目录是`/root/download/`
3. 解压缩，我用的是`x-shell`这个工具,先连接，连接之后，到第2步的那个路径下，即`/roor/download`，之后执行`tar zxvf node-v6-6.10.9.tar.gz`进行解压（zxcf后面为第2步上传的那个文件名），之后会在当前目录生成一个`node-v6-6.10.9`的文件夹。很奇怪，我在filezilla上并没有看到，但可以通过x-shell的`cd node-v6-6.10.9`访问。
4. 安装node（默认安装会安装在`/usr/local/bin`下面，以下方式是默认安装）。
   - 输入命令`cd node-v6-6.10.9` 进入node-v6-6.10.9目录。node-v6-6.10.9目录底下会有个configure的文件。
   - 输入命令：`cd ./configure`
   - 输入`make` (这里要make一段时间,我的差不多用了20分钟)，
   - 输入`sudo make install` 
   - 最后`node -v`和`npm -v`有结果出来，表示安装成功
   ```
   root@iZ2ze8um4rddsod4b8km3qZ:~# node -v
   v6.10.0
   root@iZ2ze8um4rddsod4b8km3qZ:~# npm -v
   3.10.10

    ```
    [注]：node和npm是一起的，以上步骤node、npm都安装好了
  
#### 部署mongodb数据库
1. 下载最新版本Mongodb
```
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-amazon-3.4.2.tgz

```
2. 解压缩
```
tar zxvf mongodb-linux-x86_64-amazon-3.4.2.tgz
```
3. 进到mongodb的bin目录下。
```
cd /download/mongodb-linux-x86_64-amazon-3.4.2/bin 
```
4. 安装mongod-server
```
apt install mongodb-server
```
4. 启动服务器
```
mongod --dbpath ../data
```
#### 部署pm2
```
npm install pm2 -g
```

### 需要的准备工作已经完成