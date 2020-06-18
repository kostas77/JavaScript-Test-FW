## Selenium on Kubernetes

Selenium is a browser automation tool used primarily for testing web applications. However when Selenium is used in a CI pipeline to test applications, there is often contention around the use of Selenium resources. This example shows you how to deploy Selenium to Kubernetes in a scalable fashion.

### Deploy Selenium Grid Hub:

We will be using Selenium Grid Hub to make our Selenium install scalable via a master/worker model. The Selenium Hub is the master, and the Selenium Nodes are the workers(not to be confused with Kubernetes nodes). We only need one hub, but we're using a replication controller to ensure that the hub is always running. In the `kubernetes` directory run the following:

```console
kubectl --namespace staging create --filename=selenium-hub-deployment.yml
```

The Selenium Nodes will need to know how to get to the Hub, let's create a service for the nodes to connect to.

```console
kubectl --namespace staging create --filename=selenium-hub-svc.yml
```

### Verify Selenium Hub Deployment

Let's verify our deployment of Selenium hub by connecting to the web console.

### Deploy Firefox and Chrome Nodes:

Now that the Hub is up, we can deploy workers.

The following will deploy n (determined in the line `replicas: 3`) Chrome nodes.

```console
kubectl --namespace staging create --filename=selenium-node-chrome-deployment.yml
```

And n (determined in the line `replicas: 3`) Firefox nodes.

```console
kubectl --namespace staging create --filename=selenium-node-firefox-deployment.yml
```

### Teardown

To remove all created resources, run the following:

```console
kubectl delete deployment selenium-hub --namespace staging
kubectl delete deployment selenium-node-chrome --namespace staging
kubectl delete deployment selenium-node-firefox --namespace staging
kubectl delete svc selenium-hub --namespace staging
```

### Debugging
 
Sometimes it is necessary to check on a hung test. Each pod is running VNC. To check on one of the browser nodes via VNC, it's recommended that you proxy, since we don't want to expose a service for every pod, and the containers have a weak VNC password. 

First make sure the correct context is selected: 

```console
kubectl config use-context bts-ecommerce-staging-app_server-cluster
```

Then replace POD_NAME with the name of the pod you want to connect to (i.e. 
`selenium-node-firefox-657f786b75-gd958`).

```console
kubectl port-forward $POD_NAME 5900:5900
```

Then connect to `localhost:5900` with your VNC client using the password `"secret"`
