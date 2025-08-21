# Node + Debian(bookworm) 기반: svgo와 스크립트 실행 용이
FROM node:22-bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive

# 시스템 의존성 설치
# - dvisvgm, ghostscript: PDF→SVG
# - Noto CJK: 한글 포함 폰트
# (TeX Live를 APT로 설치하여 lualatex로 컴파일)
RUN apt-get update && apt-get install -y \
    ca-certificates curl tar make \
    # TeX Live toolchain (lualatex + latexmk + packages for tikz/pgfplots/siunitx/standalone)
    latexmk texlive-luatex texlive-latex-recommended texlive-latex-extra texlive-pictures \
    texlive-fonts-recommended texlive-fonts-extra texlive-plain-generic \
    # PDF→SVG
    dvisvgm ghostscript \
    # CJK fonts
    fonts-noto-cjk fonts-noto-core \
 && rm -rf /var/lib/apt/lists/*

# svgo 전역 설치(매번 npx로 받지 않도록)
RUN npm i -g svgo@^3

# 최소 웜업 문서(자주 쓰는 패키지를 한번에 끌어오도록)
# 필요에 따라 추가 \usepackage를 늘리면 더 많은 패키지가 사전 캐시에 들어옵니다.
COPY docker/warmup.tex /tmp/warmup.tex

# TeX Live warm-up: compile once to pre-generate formats/caches and exercise dvisvgm
RUN lualatex -interaction=batchmode -halt-on-error /docker/warmup.tex || true \
 && lualatex -interaction=batchmode -halt-on-error /docker/warmup.tex || true \
 && dvisvgm --pdf /tmp/warmup.pdf -o /tmp/warmup.svg || true

# 유저/작업 디렉토리 정리
RUN useradd -ms /bin/bash builder
USER builder
WORKDIR /workspace