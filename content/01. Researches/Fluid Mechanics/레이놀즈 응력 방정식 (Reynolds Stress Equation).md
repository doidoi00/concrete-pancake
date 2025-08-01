---
title: 레이놀즈 응력 방정식
created: 2025-07-29
유형:
  - 유체역학
tags:
  - 난류
  - 난류운동에너지
  - 레이놀즈
  - 유체역학
  - 텐서
---
## 레이놀즈 응력 (Reynolds Stress)

[[레이놀즈 평균화된 나비에-스토크스 방정식 (Reynolds Averaged Naiver-Stokes equations, RANS)|RANS]]를 유도하면서 나온 방정식에서 일반적인 나비에-스토크스 방정식에서 보이지 않는 [[레이놀즈 평균화된 나비에-스토크스 방정식 (Reynolds Averaged Naiver-Stokes equations, RANS)#5. Reynolds stress Term (레이놀즈 응력 항)|레이놀즈 응력 항]]이 새로 생겼다. 이는 난류에서 유속의 변동 성분에 의해 생긴 항으로, 변동 성분들의 상호작용으로 추가적인 물리적 영향을 준다는 것을 알려준다. 변동 성분이 난류 흐름을 일으키기 때문에 난류를 분석할 때 레이놀즈 응력을 매우 중요하게 생각한다. 

레이놀즈 응력(Reynolds stress)은 유체 역학에서 난류 현상을 설명할 때 나타나는 겉보기 응력 텐서(apparent stress tensor)이다. 레이놀즈 응력은 "겉보기 응력"인데, 겉보기 응력은 **물리적으로 직접 작용하는 힘에 의해 작용하는 "진짜" 응력이 아니라, 어떤 현상이나 관찰 조건 때문에 마치 응력이 작용하는 것처럼 보이는 효과**를 말한다. 난류 유동에서 불규칙한 속도 변동이 운동량 수송을 일으키는데, 이 운동량 수송이 평균 유동에 마치 저항이나 내부 마찰처럼 작용하므로 이를 응력으로 '가정'한 것이다. 즉, **실제 유체 분자 간의 직접적인 상호작용**으로 발생하는 점성 응력과는 본질이 다르다. 

이러한 레이놀즈 응력을 구체적으로 알기 위해 레이놀즈 응력 방정식을 유도할 것이다.

## 레이놀즈 응력 방정식의 유도
레이놀즈 응력 방정식은 [[레이놀즈 평균화된 나비에-스토크스 방정식 (Reynolds Averaged Naiver-Stokes equations, RANS)|RANS]]를 통해 유도할 수 있다. 먼저 RANS는 다음과 같다:
$$
\frac{\partial u_i}{\partial t} + u_j \frac{\partial u_i}{\partial x_j} = -\frac{1}{\rho} \frac{\partial p}{\partial x_i} + \nu \frac{\partial^2 u_j}{\partial x_j \partial x_j} \tag{1}
$$
유속의 변동 성분만을 관찰하기 위해 나비에-스토크스 방정식에 레이놀즈 분해를 한 후 난류의 평균 흐름의 운동량 방정식인 RANS를 빼서 변동 운동량 방정식을 유도한다.

먼저 나비에-스토크스 방정식의 유속($u_{i}=\overline{u_{i}}+u'_{i}$) 과 압력($p=\overline{p}+p'$)에 레이놀즈 분해를 취하면:
$$
\begin{align}
 &\frac{ \partial \overline{u_{i}} }{ \partial t } +\frac{ \partial u'_{i} }{ \partial t }  + (\overline{u_{j}}+u'_{j})\left( \frac{ \partial (\overline{u_{i}}+u'_{i}) }{ \partial x_{j} }  \right) = -\frac{1}{\rho}\frac{ \partial (\overline{p}+p') }{ \partial x_{i} } +\nu \frac{ \partial^{2}  }{ \partial x_{j}^{2} } (\overline{u_{j}}+u'_{j}) \\
\Leftrightarrow \quad&  \frac{ \partial \overline{u_{i}} }{ \partial t } +\frac{ \partial u'_{i} }{ \partial t }   +\frac{ \partial  }{ \partial x_{j} } (\overline{u_{j}}\overline{u_{i}}+\overline{u_{j}}u'_{i}+u'_{j}\overline{u_{i}} +u'_{j}u'_{i}) =-\frac{1}{\rho}\frac{ \partial \left( \overline{p}+p' \right)  }{ \partial x_{i} } +\frac{\mu}{\rho} \frac{ \partial^{2}  }{ \partial x_{j}^{2} } \left( \overline{u_{j}}+u'_{j} \right) \tag{2}
\end{align}
$$
(1)식에 RANS를 빼면 다음과 같다.
$$
\begin{align}
 &\frac{ \partial u'_{i} }{ \partial t } + \frac{ \partial  }{ \partial x_{j} } \left( \overline{u_{j}}u'_{i}+u'_{j}\overline{u'_{i}}+u'_{j}u'_{i} \right) =-\frac{1}{\rho}\frac{ \partial p' }{ \partial x_{i} } +\frac{\mu}{\rho} \frac{ \partial^{2} u'_{j} }{ \partial x_{j}^{2} } +\frac{ \partial\overline{u'_{j}u'_{i}} }{ \partial x_{j} }  \\
\Leftrightarrow \quad &\frac{\partial u_i'}{\partial t} + \overline{u}_j \frac{\partial u_i'}{\partial x_j} = -\frac{1}{\rho}\frac{\partial p'}{\partial x_i} + \nu \frac{\partial^2 u_i'}{\partial x_j \partial x_j} - u_j'\frac{\partial \overline{u}_i}{\partial x_j} - u_j'\frac{\partial u_i'}{\partial x_j} +\frac{\partial \overline{u_i' u_j'}}{\partial x_j} \tag{3}
\end{align}
$$

---
레이놀즈 응력은 3차원 응력 텐서이기 때문에, (3)식의 각 항에 동 성분 $u'_{k} \; (k:\;\text{free index})$ 을 곱한 다음 전체 결과 방정식의 평균을 취하여 유도를 시작한다:
$$
 \overline{  u_k'\left( \frac{\partial u_i'}{\partial t} + \overline{u}_j \frac{\partial u_i'}{\partial x_j} = -\frac{1}{\rho}\frac{\partial p'}{\partial x_i} + \nu \frac{\partial^2 u_i'}{\partial x_j \partial x_j} - u_j'\frac{\partial \overline{u}_i}{\partial x_j} - u_j'\frac{\partial u_i'}{\partial x_j} +\frac{\partial \overline{u_i' u_j'}}{\partial x_j} \right) }
$$
대부분의 항은 간단하게 조작되며, 우변의 마지막 항은 평균의 정리에 의해 사라진다.
$$
\begin{align}
& \overline{  u_k' \frac{\partial u_i'}{\partial t}} + \overline{u}_j \overline{u_k'\frac{\partial u_i'}{\partial x_j}} \\
=\quad&-\frac{1}{\rho}\overline{u_k'\frac{\partial p'}{\partial x_i}} + \nu \overline{u_k'\frac{\partial^2 u_i'}{\partial x_j \partial x_j}} - \overline{u_k'u_j'}\frac{\partial \overline{u}_i}{\partial x_j} - \overline{u_k' u_j'\frac{\partial u_i'}{\partial x_j}} + \cancelto{0}{\overline{u'_{k}}\frac{ \partial \overline{u'_{i}u'_{j}} }{ \partial x_{j} } } \left( \text{$\because$ $\overline{u'_{k}}=0$} \right) \tag{4}
\end{align}
$$

$k$와 $i$가 모두 자유 인덱스이므로 다른 방정식으로 교환할 수 있다.
$$
\overline{  u_i' \frac{\partial u_k'}{\partial t}} + \overline{u}_j \overline{u_i'\frac{\partial u_k'}{\partial x_j}} = -\frac{1}{\rho}\overline{u_i'\frac{\partial p'}{\partial x_k}} + \nu \overline{u_i'\frac{\partial^2 u_k'}{\partial x_j \partial x_j}} - \overline{u_i'u_j'}\frac{\partial \overline{u}_k}{\partial x_j} - \overline{u_i' u_j'\frac{\partial u_k'}{\partial x_j}} \tag{5}
$$
$\frac{ \partial u'_{i}u'_{k} }{ \partial t }=u'_{i}\frac{ \partial u'_{k} }{ \partial t }+u'_{k}\frac{ \partial u_{i} }{ \partial t }$ 임을 고려하여 $\frac{ \partial \overline{u'_{i}u'_{k}} }{ \partial t }$ 형식의 방정식을 만들기 위해 (4)식과 (5)식을 더한다.
$$
\begin{align}
\overline{u'_{k}\frac{ \partial u'_{i} }{ \partial t } }+\overline{u'_{i}\frac{ \partial u'_{k} }{ \partial t } }+\overline{u_{j}}\overline{u'_{k}\frac{ \partial u'_{i} }{ \partial x_{j} } }+\overline{u_{j}}\overline{u'_{i}\frac{ \partial u'_{k} }{ \partial x_{j} } } &=-\frac{1}{\rho}\left( \overline{u'_{k}\frac{ \partial p' }{ \partial x_{i} }} +\overline{u'_{i}\frac{ \partial p' }{ \partial x_{k} } } \right) \\
& +\nu \left(\overline{ u'_{k}\frac{ \partial^{2} u'_{i} }{ \partial x_{j}x_{j} }} + \overline{u'_{i}\frac{ \partial^{2} u'_{k} }{ \partial x_{j}x_{j} } } \right)   \\
& -\left( \overline{u'_{k}u'_{j} \frac{ \partial u'_{i} }{ \partial x_{j} } }+\overline{u'_{i}u'_{j}\frac{ \partial u'_{k} }{ \partial x_{j} } } \right)  \\
&-\left( \overline{u'_{k}u'_{j}}\frac{ \partial \overline{u_{i}} }{ \partial x_{j} }+\overline{u'_{i}u'_{j}}\frac{ \partial \overline{u_{k}} }{ \partial x_{j} }  \right) 
\end{align}
$$
위 식을 단순화하면:
>[!formula]  `ReynoldsStressRaw`
>$$
>\begin{align}
> \frac{\partial \overline{ u_i'u_k'}}{\partial t} + \overline{u}_j \frac{\partial\overline{ u_i'u_k'}}{\partial x_j} =& \underbrace{ -\frac{1}{\rho}\left( \overline{u_i'\frac{\partial p'}{\partial x_k}} + \overline{u_k'\frac{\partial p'}{\partial x_i}} \right) }_{ (6) }  \\
>&+ \underbrace{ \nu \left( \overline{u_i'\frac{\partial^2 u_k'}{\partial x_j \partial x_j}} + \overline{u_k'\frac{\partial^2 u_i'}{\partial x_j \partial x_j}} \right) }_{ (7) } \\
>&\underbrace{ - \left( \overline{u_i' u_j'\frac{\partial u_k'}{\partial x_j}} + \overline{u_k' u_j'\frac{\partial u_i'}{\partial x_j}} \right) }_{ (8) } \\
>&\underbrace{ - \left( \overline{u_i'u_j'}\frac{\partial \overline{u}_k}{\partial x_j} + \overline{u_k'u_j'}\frac{\partial \overline{u}_i}{\partial x_j}  \right)  }_{ (9) }
>\end{align}
>$$

