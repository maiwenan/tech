FROM node:16.13.1

# 添加基础工具
RUN apt-get update \
    && apt-get install -y wget gnupg alien curl

# pupeteer截图时需要的中文字体
RUN apt-get update && apt-get install -y  fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst --no-install-recommends

# puppteer在linux(Ubuntu)运行时需要的基础库
RUN apt-get install -y gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 \
    libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 \
    libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation \
    libappindicator1 libnss3 lsb-release xdg-utils xz-utils

COPY chromium-armv10server/*.rpm ./

RUN alien --to-deb --scripts avahi-0.7-21.ky10.aarch64.rpm --target=arm64 \
  && dpkg -i --force-overwrite avahi_0.7-22_arm64.deb \
  && alien --to-deb --scripts nss-mdns-0.14.1-3.ky10.aarch64.rpm --target=arm64 \
  && dpkg -i --force-overwrite nss-mdns_0.14.1-4_arm64.deb \
  && alien --to-deb --scripts u2f-hidraw-policy-1.0.2-9.ky10.aarch64.rpm --target=arm64 \
  && dpkg -i --force-overwrite u2f-hidraw-policy_1.0.2-10_arm64.deb \
  && alien --to-deb --scripts chromium-common-71.0.3578.98-5.ky10.aarch64.rpm --target=arm64 \
  && dpkg -i --force-overwrite chromium-common_71.0.3578.98-6_arm64.deb \
  && alien --to-deb --scripts chromium-libs-media-71.0.3578.98-5.ky10.aarch64.rpm --target=arm64 \
  && dpkg -i --force-overwrite chromium-libs-media_71.0.3578.98-6_arm64.deb \
  && alien --to-deb --scripts chromium-libs-71.0.3578.98-5.ky10.aarch64.rpm --target=arm64 \
  && dpkg -i --force-overwrite chromium-libs_71.0.3578.98-6_arm64.deb \
  && alien --to-deb --scripts chromium-71.0.3578.98-5.ky10.aarch64.rpm --target=arm64 \
  && dpkg -i --force-overwrite chromium_71.0.3578.98-6_arm64.deb
