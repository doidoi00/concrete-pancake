# Node + Debian(bookworm) 기반: svgo와 스크립트 실행 용이
FROM node:22-bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive

# 시스템 의존성 설치
# - dvisvgm, ghostscript: PDF→SVG
# - Noto CJK: 한글 포함 폰트
# (tectonic은 아래 GitHub 릴리스에서 설치)
RUN apt-get update && apt-get install -y \
    ca-certificates curl tar \
    dvisvgm ghostscript \
    fonts-noto-cjk fonts-noto-core \
 && rm -rf /var/lib/apt/lists/*

# --- Tectonic: GitHub 릴리스 바이너리 설치 (Debian bookworm에는 APT 패키지 없음) ---
ARG TECTONIC_VERSION=0.15.0
RUN set -eux; \
  arch="$(dpkg --print-architecture || true)"; \
  [ -n "$arch" ] || arch="$(uname -m)"; \
  case "$arch" in \
    amd64|x86_64)  cpu="x86_64" ;; \
    arm64|aarch64) cpu="aarch64" ;; \
    *) echo "Unsupported arch: $arch" >&2; exit 1 ;; \
  esac; \
  base1="https://github.com/tectonic-typesetting/tectonic/releases/download/tectonic%40v${TECTONIC_VERSION}"; \
  base2="https://github.com/tectonic-typesetting/tectonic/releases/download/v${TECTONIC_VERSION}"; \
  set +e; \
  for base in "$base1" "$base2"; do \
    for libc in gnu musl; do \
      url="$base/tectonic-${TECTONIC_VERSION}-${cpu}-unknown-linux-${libc}.tar.gz"; \
      echo "Attempt: $url"; \
      if curl -fsSL --retry 3 -o /tmp/tectonic.tar.gz "$url"; then \
        if tar -tzf /tmp/tectonic.tar.gz >/dev/null 2>&1; then \
          echo "OK: downloaded $url"; \
          ok=1; break; \
        fi; \
      fi; \
    done; \
    [ -n "$ok" ] && break; \
  done; \
  set -e; \
  [ -n "$ok" ] || { echo "Failed to download a valid Tectonic tarball for ${cpu} (tried GNU/MUSL and two tag patterns)" >&2; exit 1; }; \
  mkdir -p /opt/tectonic; \
  tar -xzf /tmp/tectonic.tar.gz -C /opt/tectonic --strip-components=1; \
  ln -s /opt/tectonic/tectonic /usr/local/bin/tectonic; \
  rm -f /tmp/tectonic.tar.gz; \
  tectonic --version

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