우변의 (6)항은 곱셈 규칙을 사용하여 다음과 같이 쓸 수 있다.
$$
\begin{align}
 \overline{u_i'\frac{\partial p'}{\partial x_k}} + \overline{u_k'\frac{\partial p'}{\partial x_i}}
&= \frac{\partial}{\partial x_j}\left( \overline{p' u_i'}\delta_{kj} + \overline{p' u_k'}\delta_{ij} \right)-\overline{p' \left( \frac{\partial u_i'}{\partial x_k} + \frac{\partial u_k'}{\partial x_i} \right)} \\
 &=  \frac{\partial}{\partial x_j}\left( \overline{p' u_i'}\delta_{kj} + \overline{p' u_k'}\delta_{ij} \right)-2 \overline{p' s_{ik}'}
\end{align}
$$
여기서 $s'_{ik}$ 는 유속의 변동 성분의 변형률 텐서이다:
$$
s'_{ik}=\frac{1}{2}\left( \frac{ \partial u'_{i} }{ \partial x_{k} } +\frac{ \partial u'_{k} }{ \partial x_{i} }  \right) 
$$
그리고 dummy index($j$) 에 대하여 발산 형태로 만들기 위해 크로네커 델타 ($\delta$)를 사용하여 다음과 같은 꼴을 맞춘다:
$$
\begin{align}
\frac{ \partial  }{ \partial x_{k} } &=\frac{ \partial  }{ \partial x_{j} } \delta_{kj} \\
\frac{ \partial  }{ \partial x_{i} } &=\frac{ \partial  }{ \partial x_{j} } \delta_{ij} \\
\implies \overline{u_i'\frac{\partial p'}{\partial x_k}} + \overline{u_k'\frac{\partial p'}{\partial x_i}} &=\frac{\partial}{\partial x_j}\left( \overline{p' u_i'}\delta_{kj} + \overline{p' u_k'}\delta_{ij} \right)
\end{align}
$$
이 표기법은 이 항에서 압력과 속도 요동의 곱($\overline{p'u'_{k}}$)이 공간적으로 확산하는 정도를 직관적으로 나타낸다. 이는 압력의 변동 성분이 속도 요동과 상호작용하며, 그 결과가 레이놀즈 응력($\overline{u'_{i}u'_{k}}$) 의 위치를 바꾸는 방식으로 작동한다는 점을 말하고 있다. 따라서 이 항이 레이놀즈 응력이 이 항에 의해 생성되거나 소멸되지 않는다는 것을 말하며, 이 표기법은 레이놀즈 응력에 대해 **보존적**임을 강조하는데 사용된다. 이러한 이유로 이 항은 **"압력 확산 항(Pressure diffusion term)"**으로 불린다. 

