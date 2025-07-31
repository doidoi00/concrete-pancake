# CFD Simulation Mathematical Foundations

## Overview
This document provides the mathematical foundations and references for each function in `multigrid_corrected.c`, which implements a lid-driven cavity flow simulation using the vorticity-streamfunction formulation of the Navier-Stokes equations.

## 1. Main Governing Equations

### Navier-Stokes Equations in Vorticity-Streamfunction Form

**Mathematical Formulation:**
$$\frac{\partial \omega}{\partial t} + u \frac{\partial \omega}{\partial x} + v \frac{\partial \omega}{\partial y} = \frac{1}{Re} \nabla^2 \omega$$

$$\nabla^2 \psi = -\omega$$

**Velocity-Streamfunction Relations:**
$$u = \frac{\partial \psi}{\partial y}, \quad v = -\frac{\partial \psi}{\partial x}$$

**References:**
- Ghia, U., Ghia, K.N., Shin, C.T. (1982). "High-Re solutions for incompressible flow using the Navier-Stokes equations and a multigrid method." *Journal of Computational Physics*, 48(3), 387-411.
- Peyret, R., Taylor, T.D. (1983). *Computational Methods for Fluid Flow*. Springer-Verlag.

---

## 2. Function-by-Function Analysis

### 2.1 `compute_boundary_conditions()`

**Purpose:** Apply no-slip boundary conditions for vorticity and streamfunction

**Mathematical Foundation:**
For no-slip walls, the vorticity boundary condition is derived from:
$$\omega_{wall} = -\frac{2}{\Delta n^2} \frac{\partial^2 \psi}{\partial n^2} - \frac{2}{\Delta n} \frac{\partial u_{tangential}}{\partial n}$$

**Discretized Forms:**

**Bottom Wall (stationary):**
$$\omega_{i,0} = -\frac{2\psi_{i,1}}{h^2}$$

**Top Wall (moving lid with $u = u_{upper}$):**
$$\omega_{i,N_y-1} = -\frac{2\psi_{i,N_y-2}}{h^2} - \frac{2u_{upper}}{h}$$

**Left/Right Walls (stationary):**
$$\omega_{0,j} = -\frac{2\psi_{1,j}}{h^2}, \quad \omega_{N_x-1,j} = -\frac{2\psi_{N_x-2,j}}{h^2}$$

**Streamfunction Boundary Conditions:**
$$\psi = 0 \text{ on all boundaries (no-penetration)}$$

**References:**
- Fletcher, C.A.J. (1988). *Computational Techniques for Fluid Dynamics Vol. II*. Springer-Verlag, Chapter 9.
- Anderson, J.D. (1995). *Computational Fluid Dynamics: The Basics with Applications*. McGraw-Hill, Chapter 7.

---

### 2.2 `solve_poisson_sor()`

**Purpose:** Solve the Poisson equation $\nabla^2 \psi = -\omega$ using SOR method

**Mathematical Foundation:**
The 2D Poisson equation is discretized using a 5-point stencil:
$$\frac{\psi_{i+1,j} + \psi_{i-1,j} + \psi_{i,j+1} + \psi_{i,j-1} - 4\psi_{i,j}}{h^2} = -\omega_{i,j}$$

**SOR Update Formula:**
$$\psi_{i,j}^{new} = \frac{1}{4}(\psi_{i+1,j} + \psi_{i-1,j} + \psi_{i,j+1} + \psi_{i,j-1} + h^2\omega_{i,j})$$

$$\psi_{i,j}^{k+1} = (1-\omega_{SOR})\psi_{i,j}^k + \omega_{SOR}\psi_{i,j}^{new}$$

where $\omega_{SOR} = 1.7$ is the relaxation parameter.

**References:**
- Young, D.M. (1971). *Iterative Solution of Large Linear Systems*. Academic Press.
- Varga, R.S. (2000). *Matrix Iterative Analysis*. Springer-Verlag, Chapter 4.

---

### 2.3 `compute_convection()`

**Purpose:** Compute convection terms $u \frac{\partial \omega}{\partial x} + v \frac{\partial \omega}{\partial y}$

**Mathematical Foundation:**
Using 2nd order central differences:

**Velocity Computation:**
$$u_{i,j} = \frac{\psi_{i,j+1} - \psi_{i,j-1}}{2h}$$
$$v_{i,j} = -\frac{\psi_{i+1,j} - \psi_{i-1,j}}{2h}$$

**Vorticity Gradients:**
$$\frac{\partial \omega}{\partial x} = \frac{\omega_{i+1,j} - \omega_{i-1,j}}{2h}$$
$$\frac{\partial \omega}{\partial y} = \frac{\omega_{i,j+1} - \omega_{i,j-1}}{2h}$$

**Convection Term:**
$$C_{i,j} = u_{i,j} \frac{\partial \omega}{\partial x} + v_{i,j} \frac{\partial \omega}{\partial y}$$

**References:**
- Roache, P.J. (1998). *Fundamentals of Computational Fluid Dynamics*. Hermosa Publishers, Chapter 3.
- Hirsch, C. (1988). *Numerical Computation of Internal and External Flows Vol. 1*. John Wiley & Sons, Chapter 5.

---

### 2.4 `solve_vorticity_adi()`

**Purpose:** Solve vorticity transport equation using explicit method

