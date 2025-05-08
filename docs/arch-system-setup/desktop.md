---
sidebar_position: 2
slug: /archsetup/desktop
---

# Desktop
Sweet, this is gonna be a sick setup. Let's dive in!

## Prerequisites
- Arch and the desired Desktop Environment or Window Manager is installed (equivalent to/or **desktop** setup with `archinstall`)
- The system is up to date. To update, run:
```bash
sudo pacman -Syyu
```

## Font Packages (nerd-fonts)
In order to use all icons for some applications and the ZSH shell we need to install some font packages:

```bash
yay -S noto-fonts-cjk noto-fonts-emoji
```

and the very complete ttf file from nerd-fonts-complete by downloading from [this repository](https://github.com/ryanoasis/nerd-fonts), unzipping and moving the font-file into the respected directory:

```bash
curl -OL https://github.com/ryanoasis/nerd-fonts/releases/latest/download/JetBrainsMono.tar.xz

mkdir -p /tmp/jetbrains-nerd-font
tar -xf JetBrainsMono.tar.xz -C /tmp/jetbrains-nerd-font

cp /tmp/jetbrains-nerd-font/JetBrainsMonoNerdFont-Bold.ttf ~/.local/share/fonts/

fc-cache -f -v

```
Restart the terminal / reinitialize the shell and any other programs you might need in order to update the emojis and icons for the next step or else they won't appear in the ZSH setup process.

## Icon pack (MacOS-Icons)
The MacOS icon theme looks very clean so let's install it:

```bash
ICONPACK_URL="https://github.com/zayronxio/Mkos-Big-Sur/releases/download/0.3/Mkos-Big-Sur.tar.xz"
TEMP_DIR=$(mktemp -d)
ICON_DIR="$HOME/.icons"
ICONPACK_NAME="Mkos-Big-Sur"

mkdir -p "$ICON_DIR"

# Download the icon pack
curl -L -o "$TEMP_DIR/Mkos-Big-Sur.tar.xz" "$ICONPACK_URL"

# Extract the downloaded icon pack
tar -xf "$TEMP_DIR/Mkos-Big-Sur.tar.xz" -C "$TEMP_DIR"

# Move the extracted icons to the user's icons directory
mv "$TEMP_DIR/$ICONPACK_NAME" "$ICON_DIR"

# Clean up temporary files
rm -rf "$TEMP_DIR"

# Set the icon theme using gsettings on Gnome
gsettings set org.gnome.desktop.interface icon-theme "$ICONPACK_NAME"
```

## Wallpaper
A decent wallpaper can be downloaded from this link (not my current one):

https://raw.githubusercontent.com/JonasunderscoreJones/ArchSystemSetup/refs/heads/main/wallpaper.jpg

## ZSH (4 humans)
We install the shell (yes, it is very dead but still amazing) as follows:

```bash
if command -v curl >/dev/null 2>&1; then
  sh -c "$(curl -fsSL https://raw.githubusercontent.com/romkatv/zsh4humans/v5/install)"
else
  sh -c "$(wget -O- https://raw.githubusercontent.com/romkatv/zsh4humans/v5/install)"
fi
```

## Pacman Configuration
The following commands change the visuals of pacman to be more colorful (and enable the easter-egg) and enables 5 simultaneous downloads:
```bash
sudo sed -i 's/#Color/Color/g' /etc/pacman.conf
sudo sed -i 's/#TotalDownload/TotalDownload/g' /etc/pacman.conf
sudo sed -i 's/#VerbosePkgLists/VerbosePkgLists/g' /etc/pacman.conf
sudo sed -i 's/#ParallelDownloads/ParallelDownloads/g' /etc/pacman.conf
sudo sed -i '/ParallelDownloads/a ILoveCandy' /etc/pacman.conf
```

## Yet Another Yoghurt (AUR)
Now we need a connection to the AUR. We install yay, an AUR manager:

```bash
sudo pacman -S --needed git base-devel && git clone https://aur.archlinux.org/yay.git && cd yay && makepkg -si
```

# Essential Packages
## Pacman
The most important packages needed for this setup can be installed with the following command:

System / CLI:
```bash
yay -S adb alsa-utils android-tools bluetoothctl bluez-utils browsh-bin btop cargo cloudflare-wrangler cmake cowsay docker dpkg eigen faac fastfetch fdisk fprintd github-cli gtk2 ibus ibus-hangul imagemagick img2pdf jasper jq libadwaita libdc1394 libdc1394 libjpeg9 libjpeg-turbo libtheora libtiff4 libvorbis linux-firmware man mkfs.vfat neofetch networkmananger  npm npx opencore-amr openexr php pipewire pipewire-pulse rclone rpm rustc scrcpy sl speedtest-cli sphinx stat syncthing texlive-latexextra v4l-utils vim wget wrangler x264 xvidcore yasm zip
```
Python packages:
```bash
yay -S pyright python-dotenv python-markdown python-matplotlib python-numpy python-pip python-praw python-psotipy python-pyautogui python-pycodestyle python-pygame python-pylast python-pylint python-spotipy python-tk python-tk spicetify spotipy
```
Programs:
```bash
yay -S xeyes-git realvnc-vnc-viewer lutris qjoypad pavucontrol jetbrains-toolbox gparted firefox firefox-nightly firefox-pwa cpupower-gui ark aseprite blockbench blueman
```
PS: You might not need all of these...

## Flatpak
The following flatpaks can also be installed:

```bash
flatpak install ca.desrt.dconf-editor cc.arduino.IDE2 com.bitwarden.desktop com.discordapp.Discord com.github.Matoking.protontricks com.github.tchx84.Flatseal com.heroicgameslauncher.hgl com.jaquadro.NBTExplorer com.mattjakeman.ExtensionManager com.modrinth.ModrinthApp com.obsproject.Studio com.playonlinux.PlayOnLinux4 com.protonvpn.www com.skype.Client com.spotify.Client com.sublimetext.three com.usebottles.bottles com.valvesoftware.Steam com.visualstudio.code dev.alextren.Spot dev.lasheen.qr fr.romainvigier.MetadataCleaner io.github.arunsivaramanneo.GPUViewer io.github.diegoivan.pdf_metadata_editor io.github.flattool.Warehouse io.github.Foldex.AdwSteamGtk io.gitlab.gregorni.Letterpress io.github.jonmagon.kdiskmark io.github.prateekmedia.appimagepool io.github.realmazharhussain.GdmSettings io.github.shiftey.Desktop io.github.thetumultuousunicornofdarkness.cpu-x io.github.ungoogled_software.ungoogled_chromium net.ankiweb.Anki net.lutris.Lutris org.audacityteam.Audacity org.bleachbit.BleachBit org.blender.Blender org.freedesktop.Piper org.gaphor.Gaphor org.gnome.Boxes org.gnome.design.IconLibrary org.gnome.PowerStats org.gnome.seahorse.Application org.gnome.World.PikaBackup org.kde.filelight org.kde.kdenlive org.kde.krita org.libreoffice.LibreOffice org.mozilla.Thunderbird org.onlyoffice.desktopeditors org.prismlauncher.PrismLauncher org.qbittorrent.qBittorrent org.raspberrypi.rpi-imager org.signal.Signal org.torproject.torbrowser-launcher org.videolan.VLC page.kramo.Cartridges sh.ppy.osu xyz.xclicker.xclicker
```

## SDKman and java
```bash
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk install java 21.0.3-oracle
```

# Drivers
## CPU (Intel)
```bash
yay -S xf86-video-intel vulkan-intel mesa lib32-mesa intel-hybrid-codec-driver intel-media-driver
```

## GPU (NVIDIA)
```bash
yay -S supergfxctl nvidia nvidia-prime nvidia-settings nvtop cuda-tools
```


# Desktop Environment & Window Manager
This guide covers [Gnome](#gnome), [KDE](#kde) and [Niri](#niri)
## Gnome
### Additional Software

A few additional Gnome applications are:

```bash
yay -S gnome-shell-extension gnome-tweaks
```

The same way we also get rid of a few programs:

```bash
yay -Rns gnome-contacts gnome-weather gnome-clocks gnome-maps gnome-tour gnome-connections gnome-music gnome-console gnome-calendar gnome-text-editor
```

We can install the firefox gnome theme:

```bash
curl -s -o- "https://raw.githubusercontent.com/rafaelmardojai/firefox-gnome-theme/master/scripts/install-by-curl.sh" | bash
```

### Gnome Extensions

Now we can install some gnome extensions. The one's I use/used at one point are:

```txt
AlphabeticalAppGrid@stuarthayhurst
batterytime@typeof.pw
blur-my-shell@aunetx
caffeine@patapon.info
clipboard-history@alexsaveau.dev
clipboard-indicator@tudmotu.com
color-picker@tuberry
compiz-alike-magic-lamp-effect@hermes83.github.com
dash-to-dock@micxgx.gmail.com
ddterm@amezin.github.com
drive-menu@gnome-shell-extensions.gcampax.github.com
fullscreen-avoider@noobsai.github.com
fullscreen-hot-corner@sorrow.about.alice.pm.me
fullscreen-to-empty-workspace@aiono.dev
grand-theft-focus@zalckos.github.com
impatience@gfxmonk.net
mediacontrols@cliffniff.github.com
net-label@slimani.dev
nightthemeswitcher@romainvigier.fr
power-profile-switcher@eliapasquali.github.io
quick-settings-tweaks@qwreey
Rounded_Corners@lennart-k
rounded-window-corners@fxgn
soft-brightness-plus@joelkitching.com
supergfxctl-gex@asus-linux.org
system-monitor@gnome-shell-extensions.gcampax.github.com
trayIconsReloaded@selfmade.pl
unredirect@vaina.lt
```

The easiest way is probably to just manually install them, there is however  a shell function for an automatic installation `install_gextension()` in [this](https://github.com/JonasunderscoreJones/ArchSystemSetup/blob/main/syssetup.sh) file.

### Gnome Settings
The following commands set a few settings within gnome:
```shell
# Add minimize and maximize buttons to the window title bar
gsettings set org.gnome.desktop.wm.preferences button-layout '":minimize,maximize,close"'

# Enable resizing with the right mouse button
gsettings set org.gnome.desktop.wm.preferences resize-with-right-button true

# Set the clock format to show the date and 24-hour time
gsettings set org.gnome.desktop.interface clock-format '24h'

# Configure window movement shortcuts
gsettings set org.gnome.settings-daemon.plugins.media-keys move-to-workspace-left '["<Shift><Super>Page_Down"]'
gsettings set org.gnome.settings-daemon.plugins.media-keys move-to-workspace-right '["<Shift><Super>Page_Up"]'

# Disable application switcher shortcut
gsettings set org.gnome.settings-daemon.plugins.media-keys app-switch '[]'

# Set Alt+Tab for window switching
gsettings set org.gnome.settings-daemon.plugins.media-keys window-switch '["<Alt>Tab"]'

# Configure media control shortcuts
gsettings set org.gnome.settings-daemon.plugins.media-keys next '["<Shift>F12"]'
gsettings set org.gnome.settings-daemon.plugins.media-keys play-pause '["<Shift>F11"]'
gsettings set org.gnome.settings-daemon.plugins.media-keys previous '["<Shift>F10"]'

# Set Ctrl+Q to close windows
gsettings set org.gnome.settings-daemon.plugins.media-keys close '["<Ctrl>q"]'

# Show battery percentage
gsettings set org.gnome.desktop.interface show-battery-percentage true

# Enable automatic suspend only on battery power
gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-timeout 0
gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-battery-timeout 30 # You can adjust the timeout as needed

# Enable dark mode
gsettings set org.gnome.desktop.interface gtk-theme 'Yaru-dark' # Adjust to your preferred dark theme

# Set touchpad scroll direction to traditional
gsettings set org.gnome.desktop.peripherals.touchpad natural-scroll false

# Set keyboard layout to English (US, intl with dead keys)
gsettings set org.gnome.desktop.input-sources sources "[('xkb', 'us:intl')]"
```
//TODO: additional config

## KDE
//TODO: config that is not yet translated to commands

## Niri
//TODO everything