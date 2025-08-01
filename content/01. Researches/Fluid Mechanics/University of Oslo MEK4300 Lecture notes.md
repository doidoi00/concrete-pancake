# 6장

## 비압축성 난류 평균 유동

난류는 Navier-Stokes 방정식에 의해 지배됩니다. 그러나,

- 차원 해석이나 유사성 해법을 통한 단순화는 불가능하며,
- 난류에 대한 정확한 정의는 알려져 있지 않고,
- 난류 유동은 잘 이해되지 않고 있습니다.

난류 유동은 일반적으로 가장 특징적인 속성을 나열하여 *정의*됩니다. 우리가 알고 있는 것은 다음과 같습니다:

- 난류는 *유동*의 속성이며 *유체*의 속성이 아닙니다.
- 난류는 항상 3차원 공간적이며 과도적입니다. 2차원 난류는 존재하지 않습니다.
- 난류는 불규칙하고, 겉보기에 무작위적이고 혼란스러운 움직임을 보입니다. 그러나 혼돈 속에는 질서가 있습니다. 유동은 Navier-Stokes 방정식을 만족하므로 겉보기에는 결정론적입니다. 하지만 N-S 방정식은 초기 및 경계 조건에 극도로 민감합니다(나비 효과). 초기 또는 경계 조건의 미세한 교란도 완전히 다른 해를 유도합니다. 따라서 *Navier-Stokes 방정식이 결정론적임에도 불구하고 난류는 확률론적입니다*.
- 난류 유동은 상당 부분 소용돌이와 와도(vorticity)로 구성됩니다. 와류의 늘어짐(vortex stretching)과 기울어짐(tilting)은 난류 유동을 특징짓는 3차원 현상이며, 이러한 과정은 2D에서는 발생할 수 없습니다. 와류 관이 늘어나면 각운동량을 보존하기 위해 각속도가 증가해야 합니다. 이는 3D에서만 가능합니다. 2D에서는 와도가 (비물리적으로) 보존되는 양입니다.
- 소용돌이는 다양한 스케일로 존재합니다. 가장 큰 소용돌이(가장 큰 스케일)의 크기는 유동의 기하학적 구조에 의해 결정되며, 가장 작은 소용돌이(가장 작은 스케일)의 크기는 점성에 의해 결정됩니다.
- 에너지 캐스케이드. 에너지는 가장 큰 스케일에서 유동에 도입되고 가장 작은 스케일에서 소멸됩니다. 운동 에너지의 소멸 $\varepsilon$은 다음과 같이 정의됩니다.

   $$
   \varepsilon = \mu \boldsymbol{s} : \boldsymbol{s}, \quad {\mathrm{where\,\, strain }}\quad \boldsymbol{s} = 0.5\left( \nabla \boldsymbol{u} + \nabla \boldsymbol{u}^T \right)
   $$

   변형률은 와류 관의 중심을 향해 극적으로 증가하여 이 영역에서 더 높은 소멸률을 초래합니다.
- 난류는 높은 Reynolds 수에서 발생합니다. 정규화된 운동량 방정식은 다음과 같습니다.

   $$
   \frac{\partial \boldsymbol{u}}{\partial t} + (\boldsymbol{u} \cdot \nabla)\boldsymbol{u} = -\nabla p + \frac{1}{Re} \nabla ^2 \boldsymbol{u} + \boldsymbol{f}.
   $$

   확산은 모든 기울기를 완화시키는 경향이 있어 안정화됩니다. 간단히 말해서, 유동에 대한 교란(방해)은 대류에 의해 증폭되고 점성에 의해 감쇠됩니다. Reynolds 수가 크면 확산이 작고 대류가 지배적이므로 불안정한 난류 유동이 발생합니다. Reynolds 수가 작으면 점성이 지배적이므로 교란이 난류를 유발하기 전에 사라집니다.
<figure></figure>
	<img src="turbvel.png" align="center" width="50%"/>
	<figcaption align="center"><b>Fig.5</b> 그림은 1000개의 혼돈스러운 속도 성분의 순간적인 측정을 보여줍니다.</figcaption>

엔지니어는 난류 유동의 거동을 예측할 수 있어야 합니다. 그러나 난류 유동에서 속도 $\boldsymbol{u}(\boldsymbol{x}, t)$와 압력 $p(\boldsymbol{x}, t)$는 실제로 확률 변수로 간주되어야 합니다. 즉, 공간과 시간의 어떤 지점에서도 속도나 압력의 정확한 값을 예측할 수 없습니다. 그러나 이러한 확률 변수의 통계적 특성은 예측할 수 있습니다. 이는 일반적으로 앙상블 평균 또는 *Reynolds 평균*을 사용하여 수행됩니다.

먼저 통계적으로 정상 상태인 난류 유동을 고려해 봅시다. 즉, 유동의 통계적 특성이 시간에 독립적인 경우입니다. 이는 예를 들어 인가된 압력 기울기(구동력)가 일정하게 유지되는 평면 채널 유동 또는 직선 파이프 유동에서 발생합니다.
앞서 언급했듯이, 난류 유동에서 속도 벡터 $\boldsymbol{u}(\boldsymbol{x}, t)$는 확률 변수로 간주될 수 있습니다. 통계적으로 정상 상태인 난류 유동의 동일한 지점에서 하나의 속도 성분을 측정하면, **Fig.5**에서 볼 수 있듯이 신호는 Gaussian 노이즈와 매우 유사하게 보일 것입니다.
이러한 샘플에 대한 속도의 *산술* 평균은 다음과 같이 계산될 수 있습니다.

$$
  \left<u\right>(\boldsymbol{x}) = \frac{1}{N} \sum_{i=1}^N u(\boldsymbol{x}, t_i)
$$

여기서 $u(\boldsymbol{x}, t_i)$는 시간 $t_i$에서의 속도이고, 표시된 난류 계열의 경우 $N=1000$입니다. 샘플링이 불연속적인 시간 간격 $\triangle t$로 수행되는 경우 $t_i = i\triangle t$입니다. 또한, 샘플이 $u(\boldsymbol{x}, t_i)$가 $u(\boldsymbol{x}, t_i+\triangle t)$와 상관 관계가 없을 만큼 충분히 긴 시간 간격으로 취해지면 우리는 *앙상블* 평균이라고 말합니다.

$$
  \overline{u}(\boldsymbol{x}) = \lim_{N\rightarrow \infty} \frac{1}{N} \sum_{i=1}^N u(\boldsymbol{x}, t_i).
$$

분자와 분모에 $\triangle t$를 곱함으로써 앙상블 평균은 다음과 같이 다시 쓸 수 있습니다.

>[!formula]
>$$
\begin{aligned}
  \overline{u}(\boldsymbol{x}) &= \lim_{N\rightarrow \infty} \frac{1}{N\triangle t} \sum_{i=1}^N u(\boldsymbol{x}, t_i) \triangle t, \\
   &\approx \frac{1}{T} \int_0^{T} u(\boldsymbol{x}, t) \mathrm{d} t,