**Mathematical Foundation:**
The vorticity transport equation is discretized as:
$$\frac{\omega_{i,j}^{n+1} - \omega_{i,j}^n}{\Delta t} = \frac{1}{Re}\nabla^2\omega_{i,j}^n - C_{i,j}^n$$

**Diffusion Terms (2nd order central difference):**
$$\frac{\partial^2 \omega}{\partial x^2} = \frac{\omega_{i+1,j} - 2\omega_{i,j} + \omega_{i-1,j}}{h^2}$$
$$\frac{\partial^2 \omega}{\partial y^2} = \frac{\omega_{i,j+1} - 2\omega_{i,j} + \omega_{i,j-1}}{h^2}$$

**Update Formula:**
$$\omega_{i,j}^{n+1} = \omega_{i,j}^n + \Delta t \left[\frac{1}{Re}\left(\frac{\partial^2 \omega}{\partial x^2} + \frac{\partial^2 \omega}{\partial y^2}\right) - C_{i,j}\right]$$

**Stability Condition:**
$$\Delta t \leq \frac{Re h^2}{4} \text{ (diffusion stability)}$$

**References:**
- Smith, G.D. (1985). *Numerical Solution of Partial Differential Equations: Finite Difference Methods*. Oxford University Press, Chapter 3.
- Morton, K.W., Mayers, D.F. (2005). *Numerical Solution of Partial Differential Equations*. Cambridge University Press, Chapter 2.

---

### 2.5 `compute_velocities()`

**Purpose:** Compute velocity components from streamfunction

**Mathematical Foundation:**
Direct application of velocity-streamfunction relations:

**Interior Points:**
$$u_{i,j} = \frac{\partial \psi}{\partial y} = \frac{\psi_{i,j+1} - \psi_{i,j-1}}{2h}$$
$$v_{i,j} = -\frac{\partial \psi}{\partial x} = -\frac{\psi_{i+1,j} - \psi_{i-1,j}}{2h}$$

**Boundary Conditions:**
- Top wall (moving lid): $u = u_{upper} = 1.0$, $v = 0$
- Bottom, left, right walls: $u = 0$, $v = 0$ (no-slip)

**References:**
- Batchelor, G.K. (2000). *An Introduction to Fluid Dynamics*. Cambridge University Press, Chapter 2.
- White, F.M. (2006). *Viscous Fluid Flow*. McGraw-Hill, Chapter 3.

---

## 3. Numerical Method Classification

### Method Type: **Fractional Step Method with Vorticity-Streamfunction Formulation**

**Algorithm Structure:**
1. **Step 1:** Update vorticity using transport equation (explicit)
2. **Step 2:** Apply vorticity boundary conditions
3. **Step 3:** Solve Poisson equation for streamfunction (SOR)
4. **Step 4:** Compute velocities from streamfunction
5. **Step 5:** Check convergence and repeat

**Overall Method References:**
- Chorin, A.J. (1967). "A numerical method for solving incompressible viscous flow problems." *Journal of Computational Physics*, 2(1), 12-26.
- Kim, J., Moin, P. (1985). "Application of a fractional-step method to incompressible Navier-Stokes equations." *Journal of Computational Physics*, 59(2), 308-323.

---

## 4. Convergence and Stability Analysis

### Stability Conditions

**CFL Condition (Convection):**
$$C_{CFL} = \max\left(\frac{|u|\Delta t}{h}, \frac{|v|\Delta t}{h}\right) \leq 1$$

**Diffusion Stability:**
$$C_{diff} = \frac{\Delta t}{Re \cdot h^2} \leq \frac{1}{4}$$

**Current Parameters:**
- $\Delta t = 10^{-5}$
- $h = \frac{1}{128} \approx 0.0078$
- $Re = 10^4$
- $C_{diff} = \frac{10^{-5}}{10^4 \times (1/128)^2} \approx 0.0164 < 0.25$ ✓

### Convergence Criterion
$$\max_{i,j} |\omega_{i,j}^{n+1} - \omega_{i,j}^n| < 10^{-8}$$

**References:**
- Courant, R., Friedrichs, K., Lewy, H. (1928). "Über die partiellen Differenzengleichungen der mathematischen Physik." *Mathematische Annalen*, 100(1), 32-74.
- Von Neumann, J., Richtmyer, R.D. (1950). "A method for the numerical calculation of hydrodynamic shocks." *Journal of Applied Physics*, 21(3), 232-237.

---

## 5. Benchmark Problem

### Ghia et al. (1982) Lid-Driven Cavity

**Problem Setup:**
- Square cavity: $0 \leq x,y \leq 1$
- Top wall: $u = 1$, $v = 0$ (moving lid)
- Other walls: $u = v = 0$ (no-slip)
- Reynolds number: $Re = 10,000$

**Expected Results at $(x=0.5, y=0.5)$:**
- $u = 0.03111$
- $v = 0.00831$

**Grid Resolution:** $129 \times 129$ (matching Ghia et al.)

**References:**
- Ghia, U., Ghia, K.N., Shin, C.T. (1982). "High-Re solutions for incompressible flow using the Navier-Stokes equations and a multigrid method." *Journal of Computational Physics*, 48(3), 387-411.

---

## Summary

This implementation uses well-established numerical methods:
- **Time Integration:** Explicit finite difference
- **Spatial Discretization:** 2nd order central differences
- **Poisson Solver:** SOR iterative method
- **Boundary Conditions:** Accurate no-slip implementation

The code follows the mathematical formulations presented in the referenced literature and implements numerically stable algorithms suitable for high Reynolds number flows.
