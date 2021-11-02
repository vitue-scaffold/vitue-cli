# vitue cli 

> A CLI for scaffolding starter projects.

### 安装

Prerequisites: [Node.js](https://nodejs.org/en/) (>=12.x preferred) and npm.

```bash
[sudo] npm install -g @vitue/cli
```

`@vitue/cli`使用[flippidippi/download-git-repo](https://gitlab.com/flippidippi/download-git-repo#readme)进行 github 项目的在线下载，所以请关注下网络的情况，可能会出现超时等问题。


### 使用

```bash
# Begin
$ vitue init

# Select a template
? Please select a template (Use arrow keys)
❯ vitue-admin 
  vitue-mobile 

# Enter some basic information
? Project name test
? Project description hello
? Author Hejx <test@qq.com>

# Then wait for the project to download and create...
```

### License

MIT
