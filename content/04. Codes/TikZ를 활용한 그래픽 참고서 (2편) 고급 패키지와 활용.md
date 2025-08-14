이 문서는 LaTeX 문서 내에서 고품질 그래픽을 생성하는 데 사용되는 강력한 도구인 TikZ에 대한 포괄적인 참고서의 두 번째 부분입니다. 1편에서 다룬 핵심 패키지들에 이어, 이 편에서는 물리학의 파인만 다이어그램(`tikz-feynman`)과 네트워크 구조 시각화(`tikz-network`) 같은 더 전문화된 분야의 패키지들을 심층적으로 다룹니다.

## 2. 특수 TikZ 패키지: 그래픽 기능 확장

### 2.6 tikz-feynman: 파인만 다이어그램 그리기

#### 2.6.1 소개 및 설정

`tikz-feynman` 패키지는 TikZ를 사용하여 파인만(Feynman) 다이어그램을 생성하는 데 특화된 LaTeX 도구입니다. 이 패키지는 TikZ의 그래프 드로잉 알고리즘을 활용하여 많은 꼭짓점(vertex)의 위치를 자동으로 계산해주며, 사용자가 최소한의 설정으로 다이어그램을 생성할 수 있도록 설계되었습니다.

`tikz-feynman`을 사용하려면 문서 서문(preamble)에 `\usepackage{tikz-feynman}`을 추가해야 합니다. 패키지의 향후 업데이트로 인해 기존 코드가 깨지는 것을 방지하기 위해, `compat` 옵션으로 특정 버전을 명시하는 것이 좋습니다.

> [!code]
> 
> ```
> \usepackage{tikz-feynman}
> \usepackage[compat=1.0.0]{tikz-feynman} % 버전 호환성 유지를 위해 권장됨
> ```

`tikz-feynman` 패키지는 중요한 호환성 문제가 있습니다. TeX Live 2018 이후 버전과 호환되지 않을 수 있어, 예제 컴파일 시 TeX Live 버전을 `2018 (legacy)`로 설정해야 할 수 있습니다. 또한, 정교한 꼭짓점 자동 배치를 위해서는 LuaTeX 엔진으로 컴파일해야 합니다. LuaTeX를 사용하지 않으면 기능이 제한된 기본 알고리즘이 사용되며 경고 메시지가 발생합니다. 이는 `tikz-feynman`이 복잡한 계산을 Lua 스크립트에 의존하기 때문으로, 사용자는 자신의 TeX 환경을 인지하고 필요에 따라 컴파일 엔진을 선택해야 하는 실용적인 측면을 보여줍니다.

#### 2.6.2 기본 다이어그램 구조

파인만 다이어그램은 `\feynmandiagram` 명령을 사용하여 생성하며, 이 명령은 세미콜론(;)으로 끝나야 합니다. 이 환경 내에서 `--`를 사용하여 꼭짓점들을 연결하고, 대괄호 `[]` 안에 스타일을 지정합니다.

>[!code] t-채널 전자-양전자 산란(t-channel electron-positron scattering) 예시
> 
> 코드 스니펫
> 
> ```
> \feynmandiagram [horizontal=a to b] {
>   i1 [particle=\(e^{-}\)] -- [fermion] a -- [fermion] i2 [particle=\(e^{+}\)],
>   a -- [photon, momentum=\(q\)] b,
>   f1 [particle=\(e^{-}\)] -- [fermion] b -- [fermion] f2 [particle=\(e^{+}\)],
> };
> ```

위 예시의 구조는 다음과 같습니다.

- **`\feynmandiagram [horizontal=a to b]`**: 다이어그램을 시작하며, `a`와 `b` 꼭짓점을 수평으로 정렬합니다.
    
- **`i1 -- [fermion] a -- i2`**: `i1`, `a`, `i2` 세 꼭짓점을 `fermion` 스타일의 엣지(edge)로 연결합니다.
    
- **`a -- [photon] b`**: 기존의 `a` 꼭짓점과 새로운 `b` 꼭짓점을 `photon` 스타일로 연결합니다.
    
- **`;`**: 다이어그램 생성을 마칩니다.
    

