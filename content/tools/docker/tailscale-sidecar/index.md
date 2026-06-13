---
title : "Tailscale Sidecar Examples"
# pre : ' '
description : "Tailscale Sidecar Configurations for Docker."
date : 2025-01-02T15:01:38+01:00
# hidden : true
# draft : true
weight : 40
# tags : ['']
---

---

Discover Seamless Docker Networking with Tailscale.

If you're working with Docker and looking for a streamlined way to manage secure, private networking between containers across devices, check out the **Tailscale Docker Sidecar Configs** project: [2Tiny2Scale/tailscale-docker-sidecar-configs](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs).

This repository offers example `docker-compose.yml` configurations designed to simplify deploying services with Tailscale as a sidecar. Whether you're setting up secure connectivity for self-hosted applications or exploring lightweight VPN solutions, this project is a great starting point.

Key features include:

- **Plug-and-play examples**: Quickly integrate Tailscale into your Dockerized services.
- **Simplified connectivity**: Effortlessly enable private networking between containers across devices.
- **Customizable configurations**: Adapt to your specific needs and environments.

Explore the repository, try out the examples, and feel free to contribute or provide feedback! 🚀

## Available Configurations

### Networking and Security

| 🌐 Service                 | 📝 Description                                                           | 🔗 Link                                 |
| -------------------------- | ------------------------------------------------------------------------ | --------------------------------------- |
| 🛡️ **AdGuard Home**        | Network-wide software for blocking ads and tracking.                     | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/adguardhome)         |
| 🧩 **Pi-hole**             | A network-level ad blocker that acts as a DNS sinkhole.                  | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/pihole)              |
| 🔒 **Technitium DNS**      | An open-source DNS server that can be used for self-hosted DNS services. | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/technitium)          |
| 🌐 **Traefik**             | A modern reverse proxy and load balancer for microservices.              | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/traefik)             |
| 🚀 **Tailscale Exit Node** | Configure a device to act as an exit node for your Tailscale network.    | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/tailscale-exit-node) |
| 🌐 **DDNS Updater**        | A self-hosted solution to keep DNS A/AAAA records updated automatically. | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/ddns-updater)        |

### Media and Entertainment

| 🎥 Service         | 📝 Description                                                                             | 🔗 Link                         |
| ------------------ | ------------------------------------------------------------------------------------------ | ------------------------------- |
| 🎬 **Plex**        | A media server that organizes video, music, and photos from personal media libraries.      | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/plex)        |
| 📺 **Jellyfin**    | An open-source media system that puts you in control of managing and streaming your media. | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/jellyfin)    |
| 🎞️ **Radarr**      | A movie collection manager for Usenet and BitTorrent users.                                | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/radarr)      |
| 📡 **Sonarr**      | A PVR for Usenet and BitTorrent users to manage TV series.                                 | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/sonarr)      |
| 🎥 **Bazarr**      | A companion tool to Radarr and Sonarr for managing subtitles.                              | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/bazarr)      |
| 📊 **Tautulli**    | A monitoring and tracking tool for Plex Media Server.                                      | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/tautulli)    |
| 📥 **qBittorrent** | An open-source BitTorrent client.                                                          | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/qbittorrent) |
| 🔗 **Slink**       | A fast, self-hosted alternative to ShareDrop for secure local file sharing.                | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/slink)       |

### Productivity and Collaboration

| 💼 Service           | 📝 Description                                                                  | 🔗 Link                            |
| -------------------- | ------------------------------------------------------------------------------- | ---------------------------------- |
| ☁️ **NextCloud**     | A suite of client-server software for creating and using file hosting services. | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/nextcloud)      |
| 📝 **Excalidraw**    | A virtual collaborative whiteboard tool.                                        | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/excalidraw)     |
| 🔗 **Pingvin Share** | A self-hosted file sharing platform.                                            | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/pingvin-share/) |
| 🗂️ **Stirling-PDF**  | A web application for managing and editing PDF files.                           | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/stirlingpdf)    |
| 🧠 **LanguageTool**  | An open-source proofreading software for multiple languages.                    | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/languagetool)   |
| 🔄 **Resilio Sync**  | A fast, reliable, and simple file sync and share solution.                      | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/resilio-sync)   |
| 🗃️ **Vaultwarden**   | An unofficial Bitwarden server implementation written in Rust.                  | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/vaultwarden)    |
| 🌿 **Isley**         | A self-hosted cannabis grow journal for tracking plants and managing grow data. | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/isley)          |