---
라플라스 항인 (7)항은 다음과 같은 곱의 미분 법칙을 사용할 수 있다.
$$
\begin{align}
 u_i'\frac{\partial^2 u_k'}{\partial x_j \partial x_j} &= \frac{\partial}{\partial x_j}\left( \frac{\partial u_i'u_k'}{\partial x_j} - u_k'\frac{\partial u_i'}{\partial x_j} \right) - \frac{\partial u_i'}{\partial x_j} \frac{\partial u_k'}{\partial x_j} \\
 u_k'\frac{\partial^2 u_i'}{\partial x_j \partial x_j} &= \frac{\partial}{\partial x_j}\left( u_k' \frac{\partial u_i'}{\partial x_j} \right) - \frac{\partial u_i'}{\partial x_j} \frac{\partial u_k'}{\partial x_j}.
\end{align}
$$
이 둘을 더하면 (7)항은 다음과 같이 단순화될 수 있다.
$$
u_i'\frac{\partial^2 u_k'}{\partial x_j \partial x_j} + u_k'\frac{\partial^2 u_i'}{\partial x_j \partial x_j} = \frac{\partial^2 u_i'u_k'}{\partial x_j \partial x_j} - 2 \frac{\partial u_i'}{\partial x_j} \frac{\partial u_k'}{\partial x_j}.
$$

