[[레이놀즈 평균화된 나비에-스토크스 방정식 (Reynolds Averaged Naiver-Stokes equations, RANS)|레이놀즈 평균화된 나비에-스토크스 방정식]]의 레이놀즈 응력은 평균 운동량 수송을, [[레이놀즈 응력 방정식 (Reynolds Stress Equation)|레이놀즈 응력 방정식]]은 각 응력 성분의 수송을 설명한다. 난류 운동 에너지 $k$는 그 대각합을 하나의 스칼라로 요약한 양이다.

## 난류 운동 에너지 방정식의 유도

레이놀즈 응력 상관 텐서를

$$
R_{ij}=\overline{u'_iu'_j}
$$

라고 하면, 난류 운동 에너지는 다음과 같다.

$$
k=\frac12\overline{u'_iu'_i}=\frac12R_{ii}
$$

따라서 레이놀즈 응력 수송 방정식에서 $i=k$로 두고 대각합을 취하면 TKE 수송 방정식을 얻는다. 아래 식은 비압축성, 일정한 점성계수의 유동에 대한 정확식이다.

>[!formula] `TKE-gradient form`
>$$
>\begin{align}
>\frac{\partial k}{\partial t}+\overline{u}_j\frac{\partial k}{\partial x_j}
>=&-\overline{u'_iu'_j}\frac{\partial\overline{u}_i}{\partial x_j}\\
>&-\frac{\partial}{\partial x_j}\left(\frac{1}{\rho}\overline{p'u'_j}+\frac12\overline{u'_iu'_iu'_j}-\nu\frac{\partial k}{\partial x_j}\right)\\
>&-\nu\overline{\frac{\partial u'_i}{\partial x_j}\frac{\partial u'_i}{\partial x_j}}
>\end{align}
>$$

첫 번째 우변 항은 평균 유동에서 난류로 에너지가 전달되는 생성항이다. 두 번째 줄은 압력 확산, 난류 수송, 점성 확산을 합친 수송항이며, 마지막 줄은 속도구배로 표현한 소산항이다.

## 변형률 텐서 형태

변동 속도구배는 대칭 변형률 텐서와 반대칭 회전률 텐서로 분해된다.

$$
\frac{\partial u'_i}{\partial x_j}=s'_{ij}+w'_{ij}
$$

$$
s'_{ij}=\frac12\left(\frac{\partial u'_i}{\partial x_j}+\frac{\partial u'_j}{\partial x_i}\right),\qquad
w'_{ij}=\frac12\left(\frac{\partial u'_i}{\partial x_j}-\frac{\partial u'_j}{\partial x_i}\right)
$$

$s'_{ij}$는 대칭, $w'_{ij}$는 반대칭이므로 $s'_{ij}w'_{ij}=0$이다. 이 성질을 사용하면 위 식은 다음처럼 다시 쓸 수 있다.

>[!formula] `TKE-strain form`
>$$
>\begin{align}
>\frac{\partial k}{\partial t}+\overline{u}_j\frac{\partial k}{\partial x_j}
>=&-\overline{u'_iu'_j}\frac{\partial\overline{u}_i}{\partial x_j}\\
>&-\frac{\partial}{\partial x_j}\left(\frac{1}{\rho}\overline{p'u'_j}+\frac12\overline{u'_iu'_iu'_j}-2\nu\overline{u'_is'_{ij}}\right)\\
>&-2\nu\overline{s'_{ij}s'_{ij}}
>\end{align}
>$$

여기서 소산율은

$$
\varepsilon=2\nu\overline{s'_{ij}s'_{ij}}
$$

이다. 두 식은 근사식과 고정밀식의 관계가 아니라, 점성 확산과 소산을 다르게 묶은 **동등한 정확식**이다.

## 각 항의 의미

| 항 | 식 | 의미 |
| --- | --- | --- |
| 비정상 항 | $\partial k/\partial t$ | 고정 위치에서 TKE의 시간 변화 |
| 대류 항 | $\overline u_j\partial k/\partial x_j$ | 평균 유동에 의한 TKE 이동 |
| 생성 항 | $-\overline{u'_iu'_j}\,\partial\overline u_i/\partial x_j$ | 평균 운동에너지에서 난류로의 전달 |
| 압력 확산 | $-\partial_j(\overline{p'u'_j}/\rho)$ | 압력과 속도 요동의 상관에 의한 수송 |
| 난류 수송 | $-\partial_j(\overline{u'_iu'_iu'_j}/2)$ | 난류 요동 자체에 의한 수송 |
| 점성 확산 | $\partial_j(2\nu\overline{u'_is'_{ij}})$ | 점성 응력에 의한 수송 |
| 소산 | $-\varepsilon$ | 점성 작용으로 난류 운동에너지가 내부에너지로 전환됨 |

## 난류 모형과의 관계

$k$-$\varepsilon$, $k$-$\omega$ 같은 RANS 모형은 위 정확식의 미지 수송항과 소산항을 모델링한다. DNS는 이를 직접 해상하려 하고, LES는 큰 스케일은 해상하고 작은 스케일의 영향을 모델링한다. 따라서 특정 표현식 하나가 특정 해석 기법에만 대응하는 것은 아니다.
