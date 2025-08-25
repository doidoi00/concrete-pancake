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

# dvisvgm이 PDF 처리기로 mutool 사용
ENV DVISVGM_PDF_PROC=mutool

# (선택) 기본 작업 디렉터리
WORKDIR /work