### Development Tools

| 🛠️ Service                | 📝 Description                                                                           | 🔗 Link                             |
| ------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------- |
| 🔧 **Cyberchef**          | A web app for encryption, encoding, compression, and data analysis.                      | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/cyberchef)       |
| 🔍 **searXNG**            | A free internet metasearch engine which aggregates results from various search services. | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/searxng)         |
| 🖥️ **Node-RED**           | A flow-based development tool for visual programming.                                    | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/nodered)         |
| 🖥️ **IT-Tools**           | A collection of handy online tools for developers and sysadmins.                         | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/it-tools)        |
| 🖥️ **Dozzle**             | A real-time log viewer for Docker containers.                                            | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/dozzle)          |
| 🖥️ **Portainer**          | A lightweight management UI which allows you to easily manage your Docker environments.  | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/portainer)       |
| 🖥️ **Gokapi**             | A lightweight self-hosted file sharing platform.                                         | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/gokapi)          |
| 🖥️ **Homarr**             | A sleek dashboard for all your Homelab services.                                         | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/homarr)          |
| 🖥️ **Changedetection.io** | A tool for monitoring website changes.                                                   | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/changedetection) |

### Monitoring and Analytics

| 📈 Service         | 📝 Description                                                                      | 🔗 Link                         |
| ------------------ | ----------------------------------------------------------------------------------- | ------------------------------- |
| 📊 **Uptime Kuma** | A self-hosted monitoring tool like "Uptime Robot".                                  | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/uptime-kuma) |
| 📉 **Beszel**      | A lightweight server monitoring hub with historical data, Docker stats, and alerts. | [Details](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/tree/main/services/beszel)      |

## Tailscale Funnel vs. Tailscale Serve

Tailscale Funnel securely exposes services to the public internet. Tailscale Serve is for sharing content within a private Tailscale network (Tailnet). You'll need to decide how you want to expose the service, the configurations in this repository exposes the local Tailnet.

### Tailscale Funnel

[Tailscale Funnel](https://tailscale.com/kb/1223/funnel) is a feature that lets you route traffic from the wider internet to a local service running on a machine in your Tailscale network (known as a tailnet). You can think of this as publicly sharing a local service, like a web app, for anyone to access—even if they don’t have Tailscale themselves.

An example configuration for Tailscale Funnel for your service is available [here](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/blob/main/funnel-serve/funnel-example.json).

![example](images/tailscale-funnel.png)
![Tailscale Funnel](images/tailscale-funnel.png)

### Tailscale Serve

[Tailscale Serve](https://tailscale.com/kb/1312/serve) is a feature that lets you route traffic from other devices on your Tailscale network (known as a tailnet) to a local service running on your device. You can think of this as sharing the service, such as a website, with the rest of your tailnet.

An example configuration for Tailscale Serve for your service is available [here](https://github.com/2Tiny2Scale/tailscale-docker-sidecar-configs/blob/main/funnel-serve/serve-example.json).

![Tailscale Serve](images/tailscale-serve.png)

## Tailscale Documentation

- [Tailscale.com - Knowledge Base](https://tailscale.com/kb)
- [Tailscale.com - Funnel](https://tailscale.com/kb/1223/funnel)
- [Tailscale.com - Serve](https://tailscale.com/kb/1242/tailscale-serve)
- [Tailscale.com - Docker Tailscale Guide](https://tailscale.com/blog/docker-tailscale-guide)