\end{aligned}
$$

여기서 $T=N\triangle t$는 총 샘플링 시간이며, 일반적으로 유동의 가장 큰 시간 스케일보다 커야 합니다. 통계적으로 정상 상태 유동의 경우 앙상블 평균이 시간 평균과 일치한다는 것을 알 수 있습니다.

통계가 시간에 따라 변할 수 있는 보다 일반적인 난류 유동의 경우, 확률 변수 ${u}(\boldsymbol{x}, t)$가 일반적으로 확률 변수 ${u}(\boldsymbol{x}, t+\triangle t)$와 통계적으로 다르기 때문에 앙상블 평균을 정의하는 데 더 많은 주의가 필요합니다(예: $\overline{u}(\boldsymbol{x}, t) \neq \overline{u}(\boldsymbol{x}, t+\triangle t)$). 이를 해결하기 위해 동전 던지기를 고려해 봅시다. 앞면이 나오면 $\xi=1$, 뒷면이 나오면 $\xi=0$인 확률 변수 $\xi$가 있다고 가정하면, 산술 평균은 명백히 다음과 같습니다.

$$
 \left< \xi\right> = \frac{1}{N}\sum_{i=1}^N \xi^{(i)}
$$

여기서 $\xi^{(i)}$는 $i$번째 던지기의 결과이며, $N\rightarrow \infty$일 때 $\left< \xi\right> = 0.5$가 되어야 합니다.
이제 동전이 동일하다면, 한 사람이 동전을 $N$번 던지거나 $N$명의 사람이 동전을 한 번씩 던지더라도 산술 평균은 분명히 동일합니다. 이 원리는 난류 유동에 대한 앙상블 평균을 정의하는 데 사용됩니다. 만약 $N$개의 다른 시간 간격에서 확률 변수 $u(\boldsymbol{x}, t)$를 샘플링하는 대신, $N$개의 동일한 실험을 실행하고 모든 실험에서 동일한 시간과 장소에서 $u(\boldsymbol{x}, t)$를 샘플링한다면, 앙상블 평균의 정의는 다음과 같습니다.

$$
  \overline{u}(\boldsymbol{x}, t) = \lim_{N\rightarrow \infty} \frac{1}{N} \sum_{i=1}^N u^{(i)}(\boldsymbol{x}, t).
$$

통계적으로 정상 상태인 유동의 경우 이는 시간 평균과 동일하며 좌변은 시간에 의존하지 않습니다.

앙상블 평균을 사용하여 순간 속도와 압력은 평균 성분과 변동 성분으로 분해될 수 있습니다.

>[!formula] `ReynoldsAverage`^eq-ReynoldsAverage
>$$
\begin{aligned}
  \boldsymbol{u}(\boldsymbol{x}, t) &= \overline{\boldsymbol{u}}(\boldsymbol{x}, t) + \boldsymbol{u}'(\boldsymbol{x}, t), \notag \\
  p(\boldsymbol{x}, t) &= \overline{p}(\boldsymbol{x}, t) + p'(\boldsymbol{x}, t).
\end{aligned}
$$ 

