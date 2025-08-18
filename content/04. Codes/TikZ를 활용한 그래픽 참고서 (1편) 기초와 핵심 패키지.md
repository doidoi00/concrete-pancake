---
aliases:
---
# TikZ를 활용한 그래픽 참고서 (1편): 기초와 핵심 패키지

이 문서는 LaTeX 문서 내에서 고품질 그래픽을 생성하는 데 사용되는 강력한 도구인 TikZ에 대한 포괄적인 참고서의 첫 번째 부분입니다. 기초적인 그리기 기능부터 `pgfplots`, `chemfig`, `tikz-cd`, `tikz-3dplot`, `circuitikz`와 같은 핵심 전문 패키지까지 다룹니다.

## 1. TikZ의 기초: LaTeX 그래픽의 시작

이 장에서는 TikZ의 핵심 개념을 소개하여 독자들이 전문적인 응용 프로그램으로 넘어가기 전에 구문 및 기능에 대한 탄탄한 이해를 구축할 수 있도록 합니다.

### 1.1 TikZ란 무엇인가?

TikZ는 TeX 기반 시스템 내에서 그래픽을 생성하기 위한 강력한 언어입니다. "TikZ ist kein Zeichenprogramm"(TikZ는 드로잉 프로그램이 아니다)이라는 재귀적 약어에서 알 수 있듯이, 이 도구는 WYSIWYG(What You See Is What You Get) 편집기처럼 시각적으로 그림을 그리는 것이 아니라, 코드를 통해 그래픽을 "프로그래밍"하는 방식에 중점을 둡니다. 이러한 프로그래밍 방식의 접근 방식은 단순한 그래픽을 빠르게 생성하고, 요소를 정밀하게 배치하며, 매크로를 활용하고, 뛰어난 타이포그래피를 구현할 수 있다는 장점을 제공합니다.

TikZ의 프로그래밍 패러다임은 사용자가 도구와 상호 작용하는 방식에 근본적인 차이를 만듭니다. 이는 사용자가 시각적 편집기가 아닌 명령과 구문 규칙에 대한 깊은 이해를 요구하는 새로운 사고방식을 채택해야 함을 의미합니다. 이러한 접근 방식은 복잡한 그래픽을 자동화하고 LaTeX의 강력한 조판 기능과 통합하는 데 엄청난 정밀도와 유연성을 제공합니다. 그러나 이는 초기 학습 곡선이 가파르고 작은 코드 변경에도 문서 전체를 다시 컴파일해야 하는 단점으로 이어질 수 있습니다. 따라서 참고서는 명확한 구문 규칙, 논리적 명령 구조, 체계적인 문제 해결에 중점을 두어 이러한 프로그래밍적 특성을 수용해야 합니다.

TikZ는 PGF(Portable Graphics Format) 시스템 위에 구축되어 있습니다. PGF는 그래픽 명령을 위한 기본 계층을 제공하여 다양한 TeX 드라이버(예: pdfLaTeX, XeLaTeX)에서 그래픽의 이식성을 보장합니다. 이 계층 구조 덕분에 TikZ는 LaTeX 환경 내에서 강력하고 유연한 그래픽 솔루션이 될 수 있습니다.

### 1.2 TikZ 환경 설정

TikZ를 사용하려면 LaTeX 문서의 서문에 `\usepackage{tikz}` 명령을 추가해야 합니다. 모든 TikZ 그리기 명령은 `\begin{tikzpicture}...\end{tikzpicture}` 환경 내에 포함됩니다. 이 환경은 선택적으로 `figure`와 같은 LaTeX 부동 환경 내에 배치하여 그림의 위치를 제어하고 캡션을 추가할 수 있습니다.

> [!code]
> ```
> \documentclass{article}
> \usepackage{tikz}
> \begin{document}
> \begin{figure}[h!]
>   \centering
>   \begin{tikzpicture}
>     % TikZ drawing commands go here
>     \draw (0,0) -- (1,1);
>   \end{tikzpicture}
>   \caption{A simple TikZ figure.}
> \end{figure}
> \end{document}
> ```



TikZ의 기능은 다양한 라이브러리를 통해 확장됩니다. 이러한 라이브러리는 `\usetikzlibrary{...}` 명령을 사용하여 서문에 로드되어야 합니다. 예를 들어, 고급 노드 배치를 위해서는 `positioning` 라이브러리가 필요하며, 화살표 스타일을 위해서는 `arrows` 라이브러리가 유용합니다. `shapes.geometric` 라이브러리는 타원과 같은 추가 도형을 제공하며, `backgrounds` 라이브러리는 그래픽 요소의 레이어링을 가능하게 합니다. 이러한 라이브러리 기반의 모듈성은 TikZ가 다양한 그래픽 요구 사항에 적응할 수 있도록 하는 핵심적인 설계 원칙입니다.

> [!code]
> ```
> \usepackage{tikz}
> \usetikzlibrary{positioning, arrows, shapes.geometric}
> ```

### 1.3 기본 도형 그리기: 선, 원, 사각형

#### 1.3.1 좌표와 경로

TikZ에서 그래픽을 그리는 기본은 좌표와 경로를 정의하는 것입니다. 점은 일반적으로 데카르트 좌표 `(x,y)`를 사용하여 정의됩니다. 직선은 `--` 연산자를 사용하여 그립니다. 예를 들어, `\draw (-2,0) -- (2,0);`는 두 점을 연결하는 직선을 생성합니다.

> [!code]
> ```
> \begin{tikzpicture}
>   \draw (-2,0) -- (2,0); % 직선
> \end{tikzpicture}
> ```

곡선은 베지어 곡선을 사용하여 그릴 수 있습니다. 이는 `.. controls (control1) and (control2).. (endpoint);` 구문을 통해 정의되며, 제어점들이 곡선의 모양과 휘어짐 정도를 결정합니다.

> [!code]
> ```
> \begin{tikzpicture}
>   \draw (-2,2).. controls (-1,0) and (1,0).. (2,2); % 베지어 곡선
> \end{tikzpicture}
> ```

`|-` 및 `-|`와 같은 특수 연산자는 L자형 경로를 생성하는 데 사용됩니다. `|-`는 먼저 수직 방향으로 이동한 다음 수평 방향으로 이동하고, `-|`는 그 반대입니다.

> [!code]
> ```
> \begin{tikzpicture}
>   \draw (0,0) |- (2,1); % 먼저 수직, 그 다음 수평
>   \draw (3,0) -| (5,1); % 먼저 수평, 그 다음 수직
> \end{tikzpicture}
> ```

다각형은 직선 경로를 사용하여 그리며, `cycle` 명령으로 시작점과 끝점을 연결하여 닫힌 도형을 만듭니다. 사각형은 `rectangle (x1,y1) (x2,y2);` 명령으로 대각선으로 마주보는 두 점을 지정하여 생성됩니다. 원은 현재 위치를 중심으로 `circle (radius);` 명령으로 그립니다. 타원은 `shapes.geometric` 라이브러리를 필요로 하며 원과 유사하게 그립니다.

> [!code]
> ```
> \begin{tikzpicture}
>   \draw[blue, very thick] (0,0) rectangle (3,2); % 사각형
>   \draw[orange, ultra thick] (4,0) -- (6,0) -- (5.7,2) -- cycle; % 닫힌 다각형
>   \draw (1,1) circle (0.5); % 원
>   \usetikzlibrary{shapes.geometric}
>   \draw (2,2) ellipse (1cm and 0.5cm); % 타원 (shapes.geometric 필요)
> \end{tikzpicture}
> ```

#### 1.3.2 선 스타일 및 채우기

TikZ에서 도형의 시각적 속성을 제어하는 것은 매우 중요합니다. 선 두께는 `very thick` 또는 `ultra thick`과 같은 옵션을 사용하여 지정할 수 있으며, 색상은 `blue`, `red` 또는 혼합 색상(예: `green!60`)을 사용하여 정의할 수 있습니다. 이러한 옵션은 `\draw` 명령의 대괄호 안에 적용됩니다.

> [!code]
> ```
> \begin{tikzpicture}
>   \draw[blue, very thick] (0,0) -- (1,1); % 두꺼운 파란색 선
> \end{tikzpicture}
> ```

다양한 선 스타일이 지원됩니다. 기본값은 `solid`이며, `dashed`, `dotted`, `dash dot`, `dash dot dot`과 같은 스타일을 사용하여 선의 패턴을 변경할 수 있습니다. 도형을 색상이나 패턴으로 채우는 것도 가능합니다. `\fill` 명령은 경계선을 그리지 않고 도형 내부를 채우는 데 사용되며, `\filldraw` 명령은 도형을 채우는 동시에 경계선도 그립니다.

> [!code]
> ```
> \begin{tikzpicture}
>   \draw[dashed, red] (0,0) -- (1,0); % 점선
>   \draw[dotted, green] (0,0.5) -- (1,0.5); % 점선
>   \fill[orange] (2,0) circle (0.5); % 채우기
>   \filldraw[gray, draw=black, thick] (2.5,0.5) rectangle (3.5,1.5); % 채우고 그리기
> \end{tikzpicture}
> ```

TikZ는 경로를 먼저 정의하고 그 다음에 스타일을 적용하는 원칙을 따릅니다. 즉, 그릴 대상(기하학)을 먼저 정의한 다음, 그것이 어떻게 보일지(속성)를 적용합니다. 이 순서는 옵션이 상속되거나 재정의되는 방식을 이해하는 데 중요합니다. 예를 들어, `\draw` 명령은 전역 스타일을 가질 수 있지만, 대괄호 안에 지정된 특정 옵션은 해당 경로에 대해 전역 스타일을 재정의합니다. 이러한 구조화된 접근 방식은 복잡한 다이어그램을 관리하기 쉽게 만듭니다. 기하학적 정의와 미적 요소를 분리함으로써, 사용자는 단일 스타일 정의를 수정하여 여러 요소의 모양을 쉽게 변경할 수 있으므로 일관성을 촉진하고 코드 중복을 줄일 수 있습니다. 이는 참고서에서 강조해야 할 핵심적인 이점입니다.

### 1.4 노드: 생성, 스타일링, 배치

#### 1.4.1 노드 텍스트, 모양, 크기

노드는 텍스트를 포함하거나 포함하지 않는 도형으로, 좌표에 배치됩니다. 노드는 경로 내에서 `node` 연산자를 사용하거나 `\node` 명령(이는 `\path node`의 약어)을 사용하여 생성됩니다. 노드에는 테두리가 있거나 복잡한 배경 및 전경을 가질 수 있습니다.

노드의 일반적인 구문은 `\path... node [options] (name) at (coordinate) {node contents};`입니다.

- `node contents`는 노드에 표시될 텍스트로, 중괄호 안에 제공됩니다. `node contents=` 키를 사용하지 않는 한, 이 내용은 "fragile"할 수 있습니다.
    
- `options`는 노드에만 적용되는 선택적 매개변수입니다(예: `fill`, `draw`, `color`).
    
- `(name)`은 나중에 참조하기 위한 선택적 이름입니다(예: 경로 연결용).
    
- `at (coordinate)`는 노드의 배치 좌표를 지정하여 기본 경로 위치를 재정의합니다.
    

