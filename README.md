## covid to netlify

```bash
git checkout -b covid-5456
cd covid19-clone
cp -rf ~/Sites/covid19/docs .
git add docs
git commit -m "docs 2021-12-10-01"
git push
gh pr create
gh pr view
```
