---
created:
  - 2025-07-10
유형:
  - 유체역학
---
## 연속 방정식(Continuity Equations)

$$\nabla \cdot \boldsymbol{V} =0$$
$\nabla$  와 $\boldsymbol{V}$ 의 내적의 의미는 유속이 한 점에서 발산 하는 것을 의미한다. 이는 유체가 한 점에서 압축 또는 인장을 의미하기 때문에, 비압축성 유체의 경우 $\nabla \cdot \boldsymbol{V}=0$  이다.

## 오일러 방정식(Euler's Equations)


유체역학에서 오일러 방정식은 비점성 유체의 운동량에 관해 기술한 방정식이다. 오일러 방정식은 뉴턴의 운동 제2법칙으로부터 유도가 가능하다. 뉴턴의 운동 제2법칙은:
$$
\boldsymbol{F}=\boldsymbol{ma}
$$
뉴턴의 운동 제2법칙을 유체에도 적용을 해보자. 유속이 $\boldsymbol{u} = (u, v, w)$ 이고, $u, \, v,\,w$ 가 시간 $t$ 에 영향을 받는 변수라고 하면, 유체의 가속도는 다음과 같다.
$$
\begin{align}
\boldsymbol{a}&=\frac{d\boldsymbol{V}}{dt} = \frac{ \partial \boldsymbol{u} }{ \partial t } + \frac{ \partial \boldsymbol{u} }{ \partial x } \cdot \frac{dx}{dt} + \frac{ \partial \boldsymbol{u} }{ \partial y } \cdot \frac{dy}{dt} +\frac{ \partial \boldsymbol{u} }{ \partial z } \cdot \frac{dz}{dt} \\
&=\frac{ \partial u }{ \partial t } + \frac{ \partial \boldsymbol{u} }{ \partial x } \cdot u+\frac{ \partial \boldsymbol{u} }{ \partial y } \cdot v +\frac{ \partial \boldsymbol{u} }{ \partial z } \cdot w \\
&=\frac{\partial\boldsymbol{u}}{\partial t}+\left( u\frac{\partial\boldsymbol{u}}{\partial x}+v\frac{\partial \boldsymbol{u}}{\partial y}+w\frac{\partial \boldsymbol{u}}{\partial z} \right) \\
&=\frac{\partial \boldsymbol{u}}{\partial t}+(\boldsymbol{u} \cdot \nabla)\boldsymbol{u}
\end{align}
$$
미소 유체 시스템에서 가해지는 힘은 중력과 미소체적 $dx, dy, dz$ 의 표면에 가해지는 힘이 있다. 이를 식으로 나타내면 다음과 같다.
$$
\sum \boldsymbol{F}=\boldsymbol{F}_{grav}+\boldsymbol{F}_{surf}
$$
중력에 의해 작용하는 힘은 $\boldsymbol{F}_{grav}=\rho \times dxdydz \times \boldsymbol{g}$ 이다. 미소체적 $dx, dy, dz$ 에 작용하는 힘은 두가지가 있다. 하나는 압력에 의한 힘이 있고, 다른 하나는 유체의 점성에 의한 점성력이 있다. 오일러 방정식은 비점성 유체에 관해 기술하므로 미소체적의 표면에 작용하는 힘은 압력에 의한 힘과 같다.
$$
d\boldsymbol{F}_{surf}=d\boldsymbol{F}_{pressure}
$$
미소체적에서 압력에 대한 도식은 아래와 같다.
<img src="미소체적.svg" width="50%" height="50%"/>
$x$축 에서 압력에 의해 받는 힘은 $(P-(P+\frac{\partial P}{\partial x}dx))dydz$ 이다. 이를 3차원 모두에 적용하면 다음과 같다.
$$
\begin{align}d\boldsymbol{F}_{pressure} & =-(\frac{\partial P}{\partial x}+\frac{\partial P}{\partial y}+\frac{\partial P}{\partial z}) dxdydz \\
&= -(\nabla P) dV\end{align}
$$
따라서 전체 미소체적에 작용하는 힘은:
$$
\sum \boldsymbol{F} = \rho \boldsymbol{g}dV -(\nabla P)dV
$$
힘을 질량(밀도 $\times$ 체적) 나누면 가속도와 같으므로 다음의 식이 성립한다.
$$
\frac{\partial \boldsymbol{u}}{\partial t}+(\boldsymbol{u} \cdot \nabla)\boldsymbol{u} = -\frac{\nabla P}{\rho}+ \boldsymbol{g}
$$

## 나비에-스토크스 방정식

