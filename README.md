# vitue cli 

`@vitue/cli`的作用很纯粹，就是下载`vitue-scaffold`组织内的 template 项目。通过`vitue init`可以查询到组织内所有可用的项目模版，选择对应的即可安装到本地目录。除此之外，没有其他任何功能。

> `@vitue/cli`使用[flippidippi/download-git-repo](https://gitlab.com/flippidippi/download-git-repo#readme)进行 github 项目的在线下载，所以请关注下网络的情况，可能会出现超时等问题。


### 安装

```bash
yarn add --global @vitue/cli

# npm
npm install -g @vitue/cli
```


### 使用

```bash
# Begin
$ vitue init

# Select a template
? Please select a template (Use arrow keys)
❯ vitue-admin 
  vitue-mobile 

# Enter some basic information
? Project name: test
? Project description: hello
? Author: Hejx <test@qq.com>

# Then wait for the project to download and create...
```

### License

MIT
