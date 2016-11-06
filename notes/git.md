#git
git pull = git fetch + merge to local


##git clone
$ git clone git@github.com:Chenyueli/Blog.git
$ git checkout -b gh-pages origin/gh-pages
再同步下：
$ git pull

与本地冲突， 先将本地修改存储起来
git stash 
git pull 
git stash pop stash@{0} 还原暂存内容
打开冲突文件，看到冲突内容，并解决冲突
解决完成，正常提交。




##
https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93