순간 속도 $\boldsymbol{u}(\boldsymbol{x}, t)$와 변동 속도 $\boldsymbol{u}'(\boldsymbol{x}, t)$는 모두 확률 변수로 간주되어야 하지만, 평균 속도 $\overline{\boldsymbol{u}}(\boldsymbol{x}, t)$는 결정론적입니다. $\phi = \overline{\phi} + \phi'$로 분해된 임의의 확률 변수를 고려해 봅시다. 정의에 의해 우리는 $\overline{\phi'}=0$을 가집니다. 이는 Eq. `ReynoldsAverage`의 양변에 평균을 취함으로써 따릅니다.

$$
\begin{aligned}
 \overline{\phi} &= \overline{\overline{\phi} + \phi'},\\
                 &= \overline{\overline{\phi}} + \overline{\phi'}, \\
                 &= \overline{\phi} + \overline{\phi'},
\end{aligned}
$$

이는 $\overline{\phi'}=0$일 때만 참일 수 있습니다. (평균의 평균은 여전히 평균이라는 점에 유의하십시오.) 몇 가지 유용한 평균 규칙은 다음과 같습니다.

$$
\begin{aligned}
  \overline{\phi' \overline{\phi}} &= \overline{\phi'}\, \overline{\phi} = 0,\\
  \overline{\phi \overline{\phi}} &= \overline{\phi}\, \overline{\phi}, \\
  \overline{\phi \phi} &= \overline{(\overline{\phi} + \phi')(\overline{\phi} + \phi')} = \overline{\phi}^2 + \overline{\phi'\phi'}, \\
  \overline{\frac{\partial \phi}{\partial s}} &= \frac{\partial \overline{\phi}}{\partial s}.
\end{aligned}
$$

마지막 규칙은 미분과 평균의 두 연산이 *교환 가능*하다는 점에서 따릅니다. 즉, 평균의 미분은 미분의 평균과 동일합니다.

## Reynolds 평균 Navier-Stokes (RANS) 방정식의 유도

평균 속도와 압력을 정의했으므로, 이제 이를 예측하는 데 사용할 수 있는 방정식이 필요합니다. 모든 통계량에 대한 방정식은 Navier-Stokes 방정식을 조작하여 직접 유도할 수 있습니다. $\overline{\boldsymbol{u}}$ 및 $\overline{p}$에 대한 방정식은 단순히 NS를 평균하고 Eq. `ReynoldsAverage`를 도입하여 찾을 수 있습니다. 연속 방정식의 평균은 다음과 같습니다.

$$
 \overline{\nabla \cdot \boldsymbol{u}} = \nabla \cdot \overline{\boldsymbol{u}} = 0
$$

이는 평균화와 미분이 교환되기 때문입니다. 운동량 방정식의 평균은 다음과 같이 쓸 수 있습니다.

$$
  \overline{\frac{\partial \boldsymbol{u}}{\partial t} + (\boldsymbol{u} \cdot \nabla)\boldsymbol{u} = -\frac{1}{\rho}\nabla p + \nu \nabla ^2 \boldsymbol{u} + \boldsymbol{f}}
$$

밀도와 점성은 일정하다고 가정합니다. 왼쪽의 첫 번째 항과 오른쪽의 모든 항은 교환성을 사용하여 평균됩니다.

$$
\begin{aligned}
  \overline{\frac{\partial \boldsymbol{u}}{\partial t}} &= \frac{\partial \overline{\boldsymbol{u}}}{\partial t}, \\
  \overline{\frac{1}{\rho}\nabla p} &= \frac{1}{\rho}\nabla \overline{p}, \\
  \overline{\nu \nabla ^2 \boldsymbol{u}} &= \nu \nabla ^2 \overline{\boldsymbol{u}}.
\end{aligned}
$$

이것은 비선형 대류 항을 남깁니다. 인덱스 표기법을 사용하여 연속성과 교환성을 통해 두 단계를 빠르게 수행할 수 있습니다.

$$
\begin{aligned}
 \overline{u_j \frac{\partial u_i}{\partial x_j}} &= \overline{ \frac{\partial u_i u_j}{\partial x_j}} - \cancel{\overline{u_i \frac{\partial u_j}{\partial x_j}}}  \\
 &= \frac{\partial \overline{u_i u_j}}{\partial x_j}.
\end{aligned}
$$

이제 Eq. `ReynoldsAverage`를 삽입하면 다음과 같습니다.

$$
 \overline{u_i u_j} = \overline{(\overline{u}_i + u_i')(\overline{u}_j + u_j')} = \overline{u}_i \overline{u}_j + \overline{u_i' u_j'}
$$

따라서

$$
\begin{aligned}
 \overline{u_j \frac{\partial u_i}{\partial x_j}} &= \frac{\partial \overline{u}_i \overline{u}_j +  \overline{u_i' u_j'}}{\partial x_j} \\
 &= \overline{u}_j \frac{\partial \overline{u}_i}{\partial x_j} + \frac{\partial \overline{u_i' u_j'}}{\partial x_j}
\end{aligned}
$$

모든 것을 종합하면 Reynolds 평균 Navier-Stokes 방정식을 얻습니다.

$$
  \frac{\partial \overline{\boldsymbol{u}}}{\partial t} + (\overline{\boldsymbol{u}} \cdot \nabla)\overline{\boldsymbol{u}} = -\frac{1}{\rho}\nabla \overline{p} + \nu \nabla ^2 \overline{\boldsymbol{u}} - \frac{\partial \overline{u_i' u_j'}}{\partial x_j} + \overline{\boldsymbol{f}},
$$ 
^eq-RANS

$$
  \nabla \cdot \overline{\boldsymbol{u}} = 0
$$ 
^eq-RANSCont

## 평균 난류 운동 에너지 방정식 유도

Reynolds 평균 Navier-Stokes 방정식은 이전 섹션에서 유도되었습니다. 난류 운동 에너지 방정식을 유도하기 위해서는 먼저 변동 속도 $\boldsymbol{u}'$에 대한 방정식을 유도하는 것이 유리할 수 있습니다. 이러한 방정식은 순간 운동량 방정식에서 Eq. `RANS`를 빼서 유도할 수 있습니다. 대류를 제외한 모든 항은 자명합니다.

$$
\begin{aligned}
  \frac{\partial \boldsymbol{u} - \overline{\boldsymbol{u}}}{\partial t} + (\boldsymbol{u} \cdot \nabla)\boldsymbol{u} - (\overline{\boldsymbol{u}} \cdot \nabla)\overline{\boldsymbol{u}} &= -\frac{1}{\rho}\nabla (p- \overline{p}) + \nu \nabla ^2 (\boldsymbol{u} - \overline{\boldsymbol{u}}) +\frac{\partial \overline{u_i' u_j'}}{\partial x_j} + \boldsymbol{f} - \overline{\boldsymbol{f}}, \\
  \frac{\partial \boldsymbol{u}'}{\partial t} + (\boldsymbol{u} \cdot \nabla)\boldsymbol{u} - (\overline{\boldsymbol{u}} \cdot \nabla)\overline{\boldsymbol{u}} &= -\frac{1}{\rho}\nabla p' + \nu \nabla ^2 \boldsymbol{u}' +\frac{\partial \overline{u_i' u_j'}}{\partial x_j} + \boldsymbol{f}'  .
\end{aligned}
$$

대류 항은 $\boldsymbol{u}$를 삽입하여 조작됩니다.

$$
\begin{aligned}
(\boldsymbol{u} \cdot \nabla)\boldsymbol{u} - (\overline{\boldsymbol{u}} \cdot \nabla)\overline{\boldsymbol{u}} &= ((\overline{\boldsymbol{u}}+\boldsymbol{u}') \cdot \nabla)(\overline{\boldsymbol{u}}+\boldsymbol{u}') - (\overline{\boldsymbol{u}} \cdot \nabla)\overline{\boldsymbol{u}}, \\
 &= (\overline{\boldsymbol{u}} \cdot \nabla) \boldsymbol{u}' +  (\boldsymbol{u}' \cdot \nabla) (\overline{\boldsymbol{u}}+\boldsymbol{u}' ),
\end{aligned}
$$

이것은 변동 속도 성분에 대한 최종 방정식을 제공합니다.

$$
  \frac{\partial \boldsymbol{u}'}{\partial t} + (\overline{\boldsymbol{u}} \cdot \nabla) \boldsymbol{u}' = -\frac{1}{\rho}\nabla p' + \nu \nabla ^2 \boldsymbol{u}' - (\boldsymbol{u}' \cdot \nabla) (\overline{\boldsymbol{u}}+\boldsymbol{u}' ) +\frac{\partial \overline{u_i' u_j'}}{\partial x_j} + \boldsymbol{f}'.
$$ 
^eq-FluctVel

방정식 전체를 인덱스 표기법으로 쓰면 다음과 같습니다.

$$
  \frac{\partial u_i'}{\partial t} + \overline{u}_j \frac{\partial u_i'}{\partial x_j} = -\frac{1}{\rho}\frac{\partial p'}{\partial x_i} + \nu \frac{\partial^2 u_i'}{\partial x_j \partial x_j} - u_j'\frac{\partial \overline{u}_i}{\partial x_j} - u_j'\frac{\partial u_i'}{\partial x_j} +\frac{\partial \overline{u_i' u_j'}}{\partial x_j} + f_i'.
$$ 
^eq-FluctVelIndex

이제 이 방정식을 사용하여 Reynolds 응력 및 난류 운동 에너지에 대한 수송 방정식을 유도하고자 합니다. 난류 운동 에너지 $k = 0.5 \overline{\boldsymbol{u}' \cdot \boldsymbol{u}'} = 0.5 \overline{u_i'u_i'}$입니다. $k$에 대한 방정식은 Eq. `FluctVelIndex`에 $u_i'$를 곱한 다음 결과 방정식의 평균을 취하여 얻을 수 있습니다. 그러나 여기서는 Reynolds 응력 $\overline{u_i'u_j'}$의 유도를 먼저 할 것입니다. 왜냐하면 그렇게 하면 Reynolds 응력 방정식의 대각합을 취함으로써 $\overline{u_i'u_i'}$에 대한 방정식을 얻을 수 있기 때문입니다. Eq. `FluctVelIndex`에 $u_k'$를 곱한 다음 전체 결과 방정식의 평균을 취하여 유도를 시작합니다. 편의상 체적력 $f_i$는 무시합니다.

$$
 \overline{  u_k'\left( \frac{\partial u_i'}{\partial t} + \overline{u}_j \frac{\partial u_i'}{\partial x_j} = -\frac{1}{\rho}\frac{\partial p'}{\partial x_i} + \nu \frac{\partial^2 u_i'}{\partial x_j \partial x_j} - u_j'\frac{\partial \overline{u}_i}{\partial x_j} - u_j'\frac{\partial u_i'}{\partial x_j} +\frac{\partial \overline{u_i' u_j'}}{\partial x_j} \right) }.
$$

대부분의 항은 간단하게 조작되며, 우변의 마지막 항은 사라집니다.

$$
\overline{  u_k' \frac{\partial u_i'}{\partial t}} + \overline{u}_j \overline{u_k'\frac{\partial u_i'}{\partial x_j}} = -\frac{1}{\rho}\overline{u_k'\frac{\partial p'}{\partial x_i}} + \nu \overline{u_k'\frac{\partial^2 u_i'}{\partial x_j \partial x_j}} - \overline{u_k'u_j'}\frac{\partial \overline{u}_i}{\partial x_j} - \overline{u_k' u_j'\frac{\partial u_i'}{\partial x_j}}.
$$

$k$와 $i$가 모두 자유 인덱스이므로 다른 방정식으로 교환할 수 있다는 점에 유의하십시오.

$$
\overline{  u_i' \frac{\partial u_k'}{\partial t}} + \overline{u}_j \overline{u_i'\frac{\partial u_k'}{\partial x_j}} = -\frac{1}{\rho}\overline{u_i'\frac{\partial p'}{\partial x_k}} + \nu \overline{u_i'\frac{\partial^2 u_k'}{\partial x_j \partial x_j}} - \overline{u_i'u_j'}\frac{\partial \overline{u}_k}{\partial x_j} - \overline{u_i' u_j'\frac{\partial u_k'}{\partial x_j}}.
$$

예를 들어, $\partial u_i'u_k'/\partial t=u_i'\partial u_k'/\partial t + u_k'\partial u_i'/\partial t$임을 고려하면, 이제 이전 두 방정식의 합이 $\overline{u_i'u_k'}$에 대한 방정식을 제공한다는 것을 깨달을 수 있을 것입니다.

$$
\begin{aligned}
 \frac{\partial \overline{ u_i'u_k'}}{\partial t} + \overline{u}_j \frac{\partial\overline{ u_i'u_k'}}{\partial x_j} =& -\frac{1}{\rho}\left( \overline{u_i'\frac{\partial p'}{\partial x_k}} + \overline{u_k'\frac{\partial p'}{\partial x_i}} \right) \notag \\
&+ \nu \left( \overline{u_i'\frac{\partial^2 u_k'}{\partial x_j \partial x_j}} + \overline{u_k'\frac{\partial^2 u_i'}{\partial x_j \partial x_j}} \right) \notag\\
&- \overline{u_i'u_j'}\frac{\partial \overline{u}_k}{\partial x_j} -           \overline{u_k'u_j'}\frac{\partial \overline{u}_i}{\partial x_j} \notag \\
&- \overline{u_i' u_j'\frac{\partial u_k'}{\partial x_j}} - \overline{u_k' u_j'\frac{\partial u_i'}{\partial x_j}}.
\end{aligned}
$$
^eq-ReynoldsStressRaw

