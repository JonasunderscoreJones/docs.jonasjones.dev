---
sidebar_position: 3
slug: /guides/linux/server-admin/swap-files
---

# Swap Files

:::info
This guide helps with understanding Swap Files on Linux
:::

Unless You thought of a Swap-Partition when installing Linux or just got one because it's the golden standard on most Linux Installers, You might only be using Your physicl Memory.

Finding Yourself with too little physical memory is not a rarity, especially on servers with many simultaneous processes.

If You have the space on a decently fast SSD on the server, You can use that to create a `swapfile`. This acts almost the same way as a swap-partition but can even be more flexible in some cases.

### Create swapfile

```shell
sudo fallocate -l 2G /swapfile
```

:::warning
If You are using `BTRFS` as Your filesystem, use this command instead, to create the swapfile:

```shell
sudo btrfs filesystem mkswapfile --size 2G /swapfile
```
:::

We'll call the swapfile `swapfile` and put it in the root directory, hence `/swapfile` and make it 2GB in size. These can be adjusted per your needs.

### Apply the necessary permissions

```shell
sudo chmod 600 /swapfile
```

### Turn swap on

```shell
sudo mkswap /swapfile
sudo swapon /swapfile
```
### Make changes permanent

To make this permanent and auto-enable swap on every boot, add the following to `/etc/fstab`:

```shell
/swapfile none swap sw 0 0
```
### Verify

Finally, let's verify that everything worked and that we have no errors in our `/etc/fstab` configuration as this could cause boot failures.

For that we will turn our swapfile off and use the configurtion in `/etc/fstab` to turn it on:

```shell
sudo swapoff /swapfile
sudo swapon -a
```

Then, if we get no errors, we can verify that it worked with:

```shell
swapon --show
findmnt --verify
```

You should be seing the swapfile listed with details like size, used and priority and below that the phrase: `Success, no errors or warnings detected`.
