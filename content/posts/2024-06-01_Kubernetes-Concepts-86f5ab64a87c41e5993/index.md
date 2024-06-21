---
title: Kubernetes Concepts
description: >-
    Kubernetes is a really nice tech. I wanna love it.
date: '2024-06-01T12:04:30.848Z'
categories: []
keywords: []
tags:
- summary
- dev
- courses
categories:
- devops
---
This writing is about my learning with kubernetes. This blog might be a quick look for my day to day uses with kubernetes. Hope you like it 🤌

## Kubernetes Workload

- An app in k8
- Pod is atomic workload
- Replicaset
- Deployment
- StatefulSet
- DeamonSet
- Task that run to completion
    - Job
    - CronJob

<aside>
⚠️ To get all the objets in kubernetes created

```bash
> kubectl get all
> We can ssh into kubernetes node
```

</aside>

## Kubernetes Pods

<aside>
⚠️ We should assume that

- App is in docker hub as docker image
- Kubernetes cluster is already setup
</aside>

### Pod

- Is a single instance of an application
- Smallest object that can be created in Kubernetes
- Has 1:1 relationship with your application (mostly)

<aside>
💡 We scale by adding more pods in either in same node or in a different node in the same cluster

</aside>

### Multi-container pods

- Helper container like scenario
- When we want to keep up
- Same network space and [localhost](http://localhost) connection and the same storage space.

To deploy container

```bash
# kubectl running nginx pod simple
kubectl run nginx —image nginx

# get the status of all the pods in the system
kubectl get pods
```

### Minikube Workshop

```bash
### MINIKUBE DEMO

# Create a deployment
kubectl create deployment hello-minikube --image=k8s.gcr.io/echoserver:1.10

# To get all the deployments
kubectl get deployments

# Expose deployment uisng nodeport --port=8000
kubectl expose deployment hello-minikube --type=NodePort --port=8080
service/hello-minikube exposed

```

### Pod Workshop

```bash
### Pods Workshop

# requires imge to use it
kubectl run nginx --image=nginx

# kubectl get pods to get the  pods
kubectl get pods
```

<aside>
📌 Flag -o is used to get the ip address of the nodes too within the cluster

![Untitled](img/Untitled.png)

</aside>

![Untitled](img/Untitled%201.png)

Containers will be creating to created state

![Untitled](img/Untitled%202.png)

```bash

kubectl describe pod <pod_name> # is more detailed compared to get pod
```

- Learn more about describe
    - Events
        - All the events which ran after the creation of pod
    - Containers

    ![Untitled](img/Untitled%203.png)


### Making pod using YAML in kubernetes

<aside>
📌 `kubectl [create|apply] -f pod-definition.yml`

</aside>

![Untitled](img/Untitled%204.png)

```yaml
## This must be named pod-defination.yml file

apiVersion: v1 # Version of kubernetes api # Depends upon which we want to make
kind: Pod # POD, Service, ReplicaSet, Deployment
metadata:
  name: myapp-pod
  labels: # custom keyvalue pair put any thing you want
  app: myapp
  type: front-end
spec:
  containers:
    - name: nginx-container
      image: nginx # name of docker image in image repo

```

---

## Kubernetes ReplicationControllers and ReplicaControlSet

- To run more than one pod in the node.
- Ensures that the required setup is met for number of pods
- For **load balancing and Scaling**

### Replication Controller vs Replica set

Replication Controller:

- older tech
- replaced by replica set

![Untitled](img/Untitled%205.png)

<aside>
📌 kubectl create -f rc-defination.yml

## Kubernetes Replicasets[ In depth ]

<aside>
⚠️ Recommended way is to create Deployments because of extra functionalities on top of replicaset

</aside>

- Primary method of managing pod replicas and their lifecycle to provide self-healing capabilities
- Their job is to always ensure the desired number of pods are running

![Untitled](img/Untitled%206.png)

![Untitled](img/Untitled%207.png)

</aside>

```yaml
# Replication Controller

apiVersion: v1
kind: ReplicationController
metadata:
  name: myapp-rc
  labels:
    app: myapp
    type: front-end
spec:
  replicas: 3

  template:        # As same as for pod
    metadata:
      name: myapp-pod
      labels:
        app: myapp
    spec:
      containers:
      - name: nginx-container
        image: nginx

```

<aside>
📌 We want to label everything in kubernetes, Labelling is like class name and we can filter by labels and selectors

</aside>

```yaml
# Replication-set Controller

apiVersion: apps/v1
kind: ReplicationController
metadata:
  name: myapp-rc
  labels:
    app: myapp
    type: front-end
spec:
  replicas: 3
  selector:        # major difference
		 matchLabels:
		   type: myapp # matching the myapp

  template:        # As same as for pod
    metadata:
      name: myapp-pod
      labels:
        app: myapp
    spec:
      containers:
      - name: nginx-container
        image: nginx

```

---

## Kubernetes Deployment

![Untitled](img/Untitled%208.png)

- For production
- For updates: Blue green, Rolling, Rollback etc
- Object higher than replica-set
- Create on template for each microservice

<aside>
⚠️ Rolling update is the default strategy for deployment

</aside>

![Untitled](img/Untitled%209.png)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:

  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80

  replicas: 3
  selector:
    matchLabels:
      app: nginx

```

![Untitled](img/Untitled%2010.png)

### Updates

- Changes replicaset from 5 to 0 in old version
- Changes replicaset from 0 to 5 in new version
- And vice versa in rollback

---

## Kubernets DaemonSet

- Ensure all nodes (or a subset) run an instance of a Pod
- Scheduled by the scheduler controller and run by the daemon controller
- As nodes are added to the cluster, Pods are added to them
- Typical uses
    - Running a cluster storage daemon
    - Running a logs collection daemon on every node
    - Running a node monitoring daemon on every node

![Untitled](img/Untitled%2011.png)

![Untitled](img/Untitled%2012.png)

---

## Kubernetes StatefulSet

- For Pods that must persist or maintain state

![Untitled](img/Untitled%2013.png)

![Untitled](img/Untitled%2014.png)

![Untitled](img/Untitled%2015.png)

![Untitled](img/Untitled%2016.png)

---

## Kubernetes Networking

<aside>
📌 In kubernetes, IP is assigned to pods. 10.244.x.x
Subject to change when pods are recreated

</aside>

<aside>
📌 In kubernetes, IP is assigned to nodes too.

</aside>

- Kubernetes doesn’t setup any networking for us
- We should setup networking ourself
- KUBERNETES EXPTECTS THIS
    - All PODs can communicate to one another without NAT
    - All nodes can communicate with al containers and vice versa without NAT

---

## Kubernetes Services

- Services enables connectivity between various parties
- Loose coupling between microservices
- Connection between FE to BE, Users to FE, etc

![Untitled](img/Untitled%2017.png)

### NodePort

- Listens to the port and forwards it to node port

ClusterIP

-

---

## Kubernetes Namespaces

![Untitled](img/Untitled%2018.png)

<aside>
📌 Create namespace in morning, assign it resources/objects and end of the day, delete it and remove all of it

![Untitled](img/Untitled%2019.png)

</aside>

![Untitled](img/Untitled%2020.png)

![Untitled](img/Untitled%2021.png)

![Untitled](img/Untitled%2022.png)

---

## Kubernetes Job

![Untitled](img/Untitled%2023.png)

![Untitled](img/Untitled%2024.png)

![Untitled](img/Untitled%2025.png)

### Cronjob In UTC

![Untitled](img/Untitled%2026.png)

![Untitled](img/Untitled%2027.png)

---

## Storage and Persistent volume data

## Volumes

![Untitled](img/Untitled%2028.png)

### Storage - Static Way

- Persistent Volumes
    - Represnts a storage resource
    - Cluster wide
    - Provisoned by an admin
- Persistent Volume Claim
    - A one to one mapping to persistent volume
- One or more pods can use a persistent volume Claom
- Can be consumed by any of the conatiners within the pod

![Untitled](img/Untitled%2029.png)

## Drawback

- Can lead to waste  of resources

### Persistent volumes and claims

![Untitled](img/Untitled%2030.png)

![Untitled](img/Untitled%2031.png)

![Untitled](img/Untitled%2032.png)

### Reclaim Policies

- Delete
    - Delete the data upon pods deletion
    - The default
- Retain
    - Keeps the data upon pods deletion


<aside>
⚠️

![Untitled](img/Untitled%2033.png)

</aside>

---

## Kubernetes ConfigMaps

![Untitled](img/Untitled%2034.png)

![Untitled](img/Untitled%2035.png)

![Untitled](img/Untitled%2036.png)

![Untitled](img/Untitled%2037.png)

![Untitled](img/Untitled%2038.png)

---

## Kubernetes Secrets

![Untitled](img/Untitled%2039.png)

![Untitled](img/Untitled%2040.png)

![Untitled](img/Untitled%2041.png)

![Untitled](img/Untitled%2042.png)

---

## Kubernetes Observability - Probes

![Untitled](img/Untitled%2043.png)

![Untitled](img/Untitled%2044.png)

![Untitled](img/Untitled%2045.png)

---

## Kubernetes HPA

![Untitled](img/Untitled%2046.png)

![Untitled](img/Untitled%2047.png)

---