우변의 여러 항은 추가로 단순화될 수 있습니다. 곱셈 규칙을 사용하여 압력 항은 다음과 같이 쓸 수 있습니다.

$$
\begin{aligned}
 \overline{u_i'\frac{\partial p'}{\partial x_k}} + \overline{u_k'\frac{\partial p'}{\partial x_i}}
&= \overline{p' \left( \frac{\partial u_i'}{\partial x_k} + \frac{\partial u_k'}{\partial x_i} \right)} + \frac{\partial}{\partial x_j}\left( \overline{p' u_i'}\delta_{kj} + \overline{p' u_k'}\delta_{ij} \right), \\
 &= 2 \overline{p' s_{ik}'} + \frac{\partial}{\partial x_j}\left( \overline{p' u_i'}\delta_{kj} + \overline{p' u_k'}\delta_{ij} \right),
\end{aligned}
$$

여기서

$$
s_{ij}' = \frac{1}{2} \left( \frac{\partial u_i'}{\partial x_j} + \frac{\partial u_j'}{\partial x_i}\right)
$$

이고, 발산 형태($\partial \overline{p'u_i'}/\partial x_k = \partial \overline{p' u_i'} /\partial x_j \delta_{kj}$)를 가능하게 하기 위해 항등 텐서 표기법이 사용됩니다. 이 표기법은 이 항이 보존적임을 강조하는 데 사용됩니다. 즉, $\overline{u_i' u_k'}$를 생성하거나 파괴할 수 없지만, 단순히 이동시키는 역할을 합니다. 이러한 이유로 이 항은 종종 압력 확산이라고 불립니다.

Eq. `ReynoldsStressRaw`의 두 라플라스 항은 다음 항등식을 사용하여 단순화될 수 있습니다.

$$
 u_i'\frac{\partial^2 u_k'}{\partial x_j \partial x_j} = \frac{\partial}{\partial x_j}\left( \frac{\partial u_i'u_k'}{\partial x_j} - u_k'\frac{\partial u_i'}{\partial x_j} \right) - \frac{\partial u_i'}{\partial x_j} \frac{\partial u_k'}{\partial x_j}
$$

그리고

$$
 u_k'\frac{\partial^2 u_i'}{\partial x_j \partial x_j} = \frac{\partial}{\partial x_j}\left( u_k' \frac{\partial u_i'}{\partial x_j} \right) - \frac{\partial u_i'}{\partial x_j} \frac{\partial u_k'}{\partial x_j}.
$$

이 두 방정식을 합하면 다음을 얻습니다.

$$
u_i'\frac{\partial^2 u_k'}{\partial x_j \partial x_j} + u_k'\frac{\partial^2 u_i'}{\partial x_j \partial x_j} = \frac{\partial^2 u_i'u_k'}{\partial x_j \partial x_j} - 2 \frac{\partial u_i'}{\partial x_j} \frac{\partial u_k'}{\partial x_j}.
$$

마지막으로, 연속성으로 인해 다음이 성립합니다.

