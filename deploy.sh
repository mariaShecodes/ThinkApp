rm -rf myprojectserver/public/*; rm -rf myprojectclient/build; cd myprojectclient; npm run build-prod; cd ..; mv myprojectclient/build/* myprojectserver/public; git add .; git commit -m "Deploying"; git subtree push --prefix=myprojectserver heroku master; heroku logs --tail