꼭짓점의 이름(`a`, `b` 등)은 임의로 지정할 수 있으나, 다이어그램 내에서 일관되게 사용해야 합니다. `spring layout`알고리즘이 꼭짓점 위치를 자동으로 재배치하므로, 꼭짓점과 엣지를 선언하는 순서는 최종 결과에 영향을 미치지 않습니다.

#### 2.6.3 스타일 추가

`tikz-feynman`은 다이어그램의 가독성을 높이기 위해 다양한 내장 스타일을 제공합니다. 예를 들어, `momentum`은 운동량 화살표를 추가하고 `particle`은 입자 레이블을 지정하는 데 사용됩니다. 물론, `color`, `draw` 등 TikZ의 기본 스타일 키도 모두 사용할 수 있습니다.

##### 표 2.6: 일반적인 tikz-feynman 스타일

| 스타일               | 설명                           | 주요 사용 사례       |
| ----------------- | ---------------------------- | -------------- |
| `fermion`         | 페르미온을 나타내는 실선 화살표 엣지         | 전자, 쿼크 등       |
| `anti fermion`    | 반-페르미온을 나타내는 반대 방향 실선 화살표 엣지 | 양전자, 반쿼크 등     |
| `photon`          | 광자를 나타내는 파선(wavy) 엣지         | 전자기 상호작용 매개입자  |
| `gluon`           | 글루온을 나타내는 나선(coiled) 엣지      | 강력 상호작용 매개입자   |
| `scalar`          | 스칼라 입자를 나타내는 점선 엣지           | 힉스 보손 등        |
| `momentum=<text>` | 엣지에 운동량 레이블과 화살표를 추가         | 입자의 운동량 표기     |
| `particle=<text>` | 끝 꼭짓점에 입자 레이블을 추가            | 들어오고 나가는 입자 명시 |


>[!code] 뮤온으로의 전자-양전자 소멸(electron-positron annihilation to muons) 예시
> ```
> \feynmandiagram [horizontal=a to b] {
>   i1 [particle=\(e^{-}\)] -- [fermion] a -- [fermion] i2 [particle=\(e^{+}\)],
>   a -- [photon, momentum=\(k\), blue] b,
>   f1 [particle=\(\mu^{-}\)] -- [fermion, red] b -- [fermion, red] f2 [particle=\(\mu^{+}\)],
> };
> ```

#### 2.6.4 알고리즘이 충분하지 않을 때

기본 `spring layout` 알고리즘은 간단한 다이어그램에는 효과적이지만, 복잡한 구조에서는 사용자가 원하는 모양을 만들지 못할 수 있습니다. 이 경우 다음과 같은 세 가지 대안을 사용할 수 있습니다.

1. **보이지 않는 엣지 추가**: `draw=none` 또는 `opacity=0` 스타일의 엣지를 추가하여 특정 꼭짓점들을 가깝게 배치하도록 강제할 수 있습니다. 알고리즘은 이 엣지를 계산에 포함하지만, 최종 출력에는 보이지 않게 됩니다.
    
>[!code] 보이지 않는 엣지를 사용하여 두 광자(gamma)를 가깝게 배치
> ```
>     \feynmandiagram [small, horizontal=a to t1] {
>       a [particle=\(\pi^{0}\)] -- [scalar] t1 -- t2 -- t3 -- t1,
>       t2 -- [photon] p1 [particle=\(\gamma\)],
>       t3 -- [photon] p2 [particle=\(\gamma\)],
>       % p1과 p2 사이에 약하게 보이는 엣지를 추가하여 둘을 가깝게 만듦
>       p1 -- [opacity=0.2] p2,
>     };
>```
    
2. **다른 알고리즘 사용**: `layered layout`과 같은 다른 레이아웃 알고리즘을 사용하면 더 나은 결과를 얻을 수 있습니다. `layered layout`은 `spring layout`과 달리 꼭짓점 선언 순서를 고려하여 다이어그램을 층으로 배열합니다.
    
