---
title : "nginx"
# pre : ' '
description : "HTTP and reverse proxy server, mail proxy server."
date : 2020-05-19T11:47:46+02:00
# hidden : true
# draft : true
weight : 240
# tags : ['']
---

---

HTTP and reverse proxy server, mail proxy server.

## Installation

```plain
sudo apt install nginx
```

To support custom headers et cetra

```plain
sudo apt install nginx-extras
```

## Usage

```plain
nginx [-?hvVtTq] [-s signal] [-c filename] [-p prefix] [-g directives]
```

## Flags

```plain
Options:
  -?,-h         : this help
  -v            : show version and exit
  -V            : show version and configure options then exit
  -t            : test configuration and exit
  -T            : test configuration, dump it and exit
  -q            : suppress non-error messages during configuration testing
  -s signal     : send signal to a master process: stop, quit, reopen, reload
  -p prefix     : set prefix path (default: /usr/share/nginx/)
  -c filename   : set configuration file (default: /etc/nginx/nginx.conf)
  -g directives : set global directives out of configuration file
```

## Examples

### Strong TLS-config (nginx.conf)

This config is used server wide as default, individual sites can use other settings if preferred

```plain
ssl_protocols TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
ssl_prefer_server_ciphers on;
ssl_ciphers TLS13-CHACHA20-POLY1305-SHA256:TLS13-AES-256-GCM-SHA384:EECDH+CHACHA20:ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:!aNULL:!eNULL:!LOW:!RC4:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS;
```

### Disable nginx version in error response (nginx.conf)

```plain
server_tokens off;
```

### Replace server header (nginx.conf)

```plain
more_set_headers 'Server: Apache/1.3.37';
```

### Disable HTTP-compression (nginx.conf)

```plain
gzip off;
```

### Redirect HTTP to HTTPS

```plain
if ($scheme = http) {
return 301 https://$server_name$request_uri;
}
```

### Config reverse proxy

This example includes TLS certificates and redirection of HTTP to HTTPS

```plain
server {
    listen 80;
    listen 443 ssl http2;

    server_name test.example.com;

    location / {
        proxy_pass https://10.10.10.10:8888;
    }

    ssl_certificate /etc/letsencrypt/live/test.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/test.example.com/privkey.pem;

    if ($scheme = http) {
    return 301 https://$server_name$request_uri;
    }
}
```

### Security headers

The 'always' parameter ensures that the header is set for all responses, including internally generated error responses.

```plain
# SecureConfig - optional if you want to override the server default
ssl_protocols TLSv1.2 TLSv1.3;
ssl_session_cache shared:TLS:2m;
ssl_buffer_size 4k;

# OCSP via Cloudflare
ssl_stapling on;
ssl_stapling_verify on;
resolver 1.1.1.1 1.0.0.1 [2606:4700:4700::1111] [2606:4700:4700::1001]; # Cloudflare

# HSTS
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

# X-Frame-Options (clickjacking)
add_header X-Frame-Options "SAMEORIGIN" always;

# XSS-Frame-Option
add_header X-XSS-Protection "1; mode=block" always;

# X-Content-Type-Options
add_header X-Content-Type-Options "nosniff" always;

# Feature-Policy (old, see new Permissions-Policy)
add_header Feature-Policy "vibrate 'self'";

# Permissions-Policy
add_header Permissions-Policy "geolocation=(), microphone=()";

# Referrer
add_header Referrer-Policy "no-referrer" always;

# Content Security Policy (CSP)
add_header Content-Security-Policy "default-src https:; frame-ancestors 'none'";
OR add_header Content-Security-Policy "frame-ancestors 'self' https://mail.example.com; block-all-mixed-content; upgrade-insecure-requests";

# Expect-CT
add_header Expect-CT "max-age=0";
```

### Passing headers thru proxy

For example IP-addresses of clients coming thru the proxy.

```plain
proxy_pass_header  Set-Cookie;

proxy_set_header   Host               $host;
proxy_set_header   X-Real-IP          $remote_addr;
proxy_set_header   X-Forwarded-Proto  $scheme;
proxy_set_header   X-Forwarded-For    $proxy_add_x_forwarded_for;
```

### Passing real client IP from Cloudflare proxy

Add to vhost config in nginx.

