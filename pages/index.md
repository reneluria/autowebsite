example
=======

Link to [README](README)

elaticsearch
============

Install the ECK operator
```
kubectl apply -f https://download.elastic.co/downloads/eck/0.8.1/all-in-one.yaml
```

Create cluster

```
kubectl apply -f elastic-cluster.yml
```

Create kibana and ingress

```
jinja2 kibana.yml.j2 -D name=elastic | kubectl apply -f -
jinja2 kibana-ingress.yaml.j2 -D namespace=elastic -D name=elastic -D domain=cl-preprod.fakedomain. | kubectl apply -f -
```

fluentd
=======

```
curl https://codeload.github.com/kubernetes/kubernetes/tar.gz/master | tar -xz --strip=2 kubernetes-master/cluster/addons/fluentd-elasticsearch
```

```
jinja2 fluentd-elaticsearch-values.yaml.j2 \
    -D es_password=$(kubectl get secret elastic-elastic-user -o jsonpath='{.data.elastic}' | base64 --decode) \
    -D es_host=elastic-es > /tmp/fluentd-elaticsearch-values.yaml
helm repo add kiwigrid https://kiwigrid.github.io
helm install --name fluentd \
    --namespace elastic \
    --values /tmp/fluentd-elaticsearch-values.yaml \
    kiwigrid/fluentd-elasticsearch
```