---
title: 레이놀즈 평균화된 나비에-스토크스 방정식
created: 2025-07-28
유형:
  - 유체역학
tags:
  - 레이놀즈
  - 유체역학
  - 텐서
---
## 레이놀즈 평균화된 나비에-스토크스 방정식

난류를 관찰할 때, 일일이 모든 fluctuation을 관찰하는 것은 매우 어렵고, 비용도 엄청나다. 무엇보다 변동 성분이 매우 무작위적이기 때문에, 순수하게 단순하게 유속을 가지고 임의의 점에서의 운동을 분석하기 어렵다. 따라서 [[레이놀즈 분해 (Reynolds Decomposition)|레이놀즈 분해]] 와 [[레이놀즈 분해 (Reynolds Decomposition)#^a6f286|시간 평균]]을 통해 분석하게 되는데, 유체의 운동량을 기술한 [[나비에-스토크스 방정식(Navier-Stokes Equations)|나비에-스토크스 방정식]] 또한 난류를 분석할 때 두 가지 방법을 통해 분석한다.

### 레이놀즈 평균화된 나비에-스토크스 방정식의 유도

먼저 외력(중력, 전자기력 등)을 제외한 나비에-스토크스 방정식은 다음과 같다:
$$
\begin{align}\frac{\partial \boldsymbol{u}}{\partial t}+(\boldsymbol{u} \cdot \nabla)\boldsymbol{u} &= -\frac{\nabla P}{\rho}+ \frac{\mu}{\rho} \nabla^2 \boldsymbol{u} +\boldsymbol{g}
\end{align}
$$
이를 아인슈타인 표기법과 레이놀즈 분해를 이용하면:
$$
\begin{align}
&\frac{ \partial \boldsymbol{u_{i}} }{ \partial t } + \boldsymbol{u_{j}}\frac{ \partial \boldsymbol{u_{i}} }{ \partial x_{j} } = -\frac{1}{\rho}\frac{ \partial P }{ \partial x_{i} } + \frac{\mu}{\rho} \frac{ \partial^2 \boldsymbol{u_{j}} }{ \partial x_{j}^2 }  \\
\Leftrightarrow \quad & \left( \frac{ \partial \boldsymbol{\overline{U_{i}}} }{ \partial t } + \frac{ \partial \boldsymbol{u'_{i}} }{ \partial t }  \right) + \left( \boldsymbol{\overline{U_{j}}} + \boldsymbol{u'_{j}}  \right) \left( \frac{ \partial \boldsymbol{\overline{U_{i}}} }{ \partial x_{j} } + \frac{ \partial \boldsymbol{u'_{i}} }{ \partial x_{j} }  \right) = -\frac{1}{\rho} \left( \frac{ \partial \overline{P}}{ \partial x_{i} } +\frac{ \partial p' }{ \partial x_{i} }  \right) +\frac{\mu}{\rho} \left( \frac{ \partial^{2} \overline{\boldsymbol{U_{j}}} }{ \partial x_{j}^{2} } +\frac{ \partial^{2} u'_{j} }{ \partial x_{j}^{2} }  \right)
\end{align}
$$

이제 분해한 나비에-스토크스 방정식을 시간 평균시켜주면:
$$
\begin{align}
& \overline{\left( \frac{ \partial \boldsymbol{\overline{U_{i}}} }{ \partial t } + \frac{ \partial \boldsymbol{u'_{i}} }{ \partial t }  \right) + \left( \boldsymbol{\overline{U_{j}}} + \boldsymbol{u'_{j}}  \right) \left( \frac{ \partial \boldsymbol{\overline{U_{i}}} }{ \partial x_{j} } + \frac{ \partial \boldsymbol{u'_{i}} }{ \partial x_{j} }  \right)} = \overline{-\frac{1}{\rho} \left( \frac{ \partial \overline{P}}{ \partial x_{i} } +\frac{ \partial p' }{ \partial x_{i} }  \right) +\frac{\mu}{\rho} \left( \frac{ \partial^{2} \overline{\boldsymbol{U_{j}}} }{ \partial x_{j}^{2} } +\frac{ \partial^{2} u'_{j} }{ \partial x_{j}^{2} }  \right)} \\
\Leftrightarrow \quad & \underbrace{ \frac{ \partial \overline{\left( \overline{U_{i}}+u' \right) }}{ \partial t } }_{ (1) } +\underbrace{ \frac{ \partial\left( \overline{\left( \overline{U_{j}} +u'_{j} \right)\left( \overline{U_{i}}+u'_{i} \right)} \right) }{ \partial x_{j} } }_{ (2) } = -\frac{1}{\rho} \underbrace{ \frac{ \partial \overline{\left( \overline{P}+p' \right)} }{ \partial x_{i} } }_{ (3) } + \frac{\mu}{\rho} \underbrace{ \frac{ \partial^{2} \overline{\left( \overline{U_{j}}+u'_{j} \right)} }{ \partial x^{2}_{j} } }_{ (4) } 
\end{align}
$$
각 항을 다음과 같이 정리할 수 있다:
$$
\begin{align}
(1): \; \frac{ \partial \overline{\left( \overline{U_{i}}+u' \right) }}{ \partial t }&=\frac{ \partial \overline{U_{i}} }{ \partial t } + \cancelto{0}{\frac{ \partial \overline{u'_{i}} }{ \partial t } } \\
&=\frac{ \partial \overline{U_{i}} }{ \partial t } 
\end{align}
$$
$$
\begin{align}
(2):\; \frac{ \partial\left( \overline{\left( \overline{U_{j}} +u'_{j} \right)\left( \overline{U_{i}}+u'_{i} \right)} \right) }{ \partial x_{j} } &=\frac{ \partial \left( \overline{\overline{U_{j}}\overline{U_{i}}} +\overline{\overline{U_{j}}u'_{i}} +\overline{u'_{j}\overline{U_{i}}} + \overline{u'_{j}u'_{i}}  \right) }{ \partial x_{j} }  \\
&= \frac{ \partial \overline{U_{j}U_{i}} }{ \partial x_{j} } + \cancelto{\;\mathclap{0}}{ \frac{ \partial \overline{\overline{U_{j}}u'_{i}}}{ \partial x_{j} }} + \cancelto{0}{\frac{ \partial \overline{u'_{j}\overline{U_{i}}} }{ \partial x_{j} } } +\frac{ \partial \overline{u'_{j}u'_{i}} }{ \partial x_{j} }  \\
&= \frac{ \partial \overline{U_{j}U_{i}} }{ \partial x_{j} } + \frac{ \partial \overline{u'_{j}u'_{i}} }{ \partial x_{j} } 
\end{align} 
$$
$$
\begin{align}
(3):\; \frac{ \partial \overline{\left( \overline{P} +p' \right) } }{ \partial x_{i} } &= \frac{ \partial \overline{\overline{P}} }{ \partial x _{i}} +\cancelto{0}{\frac{ \partial \overline{p'} }{ \partial x_{j} }}  \\
&=\frac{ \partial \overline{P} }{ \partial x_{i} } 
\end{align}
$$
$$
\begin{align}
(4): \; \frac{ \partial^{2} \overline{\left( \overline{U_{j}}+u'_{j} \right) } }{ \partial x_{j}^{2} } &= \frac{ \partial^{2} \overline{\overline{U_{j}}} }{ \partial x_{j}^{2} } +\cancelto{0}{\frac{ \partial^{2} \overline{u'_{j}} }{ \partial x_{j}^{2} } } \\
&=\frac{ \partial^{2} \overline{U_{j}} }{ \partial x_{j}^{2} } 
\end{align}
$$
정리된 항을 다시 대입하고 이항하면 다음과 같은 레이놀즈 평균화된 나비에-스토크스 방정식이 나온다:
$$
\begin{align}
& \frac{ \partial \overline{U_{i}} }{ \partial t } + \frac{ \partial \overline{U_{i}U_{j}} }{ \partial x_{j} } +\frac{ \partial \overline{u'_{i}u'_{j}} }{ \partial x_{j} } = -\frac{1}{\rho}\frac{ \partial \overline{P} }{ \partial x_{i} } + \frac{\mu}{\rho}\frac{ \partial^{2} \overline{U_{j}} }{ \partial x_{j}^{2} }  \\
\Leftrightarrow \quad &\frac{ \partial \overline{U_{i}} }{ \partial t } +\frac{ \partial \overline{U_{i}U_{j}} }{ \partial x_{j} } =-\frac{1}{\rho} \frac{ \partial \overline{P} }{ \partial x_{i} } +\frac{\mu}{\rho}\frac{ \partial^{2} \overline{U_{j}} }{ \partial x_{j}^{2} } -\frac{ \partial \overline{u'_{i}u'_{j}} }{ \partial x_{j} }  \\
\Leftrightarrow\quad  &\rho \left( \frac{ \partial \overline{U_{i}} }{ \partial t } +\frac{ \partial \overline{U_{i}U_{j}} }{ \partial x_{j} } \right) =-\frac{ \partial \overline{P} }{ \partial x_{i} } +\mu \frac{ \partial^{2} \overline{U_{j}} }{ \partial x_{j}^{2} } -\frac{ \partial \rho\overline{u'_{i}u'_{j}} }{ \partial x_{j} }  
\end{align}
$$

### 레이놀즈 평균화된 나비에-스토크스 방정식의 의미

레이놀즈 평균화된 나비에-스트크스 방정식은 각 항이 담긴 의미가 있는데, 이는 다음과 같다:
>[!formula] `NavierStokes-eqn`
>$$
>\rho \left( \underbrace{ \frac{ \partial \overline{U_{i}} }{ \partial t } }_{ \text{Unsteady Term} } +\underbrace{ \frac{ \partial \overline{U_{i}U_{j}} }{ \partial x_{j} } }_{ \text{Convective Term} } \right) =\underbrace{ -\frac{ \partial \overline{P} }{ \partial x_{i} } }_{ \text{Pressure gradient Term} } +\underbrace{ \mu \frac{ \partial^{2} \overline{U_{j}} }{ \partial x_{j}^{2} } }_{ \text{Viscous diffusion Term} }\quad \underbrace{ -\frac{ \partial \rho\overline{u'_{i}u'_{j}} }{ \partial x_{j} }   }_{ \text{Reynolds stress Term} }
>$$

#### 1. Unsteady Term (비정상 항)
$$
\rho\frac{ \partial \overline{U_{i}} }{ \partial t } 
$$
- 설명: 시간 평균 속도 $\overline{U_{i}}$ 의 시간에 의한 변화율을 의미한다.
- 의미: 유체 요소의 평균 운동량이 시간에 따라 변하는 정도를 나타낸다. 정상 상태 유동의 경우 0 이다.

#### 2. Convective Term (대류 항)
$$
\rho \;\frac{ \partial \overline{U_{i}U_{j}} }{ \partial x_{j} }\quad \Leftrightarrow \quad \rho \; \overline{U_{j}}\frac{ \partial \overline{U_{i}} }{ \partial x_{j} } 
$$
- 설명: 시간 평균 유속 $\overline{U_{i}}$ 이 평균 유동 $\overline{U_{j}}$ 에 의해 공간적으로 이송되는 효과를 가지고 있다. 
- 의미: 유체 요소가 이동하면서 자신의 운동량을 다른 위치로 전달하는 것을 나타낸다. 한 점에서의 유속 $\overline{U_{i}}$ 이 주변 유체의 평균 유속에 의해 변화하는 것( $\frac{ \partial \overline{U_{i}} }{ \partial x_{j} }$ )을 나타내는 것으로서, 유체의 운동량이 유체의 이동에 따라 전달되기 때문에 대류 항이라고 한다. 이 항은 비선형성을 가지고 있으며, 유체 운동 중 가장 복잡한 부분 중 하나이다.

#### 3. Pressure gradient Term (압력 그래디언트 항)
$$
-\frac{ \partial \overline{P} }{ \partial x_{i} } 
$$
- 설명: 시간 평균 압력 $\overline{P}$ 의 공간적인 변화에 따른 힘을 나타낸다.
- 의미: 압력의 차이로 인해 유체가 가해지는 단위 부피 당 힘을 나타낸다.

#### 4. Viscous diffusion Term (점성 확산 항)
$$
\mu \frac{ \partial^{2} \overline{U_{j}} }{ \partial x_{j}^{2} } 
$$
- 설명: 시간 평균 유속 $\overline{U_{j}}$ 의 유체 점성에 의한 운동량의 확산을 나타낸 항이다.
- 의미: **유체 내부의 마찰(점성)에 의해 발생하는 운동량 수송**을 나타낸다. 이는 레이놀즈 응력에 의한 영향을 크게 받는 난류와 다르게, 운동량 교환이 점성력에 의해 지배적으로 나타나는 층류에서 중요하게 작용한다.

#### 5. Reynolds stress Term (레이놀즈 응력 항)
$$
-\frac{ \partial \rho\overline{u'_{i}u'_{j}} }{ \partial x_{j} } 
$$
- 설명: 난류의 변동 성분 $u'_{i}$ 와 $u'_{j}$ 의 상관 관계에서 발생하는 추가적인 운동량 수송을 나타낸다. 여기서 $\rho \overline{u'_{i}u'_{j}}$ 를 레이놀즈 응력 텐서(Reynolds stress tensor, $\mathrm{R}'_{ij}$)라고 한다.
- 의미: 이 항은 RANS 방정식에서 가장 중요한 항이자 난류 모델링의 "종결 문제(closure problem)"를 야기하는 핵심이다. 난류 유동에서는 속도의 불규칙한 변동으로 인해 추가적인 "겉보기 응력(apparent stress)"이 발생하며, 이것이 평균 유동에 미치는 영향을 나타낸다. 이 항은 순간적인 나비에-스토크스 방정식에는 없던 새로운 항이며, 평균화 과정을 통해 나타난다.
- 문제점: 레이놀즈 응력 텐서는 6개의 미지의 성분$\left( \overline{u'_{x}u'_{x}}, \,\overline{u'_{y}u'_{y}},\,\overline{u'_{z}u'_{z}},\, \overline{u'_{x},u'_{y}},\,\overline{u'_{x}u'_{z}},\,\overline{u'_{y}u'_{z}} \right)$을 포함한다. 그러나 RANS 방정식 자체로는 이 미지수들을 풀 수 없기 때문에, 이 항을 평균 속도 구배와 같은 알려진 양으로 표현하기 위한 **난류 모델(Turbulence Model)**이 필요하다. $K-\varepsilon$ 모델, $K-\omega$ 모델 등이 이 레이놀즈 응력 항을 모델링하는 대표적인 방법이다.