```plain
set_real_ip_from 103.21.244.0/22;
set_real_ip_from 103.22.200.0/22;
set_real_ip_from 103.31.4.0/22;
set_real_ip_from 104.16.0.0/12;
set_real_ip_from 108.162.192.0/18;
set_real_ip_from 131.0.72.0/22;
set_real_ip_from 141.101.64.0/18;
set_real_ip_from 162.158.0.0/15;
set_real_ip_from 172.64.0.0/13;
set_real_ip_from 173.245.48.0/20;
set_real_ip_from 188.114.96.0/20;
set_real_ip_from 190.93.240.0/20;
set_real_ip_from 197.234.240.0/22;
set_real_ip_from 198.41.128.0/17;
set_real_ip_from 2400:cb00::/32;
set_real_ip_from 2606:4700::/32;
set_real_ip_from 2803:f800::/32;
set_real_ip_from 2405:b500::/32;
set_real_ip_from 2405:8100::/32;
set_real_ip_from 2c0f:f248::/32;
set_real_ip_from 2a06:98c0::/29;


real_ip_header CF-Connecting-IP;
```

### Removing headers from response server

```plain
proxy_hide_header Strict-Transport-Security;
```

### Wordpress hosting

```plain
sudo apt install php7.2-common php7.2-fpm php7.2-mysql mysql-server php7.2-gd
```

```plain
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    root /var/www/wordpress.example.com;
    index index.php index.html index.htm index.nginx-debian.html;
    server_name wordpress.example.com;

    location / {
    try_files $uri $uri/ /index.php?$args;

    location ~ \.php$ {
           include snippets/fastcgi-php.conf;
           fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
    }

    # HTTP > HTTPS
    if ($scheme = http) {
    return 301 https://$server_name$request_uri;
    }

        location ~ /\.ht {
                deny all;
    }
}
```

### HTTP-basic authentication

```plain
sudo apt install apache2-utils
```

```plain
sudo htpasswd -c /etc/nginx/.htpasswd user1
```

```plain
# Basic Authentication
auth_basic "Password required";
auth_basic_user_file /etc/nginx/.htpasswd;
```

### Rate Limiting

Edit nginx.conf and make zones with name and limit as needed.

```plain
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=250r/s;
```

Edit vhost config and name the limiter

```plain
limit_req zone=mylimit;
```

### Disable unwanted HTTP-methods

Edit vhost config

```plain
location / {
limit_except GET HEAD POST { deny all; }
}
```

### Reverse proxy Microsoft Exchange

```plain
geo $access_allowed {
    default         0;
    10.10.10.0/24  1;
}

server {
        listen 80;
        server_name mail.example.com;

        return 301 https://mail.example.com;
}

server {
        listen 443 ssl http2;
        server_name mail.example.com autodiscover.example.com;

        location / {
        return 301 https://mail.example.com/owa;
        }

        # Alllowed endpoints
        location ~* ^/owa { proxy_pass https://mail.example.com; }
        location ~* ^/Autodiscover { proxy_pass https://mail.example.com; }
        location ~* ^/Microsoft-Server-ActiveSync { proxy_pass https://mail.example.com; }
        # If access allowed used for blocking access using GEO, otherwise delete string
        location ~* ^/ecp { if ($access_allowed) { proxy_pass https://mail.example.com; } }
        location ~* ^/duo { proxy_pass https://mail.example.com; }
        location ~* ^/mapi { proxy_pass https://mail.example.com; }
        location ~* ^/EWS { proxy_pass https://mail.example.com; }

        proxy_read_timeout      360;
        proxy_pass_header       Date;
        proxy_pass_header       Server;
        proxy_pass_request_headers on;

        proxy_set_header        Host $host;
        proxy_set_header        X-Real-IP $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header        Accept-Encoding "";
        proxy_set_header        Connection "Keep-Alive";

        proxy_buffering off;

        client_max_body_size 8M;

        # Authentication for Outlook against /mapi
        more_set_headers -s 401 'WWW-Authenticate: Basic realm="mail.example.com"';

        # SSL certificate
        ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
        ssl_session_timeout 5m;

        # Log files
        error_log /var/log/nginx/owa-ssl-error.log;
        access_log /var/log/nginx/owa-ssl-access.log;
}
```

### GeoIP blocking

```plain
sudo apt install geoip-database libgeoip1
```

nginx.conf should contain something like:

```plain
geoip_country /usr/share/GeoIP/GeoIP.dat;
map $geoip_country_code $allowed_country {
    default yes;
    CN no;
    RO no;
    RU no;
}
```

Site config should contain something like:

```plain
if ($allowed_country = no) {
    return 444;
}
```

### Return empty response on every error page

```plain
error_page 301 400 403 404 500 502 503 504 =444 /444.html;
location = /444.html {
            return 444;
}
```

## URL List

- [Nginx.org](https://nginx.org/)
- [Nginx.org - Basic Authenticaton](https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/)
