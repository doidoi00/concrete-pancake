``` tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.18} % Use a recent compatibility version
\usepgfplotslibrary{colormaps}

\begin{document}
\begin{tikzpicture}
    \begin{axis}[
        title={Complex 3D Surface Plot},
        xlabel={X-axis},
        ylabel={Y-axis},
        zlabel={Z-axis},
        view={45}{30}, % Adjust view angles for better perspective
        colormap/viridis, % Use a visually appealing colormap
        % Add grid lines for better readability
        grid=major,
        tick label style={font=\small},
        label style={font=\bfseries},
        enlargelimits=false, % Prevent plot limits from extending too far contrast
        % Customize tick marks
        xtick distance=1,
        ytick distance=1,
        ztick distance=0.5,
    ]
    \addplot3[
        surf, % Plot as a surface
        samples=50, % Number of samples in x-direction
        samples y=50, % Number of samples in y-direction
        domain=-3:3, % Domain for x-axis
        domain y=-3:3, % Domain for y-axis
        z buffer=sort, % Correctly render overlapping surfaces
        faceted color=black, % Color of the mesh lines
        shader=interp, % Smooth interpolation between samples
    ]
    {exp(-(x^2+y^2)/2) * sin(deg(sqrt(x^2+y^2)*3))}; % Example function
    \end{axis}
\end{tikzpicture}
\end{document}

```
