---
created: 2025-07-25
유형:
  - 유체역학
tags:
  - 유체역학
---
## 연속방정식
고등학교 물리 과정 중 유체역학 단원에서 연속방정식을 배운다. 고등학생 때 물리를 배운 사람은 입구가 큰 곳에서의 유속은 작지만, 입구가 작은 곳의 유속은 크다는 설명과 함께 다음 그림을 본적이 있을 것이다.
<img src ="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F23583741553ED8DA19" width = "50%"/>
연**속방정식은 유체역학의 가장 기본이 되는 보존 법칙 중 하나로, 질량 보존 법칙을 유체역학적으로 표현한 식**이다. 유체는 일반적인 물체(강체)에 비해 유동적이고, 점성, 압축성 등 특이한 특징이 있어서 유체를 위한 질량 보존 법칙을 특별하게 나타낸 것이다. 그리고 우리가 일반적으로 배우는 연속방정식의 구조는 다음과 같다.
$$
A_{1} \cdot \vec{v_{1}} = A_{2} \cdot \vec{v_{2}}
$$
그림처럼 호스를 이용해 설명하자면, 호스가 있을 때 호스에 들어간 시간당 물의 양($A_{1}\cdot\vec{v}$)과 호스에서 나간 시간당 물의 양($A_{2}\cdot \vec{v_{2}}$)이 같다는 말이다. 호스의 단면적에 따라 유속($\vec{u}$)이 결정된다는 것인데, 매우 직관적인 방정식이다. 그러나 이 연속방정식을 일반적으로 확장하려면 조금 더 엄밀한 연속방정식을 만들어야 한다.

---
### 연속방정식의 유도

우리가 보고자하는 공간(검사체적)에서 유체가 흐를 때, 흐르는 유체가 공간 내부에서 사라지면 안된다. 따라서 **검사체적에서  순 유입/유출량, 검사체적 내부에서 유체의 변화량을 고려해 그 합이 0이 되어야 한다**. 0이 되지 않으면 유체가 검사체적 내부에서 갑자기 사라진게 된다... 따라서 검사체적 내부의 질량 보존을 위해서는 반드시 아래의 식을 만족해야 한다. 
$$
\frac{∂t}{∂ρ}​+∇⋅(ρu)=0
$$

#### 1. 유입량 구하기

먼저 우리가 측정하고 싶은 위치에 미소체적을 설정한다. 
<img src="dxdydz.svg" width = 50%/>
한 점에서의 조그마한 미소체적을 설정했을 때, 이 미소체적에서 유체는 $x , \, y, \, z$ 방향 모두에서 흐르게 되는데, 유체가 흐른다는 것은 유체가 미소체적을 들어오고, 나간다는 것을 의미한다. 유체가 미소체적에서 유입되고 유출되는 양상을 그림으로 표현하면 다음과 같다.
<img src="waterflow.svg" width = "50%"/>
왼쪽 아래 부분에는 유체의 유입, 오른쪽 위 부분에는 유체의 유출이 화살표로 나타내어 있다. 먼저 유체가 미소체적으로 들어오는 유입량에 대해 먼저 살펴보면, $x$ 축 방향에서 유체의 유입량 $u_{x}$ 는:
$$
\begin{align}
u_{x} &= \rho \frac{dV}{dt} \\
&= \rho \frac{dxdydz}{dt} \quad \left( \because v_{x} = \frac{dx}{dt} \right) \\
&= \rho v_{x}dydz \\
\end{align}
$$
- $\rho$ : 유체의 밀도
- $V$ : 유입되는 유체의 부피
- $t$ : 단위 시간
- $v_{x}$ : $x$ 방향으로 흐르는 유체의 속도

$dV$ 는 유체가 $dt$ 동안 들어오는 유체의 부피이기 때문에, $dt$ 동안 $\rho dV$ 만큼의 유체의 양이 유입한다. 따라서 $u_{x}=\rho v_{x}dydz$ 와 같이 표현할 수 있는 것이다. 따라서 $x$ 축에서의 유입량 식을 모든 방향에서 고려하면 다음과 같다. 
$$
\begin{align}
u_{x}= \rho v_{x}dydz \quad(x \, \text{축에서 유체의 유입량})\\
u_{y} = \rho v_{y}dxdz \quad(y \, \text{축에서 유체의 유입량})\\
u_{z} = \rho v_{z}dxdy\quad(z \, \text{축에서 유체의 유입량}) \\
 \\
\therefore Net \; mass \; inflow \; rate :\; u_{ijk}=\rho v_{i}dx_{j}dx_{k}
\end{align}
$$

---
#### 2. 유출량 구하기

