# 确保脚本抛出遇到的错误
set -e
# 生成静态文件
npm run build
# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:hailiting/hai_blog.git master:gh-pages

cd -

