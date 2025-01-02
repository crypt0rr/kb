---
title : "Docker"
# pre : ' '
description : "A self-sufficient runtime for containers."
date : 2021-05-19T13:55:42+02:00
# hidden : true
# draft : true
weight : 10
# tags : ['']
---

---

A self-sufficient runtime for containers.

Where to get your Docker images:

- [Hub.docker.com - Build and Ship any Application Anywhere](https://hub.docker.com/)
- [Linuxserver.io - Building and maintaining community images](https://www.linuxserver.io/)

## Installation

Preferably you install Docker in a non-root / non-sudo user. Follow the next steps to do so.

```plain
sudo adduser docker-user
sudo groupadd docker
sudo usermod -aG docker docker-user
sudo apt-get update && sudo apt-get install apt-transport-https ca-certificates curl software-properties-common && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update && sudo apt-get install docker-ce docker-ce-cli containerd.io
```

## Usage

```plain
docker [OPTIONS] COMMAND
```

## Flags

```plain
Options:
      --config string      Location of client config files (default "/home/b/.docker")
  -c, --context string     Name of the context to use to connect to the daemon (overrides DOCKER_HOST env var and default context set with "docker context use")
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket(s) to connect to
  -l, --log-level string   Set the logging level ("debug"|"info"|"warn"|"error"|"fatal") (default "info")
      --tls                Use TLS; implied by --tlsverify
      --tlscacert string   Trust certs signed only by this CA (default "/home/b/.docker/ca.pem")
      --tlscert string     Path to TLS certificate file (default "/home/b/.docker/cert.pem")
      --tlskey string      Path to TLS key file (default "/home/b/.docker/key.pem")
      --tlsverify          Use TLS and verify the remote
  -v, --version            Print version information and quit

Management Commands:
  builder     Manage builds
  config      Manage Docker configs
  container   Manage containers
  context     Manage contexts
  image       Manage images
  manifest    Manage Docker image manifests and manifest lists
  network     Manage networks
  node        Manage Swarm nodes
  plugin      Manage plugins
  secret      Manage Docker secrets
  service     Manage services
  stack       Manage Docker stacks
  swarm       Manage Swarm
  system      Manage Docker
  trust       Manage trust on Docker images
  volume      Manage volumes

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  build       Build an image from a Dockerfile
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  history     Show the history of an image
  images      List images
  import      Import the contents from a tarball to create a filesystem image
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  login       Log in to a Docker registry
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes

Run 'docker COMMAND --help' for more information on a command.

To get more help with docker, check out our guides at https://docs.docker.com/go/guides/
```

## Examples

### Installing Vaultwarden

To update an existing container, re-run the ```docker pull```.

```plain
$ sudo docker pull vaultwarden/server:latest                   
latest: Pulling from vaultwarden/server
f7ec5a41d630: Pull complete 
d8e79adb0277: Pull complete 
e1d332ecb5ab: Pull complete 
2a3636697a5d: Pull complete 
ffdfbd9d56fc: Pull complete 
2ebce0997e77: Pull complete 
45500d8b63b3: Pull complete 
ff5f5fceccb6: Pull complete 
Digest: sha256:9303a3efb19f002631c7825b8db1eceb4a97bac716d391ac4b434f9aef344958
Status: Downloaded newer image for vaultwarden/server:latest
docker.io/vaultwarden/server:latest
```

### Running image

```plain
$ sudo docker run -d --name vaultwarden -v /vw-data/:/data/ -p 80:80 vaultwarden/server:latest
371ae7c4a9ee697218b7f418a3d410781a140875b50ff817dd1531a9f1624edb
```

### List running images

```plain
$ sudo docker ps                         
CONTAINER ID   IMAGE                       COMMAND                  CREATED         STATUS                             PORTS                          NAMES
371ae7c4a9ee   vaultwarden/server:latest   "/usr/bin/dumb-init …"   5 minutes ago   Up 10 seconds (health: starting)   0.0.0.0:80->80/tcp, 3012/tcp   vaultwarden
```

### List running and non-running images

```plain
$ sudo docker ps -a                  
CONTAINER ID   IMAGE                       COMMAND                  CREATED          STATUS                        PORTS     NAMES
371ae7c4a9ee   vaultwarden/server:latest   "/usr/bin/dumb-init …"   27 minutes ago   Exited (143) 15 seconds ago             vaultwarden
```

### Start / stop images

```plain
sudo docker start <name>
```

```plain
sudo docker stop <name>
```

### Remove image

```plain
sudo docker rm <name>
```

## URL List

- [Docker.com](https://www.docker.com/)
- [Hub.docker.com - Build and Ship any Application Anywhere](https://hub.docker.com/)
- [Linuxserver.io - Building and maintaining community images](https://www.linuxserver.io/)