$$
  u_i' u_j' \frac{\partial u_k'}{\partial x_j} +  u_k' u_j' \frac{\partial u_i'}{\partial x_j} = \frac{\partial u_i' u_k' u_j'}{\partial x_j}.
$$

위의 모든 단순화를 삽입하면 Reynolds 응력 수송 방정식의 최종 형태를 얻습니다.

$$
\begin{aligned}
\frac{\partial \overline{ u_i'u_k'}}{\partial t} + \overline{u}_j \frac{\partial\overline{ u_i'u_k'}}{\partial x_j} =& -\frac{2\overline{p' s_{ik}'}}{\rho} - \frac{\partial}{\partial x_j}\left( \frac{1}{\rho}(\overline{p' u_i'}\delta_{kj} + \overline{p' u_k'}\delta_{ij}) + \overline{u_i'u_k'u_j'} - \nu \frac{\partial \overline{u_i'u_k'}}{\partial x_j} \right) \notag \\
&- 2 \nu \overline{\frac{\partial u_i'}{\partial x_j} \frac{\partial u_k'}{\partial x_j}} - \overline{u_i'u_j'}\frac{\partial \overline{u}_k}{\partial x_j} -           \overline{u_k'u_j'}\frac{\partial \overline{u}_i}{\partial x_j}.
\end{aligned}
$$ 
^eq-ReynoldsStress

이것은 {cite}`white06`의 Eq.~(6-18)과 동일합니다. 우변에서 마지막 두 항과 첫 줄의 마지막 항만 닫혀 있습니다. 왜냐하면 이 항들은 오직 $\overline{u_i'u_k'}$와 평균 속도의 기울기만을 포함하기 때문입니다. 이는 우리가 처음부터 $\overline{u_i'u_k'}$에 대한 클로저를 찾으려는 야심찬 노력에서 스스로에게 더 많은 문제를 만들어냈다는 것을 의미합니다.

난류 운동 에너지 $k$에 대한 방정식은 Eq. `ReynoldsStress`에서 두 자유 인덱스를 축약(인덱스 $k=i$로 설정)하여 얻을 수 있습니다. 연속성($s_{ii}'=0$)과 대칭성으로 인해 몇몇 항은 사라집니다.

$$
\begin{aligned}
\frac{\partial \overline{ u_i'u_i'}}{\partial t} + \overline{u}_j \frac{\partial\overline{ u_i'u_i'}}{\partial x_j} =& - \frac{\partial}{\partial x_j}\left( \frac{2}{\rho}\overline{p' u_i'}\delta_{ij}  + \frac{1}{2}\overline{u_i'u_i'u_j'} - \nu \frac{\partial \overline{u_i'u_i'}}{\partial x_j} \right) \notag \\
&- 2 \nu \overline{\frac{\partial u_i'}{\partial x_j} \frac{\partial u_i'}{\partial x_j}} - 2\overline{u_i'u_j'}\frac{\partial \overline{u}_i}{\partial x_j}.
\end{aligned}
$$ 
^eq-uiuifirst

이를 $k = 0.5 \overline{u_i'u_i'}$를 사용하여 더 단순화하면 다음을 얻습니다.

$$
\begin{aligned}
\frac{\partial k}{\partial t} + \overline{u}_j \frac{\partial k}{\partial x_j} =& - \frac{\partial}{\partial x_j}\left( \frac{1}{\rho}\overline{p' u_i'}\delta_{ij}  + \frac{1}{2}\overline{u_i'u_i'u_j'} - \nu \frac{\partial k}{\partial x_j} \right) \notag \\
&- \nu \overline{\frac{\partial u_i'}{\partial x_j} \frac{\partial u_i'}{\partial x_j}} - \overline{u_i'u_j'}\frac{\partial \overline{u}_i}{\partial x_j}.
\end{aligned}
$$ 
^eq-uiuisecond

분명히 이 방정식은 \cite{white06}의 Eq.~(6-17)과 몇 군데 다릅니다. 그러나 차이는 단순히 몇 가지 재배열 때문이며, 이제 (6-17)과 더 유사한 약간 다른 형태도 유도할 것입니다. 라플라스 항, 즉 Eq. `uiuifirst`의 우변 발산 항 중 마지막 항은 다음 항등식을 사용하여 다르게 다시 쓸 수 있다는 점에 유의하십시오.

$$
 \nu \frac{\partial^2 u_i' u_i' }{\partial x_j \partial x_j} = 4\nu \frac{\partial s_{ij}'u_i'}{\partial x_j} - 2 \nu \frac{\partial u_i'}{\partial x_j} \frac{\partial u_j'}{\partial x_i}.
$$

이를 Eq. `uiuifirst`에 삽입하면 다음을 얻습니다.

$$
\begin{aligned}
\frac{\partial k}{\partial t} + \overline{u}_j \frac{\partial k}{\partial x_j} =& - \frac{\partial}{\partial x_j}\left( \frac{1}{\rho}\overline{p' u_i'}\delta_{ij}  + \frac{1}{2}\overline{u_i'u_i'u_j'} - 2\nu  \overline{s_{ij}'u_i'} \right) \\
&- 2\nu \overline{\frac{\partial u_i'}{\partial x_j} s_{ij}'} - \overline{u_i'u_j'}\frac{\partial \overline{u}_i}{\partial x_j}.
\end{aligned}
$$

또한, 속도 변형 텐서는 다음과 같이 분해될 수 있습니다.

$$
  \frac{\partial u_i'}{\partial x_j} = s_{ij}' + \omega_{ij}',
$$

여기서 반대칭 회전율 텐서 $\omega_{ij}'$는 다음과 같습니다.

$$
 \omega_{ij}' = \frac{1}{2} \left( \frac{\partial u_i'}{\partial x_j} -  \frac{\partial u_j'}{\partial x_i} \right).
$$

대칭 텐서와 반대칭 텐서의 축약이 항등적으로 0이므로 다음이 성립합니다.

$$
\begin{aligned}
  s_{ij}' \frac{\partial u_i'}{\partial x_j} &= s_{ij}'s_{ij}' + s_{ij}'\omega_{ij}' \\
  &= s_{ij}'s_{ij}'.
\end{aligned}
$$

따라서 난류 운동 에너지 방정식의 최종 형태는 다음과 같으며, 이는 문헌에서 가장 자주 사용되는 형태이기도 합니다.

$$
\begin{aligned}
\frac{\partial k}{\partial t} + \overline{u}_j \frac{\partial k}{\partial x_j} =& - \frac{\partial}{\partial x_j}\left( \frac{1}{\rho}\overline{p' u_i'}\delta_{ij}  + \frac{1}{2}\overline{u_i'u_i'u_j'} - 2\nu  \overline{s_{ij}'u_i'} \right) \notag \\
&- 2\nu \overline{s_{ij}' s_{ij}'} - \overline{u_i'u_j'}\frac{\partial \overline{u}_i}{\partial x_j}.
\end{aligned}
$$ 
^eq-KineticEnergyEq

난류 운동 에너지 방정식의 모든 항은 고유한 물리적 해석을 가집니다.

- 비정상 통계로 인한 $k$의 변화율

   $$
  \frac{\partial k}{\partial t}
   $$

- 대류로 인한 $k$의 변화율

   $$
  \overline{u}_j \frac{\partial k}{\partial x_j}
   $$

- 압력 변동, 난류 자체, 점성 응력에 각각 기인하는 비균질장 내에서 운동 에너지의 보존적 수송:

   $$
  \frac{\partial}{\partial x_j}\left( \frac{1}{\rho}\overline{p' u_i'}\delta_{ij}  + \frac{1}{2}\overline{u_i'u_i'u_j'} - 2\nu  \overline{s_{ij}'u_i'} \right)
   $$

- 평균 유동(기울기)으로부터 난류 운동 에너지의 생성률:

   $$
  \overline{u_i'u_j'}\frac{\partial \overline{u}_i}{\partial x_j}
   $$

- 점성 응력으로 인한 단위 질량당 난류 운동 에너지의 소멸률:

   $$
  \varepsilon = 2\nu \overline{s_{ij}' s_{ij}'}
   $$

## 난류 모델링

난류 모델링은 Reynolds 응력 텐서에 대한 적절한 클로저 또는 모델을 찾는 것입니다. Reynolds 응력 텐서는 대칭입니다.

$$
 \overline{u_i'u_j'} = \overline{u_j'u_i'}
$$

따라서 6개의 미지량을 포함합니다. Reynolds 응력은 실제로 응력이 아니지만, 평균 운동량 방정식 `RANS`에서 나타나는 방식 때문에 그렇게 불립니다. 평균 운동량 방정식은 다음과 같이 다시 쓸 수 있습니다.

$$
  \rho \left(\frac{\partial \overline{\boldsymbol{u}}}{\partial t} + (\overline{\boldsymbol{u}} \cdot \nabla)\overline{\boldsymbol{u}} \right) = \nabla \cdot \overline{\tau} + \rho\overline{\boldsymbol{f}},
$$
^eq-RANS2

여기서

$$
\overline{\tau}_{ij} = -\overline{p}\delta_{ij} + 2 \mu \overline{S}_{ij} - \rho\overline{u_i'u_j'},
$$

는 응력 차원을 갖는 새로운 항이며,

$$
 \overline{S}_{ij} = \frac{1}{2}\left(\frac{\partial \overline{u}_i}{\partial x_j} + \frac{\partial \overline{u}_j}{\partial x_i} \right).
$$

수학적으로 보면, 총 평균 응력 텐서에 일반 압력 및 점성 응력 후 세 번째 항 $-\rho \overline{u_i'u_j'}$이 추가된 것으로 나타납니다. 이 항은 Reynolds "응력"이라고 불리지만, 실제로는 평균 비선형 대류에 대한 변동 속도의 기여일 뿐입니다. (항이 응력의 차원을 가지려면 $\rho$가 필요하다는 점에 유의하십시오.) 응력은 일반적으로 유체 입자가 서로에게 가하는 내부 힘을 의미합니다.

RANS 모델링의 최고 수준은 일반적으로 $\overline{u_i'u_j'}$에 대한 수송 방정식을 직접 푸는 2차 모멘트 클로저로 간주됩니다. 2차 모멘트 클로저는 이 과정의 범위를 벗어납니다.

가장 일반적으로 사용되는 난류 모델은 에디 점성(eddy viscosity) (1차 모멘트) 클로저입니다.

$$
  \overline{u_i'u_j'} = -2\nu_T\overline{S}_{ij} + \frac{2}{3}k\delta_{ij},
$$ 
^eq-EddyViscosity

여기서 $\nu_T$는 '난류 점성'입니다. 난류 모델은 난류 점성을 모델링하는 데 사용되는 추가 PDE의 수에 따라 분류됩니다.

난류 점성은 유체의 매개변수가 아니라 유동의 매개변수입니다. 앞서 언급했듯이 난류 유동의 가장 중요한 속성 중 하나는 운동량과 온도와 같은 스칼라를 효율적으로 혼합하는 능력입니다. 수학적으로, 강화된 혼합은 Reynolds 응력을 통해 나타나며, Eq. `EddyViscosity`를 통해 $\nu_T$를 양의 ($\ge0$) 혼합율 상수로 사용하여 확산 과정으로 모델링됩니다. 운동량 방정식에 삽입하면 에디 점성은 다음 항을 발생시킵니다.

$$
  \frac{\partial \overline{u_i'u_j'}}{\partial x_j} = -\frac{\partial }{\partial x_j}\left[ \nu_t \left( \frac{\partial \overline{u}_i}{\partial x_j} + \frac{\partial \overline{u}_j}{\partial x_i} \right) \right] + \frac{2}{3} \frac{\partial k }{\partial x_i},
$$

그리고 우변의 첫 번째 항은 $\nu_T$가 양수라면 $\overline{u}_i$의 혼합(또는 확산)을 강화할 것임을 알 수 있습니다.

Reynolds 응력 `EddyViscosity`에 대한 대수 모델을 구축했으므로, 미지수의 수를 6개에서 2개($\nu_T$와 $k$)로 줄였습니다. 이제 나머지 항들을 클로저하는 가장 일반적인 전략에 대해 논의할 것입니다.

난류 점성은 차원적 추론에 따라 속도 스케일 $\tilde{u}$와 길이 스케일 $l$의 곱입니다.

$$
  \nu_T = \tilde{u} \cdot l,
$$

여기서 이러한 스케일을 정의하는 데는 여러 가지 해석이 가능합니다. 난류의 '정의' 속성 중 하나가 다양한 스케일을 포함한다는 점을 기억하면, 단일 속도 및 길이 스케일로 분류하는 것은 처음부터 의문스러울 수 있습니다. 그럼에도 불구하고 대부분의 난류 모델은 이러한 스케일에 대한 좋은 근사치를 찾는 것으로 귀결되며, 모델링된 스케일은 일반적으로 난류의 가장 큰 스케일로 해석됩니다. 다양한 모델이 존재하며(이 과정의 범위를 벗어나는 다중 스케일 모델 포함), 때로는 $\tilde{u}$ 대신 시간 스케일 $t_k$가 사용되지만, 이 둘은 $\tilde{u} = l / t_k$로 관련됩니다.

난류 모델은 적절한 스케일을 설정하는 데 필요한 추가 PDE의 수에 따라 분류되며, 이제 가장 기본적인 모델 중 일부를 다룰 것입니다.

### 0 방정식 모델

0 방정식 난류 모델은 난류 점성을 모델링하기 위해 추가 PDE를 사용하지 않는 모델입니다. 혼합 길이 모델은 최초의 이러한 난류 모델이었습니다. $\overline{u}$가 접선 속도이고 $y$가 벽면 수직 방향인 단순 평면 전단 유동의 경우 모델은 다음과 같습니다.

$$
\begin{aligned}
 \tilde{u} &= l \left|\frac{\mathrm{d} \overline{u}}{\mathrm{d} y} \right|, \notag \\
 \nu_T &= l^2 \left|\frac{\mathrm{d} \overline{u}}{\mathrm{d} y}\right|.
\end{aligned}
$$ 
^eq-MixingLength

평면 전단 유동의 경우 모델은 탁월합니다. 왜냐하면 다음과 같이 선택할 수 있기 때문입니다.

$$
\begin{aligned}
  l &\approx y^2, \quad \mathrm{for} \quad y^+ < 5, \notag\\
  l &\approx \kappa y, \quad \mathrm{for} \quad 30 < y^+ < 100, \notag \\
  l &\approx 1, \quad \mathrm{for} \quad y^+ > 100
\end{aligned}
$$ 
^eq-MixingLengthL

여기서 $\kappa=0.41$은 von Kármán 상수이고 $y$는 벽까지의 거리입니다. 또한,

$$
\begin{aligned}
  v^* &= \sqrt{\nu \frac{\partial \overline{u}}{\partial y}}_{\mathrm{wall}}, \\
  y^+ &= \frac{y v^*}{\nu},
\end{aligned}
$$

은 각각 난류 벽 마찰 속도와 정규화된 '벽' 단위에서의 벽까지의 거리입니다. 마찰 속도를 기반으로 한 Reynolds 수인 $Re_{\tau}=L\cdot v^*/\nu$는 종종 난류 평면 전단 유동을 특징짓는 데 사용됩니다.

Eq. `MixingLengthL`의 세 영역을 단일 연속 함수로 병합하는 여러 모델이 존재합니다. Van Driest는 다음을 사용하여 처음 두 내부 층을 병합하는 모델을 제공했습니다.

$$
 l = \kappa y \left(1 - \exp\left( -\frac{y^+}{A}\right) \right),
$$ 
^eq-VanDriest

여기서 $A$는 평판 유동에 대해 26으로 설정된 상수입니다. 이 모델은 벽에서 충분히 멀리 떨어져 있을 때 $l=\mathrm{constant}$와 병합되어야 합니다. 충분히 멀리 떨어져 있다는 것은 종종 Eq. `VanDriest`의 $l$이 혼합층 두께 $\delta$의 특정 계수보다 커지는 경우로 선택됩니다. 자주 사용되는 추정치는 $\kappa y = 0.09\delta$ 또는 $y = 0.22 \delta$일 때입니다.

혼합 길이 모델은 평면 경계층 유동 이외의 다른 유동에는 적합하지 않습니다. 예를 들어, 평면 채널의 중심에서는 대칭으로 인해 평균 속도 기울기가 0입니다($\mathrm{d} \overline{u} / \mathrm{d} y = 0$). 따라서 혼합 길이 모델 Eq. `MixingLength`은 채널 중심에서 난류 점성이 0이 될 것이라고 예측합니다. 이는 실험적 관찰 및 직관과는 반대됩니다. 왜냐하면 중심에서는 실제로 난류 강도가 매우 크기 때문입니다.

혼합 길이 모델의 이러한 결함은 속도 스케일이 평균 속도 기울기가 아닌 난류 강도에 비례해야 한다는 개선 제안으로 이어졌습니다.

$$
  \tilde{u} = \mathrm{const} \cdot \sqrt{k}.
$$ 
^eq-Utilde

문제는 이제 이 모델이 새로운 미지수 $k$를 도입하여 모델링이 필요하다는 것입니다(이전 모델은 알려진 양 $l$과 $\overline{u}$를 사용했지만). 따라서 난류 점성 클로저를 위해 하나의 추가 PDE가 필요합니다.

### 1 방정식 모델

대부분의 1 방정식 난류 모델은 난류 운동 에너지 $k$에 대한 수송 방정식을 풉니다. $k$에 대한 방정식은 이전 과제에서 이미 유도되었으며, 이는 훨씬 더 많은 미확인 항을 포함하고 있음이 분명합니다. $k$ 방정식을 다음과 같이 다시 작성해 보면

$$
\begin{aligned}
\frac{\partial k}{\partial t} + \overline{u}_j \frac{\partial k}{\partial x_j} =& - \frac{\partial T_j}{\partial x_j} \notag + P - \tilde{\varepsilon}
\end{aligned}
$$ 
^eq-uiuisecond2

그럼 우변의 항들은 다음과 같습니다.

$$
\begin{aligned}
T_j &= \frac{1}{\rho}\overline{p' u_i'}\delta_{ij}  + \frac{1}{2}\overline{u_i'u_i'u_j'} - \nu \frac{\partial k}{\partial x_j}, \\
P &= -\overline{u_i'u_j'}\frac{\partial \overline{u}_i}{\partial x_j}, \\
\tilde{\varepsilon} &= \nu \overline{\frac{\partial u_i'}{\partial x_j} \frac{\partial u_i'}{\partial x_j}} .
\end{aligned}
$$ 
^eq-oneequation

여기서 $T_j$는 난류 수송을 나타내고, $P$는 난류 운동 에너지의 생성이며, $\tilde{\varepsilon}$는 난류 운동 에너지의 '유사' 소멸입니다. 생성 $P$는 Reynolds 응력 및 평균 속도 기울기와 같은 알려진 양만을 포함하므로 닫혀 있습니다. $T_j$의 처음 두 항과 $\tilde{\varepsilon}$은 미지수이며 클로저가 필요합니다. $\tilde{\varepsilon}$은 $k$의 실제 소멸이 $2\nu\overline{s_{ij}' s_{ij}'}$이기 때문에 '유사' 소멸이라고 불립니다. 두 항은 다음 항등식을 통해 관련됩니다.

$$
\begin{aligned}
 2\nu\overline{s_{ij}' s_{ij}'} &= \nu \overline{\frac{\partial u_i'}{\partial x_j} \frac{\partial u_i'}{\partial x_j}} + \nu \overline{\frac{\partial u_i'}{\partial x_j} \frac{\partial u_j'}{\partial x_i}}, \\
 \varepsilon &= \tilde{\varepsilon} + \nu \overline{\frac{\partial u_i'}{\partial x_j} \frac{\partial u_j'}{\partial x_i}}.
\end{aligned}
$$

우변의 마지막 항이 첫 번째 항에 비해 작으므로, 소멸과 '유사' 소멸은 대부분의 유동에서 유사합니다.

난류 수송 항은 일반적으로 기울기 확산으로 모델링됩니다.

$$
  T_j = -\left(\nu + \frac{\nu_t}{\sigma_k} \right) \frac{\partial k}{\partial x_j} ,
$$

여기서 $\sigma_k$는 거의 1에 가까운 상수입니다. 이름에서 알 수 있듯이 이 모델은 $k$의 확산을 강화하고 일반적인 확산만으로는 불가능한 속도로 $k$ 장을 매끄럽게 만듭니다. 이는 효율적인 혼합 과정으로서의 난류에 대한 우리의 지식과 잘 일치합니다.

'유사' 소멸률은 다음과 같이 스케일링됩니다.

$$
 \tilde{\varepsilon} \approx \frac{\tilde{u}^3}{l}.
$$

따라서 Eq. `Utilde`를 삽입하여 $\tilde{\varepsilon}$에 대한 적절한 모델을 찾을 수 있습니다.

$$
\begin{aligned}
  \tilde{\varepsilon} &= \frac{(\mathrm{const} \cdot \sqrt{k})^3}{l}, \\
  \tilde{\varepsilon} &= \mathrm{const} \cdot \frac{k^{3/2}}{l}, \\
\end{aligned}
$$

따라서

$$
  l = \mathrm{const} \cdot \frac{k^{3/2}}{\tilde{\varepsilon}}. \\
$$

속도 및 길이 스케일을 삽입하면 난류 점성에 대한 다음 모델을 얻습니다.

$$
\begin{aligned}
  \nu_T &= \mathrm{const} \cdot \sqrt{k} l, \\
  \nu_T &= \mathrm{const} \cdot \frac{k^2}{\tilde{\varepsilon}}.
\end{aligned}
$$

이 모델의 약점은 고려 중인 문제에 대한 지식으로부터 길이 스케일 $l$이 제공되어야 한다는 것입니다. 이러한 이유로 1방정식 난류 모델은 종종 불완전하다고 불립니다. 1방정식 모델은 평면 경계층이나 비행기 날개처럼 혼합 길이를 쉽게 지정할 수 있는 시스템에서 인기가 있습니다.

### 2 방정식 모델

2 방정식 난류 모델은 누락된 길이 스케일에 대한 추가 PDE를 도입합니다. 2 방정식 모델은 시스템에 대한 이전 지식으로부터 어떤 매개변수(예: $l$)도 필요로 하지 않기 때문에 종종 완전하다고 불립니다.

가장 인기 있는 2 방정식 난류 모델은 $k-\tilde{\varepsilon}$ 모델 및 $k-\omega$ 모델의 변형입니다. $k-\tilde{\varepsilon}$ 모델은 $k$에 대한 하나의 PDE와 $\tilde{\varepsilon}$에 대한 추가 PDE를 풉니다. 마찬가지로, $k-\omega$ 모델은 $k$와 $\omega$에 대한 PDE를 푸는데, 여기서 $\omega\approx \tilde{\varepsilon} / k$입니다. $k$와 $\tilde{\varepsilon}$이 알려져 있다면

$$
  l = \frac{k^{3/2}}{\tilde{\varepsilon}}, \quad t_k = \frac{k}{\tilde{\varepsilon}}, \quad  \tilde{u} = \frac{l}{t_k} = \sqrt{k}
$$

여기서 $t_k$는 난류 시간 스케일입니다. 난류 점성은 이전과 같이 다음과 같이 결정됩니다.

$$
  \nu_T = \mathrm{const} \cdot \tilde{u} \cdot l = \mathrm{const} \cdot \frac{k^2}{\tilde{\varepsilon}}.
$$

$\tilde{\varepsilon}$에 대한 수송 방정식은 Navier-Stokes 방정식에서 정확하게 유도될 수 있습니다. 결과 방정식에는 많은 새로운 미지수가 포함되어 있으며, 여기서는 자세히 다루지 않을 것입니다. 대신 여기서는 가장 일반적인 모델 '상수'와 함께 완전하고 닫힌 $k-\tilde{\varepsilon}$ 모델을 단순히 보고할 것입니다.

$$
\begin{aligned}
\frac{\partial \overline{u}_i}{\partial t} + \overline{u}_j \frac{\partial \overline{u}_i}{\partial x_j} &= \frac{\partial}{\partial x_j}\left[ \left( \nu + \nu_T \right) \left(\frac{\partial \overline{u}_i}{\partial x_j} + \frac{\partial \overline{u}_j}{\partial x_i} \right) \right] - \frac{1}{\rho} \frac{\partial \overline{p} + \frac{2}{3} k}{\partial x_i}, \notag \\
\frac{\partial k}{\partial t} + \overline{u}_j \frac{\partial k}{\partial x_j} &= \frac{\partial}{\partial x_j}\left[ \left( \nu + \frac{\nu_T}{\sigma_k} \right) \frac{\partial k}{\partial x_j} \right] + P - \tilde{\varepsilon}, \notag \\
\frac{\partial \tilde{\varepsilon}}{\partial t} + \overline{u}_j \frac{\partial \tilde{\varepsilon}}{\partial x_j} &= \frac{\partial}{\partial x_j}\left[ \left( \nu + \frac{\nu_T}{\sigma_{\varepsilon}} \right) \frac{\partial \tilde{\varepsilon}}{\partial x_j} \right] + C_{\tilde{\varepsilon}_1} \frac{P \tilde{\varepsilon}}{k} - C_{\tilde{\varepsilon}_2}\frac{\tilde{\varepsilon}^2}{k},
 \\
\frac{\partial \overline{u}_i }{\partial x_i} &= 0, \notag \\
\nu_T &= C_{\mu} \frac{k^2}{\tilde{\varepsilon}}, \notag \\
C_{\mu} = 0.09, \quad C_{\tilde{\varepsilon}_1}&=1.44, \quad C_{\tilde{\varepsilon}_2}=1.92, \quad \sigma_{\tilde{\varepsilon}}=1.3, \quad \sigma_k = 1. \notag
\end{aligned}
$$ 
^eq-standardkepsilon

불행히도 모델 '상수'는 유동마다 다르다는 것이 알려져 있으며, 따라서 최적의 성능을 위해서는 종종 튜닝이 필요합니다. 그럼에도 불구하고 2방정식 모델은 완전하며, $k-\tilde{\varepsilon}$ 모델은 다양한 유동에 대해 산업에서 매우 많이 사용됩니다.

수많은 RANS 난류 모델이 존재합니다. 일부는 NASA의 [Turbulence Modelling Resources](http://turbmodels.larc.nasa.gov/) 페이지와 난류 모델링 [wiki](http://www.cfd-online.com/Wiki/Turbulence\_modeling)에 나열되어 있습니다.

### 경계 조건

난류 유동의 평균 통계는 벽 근처에서 급격한 기울기를 가집니다. 모든 통계를 올바르게 해상하려면 첫 번째 내부 계산 노드의 위치가 대략 $y^+=1$이어야 합니다. 이 제약은 특히 높은 Reynolds 수에서 그리드 해상도 측면에서 상당히 까다롭습니다. 표준 $k-\tilde{\varepsilon}$ 모델, Eq. `standardkepsilon`은 벽 근처에서 매우 정확하지 않으며, 이 문제를 해결하기 위한 많은 수정 사항이 존재합니다. 두 가지 주요 접근 방식은 다음과 같습니다.

1. 대략 $y^+=30$ 이상으로 유동을 해상하지 않고, 벽 대신 벽 내부에서 경계 조건을 지정하기 위해 벽 함수를 사용합니다.
2. 유동을 완전히 해상(최대 $y^+=1$까지)하고 감쇠 함수를 도입합니다.

벽 함수는 대수 법칙을 기반으로 합니다.

$$
   u^+ = \frac{1}{\kappa} \ln y^+ + B,
$$

이는 다양한 Reynolds 수에 대한 일반적인 경계층 실험과 잘 일치하는 것으로 알려져 있습니다. 첫 번째 내부 노드(벽 안쪽의 첫 번째 노드)가 $y^p$에 위치하면 속도는 다음과 같이 계산할 수 있습니다.

$$
  \frac{\overline{u}^p}{u^*} = \frac{1}{\kappa} \ln \frac{y^p u^*}{\nu} + B,
$$
