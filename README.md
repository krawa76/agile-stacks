# agile-stacks

Demo application:

[http://agile-stacks.meteorapp.com/](http://agile-stacks.meteorapp.com/)

### Project Structure

* /apps/web - the containerized simple Node.js web server with Dockerfile and Kubernetes manifest.
* /apps/console - the console Node.js app which uses Kubernetes RESTful API to show, create, delete, and scale Kubernetes deployments.
* /apps/kube-web - Kubernetes API web app demo: Meteor.js & React.js.  
* /apps/#shared - the Kubernetes manifests: deployment, service.

### Main Modules

* [Kubernetes API controller](apps/kube-web/imports/api/KubeController.js)
* [React.js application](apps/kube-web/imports/ui/App.jsx)
* [Kubernetes manifest](apps/kube-web/imports/data.js)

### Console App

Command-line parameters:
* index, create, delete - show the cluster objects, create/delete a deployment
* scale X - scale the deployment (max replicas = 5)
```
$ ENDPOINT=https://x.x.x.x USERNAME=username PASSWORD=password node apps/console/index.js create
$ ENDPOINT=https://x.x.x.x USERNAME=username PASSWORD=password node apps/console/index.js scale 5
```

### Deployment

```
$ DEPLOY_HOSTNAME=us-east-1.galaxy-deploy.meteor.com meteor deploy --settings production.json agile-stacks.meteorapp.com
```
