[[레이놀즈 평균화된 나비에-스토크스 방정식 (Reynolds Averaged Naiver-Stokes equations, RANS)|레이놀즈 평균화된 나비에-스토크스 방정식]]을 통해 운동량(벡터)을 기술할 수 있고, [[레이놀즈 응력 방정식 (Reynolds Stress Equation)|레이놀즈 응력 방정식]]을 통해 레이놀즈 응력이 어떻게 생성-확산-소산되는지 알 수 있었다. 한편 난류의 운동을 파악하는데 난류 운동 에너지 또한 난류 유동을 해석하는데 중요하다. 난류를 분석할 때 비선형 항과 변수가 많아 직접적으로 해를 구하기 어렵기 때문에,  복잡한 식을 닫기 위해 난류 운동 에너지 수송 방정식을 자주 사용한다. 대표적으로 $k-\varepsilon$ 모델링과 $k-\omega$ 모델링을 이용하여 근사적으로 난류를 분석한다. 두 모델링 외에도 난류 점성 계수(Turbulence Stress), 난류 세기(Turbulence Intensity) 등의 난류 거동을 해석하는데 있어 난류 운동 에너지 방정식($\mathrm{TKE}$ Equation)을 많이 이용한다.

## 난류 운동 에너지 방정식의 유도

### 1. 레이놀즈 응력 방정식의 응용

