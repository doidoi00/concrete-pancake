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

ARG TECTONIC_VERSION=0.15.0
RUN set -eux; \
  arch="$(dpkg --print-architecture)"; \
  case "$arch" in \
    amd64) tt_arch="x86_64-unknown-linux-gnu" ;; \
    arm64) tt_arch="aarch64-unknown-linux-gnu" ;; \
    *) echo "unsupported arch: $arch"; exit 1 ;; \
  esac; \
  url="https://github.com/tectonic-typesetting/tectonic/releases/download/continuous/tectonic-${TECTONIC_VERSION}+20250814-${tt_arch}.tar.gz"; \
  curl -fsSL "$url" -o /tmp/tt.tgz; \
  tar -xzf /tmp/tt.tgz -C /usr/local/bin tectonic; \
  rm -f /tmp/tt.tgz; \
  tectonic --help

# dvisvgm이 PDF 처리기로 mutool 사용
ENV DVISVGM_PDF_PROC=mutool

# PyMuPDF Settings
ENV VENV_PATH = /opt/pymu

RUN python3 -m venv "$VENV_PATH" \
 && "$VENV_PATH/bin/pip" install --upgrade pip \
 && "$VENV_PATH/bin/pip" install --no-cache-dir "PyMuPDF==1.26.*" \
 && ln -s "$VENV_PATH/bin/python" /usr/local/bin/pymu-python

RUN pymu-python - <<'PY'
import fitz
print("PyMuPDF", fitz.__version__)
PY

ENV PATH=$VENV_PATH/bin:$PATH