> [!code]
> ```
> \begin{tikzpicture}
>   \node (mynode) at (0,0) [draw, fill=blue!20] {Hello Node!};
> \end{tikzpicture}
> ```

노드의 기본 모양은 `rectangle`입니다. `circle`과 같은 다른 모양을 지정할 수 있으며, 일부는 `shapes.geometric`과 같은 특정 라이브러리를 로드해야 합니다. `shape=⟨shape name⟩` 옵션을 사용하거나, `circle`과 같이 모호하지 않은 경우 직접 옵션으로 지정할 수 있습니다.

> [!code]
> ```
> \usetikzlibrary{shapes.geometric}
> \begin{tikzpicture}
>   \node[circle, draw, red] at (0,0) {Circle};
>   \node[ellipse, draw, blue] at (2,0) {Ellipse};
>   \node[shape=diamond, draw, green] at (4,0) {Diamond};
> \end{tikzpicture}
> ```

노드의 크기 조정은 여러 옵션을 통해 제어됩니다. `minimum size=⟨dimension⟩`은 최소 높이와 너비를 동시에 설정합니다. `minimum height=⟨dimension⟩` 및 `minimum width=⟨dimension⟩`은 개별 최소 치수를 설정합니다. `inner sep=⟨dimension⟩`은 텍스트와 도형 경계선 사이의 내부 여백을 추가하며, `outer sep=⟨dimension⟩`은 도형 경계선 바깥에 보이지 않는 여백을 추가합니다.

> [!code]
> ```
> \begin{tikzpicture}
>   \node[draw, minimum size=1cm] at (0,0) {Min Size};
>   \node[draw, minimum width=2cm, minimum height=0.5cm] at (2,0) {Min Width/Height};
>   \node[draw, inner sep=5pt] at (0,-1.5) {Inner Sep};
>   \node[draw, outer sep=5pt] at (2,-1.5) {Outer Sep};
> \end{tikzpicture}
> ```

노드 텍스트 자체의 스타일링도 가능합니다. `text=⟨color⟩`는 텍스트 색상을 설정하고, `node font=⟨font commands⟩`는 노드 내의 모든 텍스트에 대한 글꼴을 설정합니다. 여러 줄 텍스트는 `\\`를 사용하여 줄 바꿈을 표시하고, `align` 옵션(`left`, `center`, `right`)을 사용하여 정렬하거나, `text width`를 사용하여 자동 줄 바꿈을 활성화할 수 있습니다.

> [!code]
> ```
> \begin{tikzpicture}
>   \node[draw, text=red, node font=\bfseries] at (0,0) {Bold Red Text};
>   \node[draw, text width=2cm, align=center] at (2,0) {Multi-line\\Centered Text};
> \end{tikzpicture}
> ```

#### 1.4.2 상대적 노드 배치

노드 배치는 TikZ에서 다이어그램의 가독성과 구조를 결정하는 중요한 측면입니다. 노드는 기본적으로 좌표에 중앙에 배치되지만, 앵커를 사용하여 배치를 세밀하게 제어할 수 있습니다. `anchor=⟨anchor name⟩` 옵션은 노드의 지정된 앵커(예: `north`, `south west`, `center`)가 현재 좌표에 놓이도록 노드를 이동시킵니다.

> [!code]
> ```
> \begin{tikzpicture}
>   \fill (0,0) circle (2pt) node[anchor=north east] {Anchor NE};
>   \fill (1,0) circle (2pt) node[anchor=west] {Anchor W};
> \end{tikzpicture}
> ```

`above`, `below`, `left`, `right`, `above left` 등과 같은 기본 배치 옵션은 현재 좌표 또는 다른 노드를 기준으로 노드를 배치하는 직관적인 방법을 제공합니다. 더 강력한 배치를 위해서는 `\usetikzlibrary{positioning}` 라이브러리가 필수적입니다. 이 라이브러리는 `above=of maintopic`과 같은 옵션을 제공하여 노드를 다른 명명된 노드에 상대적으로 배치할 수 있도록 합니다. `node distance` 옵션은 기본 간격을 설정하며, `on grid` 옵션은 노드 중심을 그리드에 정렬할 수 있도록 합니다.

> [!code]
> ```
> \usetikzlibrary{positioning}
> \begin{tikzpicture}[node distance=1cm]
>   \node (main) {Main Node};
>   \node[above=of main] {Above};
>   \node[below=of main] {Below};
>   \node[left=of main] {Left};
>   \node[right=of main] {Right};
>   \node[above right=of main] {Above Right};
> \end{tikzpicture}
> ```

노드를 명명하고 이를 사용하여 상대적으로 배치하는 기능은 복잡하고 유지보수 가능한 다이어그램을 만드는 데 핵심적인 역할을 합니다. 이는 노드의 절대 좌표를 논리적 관계에서 분리합니다. 예를 들어, `maintopic`이라는 노드의 위치가 변경되면, `[above=of maintopic]`과 같이 상대적으로 배치된 모든 노드는 자동으로 조정됩니다. 이러한 기능은 수동 레이아웃 노력을 크게 줄이고 다이어그램의 견고성을 향상시킵니다. 이 기능은 다이어그램의 구조(요소가 서로 어떻게 관련되는지)를 정확한 숫자 좌표와 독립적으로 추상적으로 정의할 수 있게 해주므로, 대규모 프로젝트나 다이어그램 레이아웃이 변경될 수 있는 상황에서 매우 유용합니다.

### 1.5 노드 연결: 경로와 엣지

노드를 연결하는 것은 다이어그램에서 관계를 시각화하는 데 필수적입니다. 노드가 명명되면, 해당 앵커를 좌표로 참조하여 경로를 그릴 수 있습니다. 예를 들어, `\draw[->] (uppercircle.south) -- (maintopic.north);`는 두 노드의 특정 앵커를 연결하는 화살표를 그립니다. 전체 노드 이름이 좌표로 사용될 때, TikZ는 노드의 경계에서 적절한 앵커를 지능적으로 선택하여 다른 좌표 방향으로 선을 그립니다.

> [!code]
> ```
> \begin{tikzpicture}
>   \node (A) at (0,0) {Node A};
>   \node (B) at (2,1) {Node B};
>   \draw[-&gt;] (A.east) -- (B.west); % 특정 앵커 연결
>   \draw[-&gt;, red] (A) -- (B); % TikZ가 자동으로 앵커 선택
> \end{tikzpicture}
> ```

`to` 연산자는 점들 사이에 선이나 곡선을 생성합니다. `in` 및 `out` 옵션은 곡선의 시작 및 끝 각도를 지정하며, `bend right` 또는 `bend left` 옵션은 곡선의 휘어짐을 제어합니다. `edge` 연산자는 `to`와 유사하지만, 주 경로가 그려진 후에 별도의 경로로 구성됩니다. 이를 통해 각 엣지가 주 경로와 독립적으로 자체적인 화살표, 색상 및 기타 옵션을 가질 수 있습니다.

> [!code]
> ```
> \begin{tikzpicture}
>   \node (start) at (0,0) {Start};
>   \node (end) at (2,0) {End};
>   \draw (start) to[bend left=30] (end); % 휘어진 선
>   \draw (start) edge[-&gt;, blue] (end); % 별도의 엣지
> \end{tikzpicture}
> ```

경로 또는 엣지 위에 노드를 배치하는 것도 가능합니다. `node` 키워드는 경로 연산자 내에서 직접 사용하여 레이블을 배치할 수 있습니다(예: `(0,0) -- node{label} (1,1)`). `pos=⟨fraction⟩` 옵션은 경로를 따라 노드의 위치를 지정합니다(예: `pos=0.5`는 중간 위치). `auto`는 노드를 선의 왼쪽 또는 오른쪽에 자동으로 배치하며, `swap`은 이 배치를 반전시키고, `sloped`는 노드를 곡선에 접하도록 회전시킵니다.

> [!code]
> ```
> \begin{tikzpicture}
>   \draw (0,0) -- (2,1) node[pos=0.5, above] {Midpoint Label};
>   \draw (0,0).. controls +(up:1cm) and +([left]:1cm).. (2,2) node[sloped, above] {Sloped Label};
> \end{tikzpicture}
> ```

`label` 및 `pin` 옵션은 다른 노드 옆에 보조 노드를 추가하는 데 사용됩니다. `label=[options]angle:text`는 주 노드를 기준으로 지정된 각도에 텍스트 레이블을 추가합니다. `pin=[options]angle:text`는 `label`과 유사하지만, 레이블 노드에서 주 노드로 엣지(핀)를 그립니다. `quotes` 라이브러리를 로드하면 `quotes` 구문을 사용하여 레이블, 핀 및 엣지 노드를 간결하게 지정할 수 있습니다(예: `edge ["label", ->]`).

> [!code]
> ```
> \usetikzlibrary{quotes}
> \begin{tikzpicture}
>   \node[circle, draw, fill=blue!20, label=above:Main Label] (main) at (0,0) {Node};
>   \node[circle, draw, fill=red!20, pin=60:Pin Label] (pin_node) at (2,0) {Pin};
>   \draw (main) edge [&quot;Edge Label&quot;, -&gt;] (pin_node);
> &lt;/tikzpicture&gt;
> ```

### 1.6 고급 TikZ 개념

#### 1.6.1 스타일 및 사용자 정의 명령

스타일은 TikZ에서 그래픽을 그리는 방식을 구성하는 데 사용되는 미리 정의된 옵션 세트입니다. 이는 코드를 더 유연하게 만들고 모양을 일관되게 변경할 수 있도록 합니다. 스타일은 `/.style={...}`를 사용하여 정의할 수 있습니다(예: `roundnode/.style={circle, draw=green!60}`). 이러한 스타일은 전역적으로 적용될 수 있습니다. 문서의 시작 부분에 `\tikzset{every picture/.style={line width=1pt}}` 또는 `every node/.style={draw}`와 같은 명령을 사용하여 모든 그림 또는 모든 노드에 전역 스타일을 설정할 수 있습니다.

> [!code]
> ```
> \tikzset{
>   my_node_style/.style={draw, fill=cyan!20, rounded corners},
>   every picture/.style={line width=1pt}
> }
> \begin{tikzpicture}
>   \node[my_node_style] {Styled Node};
> \end{tikzpicture}
> ```

스타일은 계층적으로 구축될 수 있으며, 하나의 스타일이 다른 스타일을 사용할 수 있습니다. 또한, 스타일은 매개변수를 받을 수 있어( `#1`, `#2` 등) 동적인 사용자 정의가 가능하며, `/.default`를 사용하여 기본값을 설정할 수 있습니다.

"픽"(Pics)은 `node` 명령과 유사하게 `pic` 명령을 사용하여 그림에 추가할 수 있는 작고 재사용 가능한 그래픽 코드 조각입니다. 이는 사용자 정의 명령의 한 형태로, 복잡한 그래픽 패턴을 캡슐화하고 재사용성을 높이는 데 유용합니다.

`pgffor` 패키지에서 정의된 `\foreach` 명령은 값 목록을 반복하여 그리기 명령을 반복하는 데 사용됩니다. 이는 축의 눈금과 같은 패턴을 생성하는 데 매우 유용합니다. `\foreach <variable> in {<list of values>} <commands>`구문을 사용하여 범위 반복 및 여러 변수 할당이 가능합니다.