먼저  [[레이놀즈 응력 방정식 (Reynolds Stress Equation)#^ReynoldsStress|레이놀즈 응력 방정식]]에서 레이놀즈 응력을 $R_{ij}=\overline{u'_{i}u'_{j}}$ 라고 하였는데, 난류 운동 에너지($k$)를 레이놀즈 응력을 사용하여 다음과 같이 적을 수 있다:
$$
k = \frac{1}{2}\overline{u'_{i}u'_{i}} =\frac{1}{2}R_{ii}
$$
따라서 레이놀즈 응력 방정식을 조금 수정하면 난류 운동 에너지 수송 방정식을 쉽게 유도할 수 있다.

---
### 2. 난류 운동 에너지 수송 방정식의 유도

레이놀즈 응력 방정식은 다음과 같다:

>[!formula]  `ReynoldsStress`
>$$
>\begin{align}
>\frac{\partial \overline{ u_i'u_k'}}{\partial t} + \overline{u}_j \frac{\partial\overline{ u_i'u_k'}}{\partial x_j} =& \frac{2\overline{p' s_{ik}'}}{\rho} - \frac{\partial}{\partial x_j}\left( \frac{1}{\rho}(\overline{p' u_i'}\delta_{kj} + \overline{p' u_k'}\delta_{ij}) +\overline{u_i'u_k'u_j'} -\nu\frac{\partial \overline{u_i'u_k'}}{\partial x_j} \right)\\
>&- 2 \nu \overline{\frac{\partial u_i'}{\partial x_j} \frac{\partial u_k'}{\partial x_j}} - \overline{u_i'u_j'}\frac{\partial \overline{u}_k}{\partial x_j} - \overline{u_k'u_j'}\frac{\partial \overline{u}_i}{\partial x_j}\\
>
>\end{align}
>$$

여기서 자유 인덱스인 $i$ 와 $k$ 를 $i=k$ 라고 하면:
$$
\begin{align}
\frac{ \partial \overline{u'_{i}u'_{i}} }{ \partial t } +\overline{u_{j}}\frac{ \partial \overline{u'_{i}u'_{i}} }{ \partial x_{j} } =& \cancelto{0}{\frac{2\overline{p's'_{ii}}}{\rho}}-\frac{ \partial  }{ \partial x_{j} } \left( \frac{2}{\rho}\left( \overline{p'u'_{i}}\delta_{ij} \right) +\overline{u'_{i}u'_{i}u'_{j}}-\nu \frac{ \partial \overline{u'_{i}u'_{i}} }{ \partial x_{j} }  \right) \quad (\because s'_{ii}= \frac{ \partial u'_{i} }{ \partial x_{i} } =0 \;\text{by continuity eqn})\\
&-2\nu\overline{\frac{ \partial u'_{i} }{ \partial x_{j} } \frac{ \partial u'_{i} }{ \partial x_{j} } }-2\overline{u'_{i}u'_{j}}\frac{ \partial \overline{u_{i}} }{ \partial x_{j} } 
\end{align}
$$
$\overline{u'_{i}u'_{i}}$ 를 $2k$ 로 치환하면 다음과 같다.
$$
\begin{align}
2\frac{ \partial k }{ \partial t } + 2\overline{u_{j}}\frac{ \partial k }{ \partial x_{j} } =&-\frac{ \partial  }{ \partial x_{j} } \left( \frac{2}{\rho}\left( \overline{p'u'_{i}}\delta_{ij} \right)+\overline{u'_{i}u'_{i}u'_{j}}-2\nu\frac{ \partial k }{ \partial x_{j} }  \right)   \\
&-2\nu\overline{\frac{ \partial u'_{i} }{ \partial x_{j} } \frac{ \partial u'_{i} }{ \partial x_{j} } }-2\overline{u'_{i}u'_{j}}\frac{ \partial \overline{u_{i}} }{ \partial x_{j} }  \\
\implies \quad\frac{ \partial k }{ \partial t } + \overline{u_{j}}\frac{ \partial k }{ \partial x_{j} } =&-\frac{ \partial  }{ \partial x_{j} } \left( \frac{1}{\rho} \overline{p'u'_{i}}\delta_{ij} +\frac{1}{2}\overline{u'_{i}u'_{i}u'_{j}}-\nu\frac{ \partial k }{ \partial x_{j} }  \right)   \\
&-\nu\overline{\frac{ \partial u'_{i} }{ \partial x_{j} } \frac{ \partial u'_{i} }{ \partial x_{j} } }-\overline{u'_{i}u'_{j}}\frac{ \partial \overline{u_{i}} }{ \partial x_{j} }
\end{align} 
$$
>[!formula] `TKEapprox`
>$$
>\begin{align}
>\underbrace{ \frac{ \partial k }{ \partial t } }_{ \text{Unsteady term} } +\underbrace{ \overline{u_{j}}\frac{ \partial k }{ \partial x_{j} } }_{ \text{Convective term} } =& \underbrace{ -\overline{u'_{i}u'_{j}}\frac{ \partial \overline{u_{i}} }{ \partial x_{j} }  }_{ \text{Production term} }  \\
>&\underbrace{ -\frac{ \partial  }{ \partial x_{j} } \left( \frac{1}{\rho}\overline{p'u'_{i}}\delta_{ij}+\frac{1}{2}\overline{u'_{i}u'_{i}u'_{j}}-\nu \frac{ \partial k }{ \partial x_{j} } \right) }_{ \text{Transport term} } \\
>&\underbrace{ -\nu\overline{\frac{ \partial u'_{i} }{ \partial x_{j} } \frac{ \partial u'_{i} }{ \partial x_{j} } }  }_{ \text{Dissipation term} }
>\end{align}
>$$

---
## 난류 운동 에너지 방정식에서 각 항의 의미
>[!image] `turbulence`
><img src="turb_fig.png"/>
><figcaption align="center"><b>Sequence of turbulence  transport</b> </figcaption>

### 1. 난류의 시간에 따른 변화(Time rate of change of $k$)
$$
\text{Unsteady term}\;:\frac{ \partial k }{ \partial t } 
$$
임의의 위치에서 시간에 따른 난류의 변화를 나타내는 항이다. 이는 난류의 물질 미분(Material derivative) 형식 중 시간에 따른 난류의 변화를 확인할 수 있는 항으로, **$\frac{ \partial k }{ \partial t }\ne 0$ 이면 이 위치에서 유체의 흐름이 비정상류(Unsteady flow) 임을 나타낸다.** 그러나 그 역은 성립하지 않는데, $\frac{ \partial k }{ \partial t }=0$ 이어도 압력 또는 평균 유속 등이 시간에 따라 변화할 수 있기 때문이다. 어느 유체가 정상류일 조건은 나비에-스토크스 방정식의 주요 물리량에 대한 시간에 따른 변화율이 0이어야 한다.
$$
\frac{ \partial  }{ \partial t } =0
$$

### 2. 수송 항(Transport term)
$$
\begin{align}
&\text{Convective term}\;: \overline{u_{j}}\frac{ \partial k }{ \partial x_{j} }  \\
&\text{Transport term}\; : -\frac{ \partial  }{ \partial x_{j} } \left( \underbrace{ \frac{1}{\rho}\overline{p'u'_{i}}\delta_{ij} }_{ \text{by fluctuating pressure} }+\underbrace{ \frac{1}{2}\overline{u'_{i}u'_{i}u'_{j}} }_{ \text{by turbulence} }\underbrace{ -\nu \frac{ \partial k }{ \partial x_{j} } }_{ \text{by viscous stress} } \right)
\end{align}
$$
난류 운동 에너지는 유체의 흐름에서 주변 공간으로 퍼져가는데, 이를 나타내는 항을 수송항이라고 한다. 수송 항에는 대류에 의한 수송, 압력에 의한 수송, 난류에 의한 수송, 점성에 의한 확산(수송) 이 있다.

### 3. 소산 항(Dissipation term)
$$
\text{Dissipation term}\;:-\nu\overline{\frac{ \partial u'_{i} }{ \partial x_{j} } \frac{ \partial u'_{i} }{ \partial x_{j} }}
$$
난류 운동 에너지의 종착점으로, 매우 작은 난류 소용돌이가 더 이상 쪼개지지 않고, 점성에 의해 열 에너지로 전환되어 사라지는 것을 나타내는 항이다.

---
## 난류 운동 에너지의 추가적인 유도 
>[!formula] `TKEapprox`
>$$
>\begin{align}
>\underbrace{ \frac{ \partial k }{ \partial t } }_{ \text{Unsteady term} } +\underbrace{ \overline{u_{j}}\frac{ \partial k }{ \partial x_{j} } }_{ \text{Convective term} } =& \underbrace{ -\overline{u'_{i}u'_{j}}\frac{ \partial \overline{u_{i}} }{ \partial x_{j} }  }_{ \text{Production term} }  \\
>&\underbrace{ -\frac{ \partial  }{ \partial x_{j} } \left( \frac{1}{\rho}\overline{p'u'_{i}}\delta_{ij}+\frac{1}{2}\overline{u'_{i}u'_{i}u'_{j}}-\nu \frac{ \partial k }{ \partial x_{j} } \right) }_{ \text{Transport term} } \\
>&\underbrace{ -\nu\overline{\frac{ \partial u'_{i} }{ \partial x_{j} } \frac{ \partial u'_{i} }{ \partial x_{j} } }  }_{ \text{Dissipation term} }
>\end{align}
>$$

이전에 유도했던 $\text{TKE equation}$ 은 위와 같았다. 그러나 아래와 같은 추가적인 과정으로 난류 운동 에너지 방정식을 유도할 수 있다.

먼저 $\text{Transport term}$ 에서 **점성에 의한 확산 항**을 다음과 같은 과정으로 추가적으로 변환할 수 있다:
$$
\nu\frac{ \partial^{2} u'_{i}u'_{i} }{ \partial x_{j}\partial x_{j} } =4\nu \frac{ \partial s'_{ij}u'_{i} }{ \partial x_{j} } -2\nu \frac{ \partial u'_{i} }{ \partial x_{j} } \frac{ \partial u'_{j} }{ \partial x_{i} } 
$$
이 식을 `TKEapprox` 에 넣으면:
$$
\begin{align}
\frac{ \partial k }{ \partial t } +\overline{u_{j}}\frac{ \partial k }{ \partial x_{j} } =&-\overline{u'_{i}u'_{j}} \frac{ \partial \overline{u_{i}} }{ \partial x_{j} } \\
&-\frac{ \partial  }{ \partial x_{j} } \left( \frac{1}{\rho}\overline{p'u'_{i}}\delta_{ij}+\frac{1}{2}\overline{u'_{i}u'_{i}u'_{j}}-\frac{1}{2}\frac{ \partial \overline{u'_{i}u'_{i}} }{ \partial x_{j} }  \right)  \\
&-\nu\overline{\frac{ \partial u'_{i} }{ \partial x_{j} } \frac{ \partial u'_{i} }{ \partial x_{j} } } \\
\implies \frac{ \partial k }{ \partial t } +\overline{u_{j}}\frac{ \partial k }{ \partial x_{j} } =&-\overline{u'_{i}u'_{j}}\frac{ \partial \overline{u_{i}} }{ \partial x_{j} }  \\
&-\frac{ \partial  }{ \partial x_{j} } \left( \frac{1}{\rho}\overline{p'u'_{i}}\delta_{ij} +\frac{1}{2}\overline{u'_{i}u'_{i}u'_{j}} -2\nu\overline{s'_{ij}u'_{i}}\right) \\
&-\nu\overline{\frac{ \partial u'_{i} }{ \partial x_{j} } \frac{ \partial u'_{j} }{ \partial x_{i} } }-\nu\overline{\frac{ \partial u'_{i} }{ \partial x_{j} } \frac{ \partial u'_{i} }{ \partial x_{j} } } \\
\frac{ \partial k }{ \partial t } +\overline{u_{j}}\frac{ \partial k }{ \partial x_{j} } =&-\overline{u'_{i}u'_{j}}\frac{ \partial \overline{u_{i}} }{ \partial x_{j} }  \\
&-\frac{ \partial  }{ \partial x_{j} } \left( \frac{1}{\rho}\overline{p'u'_{i}}\delta_{ij} +\frac{1}{2}\overline{u'_{i}u'_{i}u'_{j}} -2\nu\overline{s'_{ij}u'_{i}}\right) \\
&-\nu \overline{\frac{ \partial u'_{i} }{ \partial x_{j} } s'_{ij}} \tag{1}
\end{align}
$$
또한 변동 속도 텐서는 대칭 텐서인 변형률 텐서(shear rate tensor, $s'_{ij}$) 와 반대칭 텐서인 와도 텐서(vorticity tensor, $w'_{ij}$) 의 합으로 나타낼 수 있다:
$$
\frac{ \partial u'_{i} }{ \partial x_{j} } =s'_{ij} + w'_{ij}
$$
여기서 와도 텐서는:
$$
w'_{ij}=\frac{1}{2}\left( \frac{ \partial u'_{i} }{ \partial x_{j} } -\frac{ \partial u'_{j} }{ \partial x_{i} }  \right) 
$$
로 나타낼 수 있다. 따라서 $\nu \overline{\frac{ \partial u'_{i} }{ \partial x_{j} } s'_{ij}}$ 는 다음과 같이 나타낼 수 있다:
$$
\begin{align}
\nu\overline{\frac{ \partial u'_{i} }{ \partial x_{j} } s'_{ij}} =& \nu\overline{\left( s'_{ij}+\omega'_{ij} \right) s'_{ij}} \\
=&\nu\overline{s'_{ij}s'_{ij}+s'_{ij}\omega'_{ij}}
\end{align}
$$
$s'_{ij}w'_{ij}$ 는 변형률 텐서와 와도 텐서의 내적인데, 이때 $\omega'_{ij}$ 의 대각 성분은 0이므로:
$$
\begin{align}
\nu\overline{\frac{ \partial u'_{i} }{ \partial x_{j} } s'_{ij}} =&\nu\overline{s'_{ij}s'_{ij}+s'_{ij}\omega'_{ij}} \\
=& \nu\overline{s'_{ij}s'_{ij}}
\end{align}
$$
이를 다시 (1)식에 대입하면 아래와 같이 물리적 성질을 더 잘 파악할 수 있는 형태로 나타낼 수 있다:
>[!formula] `TKEeqn`
>$$
>\begin{align}
>\frac{ \partial k }{ \partial t } +\overline{u_{j}}\frac{ \partial k }{ \partial x_{j} } =&-\overline{u'_{i}u'_{j}}\frac{ \partial \overline{u_{i}} }{ \partial x_{j} }  \\
>&-\frac{ \partial  }{ \partial x_{j} } \left( \frac{1}{\rho}\overline{p'u'_{i}}\delta_{ij} +\frac{1}{2}\overline{u'_{i}u'_{i}u'_{j}}-2\nu\overline{s'_{ij}u'_{i}} \right) \\
>&-\nu\overline{s'_{ij}s'_{ij}} 
>\end{align}
>$$

이렇게 표현하면 점성 확산 항과 소산 항에 변화가 생기게 되는데 **두 항의 물리적 의미를 더 정교하게 표현**할 수 있게 된다. 또한 **소산 항이 소산율 $\varepsilon=2\nu\overline{s'_{ij}s'_{ij}}$ 와 정확히 연결**될 수 있게 된다. 

## `TKEapprox` 와 `TKEeqn` 의 비교

아래는 `TKEapprox` 와 `TKEeqn` 의 점성 확산 항과 소산 항의 차이에 따라 비교한 표이다.

### 1. 점성 확산 항

| 구분  | `TKEapprox`                                  | `TKEeqn`                                     |
| --- | -------------------------------------------- | -------------------------------------------- |
| 수식  | $-\nu \frac{ \partial k }{ \partial x_{j} }$ | $-2\nu\overline{s'_{ij}u'_{i}}$              |
| 표현  | 단순히 난류에너지의 그래디언트를 따라 공간적으로 확산된다고 표현          | 변형률 텐서 $s'_{ij}$ 와 변동 속도의 상관 작용을 통해 확산한다고 표현 |
| 의미  | 스칼라의 공간 미분으로 모든 방향에 동일한 방식으로 확산 표현           | 벡터와 텐서를 사용하여 모든 공간 방향마다 점성 확산을 다르게 표현 가능     |
| 장점  | 계산이 간단, 모델에 쉽게 적용                            | 정확한 점성 확산을 계산할 수 있음                          |
| 단점  | 텐서 효과(방향성, 회전성 등)가 무시됨                       | 복잡한 계산                                       |

### 2. 소산 항

| 구분  | `TKEapprox`                                                                                            | `TKEeqn`                               |
| --- | ------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| 수식  | $-\nu\overline{\frac{ \partial u'_{i} }{ \partial x_{j} } \frac{ \partial u'_{i} }{ \partial x_{j} }}$ | $-\nu\overline{s'_{ij}s'_{ij}}$        |
| 표현  | 모든 변동 속도 기울기의 제곱을 고려 (대칭 + 반대칭 포함)                                                                     | 오직 대칭 텐서의 제곱만 고려 (비틀림은 소산에 기여하지 않음)    |
| 의미  | 소산에 불필요한 반대칭 성분도 고려하여 표현                                                                               | 소산에 필요한 대칭 텐서만으로 표현하여 물리적 의미를 더 정확하게 함 |
| 장점  | -                                                                                                      | 소산율 $\varepsilon$ 와 정확히 연결             |
| 단점  | 비틀림 성분까지 포함해서 실제보다 과대 추정 가능                                                                            | -                                      |

### 3. 방정식의 사용

| 구분        | `TKEapprox`                          | `TKEeqn`         |
| --------- | ------------------------------------ | ---------------- |
| 사용        | RANS (특히 $k-\varepsilon,\,k-\omega$) | DNS,LES, 고급 RANS |
| 수학적 표현    | 단순화된 스칼라 형태                          | 텐서 및 보존형         |
| 계산 복잡도    | 낮음                                   | 높음               |
| 비등방성 반영   | 어려움                                  | 가능함              |
| 물리 해석 정밀도 | 낮음 (보정 필요)                           | 높음               |
| 사용 목적     | 효율적 수치 해석                            | 물리적 정확성          |
