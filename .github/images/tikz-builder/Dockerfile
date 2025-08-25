FROM node:22-bookworm-slim

# 필수 도구 설치: dvisvgm, ghostscript, mutool(poppler-utils는 pdfinfo 등), Noto CJK 폰트, git, tectonic
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      ca-certificates \
      git \
      ghostscript \
      mupdf-tools \
      poppler-utils \
      fonts-noto-cjk \
      dvisvgm \
    && update-ca-certificates \
    && rm -rf /var/lib/apt/lists/*

ARG TECTONIC_VERSION=0.15.0

RUN set -eux; \
  arch="$(dpkg --print-architecture)"; \
  case "$arch" in \
    amd64) tt_arch="x86_64-unknown-linux-gnu" ;; \
    arm64) tt_arch="aarch64-unknown-linux-gnu" ;; \
    *) echo "unsupported arch: $arch"; exit 1 ;; \
  esac; \
  url="https://github.com/tectonic-typesetting/tectonic/releases/download/tectonic%40${TECTONIC_VERSION}/tectonic-${TECTONIC_VERSION}-${tt_arch}.tar.gz"; \
  curl -fsSL "$url" -o /tmp/tt.tgz; \
  tar -xzf /tmp/tt.tgz -C /usr/local/bin tectonic; \
  rm -f /tmp/tt.tgz; \
  tectonic --version

# dvisvgm이 PDF 처리기로 mutool 사용
ENV DVISVGM_PDF_PROC=mutool