> [!code]
> ```
> \begin{tikzpicture}
>   \foreach \x in {0,1,...,5} {
>     \draw (\x,0) circle (2pt);
>     \node[below] at (\x,0) {\x};
>   }
> \end{tikzpicture}
> ```

TikZ의 강력한 스타일링 및 사용자 정의 명령 메커니즘은 복잡한 다이어그램에 대한 강력함과 효율성의 핵심입니다. 이를 통해 사용자는 다이어그램에 대한 시각적 언어를 정의하여 일관성을 보장하고 코드의 장황함을 줄이며 전역적인 변경을 쉽게 할 수 있습니다. 이는 "작은 변경에도 긴 컴파일 시간이 필요하다"는 단점을 직접적으로 해결하여 변경 자체를 더 효율적으로 만듭니다. 따라서 참고서에서는 스타일 정의 및 모듈화에 대한 모범 사례를 강조하여 사용자의 작업 흐름과 LaTeX 문서의 유지보수성을 크게 향상시켜야 합니다.

#### 1.6.2 변환 및 레이어

TikZ는 개인 좌표계 내에서 좌표를 변환하기 위한 다양한 옵션을 제공합니다. 기본 변환에는 `xshift` 및 `yshift`(모든 후속 점을 지정된 양만큼 이동), `shift` (지정된 점으로 이동), `rotate` (특정 각도로 회전), `scale` (특정 계수로 크기 조정), `xscale` 및 `yscale` (x 또는 y 방향으로만 크기 조정), `xslant` 및 `yslant` (그래픽 기울이기)가 포함됩니다. `cm` 옵션은 임의의 변환 행렬을 적용할 수 있도록 합니다. 변환은 경로 중간에 변경될 수 있으며, 이는 TikZ가 자체 변환 행렬을 유지하기 때문에 가능합니다. 노드에 외부 변환을 적용하려면 `transform shape` 옵션을 사용해야 합니다.

> [!code]
> ```
> \begin{tikzpicture}
>   \draw (0,0) -- (1,0) node[right] {Original};
>   \draw[xshift=2cm, rotate=45, scale=1.5] (0,0) -- (1,0) node[right, transform shape] {Transformed};
> \end{tikzpicture}
> ```

레이어는 TikZ에서 그래픽 요소를 다른 평면에 배치하고, 이 평면들을 서로 위에 쌓아 시각적 깊이를 제어할 수 있도록 합니다. 레이어를 사용하려면 `backgrounds` 라이브러리를 로드해야 합니다. `on background layer` 옵션을 가진 `scope` 환경 내에 그림의 일부를 배치하면, 해당 요소는 주 그림 내용 뒤에 그려집니다. `tikzpicture` 환경이 끝나면, 레이어는 배경 레이어부터 시작하여 서로 위에 쌓입니다.

> [!code]
> ```
> \usetikzlibrary{backgrounds}
> \begin{tikzpicture}
>   \draw[fill=blue!20] (0,0) rectangle (2,2); % 전경 사각형
>   \begin{scope}[on background layer]
>     \fill[red!20] (0.5,0.5) rectangle (2.5,2.5); % 배경 사각형
>   \end{scope}
> \end{tikzpicture}
> ```

TikZ의 레이어 시스템은 요소들이 수동적인 Z-순서 지정 없이 올바르게 겹쳐져야 하는 시각적으로 복잡한 다이어그램을 만드는 데 필수적입니다. 이는 전경 요소와 배경 요소를 명확하게 분리할 수 있게 해주며, 과학 및 기술 일러스트레이션에서 가독성과 미적 품질을 위해 매우 중요합니다. 변환은 2D 또는 3D 공간에서 요소를 조작할 수 있게 하여 시각적 복잡성에 기여합니다. 이러한 기능은 TikZ를 단순한 선 그림을 넘어 정교한 다이어그램 도구로 만듭니다. 참고서에서 레이어와 변환을 효과적으로 사용하는 방법을 설명하는 것은 고급 시각 효과를 잠금 해제하고 다이어그램이 정확할 뿐만 아니라 시각적으로 매력적이고 해석하기 쉬운지 확인하는 데 중요합니다.

## 2. 특수 TikZ 패키지: 그래픽 기능 확장

이 장에서는 지정된 고급 TikZ 패키지를 심층적으로 탐구하며, 각 패키지에 대한 전용 소개, 구문 및 예제를 제공합니다.

### 2.1 pgfplots: 고품질 과학 그래프 그리기

#### 2.1.1 소개 및 설정

`pgfplots` 패키지는 TikZ를 기반으로 하는 강력한 시각화 도구로, 과학 및 기술 그래픽, 특히 고품질 플롯을 생성하는 데 이상적입니다. 이 패키지의 기본 목적은 입력 데이터 또는 수식을 받아 플롯을 생성하는 것입니다.

`pgfplots`를 사용하려면 LaTeX 문서의 서문에 `\usepackage{pgfplots}`를 추가해야 합니다. 또한, `\pgfplotsset{width=10cm,compat=1.9}`와 같은 명령을 사용하여 서문에서 `pgfplots`의 동작을 전역적으로 구성할 수 있습니다. 이 명령은 각 플롯의 크기를 변경하고 하위 호환성을 보장합니다.

> [!code]
> ```
> \usepackage{pgfplots}
> \pgfplotsset{width=8cm,compat=1.18} % 플롯 크기 및 호환성 설정
> ```

`pgfplotsset`의 `compat` 매개변수는 플롯의 장기적인 안정성과 재현성을 보장하는 데 중요한 기능입니다. 이는 패키지의 동작을 특정 버전으로 고정하여 향후 업데이트가 플롯 렌더링을 미묘하게 변경하거나 기존 코드를 손상시키는 것을 방지합니다. 이는 정확한 재현성이 가장 중요한 과학 출판물에서 특히 중요합니다. 따라서 참고서에서는 사용자에게 항상 `compat`를 지정하도록 조언하는 것이 중요합니다. 이는 `pgfplots`가 지속적으로 발전하는 패키지이며, 명시적인 버전 관리가 일반 그래픽에는 허용될 수 있지만 데이터 시각화에는 문제가 될 수 있는 예기치 않은 시각적 변경에 대한 안전 장치임을 강조합니다.

#### 2.1.2 2D 플로팅: 수학 표현식 및 데이터

`pgfplots` 패키지는 광범위한 2D 플로팅 기능을 제공하며, 좋은 기본 결과를 제공하면서도 개인화를 가능하게 합니다.

수학 표현식을 플로팅하려면 `tikzpicture` 환경 내에 `axis` 환경을 포함해야 합니다. `\addplot[options]{function};` 명령을 사용하여 플롯을 추가하며, `domain` (x-범위), `samples` (점의 수), `color`와 같은 옵션을 대괄호 안에 전달합니다.

> [!code]
> ```
> \begin{tikzpicture}
> \begin{axis}[
>     axis lines = left,
>     xlabel = \(x\),
>     ylabel = {\(f(x)\)},
> ]
> \addplot [
>     domain=-10:10,
>     samples=100,
>     color=red,
> ]
> {x^2 - 2*x - 1};
> \addlegendentry{\(x^2 - 2x - 1\)}
> \end{axis}
> \end{tikzpicture}
> ```



데이터에서 플로팅할 때는 `\addplot[options] coordinates {(x1,y1) (x2,y2)...};` 구문을 사용하거나, 데이터가 파일에 있는 경우 `\addplot table {filename.dat};`를 사용합니다.

> [!code]
> ```
> \begin{tikzpicture}
> \begin{axis}[
>     ylabel={Solubility [g per 100 g water]},
>     xmin=0, xmax=100,
>     ymin=0, ymax=120,
>     xtick={0,20,40,60,80,100},
>     ytick={0,20,40,60,80,100,120},
>     legend pos=north west,
>     ymajorgrids=true,
>     grid style=dashed,
> ]
> \addplot[
>     color=blue,
>     mark=square,
>     ]
>     coordinates {
>     (0,23.1)(10,27.5)(20,32)(30,37.8)(40,44.6)(60,61.8)(80,83.8)(100,114)
>     };
>     \legend{CuSO\(_4\cdot\)5H\(_2\)O}
> \end{axis}
> \end{tikzpicture}
> ```

`pgfplots`는 여러 2D 플롯 유형을 지원합니다:

- **선형 플롯 (`sharp plot`)**: 기본 플롯 유형으로, 점 좌표가 직선으로 연결됩니다. 

>[!code]
>```
>\begin{tikzpicture}
>	\begin{axis}
>		\addplot+ [sharp plot,] coordinates {
>			(0,0) (1,2) (2,3)
>		};
>	\end{axis}
>\end{tikzpicture}
>```
    
- **부드러운 플롯 (`smooth`)**: 연속적인 점들 사이를 부드럽게 보간합니다. `tension` 매개변수가 부드러움 효과를 제어합니다. 

> [!code]
>```
>\begin{tikzpicture}
>	\begin{axis}
>		\addplot+ [smooth,] coordinates {
>			(0,0) (1,2) (2,3)
>		};
>	\end{axis}
>\end{tikzpicture}
>```
    
- **상수 플롯 (`const plot`, `const plot mark right/mid`)**: x축에 평행한 선을 그려 데이터 지점에서 오른쪽 연속 또는 대칭적인 플롯을 만듭니다. `jump mark` 변형은 수직선을 그리지 않습니다. 

>[!code]
>```
>\begin{tikzpicture}
>	\begin{axis}
>		\addplot+ [const plot mark right,] coordinates {
>			(0,0.1) (0.1,0.15) (0.2,0.5) (0.3,0.62)
>			(0.4,0.56) (0.5,0.58) (0.6,0.65) (0.7,0.6)
>			(0.8,0.58) (0.9,0.55) (1,0.52)
>		};
>	\end{axis}
> \end{tikzpicture}
>```
    
- **막대 플롯 (`xbar`, `ybar`, `ybar interval`, `xbar interval`)**: 좌표에 수평 또는 수직 막대를 배치합니다. `bar width` 및 `bar shift` 옵션으로 모양을 사용자 정의할 수 있습니다. `ybar stacked`는 스택형 막대 그래프를 생성합니다. 

>[!code]
>```
>\begin{tikzpicture}
>\begin{axis}
>\addplot+ [ybar,] coordinates {
>(0,3) (1,2) (2,4) (3,1) (4,2)
>};
>\end{axis}
>\end{tikzpicture}
>```
    
- **빗살 플롯 (`xcomb`, `ycomb`)**: 막대 플롯과 유사하지만, 사각형 대신 단일 수평/수직선을 사용합니다.

>[!code]
>```
>\begin{tikzpicture}
>\begin{axis}
>\addplot+ [ycomb,] coordinates {
>(0,3) (1,2) (2,4) (3,1) (4,2)
>};
>\end{axis}
>\end{tikzpicture}
>```
    
- **산점도 (`only marks`, `scatter`)**: 점에 마커를 사용하여 데이터를 표시합니다. `scatter`는 `meta` 값(`scatter src`)에 따라 점에 색상을 입힐 수 있습니다.

