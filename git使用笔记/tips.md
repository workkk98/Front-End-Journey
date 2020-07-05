# git tips

### rebase

rebase可以让两条分支合成在同一条线上

**git rebase \[分支名/节点]**

❗️❗️❗️值得一提的，无论是merge，还是rebase都是把其他分支的节点融合到本分支上，区别就是表现形式不同。

假设本地仓库下有两个分支，一个分支是别人的分支them，一个是你自己的分支you，这两个分支肯定会有一个共同的父亲节点.
```s
git rebase them
```

这行命令就是说，基于them分支，把you分支的上游节点（共同父亲节点后的新的节点）添加到them分支后。
>也就是说把本分支 上游不同于新分支的节点**基于新分支** 添加到新分支上 **一定要注意两个分支的共同的节点**

rebase -i \[节点]
i的意思 interactive

> 整理 选中节点之后的所有节点

* 但是在实验过程中 整理两个提交节点 并使用s 即squash（压缩）出现了错误 然后我整理三个节点，压缩两个没有问题

**git rebase -i \[节点]**

注意，中括号的内容可以是具体的某个节点，这也就是说可以在基于本分支的某个节点上开始重建，
-i的含义是interactive，git会产生一个交互式的交互场景。

```
pick ca553f5 feat: git stash
pick b143230 feat: other main.js
pick 4315905 feat: main.js

# Rebase 605a08e..4315905 onto 605a08e (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
"~/Desktop/sangfor/Git讲师培训课件/demo/.git/rebase-merge/git-rebase-todo" 29L, 1225C
```

进入vim编辑器，并且按照commands指令操作节点即可。

### git fetch

git fetch origin \<source>:\<destination>
这里的source和destination恰好和push相反，原因也很简单，一个是推送一个是拉取

souce为空 也就是在本地创建新分支destination

> git fetch可以理解为就是从远端下载新的分支，连接到本地原先的origin/master分支上

git fetch origin foo
> Git 会到远程仓库的 foo 分支上，然后获取所有本地不存在的提交，放到本地的 o/foo 上。


### 远程跟踪
master 和 o/master 的关联关系就是由分支的“remote tracking”属性决定的。master 被设定为跟踪 o/master —— 这意味着为 master 分支指定了推送的目的地以及拉取后合并的目标。

你可能想知道 master 分支上这个属性是怎么被设定的，你并没有用任何命令指定过这个属性呀！好吧, 当你克隆仓库的时候, Git 就自动帮你把这个属性设置好了。

## push
git push \<remote> \<place>


git push origin master
切到本地仓库中的“master”分支，获取所有的提交，再到远程仓库“origin”中找到“master”分支，将远程仓库中没有的提交记录都添加上去，搞定之后告诉我。

git push origin \<source>:\<destination>
这个参数实际的值是个 refspec，“refspec” 是一个自造的词，意思是 Git 能识别的位置（比如分支 foo 或者 HEAD~1）
souce为空 也就是在本地创建新分支destination
也就是push空分支到destination，也就是删除远程分支