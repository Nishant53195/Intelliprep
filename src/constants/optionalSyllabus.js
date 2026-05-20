const optionalSyllabus = [
  {
    id: "sociology",
    type: "OPTIONAL",
    paper: "PAPER_1",
    name: "Sociology Paper 1",

    topics: [
      {
        id: "sociology-the-discipline",
        name: "Sociology - The Discipline",

        subtopics: [
          {
            id: "modernity-and-social-changes",
            name: "Modernity and Social Changes",
            estimatedMinutes: 180,
            difficulty: 2,
          },

          {
            id: "sociology-and-common-sense",
            name: "Sociology and Common Sense",
            estimatedMinutes: 120,
            difficulty: 1,
          },
        ],
      },
    ],
  },

  {
    id: "sociology-paper-2",
    type: "OPTIONAL",
    paper: "PAPER_2",
    name: "Sociology Paper 2",

    topics: [
      {
        id: "introducing-indian-society",
        name: "Introducing Indian Society",

        subtopics: [
          {
            id: "perspectives-on-indian-society",
            name: "Perspectives on Indian Society",
            estimatedMinutes: 150,
            difficulty: 2,
          },
        ],
      },
    ],
  },

  {
    id: "mathematics-paper-1",
    type: "OPTIONAL",
    paper: "PAPER_1",
    name: "Mathematics Paper 1",

    topics: [
      {
    id: "linear-algebra",
    name: "Linear Algebra",
    subtopics: [
      {
        id: "vector-spaces-over-r-and-c",
        name: "Vector spaces over R and C",
        estimatedMinutes: 45,
        difficulty: 2,
      },
      {
        id: "linear-dependence-and-independence",
        name: "Linear dependence and independence",
        estimatedMinutes: 60,
        difficulty: 2,
      },
      {
        id: "subspaces",
        name: "Subspaces",
        estimatedMinutes: 90,
        difficulty: 3,
      },
      {
        id: "bases-and-dimensions",
        name: "Bases, dimensions",
        estimatedMinutes: 120,
        difficulty: 4,
      },
      {
        id: "linear-transformations",
        name: "Linear transformations",
        estimatedMinutes: 90,
        difficulty: 3,
      },
      {
        id: "rank-and-nullity",
        name: "Rank and nullity",
        estimatedMinutes: 120,
        difficulty: 4,
      },
      {
        id: "matrix-of-a-linear-transformation",
        name: "Matrix of a linear transformation",
        estimatedMinutes: 150,
        difficulty: 5,
      },
      {
        id: "algebra-of-matrices",
        name: "Algebra of Matrices",
        estimatedMinutes: 30,
        difficulty: 1,
      },
      {
        id: "row-and-column-reduction-echelon-form",
        name: "Row and column reduction, Echelon form",
        estimatedMinutes: 45,
        difficulty: 2,
      },
      {
        id: "congruences-and-similarity",
        name: "Congruences and similarity",
        estimatedMinutes: 120,
        difficulty: 4,
      },
      {
        id: "rank-of-a-matrix",
        name: "Rank of a matrix",
        estimatedMinutes: 45,
        difficulty: 2,
      },
      {
        id: "inverse-of-a-matrix",
        name: "Inverse of a matrix",
        estimatedMinutes: 30,
        difficulty: 1,
      },
      {
        id: "solution-of-system-of-linear-equations",
        name: "Solution of system of linear equations",
        estimatedMinutes: 60,
        difficulty: 3,
      },
      {
        id: "eigenvalues-and-eigenvectors",
        name: "Eigenvalues and eigenvectors",
        estimatedMinutes: 90,
        difficulty: 3,
      },
      {
        id: "characteristic-polynomial-cayley-hamilton-theorem",
        name: "Characteristic polynomial, Cayley-Hamilton theorem",
        estimatedMinutes: 90,
        difficulty: 3,
      },
      {
        id: "symmetric-skew-symmetric-orthogonal-matrices",
        name: "Symmetric, skew-symmetric, orthogonal matrices and their eigenvalues",
        estimatedMinutes: 60,
        difficulty: 2,
      },
      {
        id: "hermitian-skew-hermitian-unitary-matrices",
        name: "Hermitian, skew-Hermitian, unitary matrices and their eigenvalues",
        estimatedMinutes: 75,
        difficulty: 3,
      },
    ],
  },
  
  {
    id: "calculus",
    name: "Calculus",
    subtopics: [
      {
        id: "real-numbers-functions-real-variable",
        name: "Real numbers, functions of a real variable",
        estimatedMinutes: 60,
        difficulty: 2,
      },
      {
        id: "limits-continuity-differentiability",
        name: "Limits, continuity, differentiability",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "mvt-taylors-theorem-remainders",
        name: "Mean-value theorem, Taylors theorem with remainders",
        estimatedMinutes: 120,
        difficulty: 4,
      },
      {
        id: "indeterminate-forms",
        name: "Indeterminate forms",
        estimatedMinutes: 60,
        difficulty: 2,
      },
      {
        id: "maxima-and-minima-single",
        name: "Maxima and minima (Single Variable)",
        estimatedMinutes: 90,
        difficulty: 3,
      },
      {
        id: "asymptotes-curve-tracing",
        name: "Asymptotes; Curve tracing",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "multivariable-limits-continuity-partial",
        name: "Functions of 2/3 variables: Limits, continuity, partial derivatives",
        estimatedMinutes: 120,
        difficulty: 4,
      },
      {
        id: "maxima-minima-lagrange",
        name: "Maxima and minima, Lagranges method of multipliers",
        estimatedMinutes: 150,
        difficulty: 4,
      },
      {
        id: "jacobian",
        name: "Jacobian",
        estimatedMinutes: 90,
        difficulty: 3,
      },
      {
        id: "riemann-integrals-indefinite",
        name: "Riemanns definition of definite integrals; Indefinite integrals",
        estimatedMinutes: 150,
        difficulty: 5,
      },
      {
        id: "infinite-and-improper-integrals",
        name: "Infinite and improper integral",
        estimatedMinutes: 120,
        difficulty: 4,
      },
      {
        id: "double-and-triple-integrals",
        name: "Double and triple integrals (evaluation techniques only)",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "areas-surfaces-volumes",
        name: "Areas, surface and volumes",
        estimatedMinutes: 120,
        difficulty: 4,
      },
    ],
  },
  {
    id: "analytic-geometry",
    name: "Analytic Geometry (3D)",
    subtopics: [
      {
        id: "cartesian-polar-coordinates-and-plane",
        name: "Cartesian and polar coordinates in 3D & The Plane",
        estimatedMinutes: 90,
        difficulty: 2,
      },
      {
        id: "straight-lines-shortest-distance",
        name: "Straight lines and Shortest distance between two skew lines",
        estimatedMinutes: 90,
        difficulty: 3,
      },
      {
        id: "sphere",
        name: "Sphere (Tangent planes, orthogonal spheres, radical plane)",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "cone",
        name: "Cone (Enveloping cone, mutually perpendicular generators)",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "cylinder",
        name: "Cylinder (Right circular and enveloping cylinder)",
        estimatedMinutes: 90,
        difficulty: 2,
      },
      {
        id: "paraboloid",
        name: "Paraboloid (Elliptic and hyperbolic, normals)",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "ellipsoid",
        name: "Ellipsoid (Director sphere, normals, conjugate diameters)",
        estimatedMinutes: 120,
        difficulty: 4,
      },
      {
        id: "hyperboloid",
        name: "Hyperboloid of one and two sheets (Properties and Generating Lines)",
        estimatedMinutes: 150,
        difficulty: 4,
      },
      {
        id: "reduction-to-canonical-forms",
        name: "Second degree equations in 3 variables: Reduction to Canonical forms",
        estimatedMinutes: 180,
        difficulty: 5,
      },
    ],
  },

  {
    id: "ordinary-differential-equations",
    name: "Ordinary Differential Equations",
    subtopics: [
      {
        id: "formulation-of-differential-equations",
        name: "Formulation of differential equations",
        estimatedMinutes: 30,
        difficulty: 1,
      },
      {
        id: "first-order-first-degree-integrating-factor",
        name: "Equations of first order and first degree, integrating factor",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "orthogonal-trajectory",
        name: "Orthogonal trajectory",
        estimatedMinutes: 60,
        difficulty: 2,
      },
      {
        id: "first-order-not-first-degree-clairauts-singular",
        name: "Equations of first order but not of first degree, Clairauts equation, singular solution",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "higher-order-linear-constant-coefficients",
        name: "Second and higher order linear equations with constant coefficients (CF and PI)",
        estimatedMinutes: 150,
        difficulty: 3,
      },
      {
        id: "second-order-variable-coefficients-euler-cauchy",
        name: "Second order linear equations with variable coefficients, Euler-Cauchy equation",
        estimatedMinutes: 90,
        difficulty: 3,
      },
      {
        id: "variation-of-parameters-one-solution-known",
        name: "Complete solution when one solution is known & Method of variation of parameters",
        estimatedMinutes: 120,
        difficulty: 4,
      },
      {
        id: "laplace-inverse-laplace-properties",
        name: "Laplace and Inverse Laplace transforms, properties, and elementary functions",
        estimatedMinutes: 150,
        difficulty: 3,
      },
      {
        id: "application-ivp-laplace",
        name: "Application to initial value problems for 2nd order linear equations with constant coefficients",
        estimatedMinutes: 90,
        difficulty: 4,
      },
    ],
  },

  {
    id: "vector-analysis",
    name: "Vector Analysis",
    subtopics: [
      {
        id: "scalar-vector-fields-differentiation",
        name: "Scalar and vector fields, differentiation of vector field of a scalar variable",
        estimatedMinutes: 60,
        difficulty: 2,
      },
      {
        id: "gradient-divergence-curl-coordinates",
        name: "Gradient, divergence and curl in cartesian and cylindrical coordinates",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "higher-order-vector-identities-equations",
        name: "Higher order derivatives; Vector identities and vector equation",
        estimatedMinutes: 150,
        difficulty: 4,
      },
      {
        id: "geometry-curves-curvature-torsion-frenet",
        name: "Application to geometry: Curves in space, curvature and torsion; Serret-Frenet's formulae",
        estimatedMinutes: 150,
        difficulty: 4,
      },
      {
        id: "greens-theorem",
        name: "Greens Theorem in a plane",
        estimatedMinutes: 90,
        difficulty: 3,
      },
      {
        id: "gauss-divergence-theorem",
        name: "Gauss Divergence Theorem",
        estimatedMinutes: 120,
        difficulty: 4,
      },
      {
        id: "stokes-theorem",
        name: "Stokes Theorem",
        estimatedMinutes: 120,
        difficulty: 4,
      },
    ],
  },

  {
    id: "dynamics-and-statics",
    name: "Dynamics and Statics",
    subtopics: [
      {
        id: "rectilinear-motion",
        name: "Rectilinear motion",
        estimatedMinutes: 90,
        difficulty: 2,
      },
      {
        id: "simple-harmonic-motion",
        name: "Simple harmonic motion",
        estimatedMinutes: 90,
        difficulty: 2,
      },
      {
        id: "motion-in-a-plane",
        name: "Motion in a plane (Radial/Transverse & Tangential/Normal)",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "projectiles",
        name: "Projectiles",
        estimatedMinutes: 90,
        difficulty: 2,
      },
      {
        id: "constrained-motion",
        name: "Constrained motion",
        estimatedMinutes: 120,
        difficulty: 4,
      },
      {
        id: "work-energy-conservation",
        name: "Work and energy, conservation of energy",
        estimatedMinutes: 90,
        difficulty: 2,
      },
      {
        id: "central-forces-keplers-laws",
        name: "Keplers laws, orbits under central forces",
        estimatedMinutes: 150,
        difficulty: 4,
      },
      {
        id: "equilibrium-system-of-particles",
        name: "Equilibrium of a system of particles",
        estimatedMinutes: 90,
        difficulty: 2,
      },
      {
        id: "work-and-potential-energy-statics",
        name: "Work and potential energy",
        estimatedMinutes: 60,
        difficulty: 2,
      },
      {
        id: "friction",
        name: "Friction",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "common-catenary",
        name: "Common catenary",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "principle-of-virtual-work",
        name: "Principle of virtual work",
        estimatedMinutes: 150,
        difficulty: 4,
      },
      {
        id: "stability-of-equilibrium",
        name: "Stability of equilibrium",
        estimatedMinutes: 120,
        difficulty: 4,
      },
      {
        id: "equilibrium-of-forces-in-3d",
        name: "Equilibrium of forces in three dimensions",
        estimatedMinutes: 180,
        difficulty: 5,
      },
    ],
  }
    ],
  },

  {
    id: "mathematics-paper-2",
    type: "OPTIONAL",
    paper: "PAPER_2",
    name: "Mathematics Paper 2",

    topics: [
      {
    id: "modern-algebra",
    name: "Modern Algebra",
    subtopics: [
      {
        id: "groups-subgroups-cyclic-groups",
        name: "Groups, subgroups, cyclic groups",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "cosets-lagranges-theorem",
        name: "Cosets, Lagranges Theorem",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "normal-subgroups-quotient-groups",
        name: "Normal subgroups, quotient groups",
        estimatedMinutes: 150,
        difficulty: 4,
      },
      {
        id: "homomorphism-isomorphism-theorems",
        name: "Homomorphism of groups, basic isomorphism theorems",
        estimatedMinutes: 180,
        difficulty: 5,
      },
      {
        id: "permutation-groups",
        name: "Permutation groups",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "cayleys-theorem",
        name: "Cayleys theorem",
        estimatedMinutes: 90,
        difficulty: 3,
      },
      {
        id: "rings-subrings-ideals",
        name: "Rings, subrings and ideals",
        estimatedMinutes: 150,
        difficulty: 4,
      },
      {
        id: "homomorphisms-of-rings",
        name: "Homomorphisms of rings",
        estimatedMinutes: 120,
        difficulty: 4,
      },
      {
        id: "integral-domains-pid",
        name: "Integral domains, principal ideal domains (PID)",
        estimatedMinutes: 150,
        difficulty: 4,
      },
      {
        id: "euclidean-domains-ufd",
        name: "Euclidean domains and unique factorization domains (UFD)",
        estimatedMinutes: 180,
        difficulty: 5,
      },
      {
        id: "fields-quotient-fields",
        name: "Fields, quotient fields",
        estimatedMinutes: 120,
        difficulty: 3,
      },
    ],
  },
  
  {
    id: "real-analysis",
    name: "Real Analysis",
    subtopics: [
      {
        id: "real-number-system-lub",
        name: "Real number system as an ordered field with least upper bound property",
        estimatedMinutes: 90,
        difficulty: 3,
      },
      {
        id: "sequences-cauchy-completeness",
        name: "Sequences, limit of a sequence, Cauchy sequence, completeness of real line",
        estimatedMinutes: 150,
        difficulty: 4,
      },
      {
        id: "series-convergence-rearrangement",
        name: "Series & Convergence (Absolute/Conditional, Complex terms, Rearrangement)",
        estimatedMinutes: 150,
        difficulty: 4,
      },
      {
        id: "continuity-uniform-continuity-compact-sets",
        name: "Continuity, uniform continuity, properties of continuous functions on compact sets",
        estimatedMinutes: 150,
        difficulty: 4,
      },
      {
        id: "riemann-improper-integrals-fundamental-theorems",
        name: "Riemann integral, improper integrals; Fundamental theorems of integral calculus",
        estimatedMinutes: 180,
        difficulty: 5,
      },
      {
        id: "uniform-convergence-sequences-series-functions",
        name: "Sequences and series of functions (Uniform convergence, continuity, differentiability, integrability)",
        estimatedMinutes: 180,
        difficulty: 5,
      },
      {
        id: "several-variables-partial-derivatives-maxima-minima",
        name: "Functions of several variables: Partial derivatives, maxima and minima",
        estimatedMinutes: 120,
        difficulty: 3,
      },
    ],
  },

  {
    id: "complex-analysis",
    name: "Complex Analysis",
    subtopics: [
      {
        id: "analytic-function-cauchy-riemann",
        name: "Analytic function, Cauchy-Riemann equations",
        estimatedMinutes: 90,
        difficulty: 2,
      },
      {
        id: "cauchys-theorem-integral-formula",
        name: "Cauchy's theorem, Cauchy's integral formula",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "power-series-taylors-series",
        name: "Power series, representation of an analytic function, Taylors series",
        estimatedMinutes: 90,
        difficulty: 3,
      },
      {
        id: "singularities-laurents-series",
        name: "Singularities; Laurents series",
        estimatedMinutes: 120,
        difficulty: 4,
      },
      {
        id: "cauchys-residue-theorem",
        name: "Cauchys residue theorem",
        estimatedMinutes: 120,
        difficulty: 4,
      },
      {
        id: "contour-integration",
        name: "Contour integration",
        estimatedMinutes: 180,
        difficulty: 5,
      },
    ],
  },

  {
    id: "linear-programming",
    name: "Linear Programming",
    subtopics: [
      {
        id: "lpp-formulation-basic-solutions",
        name: "LPP formulation, basic solution, basic feasible solution and optimal solution",
        estimatedMinutes: 90,
        difficulty: 2,
      },
      {
        id: "graphical-method",
        name: "Graphical method of solutions",
        estimatedMinutes: 60,
        difficulty: 1,
      },
      {
        id: "simplex-method",
        name: "Simplex method of solutions (includes Big-M and Two-Phase methods)",
        estimatedMinutes: 180,
        difficulty: 3,
      },
      {
        id: "duality",
        name: "Duality (Writing duals, Dual Simplex, Theorems of Duality)",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "transportation-problem",
        name: "Transportation problems (Initial BFS & MODI method for optimality)",
        estimatedMinutes: 120,
        difficulty: 2,
      },
      {
        id: "assignment-problem",
        name: "Assignment problems (Hungarian Method)",
        estimatedMinutes: 90,
        difficulty: 2,
      },
    ],
  },

  {
    id: "partial-differential-equations",
    name: "Partial Differential Equations",
    subtopics: [
      {
        id: "formulation-of-pdes-family-of-surfaces",
        name: "Family of surfaces in 3D and formulation of PDEs",
        estimatedMinutes: 60,
        difficulty: 2,
      },
      {
        id: "quasilinear-pdes-cauchys-characteristics",
        name: "Solution of quasilinear PDEs of first order, Cauchys method of characteristics",
        estimatedMinutes: 150,
        difficulty: 3,
      },
      {
        id: "second-order-linear-constant-coefficients",
        name: "Linear PDEs of the second order with constant coefficients (CF and PI)",
        estimatedMinutes: 180,
        difficulty: 3,
      },
      {
        id: "classification-and-canonical-form",
        name: "Classification of 2nd order PDEs and reduction to canonical form",
        estimatedMinutes: 150,
        difficulty: 4,
      },
      {
        id: "equation-of-vibrating-string",
        name: "Equation of a vibrating string (Wave Equation) and its solutions",
        estimatedMinutes: 180,
        difficulty: 4,
      },
      {
        id: "heat-equation",
        name: "Heat equation and its solutions",
        estimatedMinutes: 150,
        difficulty: 4,
      },
      {
        id: "laplace-equation",
        name: "Laplace equation and its solutions",
        estimatedMinutes: 150,
        difficulty: 4,
      },
    ],
  },

  {
    id: "numerical-analysis-and-computer-programming",
    name: "Numerical Analysis and Computer Programming",
    subtopics: [
      {
        id: "bisection-method",
        name: "Solution of equations: Bisection Method",
        estimatedMinutes: 45,
        difficulty: 1,
      },
      {
        id: "regula-falsi-method",
        name: "Solution of equations: Regula-Falsi Method",
        estimatedMinutes: 60,
        difficulty: 2,
      },
      {
        id: "newton-raphson-method",
        name: "Solution of equations: Newton-Raphson Method (and convergence)",
        estimatedMinutes: 90,
        difficulty: 3,
      },
      {
        id: "gaussian-elimination-jordan",
        name: "System of linear equations: Gaussian elimination and Gauss-Jordan (direct)",
        estimatedMinutes: 90,
        difficulty: 3,
      },
      {
        id: "gauss-seidel",
        name: "System of linear equations: Gauss-Seidel (iterative) method",
        estimatedMinutes: 90,
        difficulty: 3,
      },
      {
        id: "newtons-interpolation",
        name: "Newtons (forward and backward) interpolation",
        estimatedMinutes: 90,
        difficulty: 2,
      },
      {
        id: "lagranges-interpolation",
        name: "Lagranges interpolation",
        estimatedMinutes: 90,
        difficulty: 3,
      },
      {
        id: "trapezoidal-simpsons-rules",
        name: "Numerical integration: Trapezoidal rule, Simpsons (1/3 & 3/8) rules",
        estimatedMinutes: 90,
        difficulty: 2,
      },
      {
        id: "gaussian-quadrature",
        name: "Numerical integration: Gaussian quadrature formula",
        estimatedMinutes: 120,
        difficulty: 4,
      },
      {
        id: "euler-methods",
        name: "Numerical solution of ODEs: Euler and Modified Euler methods",
        estimatedMinutes: 90,
        difficulty: 2,
      },
      {
        id: "runge-kutta-methods",
        name: "Numerical solution of ODEs: Runge Kutta-methods (4th order)",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "number-systems",
        name: "Binary, Octal, Hexadecimal systems, Conversions & Algebra",
        estimatedMinutes: 90,
        difficulty: 2,
      },
      {
        id: "elements-of-computer-systems",
        name: "Elements of computer systems and concept of memory",
        estimatedMinutes: 45,
        difficulty: 1,
      },
      {
        id: "logic-gates-boolean-algebra",
        name: "Basic logic gates and truth tables, Boolean algebra, normal forms",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "data-representation",
        name: "Representation of unsigned/signed integers, reals, double precision & long integers",
        estimatedMinutes: 120,
        difficulty: 4,
      },
      {
        id: "algorithms-and-flowcharts",
        name: "Algorithms and flow charts for solving numerical analysis problems",
        estimatedMinutes: 150,
        difficulty: 4,
      },
    ],
  },

  {
    id: "mechanics-and-fluid-dynamics",
    name: "Mechanics and Fluid Dynamics",
    subtopics: [
      {
        id: "dalemberts-lagranges-equations",
        name: "Generalised coordinates, DAlemberts principle and Lagranges equations",
        estimatedMinutes: 180,
        difficulty: 4,
      },
      {
        id: "hamiltons-equations",
        name: "Hamilton equations (Derivation and Applications)",
        estimatedMinutes: 150,
        difficulty: 4,
      },
      {
        id: "moment-of-inertia",
        name: "Moment of inertia (Inertia tensor, principal axes)",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "rigid-body-motion-2d",
        name: "Motion of rigid bodies in two dimensions",
        estimatedMinutes: 150,
        difficulty: 4,
      },
      {
        id: "continuity-streamlines",
        name: "Equation of continuity; Stream-lines, path of a particle",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "eulers-equation-inviscid",
        name: "Eulers equation of motion for inviscid flow (and Bernoulli's)",
        estimatedMinutes: 120,
        difficulty: 3,
      },
      {
        id: "potential-flow-axisymmetric",
        name: "Potential flow; Two-dimensional and axisymmetric motion",
        estimatedMinutes: 150,
        difficulty: 4,
      },
      {
        id: "sources-sinks-vortex",
        name: "Sources and sinks, vortex motion (Image systems, Milne-Thomson)",
        estimatedMinutes: 180,
        difficulty: 5,
      },
      {
        id: "navier-stokes",
        name: "Navier-Stokes equation for a viscous fluid (and exact solutions)",
        estimatedMinutes: 120,
        difficulty: 4,
      },
    ],
  },


    ],
  },
];

export default optionalSyllabus;