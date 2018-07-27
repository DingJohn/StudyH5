# CMS

## 开始

### 数据库设计

```sql
CREATE DATABASE IF NOT EXISTS cms;

use cms;

-- 用户表
CREATE TABLE users(
		id INT PRIMARY KEY auto_increment,
		user_name VARCHAR(50) NOT NULL, -- 用户名
		user_pwd VARCHAR(50) NOT NULL, -- 用户密码
		user_mail VARCHAR(50) NOT NULL, -- 用户邮箱
		user_avater VARCHAR(100) NOT NULL, -- 用户头像
		user_gender bit NULL, -- 用户性别
		user_create_time DATE NOT NULL, --创建时间
		user_change_time DATE NULL
);

-- 博文表
CREATE TABLE blog(
		id INT PRIMARY KEY auto_increment,
		blog_title VARCHAR(100) NOT NULL, -- 文章标题
		blog_content TEXT NOT NULL, -- 文章内容
		blog_user_id INT NOT NULL, --作者
		blog_create_time DATETIME NOT NULL, -- 发表日期
		blog_change_time DATETIME NOT NULL -- 发表日期
)

--评论表
CREATE TABLE comments(
		id INT PRIMARY KEY auto_increment,
		cm_content TEXT NOT NULL, -- 评论内容
		cm_create_time DATETIME NOT NULL, -- 评论时间
		cm_blog_id INT NOT NULL, -- 所属博客
		cm_user_id INT NOT NULL, -- 评论人
		cm_reply_uer_id INT NULL -- 回复人
)
```

## 初始化服务端项目结构

