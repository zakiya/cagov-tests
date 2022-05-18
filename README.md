## covid to netlify

```bash
git checkout -b cannabis-475
cd covid19-clone
cp -rf ~/Sites/cannabis.ca.gov/docs .
git add docs
git commit -m "docs 2021-04-12-01"
git push --set-upstream origin cannabis-475
gh pr create
gh pr view
```
