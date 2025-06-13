---
sidebar_position: 1
slug: /misc/linux/server-admin/docker-mailserver
---

# Docker Mailserver

This guide installs docker-mailserver with SSL/TLS for secure incoming and outgoing mail.

## Step 1: Create project directory
```bash
mkdir docker-mailserver
cd docker-mailserver
```

## Step 2: Create SSL Certificates
If your mail server domain is publicly accessible, use Certbot to obtain trusted SSL certificates for free.
### use Let's Encrypt
```bash
sudo certbot certonly --manual --preferred-challenges dns -d mail.jonasjones.dev
```
Now, add a TXT DNS-Record as indicated by the instructions in the terminal, then hit enter.

This creates certificates typically in /etc/letsencrypt/live/mail.example.com/:

    - `fullchain.pem` — full certificate chain

    - `privkey.pem` — private key

Create the directory to put the certificates in (inside the mailserver directory):
```bash
mkdir config
mkdir config/ssl
```
Now You can copy the certificates into the directory:
```bash
sudo cp /etc/letsencrypt/live/mail.example.com/fullchain.pem config/ssl/
sudo cp /etc/letsencrypt/live/mail.example.com/privkey.pem config/ssl/
```
## Step 3: Create docker-compose.yml
```yaml
version: '3.8'

services:
  mailserver:
    image: mailserver/docker-mailserver:latest
    hostname: mail
    domainname: example.com
    container_name: mailserver
    ports:
      - "25:25"      # SMTP
      - "143:143"    # IMAP
      - "587:587"    # Submission (SMTP with STARTTLS)
      - "993:993"    # IMAPS (IMAP over SSL)
    volumes:
      - maildata:/var/mail
      - mailstate:/var/mail-state
      - ./config/:/tmp/docker-mailserver/
      - ./config/ssl/:/etc/letsencrypt/live/mail.example.com/:ro
    environment:
      - ENABLE_SPAMASSASSIN=1
      - ENABLE_CLAMAV=1
      - ENABLE_FAIL2BAN=1
      - ENABLE_POSTGREY=1
      - ONE_DIR=1
      - DMS_DEBUG=0
      - SSL_TYPE=manual
      - SSL_CERT_PATH=/etc/letsencrypt/live/mail.example.com/mail.example.com.crt
      - SSL_KEY_PATH=/etc/letsencrypt/live/mail.example.com/mail.example.com.key
      - SSL_DHPARAM_PATH=/etc/letsencrypt/live/mail.example.com/dhparam.pem  # Optional
    restart: always

volumes:
  maildata:
  mailstate:
```

## Step 4: Add DH-Parmeters (recommended)
```bash
openssl dhparam -out ./config/ssl/dhparam.pem 2048
```
DH parameters strengthen SSL security by enabling perfect forward secrecy during key exchange. Generating your own DH parameters helps prevent some cryptographic attacks.

## Step 5: Start Container
```bash
docker-compose up -d
```
The logs will show errors about there having to be at least one mail account, this one will be created in the next step

## Step 6: Create Mail Account
```bash
docker exec -it mailserver setup email add user@example.com password
```
OR
```bash
docker exec -it mailserver setup email add user@example.com
```
If You don't want the password to be saved in your command history. You will be prompted for a password right after hitting enter

## Step 7: Verify SSL/TLS
```
openssl s_client -connect mail.example.com:993
openssl s_client -starttls smtp -connect mail.example.com:587
```

## Step 8: Add Email Aliases (Optional)
First, create the alias file:
```bash
nano config/postfix-virtual.cf
```
Now You have multiple options:
- Single Email alias:
    ```text
    admin@example.com      me@example.com
    ```
- Catch-All alias
    ```text
    @example.com           me@example.com
    ```
The file can contain multiple aliases, one per line

Now add the following Env variable to the docker-compose file if not already set:
```yaml
environment:
  - ENABLE_POSTFIX_VIRTUAL_TRANSPORT=1
```

Finally, restart the docker container:
```
docker-compose up -d
```