>[!code]
>```
>\begin{tikzpicture}
>\begin{axis}[
>	enlargelimits=false,
>	]
>     \addplot+[
>         only marks,
>         scatter,
>         mark=halfcircle*,
>         mark size=2.9pt]
>     table[meta=ma]
>     {scattered_example.dat};
>     \end{axis}
>\end{tikzpicture}
>```

- **영역 플롯 (`stack plots=y`, `\closedcycle`, `fillbetween` 라이브러리)**: 곡선 사이의 영역을 채웁니다. 

> [!code]
>```
>\begin{tikzpicture}
>\begin{axis}[stack plots=y,area style,enlarge x limits=false,]
>\addplot coordinates {
>(0,1) (1,1) (2,2) (3,2)
>}\closedcycle;
>\addplot coordinates {
>(0,1) (1,1) (2,2) (3,2)
>}\closedcycle;
>\addplot coordinates {
>(0,1) (1,1) (2,2) (3,2)
>}\closedcycle;
>\end{axis}
>\end{tikzpicture}
>```

- **화살표 플롯 (`quiver`)**: `u`, `v`, `w` 구성 요소를 사용하여 벡터 필드를 나타내는 작은 화살표를 그립니다.

> [!code]
>```
>\begin{tikzpicture}
>\begin{axis}
>\addplot [blue,quiver={u=1,v=2*x},-stealth,samples=15,] {x^2};
>\end{axis}
>\end{tikzpicture}
>```

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}
\begin{document}
\begin{tikzpicture}
\begin{axis}
\addplot [blue,quiver={u=1,v=2*x},-stealth,samples=15,] {x^2};
\end{axis}
\end{tikzpicture}
\end{document}
```

축, 레이블 및 범례는 플롯의 가독성을 높이는 데 중요합니다. `axis lines`는 축의 위치를 설정하고, `xlabel`, `ylabel`은 축에 레이블을 추가하며, `title`은 그림에 제목을 할당합니다. `xmin/xmax/ymin/ymax`는 축의 최소/최대 경계를 설정하고, `xtick/ytick`은 눈금 위치를 정의하며, `legend pos`는 범례 상자의 위치를 지정합니다. `ymajorgrids` 및 `grid style`은 그리드 선을 활성화하고 스타일을 지정하며, `\addlegendentry`는 플롯된 함수에 대한 범례 항목을 추가합니다.

#### 2.1.3 3D 플로팅: 표면, 등고선, 매개변수 플롯

`pgfplots`는 다른 플로팅 소프트웨어와 유사하게 3D 플로팅 기능을 제공합니다. `\addplot3` 명령은 3D 플롯의 주요 인터페이스로, `\addplot`과 유사하지만 세 번째 좌표가 필요합니다.

주요 3D 플롯 유형은 다음과 같습니다:

- **메시 플롯 (`mesh`)**: 수학 표현식 또는 좌표 데이터(행렬 입력)에서 메시 표면을 표시합니다. 

>[!code]
>```
>\begin{tikzpicture}
>	\begin{axis}[
>		title=Example using the mesh parameter,
>		hide axis,
>		colormap/cool,
>	]
>		\addplot3[
>			mesh,
>			samples=50,
>			domain=-8:8,
>		]
>		{sin(deg(sqrt(x^2+y^2)))/sqrt(x^2+y^2)};
>		\addlegendentry{\(\frac{sin(r)}{r}\)}
>	\end{axis}
>\end{tikzpicture}
>```

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}
\begin{document}
\begin{tikzpicture}
\begin{axis}[
    title=Example using the mesh parameter,
    hide axis,
    colormap/cool,
]
\addplot3[
    mesh,
    samples=50,
    domain=-8:8,
]
{sin(deg(sqrt(x^2+y^2)))/sqrt(x^2+y^2)};
\addlegendentry{\(\frac{sin(r)}{r}\)}
\end{axis}
\end{tikzpicture}
\end{document}
```

- **표면 플롯 (`surf`)**: 메시 플롯과 유사하며, 종종 명시적인 색상 매핑을 사용합니다.

>[!code]
>```
>\begin{tikzpicture}
>    \begin{axis}
>     \addplot3[
>         surf,
>     ]
>     coordinates {
>     (0,0,0) (0,1,0) (0,2,0)
>     (1,0,0) (1,1,0.6) (1,2,0.7)
>     (2,0,0) (2,1,0.7) (2,2,1.8)
>     };
>    \end{axis}
>\end{tikzpicture}
> ```

- **등고선 플롯 (`contour gnuplot`)**: 등고선을 생성하며, 종종 `gnuplot`과 같은 외부 프로그램의 사전 계산이 필요합니다. `view={0}{90}`은 위에서 본 시점을 설정합니다. 

>[!code]
>```
>\begin{tikzpicture}
>    \begin{axis}[
>         title={Contour plot, view from top},
>         view={0}{90}
>    ]
> 	   \addplot3[
>        contour gnuplot={levels={0.8, 0.4, 0.2, -0.2}}
> 	   ]
> 	   {sin(deg(sqrt(x^2+y^2)))/sqrt(x^2+y^2)};
>    \end{axis}
>\end{tikzpicture}
>```



- **매개변수 플롯**: 매개변수 방정식으로 정의된 3D 곡선을 플롯합니다. 

>[!code]
>```
>     \begin{tikzpicture}
>     \begin{axis}
>         [
>         view={60}{30},
>         ]
>     \addplot3[
>         domain=0:5*pi,
>         samples = 60,
>         samples y=0,
>     ]
>     ({sin(deg(x))},
>     {cos(deg(x))},
>     {x});
>     \end{axis}
>     \end{tikzpicture}
>```
    
- **셰이더**: `flat`, `faceted`, `interp`와 같은 옵션은 표면 채색 및 렌더링에 사용됩니다. `z buffer`는 폐색(occlusion)을 처리합니다.
    

#### 2.1.4 컴파일 시간 최적화

여러 개 또는 매우 복잡한 `pgfplots` 그림이 포함된 문서는 컴파일하는 데 상당한 시간이 걸릴 수 있습니다. 이는 TeX 접근 방식의 단점 중 하나인 "작은 변경에도 긴 컴파일 시간이 필요하다"는 점을 보여줍니다. `pgfplots`는 이 문제를 해결하기 위해 `external` 라이브러리를 통해 그림을 별도의 PDF 파일로 내보내고, 이 파일들을 문서로 다시 가져오는 기능을 제공합니다. 이를 위해 서문에 `\usepgfplotslibrary{external}` 및 `\tikzexternalize`를 추가해야 합니다. 이 접근 방식은 주 문서의 재컴파일 시간을 크게 줄여 생산성을 향상시킵니다.

> [!code]
> ```
> \usepackage{pgfplots}
> \usepgfplotslibrary{external}
> \tikzexternalize
> ```

이러한 `external` 라이브러리의 존재는 `pgfplots` 사용자를 위한 중요한 실용적 고려 사항을 나타냅니다. TikZ는 강력한 그래픽 기능을 제공하지만, LaTeX 컴파일 프로세스 내에서 복잡한 플롯을 생성하는 계산 부담은 엄청날 수 있습니다. `external` 라이브러리는 이러한 본질적인 한계에 대한 직접적인 엔지니어링 솔루션으로, 사용자가 생산성을 희생하지 않고 TikZ의 강력한 기능을 활용할 수 있도록 합니다. 이는 LaTeX 생태계가 자체 한계를 인식하고 견고한 해결책을 제공한다는 것을 보여주는 중요한 예시입니다. 참고서에서는 이러한 실용적인 최적화 팁을 강조하여 독자에게 실질적인 가치를 제공하고 TikZ 사용 경험을 향상시켜야 합니다.

##### 표 2.1: 일반적인 2D/3D 플롯 유형

|플롯 유형|기본 구문/옵션|설명|주요 사용 사례|
|---|---|---|---|
|선형 플롯|`sharp plot`|점들을 직선으로 연결합니다.|일반적인 선 그래프, 데이터 추세 표시|
|부드러운 플롯|`smooth`|점들 사이를 부드럽게 보간합니다.|미적 곡선, 데이터 보간 시각화|
|Y-막대 플롯|`ybar`|수직 막대를 그립니다.|히스토그램, 막대 차트|
|산점도|`scatter`, `only marks`|개별 데이터 포인트를 표시합니다.|데이터 분포, 상관 관계 시각화|
|표면 플롯|`surf`|데이터/함수에서 3D 표면을 그립니다.|3D 함수 시각화, 지형도|
|등고선 플롯|`contour gnuplot`|3D 등고선의 2D 투영을 그립니다.|등위선 시각화, 고도 지도|

### 2.2 chemfig: 화학 구조 및 반응 그리기

#### 2.2.1 소개 및 설정

`chemfig` 패키지는 TikZ를 기반으로 하는 2D 화학 구조 및 반응 스키마를 그리기 위한 LaTeX 패키지입니다. Perl과 같은 외부 프로그램이 필요한 `ochem`의 대안으로 개발되었습니다. `chemfig`를 사용하려면 LaTeX 문서의 서문에 `\usepackage{chemfig}`를 추가해야 합니다.

> [!code]
> ```
> \usepackage{chemfig}
> ```

#### 2.2.2 기본 분자 그리기: 원자와 결합

분자를 그리는 핵심 명령은 `\chemfig{<code>}` 매크로입니다. `<code>` 인수는 `chemfig`가 단위로 처리하는 "원자"(문자 그룹)를 결합으로 연결하여 분자 구조를 설명하는 일련의 문자입니다.

> [!code]
> ```
> \chemfig{H-C(-[2]H)(-[6]H)-H} % 메탄
> ```

`chemfig`는 각 그룹을 단일 "원자"로 분할합니다. 여기서 "원자"라는 단어는 실제 화학 원자를 의미하는 것이 아니라 `chemfig`의 정의에 따른 것입니다. 예를 들어, `H3C`는 `H3`와 `C`로 분할됩니다. 원자는 다음 대문자 또는 `-`, `=`, `(`, `!`, `*`, `<`, `>`, `@`와 같은 특수 문자까지 확장됩니다. 중괄호 `{}` 안의 문자는 분할 시 무시됩니다. `chemfig`의 이러한 내부적인 "원자" 추상화는 화학 수식을 그래픽 구성 요소로 구문 분석하는 과정을 단순화하는 중요한 설계 선택입니다. 사용자는 `chemfig`가 대문자와 특수 문자를 기반으로 "원자"를 식별하는 특정 구문 분석 규칙을 이해해야 예상치 못한 렌더링을 피할 수 있습니다. 이 추상화는 화학적으로 여러 원자로 구성된 복합 그룹도 그리기 목적으로 단일 단위로 처리할 수 있도록 합니다.

`chemfig`는 두 원자 사이의 9가지 유형의 결합을 지원합니다:

- 단일 결합 (`-`)
    
- 이중 결합 (`=`)
    
- 삼중 결합 (`~`)
    
- 오른쪽 크램 결합, 일반 (`>`)
    
- 왼쪽 크램 결합, 일반 (`<`)
    
- 오른쪽 크램 결합, 점선 (`>:`)
    
- 왼쪽 크램 결합, 점선 (`<:`)
    
- 오른쪽 크램 결합, 빈 (`>|`)
    