>[!code] 뮤온 붕괴(muon decay)를 layered layout으로 표현
>```
>     \feynmandiagram [layered layout, horizontal=a to b] {
>       a [particle=\(\mu^{-}\)] -- [fermion] b -- [fermion] f1 [particle=\(\nu_{\mu}\)],
>       b -- c,
>       c -- [anti fermion] f2 [particle=\(\overline \nu_{e}\)],
>       c -- [fermion] f3 [particle=\(e^{-}\)],
>     };
>```

    
3. **수동 배치**: 가장 복잡한 다이어그램의 경우, `feynman` 환경 내에서 TikZ의 `\node`와 유사한 `\vertex` 명령을 사용하여 꼭짓점 위치를 직접 지정해야 합니다. TikZ의 `positioning` 라이브러리를 함께 사용하면 상대적 배치를 쉽게 할 수 있습니다. 꼭짓점 배치 후, `\diagram*` 명령을 사용하여 엣지를 그립니다.
    
>[!code] 뮤온 붕괴를 수동으로 배치
>```
>     \begin{tikzpicture}
>       \begin{feynman}
>         \vertex (a) {\(\mu^{-}\)};
>         \vertex [right=of a] (b);
>         \vertex [above right=of b] (f1) {\(\nu_{\mu}\)};
>         \vertex [below right=of b] (c);
>         \vertex [above right=of c] (f2) {\(\overline \nu_{e}\)};
>         \vertex [below right=of c] (f3) {\(e^{-}\)};
>         \diagram* {
>           (a) -- [fermion] (b) -- [fermion] (f1),
>           (b) -- (c),
>           (c) -- [anti fermion] (f2),
>           (c) -- [fermion] (f3),
>         };
>       \end{feynman}
>     \end{tikzpicture}
>```
    

### 2.7 tikz-network: 네트워크/그래프 다이어그램 그리기

#### 2.7.1 소개 및 설정

`tikz-network` 패키지는 LaTeX 문서 내에서 복잡한 네트워크 구조를 시각화하기 위해 설계되었습니다. 이 패키지는 단순 그래프부터 다층(multilayer) 네트워크까지 다양한 다이어그램을 생성할 수 있으며, 모양, 색상, 레이블 등을 광범위하게 제어할 수 있는 직관적인 명령을 제공합니다.

`tikz-network`를 사용하려면 문서 서문에 `\usepackage{tikz-network}`를 추가합니다.

> [!code]
> 
> ```
> \usepackage{tikz-network}
> ```

이 패키지의 강점은 단지 네트워크를 그리는 것을 넘어, 외부 데이터 파일(`.csv`)로부터 꼭짓점과 엣지 정보를 가져오거나, `network2tikz`라는 Python 라이브러리를 통해 Python의 네트워크 객체(예: networkx, igraph)를 직접 TikZ 코드로 변환할 수 있다는 점에 있습니다. 이는 데이터 기반의 시각화를 LaTeX 문서에 직접 통합할 수 있게 해주는 강력한 기능입니다.

#### 2.7.2 기본 다이어그램: 꼭짓점과 엣지

네트워크의 기본 요소는 꼭짓점(Vertex)과 이를 연결하는 엣지(Edge)입니다. `\Vertex`와 `\Edge` 명령을 사용하여 `tikzpicture` 환경 내에서 네트워크를 그립니다.

>[!code] 간단한 삼각형 네트워크 예시
> ```
> \begin{tikzpicture}
>   % 꼭짓점(Vertex) 정의
>   \Vertex[x=0, y=0, label=A]{A}
>   \Vertex[x=3, y=0, label=B]{B}
>   \Vertex[x=1.5, y=2, label=C]{C}
> 
> % 엣지(Edge) 정의
> \\Edge(A)(B)
> \\Edge(B)(C)
> \\Edge(C)(A)
> \\end{tikzpicture}
> ```

꼭짓점은 `\Vertex[<options>]{Name}` 형식으로 정의됩니다. `Name`은 다이어그램 내에서 꼭짓점을 식별하는 고유한 이름이며, `x`, `y` 옵션으로 좌표를 지정합니다. 엣지는 `\Edge[<options>](Vertex1)(Vertex2)` 형식으로 두 꼭짓점을 연결합니다.

#### 2.7.3 꼭짓점(Vertex)과 엣지(Edge) 스타일링

`tikz-network`는 꼭짓점과 엣지의 스타일을 세밀하게 조정할 수 있는 풍부한 옵션을 제공합니다.

##### 표 2.7: 주요 `\Vertex` 옵션

