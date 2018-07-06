# Node js 6

## 路径操作模块

[path 官方参考文档](https://nodejs.org/dist/latest-v9.x/docs/api/path.html)

- path.basename
  - 获取一个路径的文件名（默认包含扩展名）
- path.dirname
  - 获取一个路径的目录部分
- path.extname
  - 获取一个路径的扩展名部分
- path.parse
  - 把一个路径转为对象
    - root根路径
    - dir目录
    - base包含后缀的文件名
    - ext后缀名
    - name不包含后缀的文件名
- path.join
  - 拼接路径，推荐使用
- path.isAbsolute
  - 判断一个路径是否是绝对路径

## node中的其他成员

在每个模块中，除了 `require` 、 `exports` 等模块相关API外，还有两个特殊成员

- `__dirname` **动态** 可以用来获取当前文件模块所属目录的绝对路径

  - > c:a/b/

- `__filename` **动态** 可以用来获取当前文件的绝对路径

  - > c:a/b/file.text

在文件操作中，相对路径是不可靠的，因为在 node 中文件的操作路径被设计为相对于执行 node 命令所处的路径。为解决这个问题，需要将相对路径变为绝对路径，这里可以使用 `__dirname` 、 `__filename` 来解决