- 왼쪽 크램 결합, 빈 (`<|`)
    

> [!code]
> ```
> \chemfig{A-B} % 단일 결합
> \chemfig{A=B} % 이중 결합
> \chemfig{A~B} % 삼중 결합
> \chemfig{A&gt;B} % 오른쪽 크램 결합
> \chemfig{A&lt;:B} % 왼쪽 크램, 점선
> ```

결합의 사용자 정의는 다양합니다. `double bond sep`, `atom sep`, `bond offset`과 같은 옵션은 간격을 조정합니다. `bond style={tikz code}`는 모든 후속 결합에 대한 스타일을 설정하며, 개별 결합은 다섯 번째 선택적 인수 `[,,,,<tikz code>]`를 통해 사용자 정의할 수 있습니다. 결합 각도는 첫 번째 선택적 인수 `[:<absolute angle>]` 또는 `[::<relative angle>]`로 정의됩니다. 미리 정의된 각도(45도 배수)도 사용할 수 있습니다. 결합 길이는 두 번째 선택적 인수 `[,<coeff>]`로 조절되며, `\chemfig*`는 고정된 결합 길이를 설정합니다. `chemfig`는 결합 각도를 기반으로 연결될 원자를 자동으로 결정하지만, `[,,<integer 1>,<integer 2>]`를 사용하여 수동으로 지정할 수 있습니다.

> [!code]
> ```
> \chemfig{C(-[:0]H)(-[:90]H)(-[:180]H)(-[:270]H)} % 메탄, 각도 지정
> \chemfig{-[:30]-[:-30]-[:30]} % 골격 다이어그램
> \chemfig{-[:30]=[:-30]-[:30]} % 이중 결합이 있는 골격 다이어그램
> ```

##### 표 2.2: `chemfig` 결합 유형

|결합 유형|코드|시각적 표현 (설명/예시)|설명|
|---|---|---|---|
|단일 결합|`-`|`A-B`|단일 선|
|이중 결합|`=`|`A=B`|두 개의 평행선|
|삼중 결합|`~`|`A~B`|세 개의 평행선|
|오른쪽 크램, 일반|`>`|`A>B`|채워진 쐐기 모양|
|왼쪽 크램, 점선|`<:`|`A<:B`|점선으로 된 쐐기 모양|

#### 2.2.3 복잡한 구조: 가지, 고리, 루이스 구조

`chemfig`는 복잡한 화학 구조를 그릴 수 있는 기능을 제공합니다. 가지는 원자 뒤에 `(<code>)`를 사용하여 하위 분자를 연결하여 생성됩니다. 이러한 하위 분자는 중첩될 수 있습니다. 고리는 `<atom>*<n>(<code>)` 구문을 사용하여 정다각형(n-각형 고리)으로 그려집니다. 고리 내부에 원이나 호를 그리려면 `**[<angles>,<tikz>]<n>(<code>)`를 사용합니다. `?`로 표시된 "훅"(hooks)은 `?[<name>,<bond>,<tikz>]` 구문을 사용하여 인접하지 않은 원자를 연결할 수 있도록 합니다.

> [!code]
> ```
> \chemfig{C(-[2]CH_3)(-[6]CH_3)} % 가지
> \chemfig{*6(=-=-=-)} % 벤젠 고리
> \chemfig{A*6(-B-C-D-E-F-)} % 원자로 구성된 고리
> ```

루이스 구조는 `\charge{<position>=<charge>}{atom}` 구문을 사용하여 그립니다. `\.`, `\:`, `\|`와 같은 기호는 비공유 전자쌍 또는 홀전자를 나타내는 데 사용됩니다. 이온 전하는 수학 모드에서 위첨자로 추가할 수 있습니다(예: `O^{-}`). `\oplus` 및 `\ominus`는 원형 전하를 나타내는 데 사용되며, `\chemabove{}{}`는 원자 위에 전하를 배치하는 데 사용됩니다.

> [!code]
> ```
> \chemfig{\charge{0=\.,90=\.,180=\.,270=\.}{C}} % 탄소 원자의 루이스 구조
> \chemfig{H-[:52.24]\charge{45=\:,135=\:}{O}-[::-104.48]H} % 물 분자의 루이스 구조
> \chemfig{-(-O^{-})=O} % 아세테이트 이온
> \chemfig{-\chemabove{N}{\scriptstyle\oplus}(=O)-O^{\ominus}} % 질산 이온
> ```

#### 2.2.4 화학 반응 및 전자 이동

화학 반응 스키마는 `\schemestart...\schemestop` 환경 내에 포함됩니다. `\arrow` 명령은 화합물 사이에 반응 화살표를 그리는 데 사용됩니다. 이 명령은 `->`, `<->` 등 다양한 화살표 유형을 지원하며, `->[up][down]`과 같이 화살표 위아래에 레이블을 추가할 수 있습니다. `\+` 명령은 반응 스키마에서 더하기 기호를 표시합니다.

> [!code]
> ```
> \schemestart
>   \chemfig{A} \arrow{-&gt;[reagent][solvent]} \chemfig{B} \+ \chemfig{C}
> \schemestop
> ```

`chemfig`의 초기 버전에서 사용되던 `\chemrel` 및 `\chemsign` 명령은 최신 버전에서 제거되었으며, 대신 `\schemestart` 및 `\schemestop` 블록 내에서 `\arrow` 및 `\+` 명령이 사용됩니다. 이는 `chemfig`가 활발하게 개발되는 패키지이며, 구문이 진화할 수 있음을 나타냅니다. 참고서에서는 현재의 모범 사례와 구문을 제시하고, 구 버전의 명령이 널리 사용되는 경우 간략하게 언급하는 것이 중요합니다. 이러한 변화는 LaTeX 패키지 개발의 일반적인 경향을 보여주며, 지속적인 개선은 때때로 호환성을 깨는 변경을 수반합니다. 좋은 참고서는 최신 정보를 제공하고 사용자가 호환 가능하고 효율적인 관행을 따르도록 안내해야 합니다.

전자 이동(메조머리 효과 및 반응 메커니즘)을 나타내기 위해 `chemfig`는 `@{<name>}`를 사용하여 출발점과 도착점에 TikZ 노드를 배치할 수 있도록 합니다. 이러한 노드는 `\chemmove[<opt>]{\draw[<tikz opt>](<name1>)<tikz link>(<name2>);}` 명령을 사용하여 연결됩니다.

> [!code]
> ```
> \chemfig{O=C(-[2]O)-[6]O}
> \chemmove{
>   \draw[-&gt;] (O.north).. controls +(90:5mm) and +(90:5mm).. (C.north);
>   \draw[-&gt;] (C.south).. controls +(-90:5mm) and +(-90:5mm).. (O.south);
> }
> ```

#### 2.2.5 분자 명명

분자에 이름을 붙이려면 `\chemname[<dim>]{\chemfig{<code of the molecule>}}{<name>}` 명령을 사용합니다. `<name>`은 수평으로 중앙에 배치됩니다. 반응에서 분자의 수직 정렬을 보장하기 위해 `\chemnameinit{<deepest molecule>}`를 사용하고 반응 후에 `\chemnameinit{}`를 사용해야 합니다.

> [!code]
> ```
> \chemname{\chemfig{CH_4}}{Methane}
> ```

### 2.3 tikz-cd: 가환 다이어그램 생성

#### 2.3.1 소개 및 설정

`tikz-cd` 패키지는 가환 다이어그램을 생성하는 데 특화된 도구로, LaTeX의 `array` 환경과 유사한 구문을 제공합니다. 이 패키지는 `amscd`보다 큰 객체와 긴 레이블을 더 효과적으로 처리합니다. `tikz-cd`를 사용하려면 서문에 `\usepackage{tikz-cd}`를 추가해야 합니다.

> [!code]
> ```
> \usepackage{tikz-cd}
> ```

`tikz-cd`는 가환 다이어그램을 위한 TikZ 위에 구축된 고수준 추상화입니다. 이는 TikZ의 원시적인 유연성 중 일부를 희생하는 대신 사용 편의성과 전문화된 기능(예: 자동 화살표 배치 및 레이블 처리)을 제공하여 특정 분야에서 매우 효율적입니다. `amscd`에 대한 우월성은 이 특정 유형의 다이어그램에 대한 더 강력하고 사용자 친화적인 솔루션이라는 설계 목표를 강조합니다. 이는 TikZ 생태계의 일반적인 패턴을 시사합니다. 즉, 전문화된 패키지는 복잡한 작업을 단순화하는 도메인별 추상화를 제공합니다. 참고서에서는 독자에게 작업에 적합한 도구를 선택하도록 안내해야 합니다. 즉, 극단적인 사용자 정의가 필요하지 않는 한, 원시 TikZ로 처음부터 다이어그램을 구축하는 대신 가환 다이어그램에는 `tikz-cd`를 사용하도록 권장해야 합니다.

#### 2.3.2 기본 다이어그램 구조

가환 다이어그램은 `\begin{tikzcd}...\end{tikzcd}` 환경 내에 생성됩니다. 노드는 열을 위해 `&`로, 행을 위해 `\\`로 구분되며, 이는 `array` 또는 `matrix` 환경과 유사합니다. `\ar` 명령은 노드 사이에 화살표를 그리는 데 사용됩니다. 방향은 `r`(오른쪽), `d`(아래), `rd`(오른쪽 아래)와 같이 지정됩니다.

> [!code]
> ```
> \begin{tikzcd}
> A \arrow{r}{a} \arrow{d}{b}
> &amp;B \arrow{d}{c}\\
> C \arrow{r}{d} &amp;D
> \end{tikzcd}
> ```

#### 2.3.3 화살표 유형 및 레이블

`tikz-cd` 패키지는 다양한 화살표 유형을 지원합니다. `hook`, `two heads`, `dotted`, `hookleftarrow`와 같은 옵션은 화살표의 모양을 사용자 정의합니다. 레이블은 `{}`, `[swap]{}`와 같이 화살표 위/아래에 텍스트를 배치하는 데 사용됩니다. 긴 레이블의 경우, `column sep=large` 옵션을 사용하여 레이블이 겹치는 것을 방지할 수 있습니다.

> [!code]
> ```
> \begin{tikzcd}
> A \arrow[hook]{r}\arrow[two heads]{rd}
> &amp;B \arrow[dotted]{d}\arrow[hookleftarrow]{r}
> &amp;C \arrow[two heads]{ld}\\
> &amp;D
> \end{tikzcd}
> ```

> [!code]
> ```
> \begin{tikzcd}
> A \arrow[hook]{r}{u}[swap]{b}
> \arrow[two heads]{rd}{u}[swap]{b}
> &amp;B \arrow[dotted]{d}{r}[swap]{l}
> \arrow[hookleftarrow]{r}{u}[swap]{b}
> &amp;C \arrow[two heads]{ld}{b}[swap]{u}\\
> &amp;D
> \end{tikzcd}
> ```

##### 표 2.3: 일반적인 `tikz-cd` 화살표 옵션