---
(8)항에서는 다음을 이용하여 나타낼 수 있다:
$$
\begin{align}
\frac{ \partial u'_{i}u'_{j}u'_{k} }{ \partial x_{j} } &=u'_{i}u'_{j}\frac{ \partial u'_{k} }{ \partial x_{j} } +u'_{j}u'_{k}\frac{ \partial u'_{i} }{ \partial x_{j} } +\cancelto{0 }{u'_{i}u'_{k}\frac{ \partial u'_{j} }{ \partial x_{j} } } \\
&=u'_{i}u'_{j}\frac{ \partial u'_{k} }{ \partial x_{j} } +u'_{j}u'_{k}\frac{ \partial u'_{i} }{ \partial x_{j} }
\end{align}
$$


---
위의 단순화를 `ReynoldsStessRaw` 에 적용하면 다음과 같다:
>[!formula]  `ReynoldsStress`^ReynoldsStress
>$$
>\begin{align}
>\frac{\partial \overline{ u_i'u_k'}}{\partial t} + \overline{u}_j \frac{\partial\overline{ u_i'u_k'}}{\partial x_j} =& \frac{2\overline{p' s_{ik}'}}{\rho} - \frac{\partial}{\partial x_j}\left( \frac{1}{\rho}(\overline{p' u_i'}\delta_{kj} + \overline{p' u_k'}\delta_{ij}) +\overline{u_i'u_k'u_j'} -\nu\frac{\partial \overline{u_i'u_k'}}{\partial x_j} \right)\\
>&- 2 \nu \overline{\frac{\partial u_i'}{\partial x_j} \frac{\partial u_k'}{\partial x_j}} - \overline{u_i'u_j'}\frac{\partial \overline{u}_k}{\partial x_j} - \overline{u_k'u_j'}\frac{\partial \overline{u}_i}{\partial x_j}\\
>
>\end{align}
>$$

이 식에 $R_{ik}=\overline{u'_{i}u'_{k}}$ 를 이용하여 정리하면 레이놀즈 응력 방정식을 볼 수 있다:
>[!formula]  `ReynoldsStressArrange`
>$$
>\begin{align}
>\frac{ \partial R_{ik} }{ \partial t } +\overline{u_{j}}\frac{ \partial R_{ik} }{ \partial x_{j} } =& \underbrace{ -\left( R_{ij}\frac{ \partial \overline{u_{k}} }{ \partial x_{j} }+R_{jk}\frac{ \partial \overline{u_{i}} }{ \partial x_{j} }   \right) }_{ \text{Production term} } \\
>&\underbrace{ -\frac{1}{\rho}\left( \overline{p'u'_{i}}\delta_{kj}+\overline{p'u'_{k}}\delta_{ij} \right) }_{ \text{Pressure redistribution} }\;\underbrace{ -\frac{ \partial  }{ \partial x_{j} } \left( \overline{u'_{j}u'_{i}u'_{k}} \right) }_{ \text{Turbulent transport} } \; \underbrace{ +\nu \frac{ \partial^{2} }{ \partial x_{j}x_{j} } \left( R_{ik} \right)  }_{ \text{Viscous diffusion} } \\
>&\underbrace{ -2\nu \left( \overline{\frac{ \partial u'_{i} }{ \partial x_{j} } \frac{ \partial u'_{k} }{ \partial x_{j} } } \right) }_{ \text{Dissipation term} }  
>\end{align}
>$$

혹은 간단하게 다음과 같이 표기한다:
>[!formula]  `ReynoldsStressSimple`
>$$
>\begin{align}
\frac{DR_{ik}}{Dt}=P_{ik} +\Pi_{ik}+D^{Turb}_{ik} +D^{\nu}_{ik}-\varepsilon_{ik}
>\end{align}
>$$

---
## 레이놀즈 응력 방정식의 의미
레이놀즈 응력 방정식 우변의 각 항에는 레이놀즈 응력에 관한 물리적 의미를 가지고 있는데, 다음과 같다.
### 생성 항(Production term)
$$
P_{ik} = -\left( R_{ij}\frac{ \partial \overline{u_{k}} }{ \partial x_{j} }+R_{jk}\frac{ \partial \overline{u_{i}} }{ \partial x_{j} }   \right)
$$
**평균 유속 기울기**(평균 유동에 대한 전단 변형)에 의해서 레이놀즈 응력이 생성된다.

---
### 확산 항(Diffusion term)

#### 압력 확산 항(Pressure diffusion)
$$
\Pi_{ik} = -\frac{1}{\rho}\left( \overline{p'u'_{i}}\delta_{kj}+\overline{p'u'_{k}}\delta_{ij} \right)
$$
위에서 언급했었던 것처럼 **압력과 유속의 요동이 상호작용하면서 레이놀즈 응력의 위치를 바꾸는 방식**으로 확산한다.

#### 난류 수송 항(Turbulence transport)
$$
D^{Turb}_{ik}=-\frac{ \partial  }{ \partial x_{j} } \left( \overline{u'_{j}u'_{i}u'_{k}} \right)
$$
유속의 3차원적 변동성분이 상호작용하여 난류를 주변 공간으로 응력을 전달한다. 난류가 만든 유속의 요동이 강한 난류 영역에서 약한 영역으로 응력을 퍼뜨리면서 **흐름 전체에 불균일한 난류 특성을 평탄화**시킨다.

#### 점성 확산 항(Viscous diffusion)
$$
D^{\nu}_{ik}= \nu \frac{ \partial^{2} }{ \partial x_{j}x_{j} } \left( R_{ik} \right) 
$$
유체의 점성에 의해 난류가 작은 스케일에서 레이놀즈 응력을 주변 공간으로 확산하는 것을 나타내는 항이다. 난류 수송 항과 마찬가지로 강한 난류 영역에서 약한 영역으로 응력을 확산시키지만, 3차원적 요동보다 미시적으로 난류 특성을 평탄화시킨다. 이 항은 주로 유동 경계나 벽 큰처의 박리 층(boundary layer)에서 강한 작용이 나타난다.

| **항목** | **난류 확산** $D_{ik}^{\text{turb}}$ | **점성 확산** $D_{ik}^{\nu}$ |
| ------ | -------------------------------- | ------------------------ |
| 원인     | 난류 요동 자체의 움직임                    | 분자 운동 (점성력)              |
| 크기     | 대개 지배적                           | 작음, 벽 근처 중요              |
| 성격     | 비선형, 모<center></center>델링 필요     | 선형, 물성 상수로 가능            |
| 영향 영역  | 자유류 (벽에서 멀리)                     | 박리층, 점성 하위층 등            |

---
### 소산 항(Dissipation term)
$$
\varepsilon_{ik}=-2\nu \left( \overline{\frac{ \partial u'_{i} }{ \partial x_{j} } \frac{ \partial u'_{k} }{ \partial x_{j} } } \right)
$$
소산 항은 난류 요동이 점성에 의해 열로 변환되어 사라지는 것을 나타내는 항이다. 난류는 큰 소용돌이(Eddy)에서 시작해서 점점 작은 소용돌이로 확산하는데, 가장 작은 소용돌이(콜모고로프 스케일)에서는 점성이 강하게 작용하여 난류 에너지가 마찰로 인해 열 에너지로 변환되어 사라진다. 이 과정에서 레이놀즈 응력 또한 같이 소산되어 사라지는 것을 소산 항이 나타낸다.