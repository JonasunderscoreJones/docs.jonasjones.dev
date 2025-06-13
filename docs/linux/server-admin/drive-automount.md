---
sidebar_position: 2
slug: /linux/server-admin/drive-automount
---

# Adding an Automount Drive on Linux

This guide explains how to configure a drive to automount at boot using `/etc/fstab`.

---

## Steps

### 1. Identify the Drive

List drives and partitions:

```bash
lsblk -f
```

Find the target partition (e.g., `/dev/sdc1`) and note its UUID:

```bash
blkid /dev/sdc1
```

### 2. Create a Mount Point

Choose or create a directory where the drive will mount:

```bash
sudo mkdir -p /mnt/mydrive
```

### 3. Backup `/etc/fstab`

Always back up before editing:

```bash
sudo cp /etc/fstab /etc/fstab.bak
```

### 4. Edit `/etc/fstab`

Open `/etc/fstab` with an editor:

```bash
sudo nano /etc/fstab
```

Add a line with the drive's UUID, mount point, filesystem type, and options. Example for ext4:

```
UUID=your-uuid-here /mnt/mydrive ext4 defaults 0 2
```

Replace `your-uuid-here` with the actual UUID.

### 5. Test the Configuration

Mount all entries without rebooting:

```bash
sudo mount -a
```

Check if the drive is mounted:

```bash
df -h | grep /mnt/mydrive
```

:::danger
If the test fails and you still reboot, the system will drop to emergency mode and manual intervention is required.

**In that case SSH WON'T WORK**
:::

### 6. Reboot and Verify

Reboot the system and confirm the drive automounts:

```bash
sudo reboot
```

After reboot:

```bash
mount | grep /mnt/mydrive
```
:::note
- Use `defaults` for standard mount options.
- For other filesystems (e.g., NTFS, FAT32), adjust filesystem type and options accordingly.
- If mounting fails at boot, system may drop to emergency mode; always test with `mount -a` first.
:::