|옵션|설명|예시|
|---|---|---|
|`x`, `y`|데카르트 좌표를 지정합니다.|`x=5`, `y=2.5`|
|`label`|꼭짓점에 표시될 텍스트 레이블을 설정합니다.|`label=Server`|
|`size`|꼭짓점의 지름을 설정합니다 (기본 0.6cm).|`size=1.2cm`|
|`color`|꼭짓점의 채우기 색상을 지정합니다.|`color=blue!20`|
|`shape`|꼭짓점의 모양을 설정합니다 (예: `rectangle`, `diamond`).|`shape=rectangle`|
|`style`|추가적인 TikZ 스타일을 적용합니다.|`style={draw=red}`|

Sheets로 내보내기

##### 표 2.8: 주요 `\Edge` 옵션

|옵션|설명|예시|
|---|---|---|
|`lw`|선의 두께를 설정합니다 (기본 1.5pt).|`lw=2.5pt`|
|`color`|엣지의 색상을 지정합니다.|`color=green!60!black`|
|`label`|엣지에 표시될 텍스트 레이블을 설정합니다.|`label=Connects`|
|`bend`|엣지를 구부릴 각도를 지정합니다.|`bend=20`|
|`Direct`|방향성을 나타내는 화살표를 추가합니다.|`Direct`|
|`style`|추가적인 TikZ 스타일을 적용합니다 (예: `dashed`).|`style=dashed`|

```
% 스타일이 적용된 엣지들 \Edge[Direct, label=Query, lw=2pt, bend=15](https://www.google.com/search?q=User&authuser=1)(https://www.google.com/search?q=DB) \Edge[Direct, label=Request, style=dashed, color=gray](https://www.google.com/search?q=User&authuser=1)(API) \Edge[Direct, color=orange, label=Auth, bend=-20](https://www.google.com/search?q=DB&authuser=1)(API) \end{tikzpicture}
```

#### 2.7.4 다층 네트워크와 `network2tikz`

`tikz-network`의 가장 강력한 기능 중 하나는 다층 네트워크를 시각화하는 기능입니다. `tikzpicture` 환경에 `multilayer` 옵션을 추가하고, 각 꼭짓점에 `layer` 옵션을 지정하여 3D 공간에 네트워크를 배치할 수 있습니다.

또한, `network2tikz` Python 라이브러리를 사용하면 Python에서 생성된 네트워크 데이터를 손쉽게 TikZ 코드로 변환할 수 있습니다.

1.  Python에서 `pip install network2tikz`로 라이브러리를 설치합니다.
2.  `networkx`나 `igraph` 같은 라이브러리로 네트워크 객체 `G`를 생성합니다.
3.  `network2tikz.plot(G, 'mytikz.tex')`를 호출하여 TikZ 파일을 생성합니다.
4.  생성된 `mytikz.tex` 파일을 LaTeX 문서에 `\input` 명령으로 포함합니다.

이 기능은 복잡한 데이터 분석 결과를 출판 품질의 그래픽으로 직접 변환하는 과정을 자동화하여 연구 및 문서 작성의 효율성을 크게 향상시킵니다.

## 3\. 결론 및 추가 자료

TikZ는 LaTeX 내에서 다양한 그래픽 요구 사항을 충족하는 포괄적인 솔루션을 제공하는 다재다능한 도구입니다. 간단한 도형부터 복잡한 과학 다이어그램에 이르기까지, TikZ의 프로그래밍 방식 접근 방식은 정밀성, 자동화 및 LaTeX의 조판 기능과의 원활한 통합이라는 이점을 제공합니다. 이러한 특성은 TikZ를 학술 및 과학 출판물에서 그래픽을 생성하는 데 매우 강력한 도구로 만듭니다.

### 3.1 TikZ의 다재다능성 요약

TikZ는 그 핵심 기능과 pgfplots, chemfig, tikz-cd, tikz-3dplot, circuitikz와 같은 전문 패키지를 통해 LaTeX 내에서 다양한 그래픽 요구 사항을 충족하는 포괄적인 솔루션을 제공합니다. 그 프로그래밍 방식의 접근 방식은 정밀성, 자동화 및 LaTeX의 조판 기능과의 원활한 통합이라는 이점을 제공합니다.

