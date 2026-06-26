FROM node:22-trixie-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      ca-certificates \
      git \
      ghostscript \
      mupdf-tools \
      poppler-utils \
      fonts-noto-cjk \
      rsync \
      curl \
      dvisvgm \
      python3 python3-pip python3-venv \
    && update-ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Stable 릴리스에 버전 고정. continuous(롤링)와 달리 asset이 사라지지 않고
# 직접 다운로드 URL이라 api.github.com 무인증 rate limit(403)도 회피.
ARG TECTONIC_VERSION=0.16.9
RUN set -eux; \
  arch="$(dpkg --print-architecture)"; \
  case "$arch" in \
    amd64) tt_arch="x86_64-unknown-linux-gnu" ;; \
    arm64) tt_arch="aarch64-unknown-linux-musl" ;; \
    *) echo "unsupported arch: $arch"; exit 1 ;; \
  esac; \
  url="https://github.com/tectonic-typesetting/tectonic/releases/download/tectonic@${TECTONIC_VERSION}/tectonic-${TECTONIC_VERSION}-${tt_arch}.tar.gz"; \
  echo "Downloading tectonic from: $url"; \
  curl -fsSL "$url" -o /tmp/tt.tgz; \
  tar -xzf /tmp/tt.tgz -C /usr/local/bin tectonic; \
  rm -f /tmp/tt.tgz; \
  tectonic --help

# dvisvgm이 PDF 처리기로 mutool 사용
ENV DVISVGM_PDF_PROC=mutool

# PyMuPDF Settings
ENV VENV_PATH /opt/pymu

RUN python3 -m venv "$VENV_PATH" \
 && "$VENV_PATH/bin/pip" install --upgrade pip \
 && "$VENV_PATH/bin/pip" install --no-cache-dir "PyMuPDF==1.26.*" pikepdf Python-IO

ENV PATH=$VENV_PATH/bin:$PATH