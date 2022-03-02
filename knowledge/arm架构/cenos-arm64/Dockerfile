FROM centos:centos8

COPY node-v10.17.0-linux-arm64.tar.xz ./

RUN mkdir -p /usr/local/lib/nodejs \
    && tar -xJvf node-v10.17.0-linux-arm64.tar.xz -C /usr/local/lib/nodejs \
    && ln -s /usr/local/lib/nodejs/node-v10.17.0-linux-arm64/bin/node /usr/bin/node \
    && ln -s /usr/local/lib/nodejs/node-v10.17.0-linux-arm64/bin/npm /usr/bin/npm \
    && ln -s /usr/local/lib/nodejs/node-v10.17.0-linux-arm64/bin/npx /usr/bin/npx

COPY *.rpm ./

RUN yum localinstall -y nss-mdns-0.14.1-9.el8.aarch64.rpm \
  && yum localinstall -y libbsd-0.9.1-4.el8.aarch64.rpm \
  && yum localinstall -y minizip-2.8.9-2.el8.aarch64.rpm \
  && yum localinstall -y minizip1.2-1.2.11-24.el8.aarch64.rpm \
  && yum localinstall -y chromium-common-94.0.4606.81-1.el8.aarch64.rpm \
  && yum localinstall -y chromium-94.0.4606.81-1.el8.aarch64.rpm

RUN yum install -y alsa-lib.aarch64 atk.aarch64 cups-libs.aarch64 gtk3.aarch64 \
      libXcomposite.aarch64 libXcursor.aarch64 libXdamage.aarch64 libXext.aarch64 libXi.aarch64 \
      libXrandr.aarch64 libXScrnSaver.aarch64 libXtst.aarch64 pango.aarch64 xorg-x11-fonts-100dpi \
      xorg-x11-fonts-75dpi xorg-x11-fonts-cyrillic xorg-x11-fonts-misc xorg-x11-fonts-Type1 \
      xorg-x11-utils

CMD ["chromium-browser"]

# pupeteer截图时需要的中文字体
#RUN apt-get update && apt-get install -y fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg \
#    fonts-kacst ttf-freefont --no-install-recommends
