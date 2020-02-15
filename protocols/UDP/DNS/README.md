# DNS(域名系统) = domain name system

#### 科普环节

NS = name server
TLD = top level domain
SLD = second level domain
A = address
TTL = Time to Live

#### 还原 一次请求DNS服务的过程

> 通过**dig**命令查询整个dns过程
> $ dig math.stackexchange.com

```
; <<>> DiG 9.10.6 <<>> math.stackexchange.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 30631
;; flags: qr rd ra; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;math.stackexchange.com.		IN	A

;; ANSWER SECTION:
math.stackexchange.com.	1360	IN	A	151.101.65.69
math.stackexchange.com.	1360	IN	A	151.101.1.69
math.stackexchange.com.	1360	IN	A	151.101.193.69
math.stackexchange.com.	1360	IN	A	151.101.129.69

;; Query time: 12 msec
;; SERVER: 192.168.1.1#53(192.168.1.1)
;; WHEN: Fri Feb 14 13:49:54 CST 2020
;; MSG SIZE  rcvd: 104
```
正如换行符 换成了四段内容
1. 第一段是查询参数和统计
2. 第二段是查询内容(QUESTION SECTION:)

查询域名math.stackexchange.com的A记录，A是address的缩写

3. 第三段是DNS服务器的答复(ANSWER SECTION:)

math.stackexchange.com有四个A记录，即四个IP地址。600是TTL值（Time to live 的缩写），表示缓存时间，即600秒之内不用重新查询。

4. 第四段显示stackexchange.com的**NS**记录（Name Server的缩写），即哪些服务器负责管理stackexchange.com的DNS记录。


#### DNS服务器

> DNS服务器的IP地址，有可能是动态的，每次上网时由网关分配，这叫做DHCP机制；也有可能是事先指定的固定地址。Linux系统里面，DNS服务器的IP地址保存在/etc/resolv.conf文件。
> 上例的DNS服务器是192.168.1.253，这是一个内网地址。有一些公网的DNS服务器，也可以使用，其中最有名的就是Google的8.8.8.8和Level 3的4.2.2.2。

本机只向自己的DNS服务器查询，dig命令有一个@参数，显示向其他DNS服务器查询的结果。

```
// 向谷歌DNS服务器 访问math.stackexchange.com的IP地址
dig @8.8.8.8 math.stackexchange.com
```


#### 域名的层级

DNS服务器怎么会知道每个域名的IP地址呢？答案是分级查询。

```
;; QUESTION SECTION:
;math.stackexchange.com.		IN	A
```

注意此时的域名 **math.stackexchange.com.** 比我们输入时多了一"."
这是因为实际上所有域名的尾部都有一个根域名

距离来说 "www.example.com" 的完整的域名 应该是 "www.example.com.root" 简写为
"www.example.com." 因为根域名".root"对于所有域名都是一样的，所以平时是省略的。

根域名的下一级，叫做"顶级域名"（top-level domain，缩写为TLD），比如.com、.net；
再下一级叫做"次级域名"（second-level domain，缩写为SLD），比如www.example.com里面的.example，这一级域名是用户可以注册的；
再下一级是主机名（host），比如www.example.com里面的www，又称为"三级域名"，这是用户在自己的域里面为服务器分配的名称，是用户可以任意分配的。

所以完整的域名应该是

```
// 主机名host 次级域名 顶级域名 根域名
www.example.com.root
```

#### 根域名服务器

> DNS服务器根据域名的层级，进行分级查询。
> 需要明确的是，每一级域名都有自己的NS记录，NS记录指向该级域名的域名服务器。这些服务器知道下一级域名的各种记录。
> 所谓"分级查询"，就是从根域名开始，依次查询每一级域名的NS记录，直到查到最终的IP地址，过程大致如下。
> 1. 从"根域名服务器"查到"顶级域名服务器"的NS记录和A记录（IP地址）
> 2. 从"顶级域名服务器"查到"次级域名服务器"的NS记录和A记录（IP地址）
> 3. 从"次级域名服务器"查出"主机名"的IP地址

那根域名服务器的IP地址通过什么办法查询呢？回答是"根域名服务器"的NS记录和IP地址一般是不会变化的，所以内置在DNS服务器里面。

目前，世界上一共有十三组根域名服务器，从A.ROOT-SERVERS.NET一直到M.ROOT-SERVERS.NET。

#### 分级查询的实例

```
$ dig +trace math.stackexchange.com
```

**第一段**

> 根据内置的**根域名服务器IP地址**，DNS服务器向所有这些IP地址发出查询请求，询问math.stackexchange.com的顶级域名服务器com.的NS记录。**最先回复的根域名服务器将被缓存，以后只向这台服务器发请求。**