점성이 있는 유체의 경우 오일러 방정식만으로 정확한 운동량 계산이 어려우므로, 점성력 또한 고려하여 계산하여야 한다. 유체의 점성에 의한 점성력은 점성응력 텐서($\varepsilon$)를 이용하여 구할 수 있다. 비압축성 유체에서의 점성응력 텐서 $\varepsilon_{ij}$ 는 다음과 같다.
$$
\begin{align}\varepsilon_{ij} &= \mu (\nabla \boldsymbol{u}+(\nabla \boldsymbol{u})^{T} )\\ &= \begin{bmatrix}
\varepsilon_{11} & \varepsilon_{12} & \varepsilon_{13} \\
\varepsilon_{21} & \varepsilon_{22} & \varepsilon_{23} \\
\varepsilon_{31} & \varepsilon_{32} & \varepsilon_{33} \\
\end{bmatrix}
\end{align}
$$
---
아래에는 미소체적에서 $x$ 방향으로의 응력을 나타낸 그림이다. 이를 생각하면서 $x, \, y,\,z$ 방향으로의 응력을 모두 나타낼 수 있다.
<img src="미소체적2.svg" width="50%" height="50%"/>
그림을 모든 축에 대해 생각해 보면 $x, y, z$ 축 각각에 해당하는 점성력을 알 수 있다.
$$
\begin{align}\frac{d\boldsymbol{F}_{x,viscosity}}{dxdydz}=\frac{\partial}{\partial x}(\varepsilon_{xx})+\frac{\partial}{\partial y}(\varepsilon_{yx})+\frac{\partial}{\partial z}(\varepsilon_{zx}) \\ 
\frac{d\boldsymbol{F}_{y,viscosity}}{dxdydz}=\frac{\partial}{\partial x}(\varepsilon_{xy})+\frac{\partial}{\partial y}(\varepsilon_{yy})+\frac{\partial}{\partial z}(\varepsilon_{zy}) \\
\frac{d\boldsymbol{F}_{z,viscosity}}{dxdydz}=\frac{\partial}{\partial x}(\varepsilon_{xz})+\frac{\partial}{\partial y}(\varepsilon_{yz})+\frac{\partial}{\partial z}(\varepsilon_{zz}) \end{align}
$$
미소체적의 점성력에 의한 영향은 점성응력 텐서의 발산항과 그 미소체적의 곱과 같다는 것을 알 수 있다. 미소체적을 제외하고 고려하면: 
$$
\begin{align} 
 \nabla \cdot \varepsilon_{ij} &= \nabla \cdot \mu (\nabla \boldsymbol{u}+(\nabla \boldsymbol{u})^T ) \\ &= \mu \sum_j \frac{\partial}{\partial x_j} \left( \frac{\partial u_i}{\partial x_j} + \frac{\partial u_j}{\partial x_i} \right) \\ &= \mu \left( \nabla^2 u_i + \frac{\partial}{\partial x_i} (\nabla \cdot \mathbf{u}) \right) 
\end{align}
$$
비압축성 유체에서 $\nabla \cdot \boldsymbol{u}=0$ 이므로, 비압축성 유체에서 점성력은 다음과 같이 정리할 수 있다. 
$$
\nabla \cdot \varepsilon \cdot dV= \nabla ^2 \boldsymbol{u} \cdot dV
$$
비압축성, 점성 유체의 운동량을 기술하려면 비압축성, 비점성 유체의 운동량 방정식인 오일러 방정식의 좌변에 점성항인 $\nabla^2 \boldsymbol{u}$ 를 추가하면 된다. 따라서 비압축성, 점성 유체의 운동량 방정식인 나비에-스토크스 방정식은 아래와 같다.
$$
\begin{align}\frac{\partial \boldsymbol{u}}{\partial t}+(\boldsymbol{u} \cdot \nabla)\boldsymbol{u} &= -\frac{\nabla P}{\rho}+ \nabla \cdot \varepsilon +\boldsymbol{g} \\
&= -\frac{\nabla P}{\rho}+ \frac{\mu}{\rho} \nabla^2 \boldsymbol{u} +\boldsymbol{g}
\end{align}
$$
또는 아인슈타인 표기법을 사용하면:
$$
\frac{ \partial \boldsymbol{u} }{ \partial t } +\boldsymbol{u}_{j}\frac{ \partial \boldsymbol{u}_{i} }{ \partial x_{j} } =-\frac{1}{\rho}\frac{ \partial P }{ \partial x_{i} } + \nu \frac{ \partial^{2} \boldsymbol{u}_{j} }{ \partial x_{j}^{2} } + \boldsymbol{g}
$$

## 나비에-스토크스 방정식의 해석
나비에-스토크스 방정식은 유체의 운동을 기술하는 편미분방정식으로, 오일러 방정식의 우변에 유체의 점성을 고려한 항을 추가한 확장식이다. [나비에-스토크스 방정식은 날씨 모델, 해류, 관에서 유체흐름, 날개주변의 유체흐름 그리고 은하안에서 별들의 움직임을 설명하는데 쓰일 수 있으며 실제로 항공기나 자동차 설계, 혈관내의 혈류, 오염물질의 확산 등을 연구하는데 사용되고 있다.](https://ko.wikipedia.org/wiki/나비에-스토크스_방정식) 