import fitz, json, glob, pathlib, pikepdf, io

def apply_stroke_style(sh, d):
    dash = d.get("dashes")
    line_cap = d.get("lineCap")
    line_join = d.get("lineJoin")
    miter = d.get("miterLimit")
    if dash:
        try:
            sh.set_dash(dash[0], dash[1])
        except Exception:
            pass
    if line_cap is not None:
        try:
            sh.set_line_cap(line_cap)
        except Exception:
            pass
    if line_join is not None:
        try:
            sh.set_line_join(line_join)
        except Exception:
            pass
    if miter is not None:
        try:
            sh.set_miter_limit(miter)
        except Exception:
            pass

def rgbint_to_tuple(c): return ((c>>16)&255, (c>>8)&255, c&255)

EPS = 1e-6

def is_zero(tok: str) -> bool:
    try:
        return abs(float(tok)) <= EPS
    except Exception:
        return False

def is_one(tok: str) -> bool:
    try:
        return abs(float(tok) - 1.0) <= EPS
    except Exception:
        return False

def is_white(rgb):
    if rgb is None:
        return False
    r, g, b = rgb
    return abs(r-1.0) < EPS and abs(g-1.0) < EPS and abs(b-1.0) < EPS

def recolor_tokens(tokens):
    edits = 0
    i = 0
    n = len(tokens)
    while i < n:
        op = tokens[i]
        # Gray fill/stroke: black(0) -> white(1)
        if op == 'g' and i >= 1 and is_zero(tokens[i-1]):
            tokens[i-1] = '1'
            edits += 1
        elif op == 'G' and i >= 1 and is_zero(tokens[i-1]):
            tokens[i-1] = '1'
            edits += 1
        # RGB fill/stroke: black(0 0 0) -> white(1 1 1)
        elif op == 'rg' and i >= 3 and is_zero(tokens[i-3]) and is_zero(tokens[i-2]) and is_zero(tokens[i-1]):
            tokens[i-3], tokens[i-2], tokens[i-1] = '1', '1', '1'
            edits += 1
        elif op == 'RG' and i >= 3 and is_zero(tokens[i-3]) and is_zero(tokens[i-2]) and is_zero(tokens[i-1]):
            tokens[i-3], tokens[i-2], tokens[i-1] = '1', '1', '1'
            edits += 1
        # CMYK fill/stroke: black(0 0 0 1) -> white(0 0 0 0)
        elif op == 'k' and i >= 4 and is_zero(tokens[i-4]) and is_zero(tokens[i-3]) and is_zero(tokens[i-2]) and is_one(tokens[i-1]):
            tokens[i-4], tokens[i-3], tokens[i-2], tokens[i-1] = '0', '0', '0', '0'
            edits += 1
        elif op == 'K' and i >= 4 and is_zero(tokens[i-4]) and is_zero(tokens[i-3]) and is_zero(tokens[i-2]) and is_one(tokens[i-1]):
            tokens[i-4], tokens[i-3], tokens[i-2], tokens[i-1] = '0', '0', '0', '0'
            edits += 1
        i += 1
    return edits

def bw_process_stream(stream: pikepdf.Stream) -> int:
    # Decode as latin-1 to preserve raw bytes spacing
    src = stream.read_bytes().decode('latin-1')
    tokens = src.split()
    edits = recolor_tokens(tokens)
    if edits:
        stream.write(' '.join(tokens).encode('latin-1'))
    return edits

def white_fill_to_transparent (input: str) -> tuple[bytes, int]:
    doc = fitz.open(input)
    total_edits = 0

    for page in doc:
        drawings = page.get_drawings()
        to_delete = []

        for d in drawings:
            fill = d.get("fill")
            if not is_white(fill):
                continue

            sh = page.new_shape()

            # Rebuild the path geometry from items (generic path support)
            items = d.get("items") or []
            for it in items:
                if not it:
                    continue
                op = it[0]
                # Commands observed from PyMuPDF: 'm' move, 'l' line, 'c' curve, 're' rect, 'h' close
                if op == "m":
                    pt = it[1]
                    sh.move_to(pt)
                elif op == "l":
                    pt = it[1]
                    sh.line_to(pt)
                elif op == "c":
                    p1, p2, p3 = it[1], it[2], it[3]
                    sh.curve_to(p1, p2, p3)
                elif op == "re":
                    # rectangle shorthand
                    r = fitz.Rect(it[1])
                    sh.draw_rect(r)
                elif op in ("h", "z"):
                    sh.close_path()
                else:
                    # ignore graphics state ops like 'q','Q','cm','n' etc.
                    pass

            apply_stroke_style(sh, d)
            stroke_color = d.get("color", (0, 0, 0))
            width = d.get("width", 1.0)
            even_odd = bool(d.get("even_odd", False))

            # Keep original fill color value, but make it fully transparent
            sh.finish(
                fill=fill,
                fill_opacity=0.0,
                color=stroke_color,
                width=width,
                even_odd=even_odd,
            )
            sh.commit()
            to_delete.append(d)
            total_edits += 1

        if to_delete:
            page.delete_drawings(to_delete)

    # Do NOT save to disk here — return bytes to be post-processed by pikepdf
    pdf_bytes = doc.tobytes(deflate=True)
    doc.close()
    return pdf_bytes, total_edits

def run_white_and_bw(input_path: str, output_path: str | None = None) -> dict:
    """
    Pipeline:
    1) PyMuPDF: make white path fills transparent (returns bytes, edits_w)
    2) PikePDF: recolor tokens in content streams (returns edits_bw)
    3) Save once at the end (only if there were any edits)
    """
    pdf_bytes, edits_w = white_fill_to_transparent(input_path)
    edits_bw = 0

    with pikepdf.open(io.BytesIO(pdf_bytes)) as doc:
        for page in doc.pages:
            contents = page.Contents
            if not contents:
                continue
            if isinstance(contents, pikepdf.Stream):
                edits_bw += bw_process_stream(contents)
            elif isinstance(contents, pikepdf.Array):
                for s in contents:
                    if isinstance(s, pikepdf.Stream):
                        edits_bw += bw_process_stream(s)

        if output_path is None:
            p = pathlib.Path(input_path)
            output_path = p.with_name(p.stem + '-dark' + p.suffix).as_posix()

        if edits_w or edits_bw:
            doc.save(output_path)

    return {"white_to_transparent": edits_w, "bw_token_edits": edits_bw, "output": output_path}

stat = {} 
out = {}
for pdf in glob.glob("tikz/**/*.pdf", recursive=True):
    doc = fitz.open(pdf)
    stats = {"pages": len(doc), "text_black":0, "text_white":0, "draw_black":0, "draw_white":0}
    for page in doc:
        # 도형/선 색상 (0..1 float RGB)
        for d in page.get_drawings():
            col = d.get("color")
            fill = d.get("fill")
            if col == (0,0,0) or fill == (0,0,0): stats["draw_black"] += 1
        # 텍스트 색상 (정수 0xRRGGBB)
        td = page.get_text("dict")
        for b in td.get("blocks", []):
            for l in b.get("lines", []):
                for s in l.get("spans", []):
                    c = s.get("color")
                    if isinstance(c, int):
                        r,g,b = rgbint_to_tuple(c)
                        if (r,g,b) == (0,0,0):   stats["text_black"] += 1
    stat[pdf] = stats
    doc.close()

    result = run_white_and_bw(pdf)
    out[pdf] = result

pathlib.Path("tikz-color-report.json").write_text(json.dumps(stat, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps(stat, ensure_ascii=False, indent=2))