|옵션|설명|예시 구문|
|---|---|---|
|`hook`|갈고리가 있는 화살표|`\arrow[hook]{r}`|
|`two heads`|두 개의 머리가 있는 화살표|`\arrow[two heads]{rd}`|
|`dotted`|점선 화살표|`\arrow[dotted]{d}`|
|`bend left`|왼쪽으로 휘어지는 화살표|`\arrow[bend left]{r}`|
|`swap`|레이블 위치를 반전|`\arrow{r}{u}[swap]{b}`|

#### 2.3.4 곡선 화살표 및 루프

화살표는 `bend left` 및 `bend right` 옵션을 사용하여 간단하게 휘게 할 수 있습니다. 더 복잡한 곡선은 `out`, `in`, `min distance` 옵션을 사용하거나 명시적인 `controls` 좌표를 사용하여 달성할 수 있습니다. `loop left` 및 `loop right`옵션은 노드에 자체 루프를 추가하는 데 사용됩니다.

> [!code]
> ```
> \begin{tikzcd}
> A\arrow[bend left]{r}\arrow[bend right]{r}&amp;B
> \end{tikzcd}
> ```

> [!code]
> ```
> \begin{tikzcd}
> &amp; A &amp; \\[10pt]
> B \ar[rr, bend right]\ar[loop left, &lt;-] &amp; &amp; C \ar[ll, bend right]\ar[loop right]
> \end{tikzcd}
> ```

`tikz-cd`는 다이어그램 생성을 단순화하지만, `execute at end picture`와 같은 명령을 사용하여 표준 `\ar` 구문 외부에서 `plot [smooth, tension=3] coordinates`로 복잡한 곡선 화살표를 그리는 예시가 있습니다. 이는 `tikz-cd`가 닫힌 시스템이 아님을 보여줍니다. 사용자는 `tikz-cd`가 내부적으로 사용하는 `tikzpicture` 환경 내에서 원시 TikZ 명령으로 "내려가서" `tikz-cd`의 단순화된 구문이 직접 지원하지 않는 고도로 사용자 정의된 그래픽 요소를 달성할 수 있습니다. 이러한 유연성은 고급 사용자에게 강력한 기능입니다. 포괄적인 참고서는 단순화된 `tikz-cd`구문뿐만 아니라 일반 TikZ 기능과 통합하는 방법도 보여주어야 합니다. 이는 사용자에게 필요한 경우 고수준 추상화의 한계를 극복하고 진정으로 독특하고 복잡한 다이어그램을 만들 수 있는 능력을 부여합니다.

#### 2.3.5 `tikz-cd` 내 노드 배치 및 스타일링

`every matrix/.append style={nodes={...}}`와 같은 옵션을 사용하여 `tikzcd` 환경 내의 모든 노드에 스타일(모양, 채우기, 간격)을 적용할 수 있습니다. 또한, `every matrix/.append style={name=mycd}`를 사용하여 매트릭스에 이름을 지정하면, `tikzcd` 매트릭스 내의 노드를 환경 외부에서 참조할 수 있습니다(예: `(mycd-2-1.80)`).

> [!code]
> ```
> \begin{tikzcd}[column sep=6pt,
>     every matrix/.append style={
>         name=mycd,
>         nodes={circle, fill=black, outer sep= 2pt, inner sep=3pt}
>         },
>     execute at end picture={
>         \draw [-&gt;] plot [smooth, tension=3] coordinates { (mycd-2-1.80) (mycd-1-2.-135) (mycd-2-1.50)};
>         \draw [-&gt;] plot [smooth, tension=3] coordinates { (mycd-2-3.130) (mycd-1-2.-45) (mycd-2-3.100)};
>        }
>     ]
> &amp; {} &amp; \\[10pt]
> {} \ar[rr, bend right]\ar[loop left, &lt;-] &amp; &amp; {} \ar[ll, bend right]\ar[loop right]
> \end{tikzcd}
> ```

### 2.4 tikz-3dplot: 3D 좌표계 및 다이어그램 시각화

#### 2.4.1 소개 및 설정

`tikz-3dplot` 패키지는 TikZ를 사용하여 LaTeX 문서 내에서 3D 좌표계와 간단한 3D 다이어그램을 그리기 위한 도구를 제공합니다. 이 패키지는 특히 물리학 논문을 위한 정확한 3D 벡터 이미지를 그리는 데 도움이 되도록 개발되었습니다.

`tikz-3dplot`는 일반적으로 복잡한 표면이나 객체 불투명도를 처리하지 않습니다. `\tdplotsphericalsurfaceplot`명령이 구형 극좌표 표면을 렌더링하는 유일한 예외입니다. 이 패키지 작성자는 `tikz-3dplot`가 무엇을 위해 설계되지 않았는지 명시적으로 밝혀 사용자 기대치를 안내합니다. 이는 좌절을 피하고, 사용자의 요구가 `tikz-3dplot`의 기능을 초과할 때 다른 도구(예: Sketch)로 안내하는 데 중요합니다. 이는 전문화된 도구에는 종종 정의된 경계가 있음을 강조합니다. 참고서에서는 이러한 한계를 투명하게 전달하는 것이 기능 설명만큼 중요합니다. 이는 사용자가 주어진 작업에 가장 적합한 패키지를 선택하는 데 도움이 되며, 특정 3D 시각화 요구 사항에 가장 적합한 도구를 선택하도록 보장합니다.

`tikz-3dplot`를 사용하려면 `\usepackage{tikz-3dplot}`를 서문에 추가해야 하며, 이는 `ifthen`과 같은 다른 필수 패키지 뒤에 와야 합니다.

> [!code]
> ```
> \usepackage{tikz-3dplot}
> ```

#### 2.4.2 주 좌표계 및 회전 좌표계

`tikz-3dplot`는 계층적 좌표계를 기반으로 합니다.

- **주 좌표계 (`\tdplotsetmaincoords{θd}{ϕd}`)**: 3D 공간의 전체 방향을 정의합니다. `θd`는 x축을 중심으로 회전하고, `ϕd`는 z축을 중심으로 회전합니다. `tdplot_main_coords` 스타일은 이 변환을 적용합니다.

>[!code]
>```
>     \tdplotsetmaincoords{70}{110}
>     \begin{tikzpicture}[tdplot_main_coords]
>     \draw[thick,->] (0,0,0) -- (1,0,0) node[anchor=north east]{$x$};
>     \draw[thick,->] (0,0,0) -- (0,1,0) node[anchor=north west]{$y$};
>     \draw[thick,->] (0,0,0) -- (0,0,1) node[anchor=south]{$z$};
>     \end{tikzpicture}
>```
    
- **회전 좌표계 (`\tdplotsetrotatedcoords{α}{β}{γ}`)**: 주 좌표계에 대해 오일러 각을 사용하여 회전된 보조 좌표계를 정의합니다. `tdplot_rotated_coords` 스타일이 이를 적용하며, 원점(`\tdplotsetrotatedcoordsorigin`)도 설정할 수 있습니다.

