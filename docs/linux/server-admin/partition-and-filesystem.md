---
sidebar_position: 1
slug: /linux/server-admin/partition-and-filesystem
---

# Creating Partition Tables and Filesystems on Linux

This guide covers creating partition tables and filesystems using command-line tools.

---

## 1. Identify the Disk

List disks and partitions:

```bash
lsblk
```

Assume the target disk is `/dev/sdc`.

---

## 2. Create a Partition Table with `fdisk`

Start fdisk:

```bash
sudo fdisk /dev/sdc
```

### Inside `fdisk`:

- Create a new GPT partition table (recommended for disks >2TB):

```
g
```
- Create a new partition:
```
n
```
- Accept defaults for partition number, first sector, and last sector (full disk).

- Write changes and exit:
```
w
```

---

## 3. Format the Partition

Assuming partition `/dev/sdc1`:

- Create an ext4 filesystem:

```bash
sudo mkfs.ext4 /dev/sdc1
```

- For other filesystems:

  - NTFS: `sudo mkfs.ntfs /dev/sdc1`
  - FAT32: `sudo mkfs.vfat /dev/sdc1`

---

## 4. Verify the Filesystem

```bash
sudo blkid /dev/sdc1
```

Check UUID and filesystem type.

---

## 5. Mount the Partition

Create mount point and mount:

```bash
sudo mkdir -p /mnt/mydrive
sudo mount /dev/sdc1 /mnt/mydrive
```

Verify:

```bash
df -h | grep /mnt/mydrive
```

---

## 6. Automount (Optional)

Follow the **Adding an Automount Drive** guide to configure `/etc/fstab`.


:::note
- Creating new partition tables and filesystems will erase data on the disk.
- Backup important data before proceeding.
- Use GPT for disks larger than 2TB; MBR is limited to ~2TB.
- Use `parted` or `gparted` for GUI or more advanced partitioning.
:::