먼저 유입량을 구했다면, 오른쪽 위에 표현되어 있는 유출량을 구할 차례이다. 유출량이 유입량과 같을 수도 있지만, 다를 수도 있다. **먼저 $x$ 축에서 유입량과의 변동을 고려하여 $\frac{\partial\rho v_{x}}{\partial x}dx$ 를 반영**한다.  $\frac{\partial\rho v_{x}}{\partial x}dx$ 는 $\rho v$ 가 $x$ 축에서 변화하는 양이다. 이를 모든 축에 적용하면 유출량은 다음과 같이 적을 수 있다:
$$
\begin{align}
u'_{x}=\left( \rho v_{x}+ \frac{\partial\rho v_{x}}{\partial x} dx\right)dydz \quad (x \text{축에서 유체의 유출량}) \\
u'_{y}=\left( \rho v_{y}+ \frac{\partial\rho v_{y}}{\partial y} dy\right)dxdz \quad (y \text{축에서 유체의 유출량}) \\
u'_{z}=\left( \rho v_{z}+ \frac{\partial\rho v_{z}}{\partial z} dz\right)dxdy \quad (z \text{축에서 유체의 유출량}) \\
\therefore Net \; mass \; outflow \; rate :\; u'_{ijk} = \left( \rho v_{i} + \frac{\partial v_{x_{i}}}{\partial dx_{i}}dx_{i}  \right) dx_{j}dx_{k}
\end{align}
$$

---
#### 3. Net mass flow 구하기

유입량과 유출량을 구했기 때문에 미소체적의 Net mass flow 를 구할 수 있다. Net mass flow 는 유량 감소량을 나타내기 때문에, 유출량에서 유입량을 빼면 구할 수 있다:
$$
\begin{align}
Net\; mass\;flow\;rate &= u' - u \\
&= \frac{\partial v_{i}}{\partial x_{i}}dx_{i}dx_{j}dx_{k} \\
&= \nabla \cdot \vec{v} \,dV
\end{align}
$$
Net mass flow는 유속이 발산하는 정도를 나타낸다고 볼 수 있다. 유속이 발산한다는 것은 한 점에서 유체 가 사방으로 나간다는 것이다. 반대로, 유속이 수렴한다는 것은 한 점으로 유체가 한 점으로 들어온다는 것이다. **즉 $\nabla \cdot \vec{v} >0$ 이면 순 유출, $\nabla \cdot \vec{v} < 0$ 이면 순 유입을 뜻한다.  **

---
#### 4. 내부 유체의 변화량 고려하기

내부 유체는 $\rho dV =\rho dxdydz$ 와 같이 나타낼 수 있다. 내부 유체가 시간에 따라 압축 또는 인장하여 밀도가 변할 수 있어서 이를 고려해야한다. 미소체적은 이미 정해진 값이므로, 밀도의 변화량만 생각하면 된다. 따라서 내부 유체의 변화량은 다음과 같이 나타낼 수 있다.
$$
Time \; rate\; of \; mass \; change \;= \frac{\partial \rho}{\partial t} dV
$$

---
#### 5. 유체 질량에 대한 연속방정식

검사체적 내부에서 유체의 질량 사라지면 안되기 때문에, **Net mass flow + Time rate of mass change  = 0** 을 만족하는 식을 세워야 한다. 따라서:
$$
\begin{align*}
\nabla \cdot \vec{v} \,dV + \frac{\partial \rho}{\partial t}dV &= 0 \\
\Rightarrow \nabla \cdot \vec{v} + \frac{\partial \rho}{\partial t} &=0
\end{align*}
$$

비압축성 유체의 경우에는 밀도가 변하지 않기 때문에:
$$
\nabla \cdot \vec{v} = 0
$$

---
## 레이놀즈 평균화된 연속방정식

난류의 유동을 연구할 때 유체를 장시간 동안 측정한다. 난류의 유체는 변동성분이 불규칙적으로 분포하기 때문에, 시간 평균을 내어 유체의 운동을 관찰한다. 따라서 연속방정식 또한 레이놀즈 분해를 통해 평균값과 변동 성분으로 나누어 분석하는 것이 적절하다. 먼저 비압축성 유체를 가정할 때 유체의 연속방정식을 평균 성분과 변동 성분으로 나누면 다음과 같다.
$$
\nabla \cdot \vec{u} =\frac{\partial u}{\partial x_{i}}= \frac{\partial \bar{U}}{\partial x_{i}}+\frac{\partial u'}{\partial x_{i}} = 0
$$
- $\vec{u}$ : 유체의 유속
- $\bar{U}$ : 유속의 시간 평균값
- $u'$ : 유속의 변동 성분값
---
레이놀즈 분해를 한 연속방정식에 난류 연구를 위해 시간 평균을 내주면:
$$
\begin{align}
\overline{\frac{\partial \bar{U_{i}}}{\partial x_{i}}+\frac{\partial u_{i}'}{\partial x_{i}}} &= \overline{\frac{\partial \bar{U_{i}}}{\partial x_{i}}}+ \overline{\frac{\partial u_{i}'}{\partial x_{i}}} \\
&= \frac{ \partial  }{ \partial x_{i} } \overline{\bar{U_{i}}}+ \cancelto{0}{\frac{\partial}{\partial x_{i}}\overline{u'_{i}}}\\ 
&= \frac{ \partial  }{ \partial x_{i} }\bar{U_{i}} =0 \\
\end{align}
$$
$$
\therefore \frac{ \partial \overline{U_{i}} }{ \partial x_{i} }=0 \, , \;\frac{ \partial u' }{ \partial x_{i} }=0  
$$

---
## 레이놀즈 평균화된 연속방정식의 의미

레이놀즈 평균화된 연속방정식에서 유속의 평균 성분과 변동 성분의 발산($\nabla$)이 0과 같다는 것이다. 이는 유속의 두 성분 모두 질량 보존을 만족한다는 것으로, 특히 유속의 fluctuation이 질량이 보존되지 못하게 하는 요인이 되지 않음을 의미한다. 