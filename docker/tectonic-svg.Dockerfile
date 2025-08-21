# Node + Debian(bookworm) 기반: svgo와 스크립트 실행 용이
FROM node:22-bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive

# 시스템 의존성 설치
# - tectonic: LaTeX 엔진
# - dvisvgm, ghostscript: PDF→SVG
# - Noto CJK: 한글 포함 폰트
RUN apt-get update && apt-get install -y \
    tectonic dvisvgm ghostscript \
    fonts-noto-cjk fonts-noto-core \
 && rm -rf /var/lib/apt/lists/*

# svgo 전역 설치(매번 npx로 받지 않도록)
RUN npm i -g svgo@^3

# Tectonic 캐시 위치 지정 + 웜업
#   XDG_CACHE_HOME을 고정해 두면, 이미지 레이어에 패키지가 남아 재다운로드가 줄어듭니다.
ENV XDG_CACHE_HOME=/opt/.cache
RUN mkdir -p ${XDG_CACHE_HOME}/Tectonic

# 최소 웜업 문서(자주 쓰는 패키지를 한번에 끌어오도록)
# 필요에 따라 추가 \usepackage를 늘리면 더 많은 패키지가 사전 캐시에 들어옵니다.
COPY docker/warmup.tex /tmp/warmup.tex
RUN tectonic --keep-intermediates --reruns 0 /tmp/warmup.tex || true

# 유저/작업 디렉토리 정리
RUN useradd -ms /bin/bash builder
USER builder
WORKDIR /workspace

# 런타임에서도 같은 캐시 경로 사용
ENV TECTONIC_CACHE_PATH=${XDG_CACHE_HOME}/Tectonic