最后一行内容Received 811 bytes from 192.168.1.1#53(192.168.1.1) in 11 ms
这是否能证明是通过内置DNS获取根服务器的事实?
```
; <<>> DiG 9.10.6 <<>> +trace math.stackexchange.com
;; global options: +cmd
.			243030	IN	NS	i.root-servers.net.
.			243030	IN	NS	d.root-servers.net.
.			243030	IN	NS	g.root-servers.net.
.			243030	IN	NS	b.root-servers.net.
.			243030	IN	NS	h.root-servers.net.
.			243030	IN	NS	j.root-servers.net.
.			243030	IN	NS	k.root-servers.net.
.			243030	IN	NS	c.root-servers.net.
.			243030	IN	NS	m.root-servers.net.
.			243030	IN	NS	a.root-servers.net.
.			243030	IN	NS	l.root-servers.net.
.			243030	IN	NS	f.root-servers.net.
.			243030	IN	NS	e.root-servers.net.
;; Received 811 bytes from 192.168.1.1#53(192.168.1.1) in 11 ms
```

**第二段**

根据内置的根域名服务器IP地址，DNS服务器向所有这些IP地址发出查询请求
```
com.			172800	IN	NS	a.gtld-servers.net.
com.			172800	IN	NS	b.gtld-servers.net.
com.			172800	IN	NS	c.gtld-servers.net.
com.			172800	IN	NS	d.gtld-servers.net.
com.			172800	IN	NS	e.gtld-servers.net.
com.			172800	IN	NS	f.gtld-servers.net.
com.			172800	IN	NS	g.gtld-servers.net.
com.			172800	IN	NS	h.gtld-servers.net.
com.			172800	IN	NS	i.gtld-servers.net.
com.			172800	IN	NS	j.gtld-servers.net.
com.			172800	IN	NS	k.gtld-servers.net.
com.			172800	IN	NS	l.gtld-servers.net.
com.			172800	IN	NS	m.gtld-servers.net.
;; Received 1182 bytes from 199.7.83.42#53(l.root-servers.net) in 238 ms
```
**最先回复的根域名服务器将被缓存，以后只向这台服务器发请求。？**
> 结果显示.com域名的13条NS记录，同时返回的还有每一条记录对应的IP地址。

**第三段**

DNS服务器向这些顶级域名服务器发出查询请求，询问math.stackexchange.com的次级域名stackexchange.com的NS记录。


```
stackexchange.com.	172800	IN	NS	ns-925.awsdns-51.net.
stackexchange.com.	172800	IN	NS	ns-1029.awsdns-00.org.
stackexchange.com.	172800	IN	NS	ns-cloud-d1.googledomains.com.
stackexchange.com.	172800	IN	NS	ns-cloud-d2.googledomains.com.
//中间还返回一些数据
;; Received 823 bytes from 192.33.14.30#53(b.gtld-servers.net) in 254 ms
```

**第四段**

然后，DNS服务器向上面这四台NS服务器查询math.stackexchange.com的主机名。

```
math.stackexchange.com.	3600	IN	A	151.101.1.69
math.stackexchange.com.	3600	IN	A	151.101.65.69
math.stackexchange.com.	3600	IN	A	151.101.129.69
math.stackexchange.com.	3600	IN	A	151.101.193.69
;; Received 115 bytes from 216.239.34.109#53(ns-cloud-d2.googledomains.com) in 402 ms
```

最后的结果就是返回了四条记录 A记录 即 这四个网站分别对应不同的IP

#### 总结

计算机通过分级查找这种办法一级一级获取NS记录，直到拿到对应网址的IP记录
1. 通过内置DNS服务器获取根域名DNS的NS记录
2. 向根域名DNS发送请求获取顶级域名NS记录
3. 向顶级域名DNS发送请求获取次级域名NS记录
4. 向次级域名DNS发送请求获取主机的IP(或称三级域名)

```
$ dig +trace google.com


; <<>> DiG 9.10.6 <<>> +trace google.com
;; global options: +cmd
.			240220	IN	NS	b.root-servers.net.
.			240220	IN	NS	c.root-servers.net.
.			240220	IN	NS	f.root-servers.net.
.			240220	IN	NS	d.root-servers.net.
.			240220	IN	NS	e.root-servers.net.
.			240220	IN	NS	a.root-servers.net.
.			240220	IN	NS	k.root-servers.net.
.			240220	IN	NS	l.root-servers.net.
.			240220	IN	NS	i.root-servers.net.
.			240220	IN	NS	g.root-servers.net.
.			240220	IN	NS	j.root-servers.net.
.			240220	IN	NS	m.root-servers.net.
.			240220	IN	NS	h.root-servers.net.
;; Received 811 bytes from 192.168.1.1#53(192.168.1.1) in 14 ms

google.com.		60	IN	A	59.24.3.174
;; Received 54 bytes from 199.9.14.201#53(b.root-servers.net) in 77 ms
```

可以看到根域名DNS服务中，就记录了google.com的IP

#### 参考链接

[DNS 原理入门 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2016/06/dns.html)