### 3.2 추가 패키지

TikZ 생태계의 궁극적인 강점은 TikZ 코어 위에 구축된 수많은 전문 패키지의 존재입니다. 이를 통해 사용자는 일관된 기본 구문을 사용하여 광범위한 다이어그램 문제를 해결할 수 있으며, 각 그래픽 유형에 대해 완전히 다른 도구를 배울 필요가 없습니다. 이러한 모듈성은 TikZ를 다양한 과학 및 기술 분야에서 매우 적응력 있고 강력하게 만듭니다.

독자들이 더 전문적인 다이어그램을 위해 탐색할 수 있는 다른 주목할 만한 TikZ 관련 패키지는 다음과 같습니다:

  * **`tikz-feynman`**: 물리학의 파인만 다이어그램을 그리는 데 사용됩니다. 이 패키지는 TikZ의 그래프 그리기 알고리즘을 활용하여 많은 꼭짓점의 배치를 자동화하며, 복잡한 다이어그램에 대한 미세 조정 배치도 허용합니다. 그러나 TeX Live 2018 이후 버전과의 비호환성이 있으며, 전체 알고리즘 기능을 위해서는 LuaTeX 컴파일이 필요합니다.
  * **`tikz-network`**: 네트워크 구조 및 그래프 다이어그램을 시각화하는 데 사용됩니다. 이 패키지는 단일/다중 노드 및 엣지, 다층 네트워크, 외부 데이터 파일 지원, `network2tikz`를 통한 Python 통합과 같은 기능을 제공합니다.

이러한 패키지의 존재는 TikZ를 단순한 도구가 아닌 그래픽을 위한 플랫폼으로 자리매김합니다. 이 생태계를 탐색하도록 장려하는 것은 사용자가 학술 또는 전문 작업에서 직면하는 거의 모든 다이어그램 요구 사항에 대한 솔루션을 찾을 수 있도록 지원할 것입니다.

### 3.3 참고서 집필을 위한 일반적인 팁

TikZ와 그 패키지의 방대한 양과 복잡성을 고려할 때, 어떤 단일 참고서도 모든 것을 포괄할 수는 없습니다. 이 생태계는 포괄적이고 잘 관리된 문서와 활발한 커뮤니티를 통해 성장합니다. 사용자는 특정 문제 또는 고급 기술에 대해 기본 자료(매뉴얼)를 참조하고 커뮤니티 지원(포럼)을 활용할 것으로 예상됩니다. 따라서 참고서는 독자에게 현실적인 기대를 설정해야 합니다. 명확하고 교육적인 진입점 및 안내서 역할을 해야 하지만, 더 깊은 탐구나 문제 해결을 위해 더 넓은 생태계로 명시적으로 안내해야 합니다. 이는 자립심을 키우고 사용자가 책의 범위를 넘어 계속 학습할 수 있도록 지원합니다.

참고서 작성 시 다음 사항을 고려해야 합니다:

  * **명확성과 일관성**: 책 전체에 걸쳐 명확하고 일관된 스타일과 용어를 유지해야 합니다.
  * **최소 작동 예제(MWE)**: 모든 예제에 대해 완전하고 독립적인 MWE를 제공하여 독자가 코드를 쉽게 컴파일하고 테스트할 수 있도록 해야 합니다.
  * **시각 자료의 중요성**: 모든 예제에 시각적 출력을 함께 제공하여 독자가 코드가 생성하는 것을 즉시 이해할 수 있도록 해야 합니다.
  * **문제 해결**: 일반적인 오류 및 디버깅 팁에 대한 섹션을 포함하여 독자가 직면할 수 있는 일반적인 문제를 해결하는 데 도움을 주어야 합니다.
  * **버전 인식**: `pgfplots`(`compat` 옵션) 및 `tikz-feynman`(TeX Live 호환성)과 같은 패키지 버전에 유의하도록 독자에게 조언해야 합니다.
  * **커뮤니티 자료**: 공식 문서(CTAN, PGF 매뉴얼), 온라인 포럼(TeX StackExchange), 커뮤니티 예제(TeXample.net)와 같은 추가 지원 및 영감을 위한 자료를 추천해야 합니다.