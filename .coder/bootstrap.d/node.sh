#!/bin/bash

set -euo pipefail

sudo mkdir -pm755 /etc/apt/keyrings
wget -O - https://dl.winehq.org/wine-builds/winehq.key | sudo gpg --dearmor -o /etc/apt/keyrings/winehq-archive.key -
source /etc/os-release
sudo wget -NP /etc/apt/sources.list.d/ https://dl.winehq.org/wine-builds/ubuntu/dists/${VERSION_CODENAME}/winehq-${VERSION_CODENAME}.sources
sudo apt update

# https://github.com/nodesource/distributions
# https://github.com/nodesource/distributions/blob/master/scripts/deb/setup_current.x
curl -fsSL https://deb.nodesource.com/setup_23.x -o /tmp/nodesource_setup.sh
sudo bash /tmp/nodesource_setup.sh
sudo apt-get install --no-install-recommends -y nodejs
node -v

sudo apt-get install --no-install-recommends -y imagemagick
sudo apt-get install --no-install-recommends -y libopenjp2-tools rpm bsdtar
sudo apt-get install --install-recommends -y winehq-stable

sudo npm install -g npm@latest
sudo npm install -g @electron/packager
sudo npm install -g corepack@latest
yarn set version stable
yarn install