>[!code]
>```
>     \tdplotsetmaincoords{70}{110}
>     \begin{tikzpicture}[tdplot_main_coords]
>     \draw[thick,->] (0,0,0) -- (1,0,0) node[anchor=north east]{$x$};
>     \draw[thick,->] (0,0,0) -- (0,1,0) node[anchor=north west]{$y$};
>     \draw[thick,->] (0,0,0) -- (0,0,1) node[anchor=south]{$z$};
>     \tdplotsetrotatedcoords{60}{40}{30}
>     \draw[thick,color=blue,tdplot_rotated_coords,->] (0,0,0) -- (.7,0,0) node[anchor=north]{$x'$};
>     \draw[thick,color=blue,tdplot_rotated_coords,->] (0,0,0) -- (0,.7,0) node[anchor=west]{$y'$};
>     \draw[thick,color=blue,tdplot_rotated_coords,->] (0,0,0) -- (0,0,.7) node[anchor=south]{$z'$};
>     \end{tikzpicture}
>     ``` > [!code]
>     \tdplotsetmaincoords{70}{110}
>     \begin{tikzpicture}[tdplot_main_coords]
>     \draw[thick,-&gt;] (0,0,0) -- (1,0,0) node[anchor=north east]{$x$};
>     \draw[thick,-&gt;] (0,0,0) -- (0,1,0) node[anchor=north west]{$y$};
>     \draw[thick,-&gt;] (0,0,0) -- (0,0,1) node[anchor=south]{$z$};
>     \tdplotsetrotatedcoords{60}{40}{30}
>     \coordinate (Shift) at (0.5,0.5,0.5);
>     \tdplotsetrotatedcoordsorigin{(Shift)}
>     \draw[thick,color=blue,tdplot_rotated_coords,-&gt;] (0,0,0) -- (.7,0,0) node[anchor=north]{$x&#39;$};
>     \draw[thick,color=blue,tdplot_rotated_coords,-&gt;] (0,0,0) -- (0,.7,0) node[anchor=west]{$y&#39;$};
>     \draw[thick,color=blue,tdplot_rotated_coords,-&gt;] (0,0,0) -- (0,0,.7) node[anchor=south]{$z&#39;$};
>     \end{tikzpicture}
>```
    
- **세타 평면 좌표 (`\tdplotsetthetaplanecoords{ϕ}`)**: 회전된 좌표계를 특정 "세타 평면" 내에 있도록 구성하며, 극좌표와 관련된 호를 그리는 데 유용합니다.

>[!code]
>```
>     \tdplotsetmaincoords{70}{110}
>     \begin{tikzpicture}[scale=3,tdplot_main_coords]
>     \draw[thick,->] (0,0,0) -- (1,0,0) node[anchor=north east]{$x$};
>     \draw[thick,->] (0,0,0) -- (0,1,0) node[anchor=north west]{$y$};
>     \draw[thick,->] (0,0,0) -- (0,0,1) node[anchor=south]{$z$};
>     \tdplotsetcoord{P}{.8}{50}{70}
>     \draw[-stealth,color=red] (O) -- (P);
>     \draw[dashed, color=red] (O) -- (Pxy);
>     \draw[dashed, color=red] (P) -- (Pxy);
>     \tdplotsetthetaplanecoords{70}
>     \draw[tdplot_rotated_coords,color=blue,thick,->] (0,0,0) -- (.2,0,0) node[anchor=east]{$x'$};
>     \draw[tdplot_rotated_coords,color=blue,thick,->] (0,0,0) -- (0,.2,0) node[anchor=north]{$y'$};
>     \draw[tdplot_rotated_coords,color=blue,thick,->] (0,0,0) -- (0,0,.2) node[anchor=west]{$z'$};
>     \end{tikzpicture}
>```
    
- **화면 좌표 (`tdplot_screen_coords`)**: 표준 2D TikZ 프레임을 제공하며, 3D 변환의 영향을 받지 않고 페이지에 요소를 절대적으로 배치하는 데 유용합니다.
    

`tikz-3dplot`는 계층적 좌표계를 사용합니다. 회전된 시스템에서 정의된 점은 먼저 주 시스템에 대해 변환된 다음, 주 시스템 자체가 2D 화면 보기로 변환됩니다. 이러한 계층 구조는 3D 공간에서 객체를 정확하게 배치하고 방향을 지정하는 데 중요합니다. 참고서에서는 이러한 기본 계층적 모델을 설명하는 것이 사용자의 이해를 심화하고 복잡한 3D 다이어그램을 디버깅하는 능력을 향상시킬 것입니다. 이는 또한 서문에서 `\tdplotset...coords` 명령의 순서가 그리기 컨텍스트를 설정하는 데 중요함을 의미합니다.

##### 표 2.4: `tikz-3dplot` 좌표 설정 명령

|명령|매개변수|목적|예시 사용 사례|
|---|---|---|---|
|`\tdplotsetmaincoords`|`θd, ϕd`|주 3D 뷰 각도를 설정합니다.|전역 장면 방향 설정|
|`\tdplotsetrotatedcoords`|`α, β, γ`|보조, 회전된 3D 프레임을 설정합니다.|로컬 좌표계 또는 객체 그리기|
|`\tdplotsetrotatedcoordsorigin`|`point`|회전된 프레임의 원점을 설정합니다.|회전된 객체를 특정 지점에 배치|
|`\tdplotsetthetaplanecoords`|`ϕ`|회전된 프레임을 "세타 평면"에 정렬합니다.|극좌표와 관련된 호 그리기|

#### 2.4.3 3D 점 정의 및 변환

`\tdplotsetcoord{point}{r}{θ}{ϕ}` 명령은 구형 좌표(반경, 극각, 방위각)를 기반으로 TikZ 좌표(및 그 투영)를 생성합니다. `\tdplottransformmainrot`, `\tdplottransformrotmain`, `\tdplottransformmainscreen`과 같은 좌표 변환 명령은 주, 회전 및 화면 프레임 간에 좌표를 변환하고, 결과를 매크로(`\tdplotresx`, `\tdplotresy`, `\tdplotresz`)에 저장합니다. `\tdplotcrossprod`는 두 3D 벡터의 외적을 계산하는 데 사용됩니다.

> [!code]
> ```
> \tdplotsetmaincoords{60}{130}
> \begin{tikzpicture}[scale=2,tdplot_main_coords]
> \coordinate (O) at (0,0,0);
> \tdplotsetcoord{P}{.8}{55}{60}
> \draw[thick,-&gt;] (0,0,0) -- (1,0,0) node[anchor=north east]{$x$};
> \draw[thick,-&gt;] (0,0,0) -- (0,1,0) node[anchor=north west]{$y$};
> \draw[thick,-&gt;] (0,0,0) -- (0,0,1) node[anchor=south]{$z$};
> \draw[-stealth,color=red] (O) -- (P);
> \draw[dashed, color=red] (O) -- (Px);
> \draw[dashed, color=red] (O) -- (Py);
> \draw[dashed, color=red] (O) -- (Pz);
> \draw[dashed, color=red] (Px) -- (Pxy);
> \draw[dashed, color=red] (Py) -- (Pxy);
> \draw[dashed, color=red] (Px) -- (Pxz);
> \draw[dashed, color=red] (Pz) -- (Pxz);
> \draw[dashed, color=red] (Py) -- (Pyz);
> \draw[dashed, color=red] (Pz) -- (Pyz);
> \draw[dashed, color=red] (Pxy) -- (P);
> \draw[dashed, color=red] (Pxz) -- (P);
> \draw[dashed, color=red] (Pyz) -- (P);
> \end{tikzpicture}
> ```

> [!code]
> ```
> \tdplotsetmaincoords{50}{140}
> \begin{tikzpicture}[scale=2,tdplot_main_coords]
> \draw[thick,-&gt;] (0,0,0) -- (1,0,0) node[anchor=north east]{$x$};
> \draw[thick,-&gt;] (0,0,0) -- (0,1,0) node[anchor=north west]{$y$};
> \draw[thick,-&gt;] (0,0,0) -- (0,0,1) node[anchor=south]{$z$};
> \pgfmathsetmacro{\ax}{2} \pgfmathsetmacro{\ay}{2} \pgfmathsetmacro{\az}{1}
> \tdplotsetrotatedcoords{20}{40}{00}
> \draw[thick,color=red,tdplot_rotated_coords,-&gt;] (0,0,0) -- (.7,0,0) node[anchor=east]{$x&#39;$};
> \draw[thick,color=green!50!black,tdplot_rotated_coords,-&gt;] (0,0,0) -- (0,.7,0) node[anchor=west]{$y&#39;$};
> \draw[thick,color=blue,tdplot_rotated_coords,-&gt;] (0,0,0) -- (0,0,.7) node[anchor=south]{$z&#39;$};
> \tdplottransformmainrot{\ax}{\ay}{\az}
> \draw[tdplot_rotated_coords,-&gt;,blue!50] (0,0,0) -- (\tdplotresx,\tdplotresy,\tdplotresz);
> \node[tdplot_main_coords,anchor=south] at (\ax,\ay,\az){Main coords: (\ax, \ay, \az)};
> \node[tdplot_rotated_coords,anchor=north] at (\tdplotresx,\tdplotresy,\tdplotresz) {Rotated coords: (\tdplotresx, \tdplotresy, \tdplotresz)};
> \end{tikzpicture}
> ```

> [!code]
> ```
> \tdplotsetmaincoords{50}{140}
> \begin{tikzpicture}[scale=2,tdplot_main_coords]
> \draw[thick,-&gt;] (0,0,0) -- (1,0,0) node[anchor=north east]{$x$};
> \draw[thick,-&gt;] (0,0,0) -- (0,1,0) node[anchor=north west]{$y$};
> \draw[thick,-&gt;] (0,0,0) -- (0,0,1) node[anchor=south]{$z$};
> \pgfmathsetmacro{\ax}{-.75} \pgfmathsetmacro{\ay}{2.5} \pgfmathsetmacro{\az}{0}
> \tdplotsetrotatedcoords{20}{40}{00}
> \draw[thick,color=red,tdplot_rotated_coords,-&gt;] (0,0,0) -- (.7,0,0) node[anchor=east]{$x&#39;$};
> \draw[thick,color=green!50!black,tdplot_rotated_coords,-&gt;] (0,0,0) -- (0,.7,0) node[anchor=west]{$y&#39;$};
> \draw[thick,color=blue,tdplot_rotated_coords,-&gt;] (0,0,0) -- (0,0,.7) node[anchor=south]{$z&#39;$};
> \tdplottransformrotmain{\ax}{\ay}{\az}
> \draw[tdplot_main_coords,-&gt;,blue!50] (0,0,0) -- (\tdplotresx,\tdplotresy,\tdplotresz);
> \node[tdplot_rotated_coords,anchor=north] at (\ax,\ay,\az){Rotated coords: (\ax, \ay, \az)};
> \node[tdplot_main_coords,anchor=south] at (\tdplotresx,\tdplotresy,\tdplotresz) {Main coords: (\tdplotresx, \tdplotresy, \tdplotresz)};
> \end{tikzpicture}
> ```

> [!code]
> ```
> \tdplotsetmaincoords{50}{140}
> \begin{tikzpicture}[scale=2,tdplot_main_coords]
> \draw[thick,-&gt;] (0,0,0) -- (1,0,0) node[anchor=north east]{$x$};
> \draw[thick,-&gt;] (0,0,0) -- (0,1,0) node[anchor=north west]{$y$};
> \draw[thick,-&gt;] (0,0,0) -- (0,0,1) node[anchor=south]{$z$};
> \pgfmathsetmacro{\ax}{2} \pgfmathsetmacro{\ay}{3} \pgfmathsetmacro{\az}{1}
> \tdplottransformmainscreen{\ax}{\ay}{\az}
> \draw[tdplot_screen_coords,-&gt;,blue!50] (0,0) -- (\tdplotresx,\tdplotresy);
> \node[tdplot_main_coords,anchor=south] at (\ax,\ay,\az){Main coords: (\ax, \ay, \az)};
> \node[tdplot_screen_coords,anchor=north] at (\tdplotresx,\tdplotresy) {Screen coords: (\tdplotresx, \tdplotresy)};
> \end{tikzpicture}
> ```

> [!code]
> ```
> \tdplotsetmaincoords{70}{110}
> \begin{tikzpicture}[tdplot_main_coords]
> \draw[thick,-&gt;] (0,0,0) -- (3,0,0) node[anchor=north east]{$x$};
> \draw[thick,-&gt;] (0,0,0) -- (0,3,0) node[anchor=north west]{$y$};
> \draw[thick,-&gt;] (0,0,0) -- (0,0,3) node[anchor=south]{$z$};
> \pgfmathsetmacro{\ax}{1} \pgfmathsetmacro{\ay}{1} \pgfmathsetmacro{\az}{1}
> \draw[-&gt;,red] (0,0,0) -- (\ax,\ay,\az);
> \draw[dashed,red] (0,0,0) -- (\ax,\ay,0) -- (\ax,\ay,\az);
> \tdplotgetpolarcoords{\ax}{\ay}{\az}
> \tdplotsetthetaplanecoords{\tdplotresphi}
> \tdplotdrawarc[tdplot_rotated_coords]{(0,0,0)}{1}{0}%
> {\tdplotrestheta}{anchor=west}{$\theta = \tdplotrestheta$}
> \end{tikzpicture}
> ```

> [!code]
> ```
> \tdplotsetmaincoords{50}{110}
> \begin{tikzpicture}[tdplot_main_coords]
> \draw[thick,-&gt;] (0,0,0) -- (3,0,0) node[anchor=north east]{$x$};
> \draw[thick,-&gt;] (0,0,0) -- (0,3,0) node[anchor=north west]{$y$};
> \draw[thick,-&gt;] (0,0,0) -- (0,0,3) node[anchor=south]{$z$};
> \pgfmathsetmacro{\ax}{1} \pgfmathsetmacro{\ay}{1} \pgfmathsetmacro{\az}{.4}
> \pgfmathsetmacro{\bx}{-1} \pgfmathsetmacro{\by}{1} \pgfmathsetmacro{\bz}{.6}
> \tdplotcrossprod(\ax,\ay,\az)(\bx,\by,\bz)
> \draw[-&gt;,red] (0,0,0) -- (\ax,\ay,\az) node[anchor=west]{$\vec{A}$};
> \draw[dashed,red] (0,0,0) -- (\ax,\ay,0) -- (\ax,\ay,\az);
> \draw[-&gt;,green!50!black] (0,0,0) -- (\bx,\by,\bz) node[anchor=south west]{$\vec{B}$};
> \draw[dashed,green!50!black] (0,0,0) -- (\bx,\by,0) -- (\bx,\by,\bz);
> \draw[-&gt;,blue] (0,0,0) -- (\tdplotresx,\tdplotresy,\tdplotresz) node[anchor=south east]{$\vec{A}\times\vec{B}$};
> \draw[dashed,blue] (0,0,0) -- (\tdplotresx,\tdplotresy,0) -- (\tdplotresx,\tdplotresy,\tdplotresz);
> \end{tikzpicture}
> ```

#### 2.4.4 3D에서 호 및 표면 그리기

`\tdplotdrawarc` 명령은 xy 또는 x'y' 평면에 호를 그립니다. 이는 좌표계, 중심, 반경, 시작/끝 각도 및 레이블에 대한 옵션을 제공합니다. `\tdplotdrawpolytopearc`는 세 개의 지정된 점(정점, 각도 범위를 정의하는 두 점)과 반경을 사용하여 호를 그립니다.

> [!code]
> ```
> \tdplotsetmaincoords{60}{110}
> \pgfmathsetmacro{\rvec}{.8} \pgfmathsetmacro{\thetavec}{30} \pgfmathsetmacro{\phivec}{60}
> \begin{tikzpicture}[scale=5,tdplot_main_coords]
> \coordinate (O) at (0,0,0);
> \draw[thick,-&gt;] (0,0,0) -- (1,0,0) node[anchor=north east]{$x$};
> \draw[thick,-&gt;] (0,0,0) -- (0,1,0) node[anchor=north west]{$y$};
> \draw[thick,-&gt;] (0,0,0) -- (0,0,1) node[anchor=south]{$z$};
> \tdplotsetcoord{P}{\rvec}{\thetavec}{\phivec}
> \draw[-stealth,color=red] (O) -- (P);
> \draw[dashed, color=red] (O) -- (Pxy);
> \draw[dashed, color=red] (P) -- (Pxy);
> \tdplotdrawarc{(O)}{0.2}{0}{\phivec}{anchor=north}{$\phi$}
> \tdplotsetthetaplanecoords{\phivec}
> \tdplotdrawarc[tdplot_rotated_coords]{(0,0,0)}{0.5}{0}%
> {\thetavec}{anchor=south west}{$\theta$}
> \draw[dashed,tdplot_rotated_coords] (\rvec,0,0) arc (0:90:\rvec);
> \draw[dashed] (\rvec,0,0) arc (0:90:\rvec);
> \tdplotsetrotatedcoords{\phivec}{\thetavec}{0}
> \tdplotsetrotatedcoordsorigin{(P)}
> \draw[thick,tdplot_rotated_coords,-&gt;] (0,0,0) -- (.5,0,0) node[anchor=north west]{$x&#39;$};
> \draw[thick,tdplot_rotated_coords,-&gt;] (0,0,0) -- (0,.5,0) node[anchor=west]{$y&#39;$};
> \draw[thick,tdplot_rotated_coords,-&gt;] (0,0,0) -- (0,0,.5) node[anchor=south]{$z&#39;$};
> \draw[-stealth,color=blue,tdplot_rotated_coords] (0,0,0) -- (.2,.2,.2);
> \draw[dashed,color=blue,tdplot_rotated_coords] (0,0,0) -- (.2,.2,0);
> \draw[dashed,color=blue,tdplot_rotated_coords] (.2,.2,0) -- (.2,.2,.2);
> \tdplotdrawarc[tdplot_rotated_coords,color=blue]{(0,0,0)}{0.2}{0}%
> {45}{anchor=north west,color=black}{$\phi&#39;$}
> \tdplotsetrotatedthetaplanecoords{45}
> \tdplotdrawarc[tdplot_rotated_coords,color=blue]{(0,0,0)}{0.2}{0}%
> {55}{anchor=south west,color=black}{$\theta&#39;$}
> \end{tikzpicture}
> ```

> [!code]
> ```
> \tdplotsetmaincoords{60}{110}
> \begin{tikzpicture}[tdplot_main_coords]
> \draw[thick,-&gt;] (0,0,0) -- (5,0,0) node[anchor=north east]{$x$};
> \draw[thick,-&gt;] (0,0,0) -- (0,5,0) node[anchor=north west]{$y$};
> \draw[thick,-&gt;] (0,0,0) -- (0,0,5) node[anchor=south]{$z$};
> \tdplotdefinepoints(2,2,2)(3,5,1)(-1,5,3)
> \draw[dashed] (0,0,0) -- (\tdplotvertexx,\tdplotvertexy,0) -- (\tdplotvertexx,\tdplotvertexy,\tdplotvertexz);
> \draw[dashed] (0,0,0) -- (\tdplotax,\tdplotay,0) -- (\tdplotax,\tdplotay,\tdplotaz);
> \draw[dashed] (0,0,0) -- (\tdplotbx,\tdplotby,0) -- (\tdplotbx,\tdplotby,\tdplotbz);
> \draw[-&gt;,red] (\tdplotvertexx,\tdplotvertexy,\tdplotvertexz) -- (\tdplotax,\tdplotay,\tdplotaz);
> \draw[-&gt;,green!50!black] (\tdplotvertexx,\tdplotvertexy,\tdplotvertexz) -- (\tdplotbx,\tdplotby,\tdplotbz);
> \node[anchor=east] at (\tdplotvertexx,\tdplotvertexy,\tdplotvertexz){Vertex};
> \node[anchor=north west] at (\tdplotax,\tdplotay,\tdplotaz){A};
> \node[anchor=south west] at (\tdplotbx,\tdplotby,\tdplotbz){B};
> \tdplotdrawpolytopearc[thick]{1}{anchor=west}{$\theta$}
> \end{tikzpicture}
> ```

`\tdplotsphericalsurfaceplot` 명령은 구형 극좌표 함수로 정의된 3D 표면을 렌더링하는 데 특화되어 있습니다. 이 명령은 채우기 색상 스타일 및 축 그리기 옵션을 제공하며, `\tdplotsetpolarplotrange`를 사용하여 각도 범위를 정의해야 합니다.

> [!code]
> ```
> \tdplotsetmaincoords{70}{135}
> \begin{tikzpicture}[scale=2,line join=bevel,tdplot_main_coords, fill opacity=.5]
> \pgfsetlinewidth{.2pt}
> \tdplotsphericalsurfaceplot[parametricfill]{72}{36}%
> {sin(\tdplottheta)*cos(\tdplottheta)}{black}{\tdplotphi}%
> {\draw[color=black,thick,-&gt;] (0,0,0) -- (1,0,0) node[anchor=north east]{$x$};}%
> {\draw[color=black,thick,-&gt;] (0,0,0) -- (0,1,0) node[anchor=north west]{$y$};}%
> {\draw[color=black,thick,-&gt;] (0,0,0) -- (0,0,1) node[anchor=south]{$z$};}%
> \node[tdplot_screen_coords,fill opacity=1] at (0,-1) {Parametric Fill in $\phi$};
> \end{tikzpicture}
> ```

### 2.5 circuitikz: 전자 회로도 그리기

#### 2.5.1 소개 및 설정

`circuitikz` 패키지는 TikZ를 확장하여 전자 회로도를 쉽게 그릴 수 있도록 합니다. 이 패키지는 "to-paths" 구문을 사용하여 구성 요소를 배치하는 편리한 방법을 제공합니다.

`circuitikz`는 TikZ의 확장성을 잘 보여주는 예시입니다. 회로 구성 요소를 나타내기 위해 선과 노드를 그리는 대신, `circuitikz`는 이를 전압원(`to[V,v=$U_q$]`)과 같은 직관적인 명령으로 추상화합니다. 이는 전기 공학이나 물리학 분야의 사용자가 낮은 수준의 그래픽 기본 요소보다는 회로 논리에 집중할 수 있게 하여 복잡한 회로도 생성을 크게 단순화합니다. 이는 TikZ 생태계의 핵심 강점을 강조합니다. 즉, TikZ는 특정 분야에 맞게 사용자 정의될 수 있는 플랫폼이며, `circuitikz`와 같은 도메인별 패키지는 전문화된 그리기 작업을 간소화하는 강력한 목적 지향적 도구입니다.

`circuitikz`를 사용하려면 서문에 `\usepackage{circuitikz}`를 추가해야 하며, 이는 `\usepackage{tikz}` 뒤에 와야 합니다. 단위 형식을 올바르게 지정하려면 `siunitx` 패키지의 `\SI{}{}` 명령을 사용하기 위해 `\usepackage{siunitx}`를 포함하는 것이 좋습니다.

> [!code]
> ```
> \usepackage{tikz}
> \usepackage{circuitikz}
> \usepackage{siunitx}
> ```

#### 2.5.2 기본 회로 그리기: 부품 및 연결

회로는 `\begin{circuitikz}...\end{circuitikz}` 환경 내에 그려집니다. `\draw` 및 `to` 명령을 사용하여 TikZ 경로와 유사하게 회로를 그립니다. 구문은 `\draw (start_coord) to[component_options] (end_coord)...;`와 같습니다. `short` 구성 요소는 점들 사이에 간단한 전선이나 단락을 그리는 데 사용됩니다.

> [!code]
> ```
> \begin{circuitikz}
>   \draw (0,0)
>   to[V,v=$U_q$] (0,2) % The voltage source
>   to[short] (2,2)
>   to (2,0) % The resistor
>   to[short] (0,0);
> \end{circuitikz}
> ```

#### 2.5.3 부품 라이브러리 및 구문

`circuitikz`는 다양한 전자 구성 요소를 제공합니다. 일반적인 구성 요소는 다음과 같습니다:

- 전압원 (`V`, `v=$U_q$`)
    
- 저항 (`R`, `R=$R_1$`)
    
- 인덕터 (`L`, `L=$L_1$`)
    
- 커패시터 (`C`, `C=$C_1$`)
    
- 다이오드 (`D*`)
    
- 전류원 (`I`)
    
- 제어 소스 (`cV`, `cI`)
    
- 스위치 (`cspst`)
    

구성 요소 레이블은 구성 요소 옵션 내에서 직접 지정됩니다(예: `R=$R_1$`). `siunitx`의 `\SI{}{}`를 사용하여 단위를 올바르게 형식화하는 것이 좋습니다. 연결 스타일은 `o-*`(경로 끝에 열린 원) 및 `*-o`(다른 쪽 끝)와 같은 옵션을 사용하여 제어할 수 있습니다.

##### 표 2.5: 일반적인 `circuitikz` 부품

|부품|코드|기본 사용법/레이블링|시각적 표현 (설명/예시)|
|---|---|---|---|
|저항|`R`|`to`|R_1 레이블이 있는 저항|
|전압원|`V`|`to[V,v=$U_q$]`|U_q 전압 화살표가 있는 전압원|
|인덕터|`L`|`to[L=$L_1$]`|L_1 레이블이 있는 인덕터|
|커패시터|`C`|`to[C=$C_1$]`|C_1 레이블이 있는 커패시터|
|단락|`short`|`to[short]`|간단한 전선|

#### 2.5.4 복잡한 요소 및 병렬 연결 추가

복잡한 회로, 특히 병렬 분기는 일반적으로 여러 `\draw` 명령을 사용하여 그려집니다. 노드 앵커는 `node[ground] {}`와 같이 배치하고 복잡한 연결을 위해 참조할 수 있습니다.

> [!code]
> ```
> \begin{circuitikz}
>   \draw (0,0) node[ground] {}
>   to[V, v=$e(t)$, *-*] (0,2) to[C, l=$4\nano\farad$] (2,2)
>   to (2,0)
>  (2,2) to (4,2)
>   to[C, l=$2\nano\farad$:-90, *-*] (4,0)
>  (5,0) to[I, i=$a(t)$:-90, -*] (5,2) -- (4,2)
>  (0,0) -- (5,0)
>  (0,2) -- (0,3) to[L, l=$2\milli\henry$] (5,3) -- (5,2)
>  {[anchor=south east] (0,2) node {1} (2,2) node {2} (4,2) node {3}}
> ;\end{circuitikz}
> ```

_이제 2편에서는 파인만 다이어그램, 네트워크 다이어그램 등 더 전문화된 패키지에 대해 알아보겠습니다._