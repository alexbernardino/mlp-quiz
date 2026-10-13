export const questions = [
  {
    "section": "Perceptrons & MLPs",
    "category": "Threshold units",
    "prompt": "A threshold unit has s = −0.5 + 0.3x₁ + 0.1x₂ and outputs 1 when s ≥ 0. What are s and z for x₁ = 1 and x₂ = 2?",
    "options": [
      "s = 0, z = 0",
      "s = −0.2, z = 0",
      "s = 0, z = 1",
      "s = 0.3, z = 1"
    ],
    "answer": 2,
    "explanation": "The preactivation is s = −0.5 + 0.3 + 0.2 = 0. The stated threshold includes equality, so z = 1. The bias shifts the threshold.",
    "activity": "Change the bias from −0.5 to −0.6. The preactivation becomes −0.1 and z becomes 0.",
    "slides": [
      151
    ]
  },
  {
    "section": "Perceptrons & MLPs",
    "category": "Perceptron update",
    "prompt": "Let w₀ = 0.1, w₁ = 0.5, x₁ = −2, y = 1 and η = 0.2. The unit predicts z = 0. What are the weights after one Rosenblatt update?",
    "options": [
      "w₀ = 0.3, w₁ = 0.1",
      "w₀ = −0.1, w₁ = 0.9",
      "w₀ = 0.3, w₁ = 0.9",
      "w₀ = 0.1, w₁ = 0.5"
    ],
    "answer": 0,
    "explanation": "The prediction error is e = y − z = 1. Thus w₀ becomes 0.1 + 0.2 = 0.3, and w₁ becomes 0.5 + 0.2(−2) = 0.1. The input sign matters.",
    "activity": "Recompute s after the update. It changes from −0.9 to 0.1, so this example is now classified correctly.",
    "slides": [
      152
    ]
  },
  {
    "section": "Perceptrons & MLPs",
    "category": "Separability",
    "prompt": "With a fixed positive learning rate, when does the perceptron convergence theorem guarantee zero training classification error after finitely many updates?",
    "options": [
      "Whenever the training data follow a Gaussian distribution",
      "Whenever the learning rate is sufficiently large",
      "When each class contains the same number of examples",
      "When the finite training set is linearly separable and all examples are repeatedly presented"
    ],
    "answer": 3,
    "explanation": "Linear separability is the key assumption. The guarantee concerns fitting the training labels; it does not guarantee good predictions on unseen data or convergence on nonseparable data.",
    "activity": "Sketch the four XOR points in two dimensions. Can one straight line separate their two classes?",
    "slides": [
      154
    ]
  },
  {
    "section": "Perceptrons & MLPs",
    "category": "Hidden units",
    "prompt": "Why are the intermediate units of an MLP called hidden units?",
    "options": [
      "Their values are never computed during a forward pass",
      "Their desired intermediate outputs are not supplied as training labels",
      "Their incoming weights are kept fixed during training",
      "They are disconnected from the output units"
    ],
    "answer": 1,
    "explanation": "Hidden-unit outputs are computed and their weights are learned. They are intermediate representations, rather than quantities directly specified by the training targets.",
    "activity": "In a network with one hidden layer, identify the values supplied by a training example and those computed internally.",
    "slides": [
      157
    ]
  },
  {
    "section": "Perceptrons & MLPs",
    "category": "Affine stacks",
    "prompt": "What is the overall input–output map if every unit in a multilayer network uses g(s) = s and biases are allowed?",
    "options": [
      "A necessarily nonlinear map once a second layer is added",
      "A sigmoid map because the network contains several layers",
      "An affine map whose matrix A must have full rank",
      "An affine map f(x) = Ax + b, regardless of the number of layers"
    ],
    "answer": 3,
    "explanation": "Composing affine maps produces another affine map. Depth alone does not introduce nonlinear behavior, and narrow intermediate layers can limit the rank of A.",
    "activity": "Simplify f(x) = 2(3x + 1) − 4. The result is the affine map 6x − 2.",
    "slides": [
      158
    ]
  },
  {
    "section": "Perceptrons & MLPs",
    "category": "Universal approximation",
    "prompt": "What does universal approximation establish for one continuous sigmoidal hidden layer with a linear output combination?",
    "options": [
      "Any fixed number of hidden units exactly represents every continuous function",
      "Gradient descent always finds the best possible weights",
      "For any continuous target on a compact domain and positive tolerance, a sufficiently wide approximating network exists",
      "A sufficiently wide network always generalizes perfectly"
    ],
    "answer": 2,
    "explanation": "The theorem is an existence result about approximation. Required width and weights depend on the target and tolerance; successful optimization and generalization do not follow from it.",
    "activity": "Distinguish these claims: suitable weights exist; a training algorithm finds them; predictions generalize. Only the first is guaranteed here.",
    "slides": [
      164
    ]
  },
  {
    "section": "Activations & outputs",
    "category": "Forward pass",
    "prompt": "A ReLU unit receives z₁ = 2 and z₂ = −1, with w₀ⱼ = 0.5, w₁ⱼ = 1 and w₂ⱼ = 2. What are its preactivation sⱼ and output zⱼ?",
    "options": [
      "sⱼ = 0.5, zⱼ = 0.5",
      "sⱼ = −0.5, zⱼ = 0",
      "sⱼ = 2.5, zⱼ = 2.5",
      "sⱼ = 0.5, zⱼ = 0"
    ],
    "answer": 0,
    "explanation": "First compute sⱼ = 0.5 + 1(2) + 2(−1) = 0.5. Then apply ReLU: zⱼ = max(0, 0.5) = 0.5. Preactivation and output are separate steps.",
    "activity": "Remove the bias. Both sⱼ and zⱼ become 0.",
    "slides": [
      156,
      160
    ]
  },
  {
    "section": "Activations & outputs",
    "category": "Sigmoid derivative",
    "prompt": "For the logistic sigmoid g(s) = 1/(1 + exp(−s)), what is g′(0)?",
    "options": [
      "0.25",
      "0",
      "1",
      "0.5"
    ],
    "answer": 0,
    "explanation": "The sigmoid derivative is g′(s) = g(s)[1 − g(s)]. Since g(0) = 0.5, its derivative at zero is 0.5 × 0.5 = 0.25.",
    "activity": "For sigmoid output 0.9, the derivative is 0.09. For g(s) = arctan(s), g′(s) = 1/(1 + s²), so g′(1) = 0.5.",
    "slides": [
      159,
      162
    ]
  },
  {
    "section": "Activations & outputs",
    "category": "ReLU negative branch",
    "prompt": "For ReLU, g(s) = max(0, s), what are the output and local derivative at s = −3?",
    "options": [
      "g(−3) = −3 and g′(−3) = 1",
      "g(−3) = 0 and g′(−3) = 0",
      "g(−3) = 0 and g′(−3) = 1",
      "g(−3) = −3 and g′(−3) = 0"
    ],
    "answer": 1,
    "explanation": "ReLU is flat on its negative branch: the output and derivative are both zero. For this example, a zero local derivative blocks the gradient through that activation.",
    "activity": "At s = 3, the output is 3 and the local derivative is 1.",
    "slides": [
      160,
      162
    ]
  },
  {
    "section": "Activations & outputs",
    "category": "ReLU at zero",
    "prompt": "Which statement about ReLU at s = 0 is mathematically correct?",
    "options": [
      "It is differentiable, and its unique derivative is 0",
      "It is differentiable, and its unique derivative is 1",
      "It is discontinuous because its two branches have different slopes",
      "It is continuous but not differentiable; training uses a chosen derivative convention there"
    ],
    "answer": 3,
    "explanation": "The left and right derivatives are 0 and 1, so the ordinary derivative does not exist at zero. Implementations specify a convention, commonly zero, to handle this point.",
    "activity": "Compare [g(h) − g(0)]/h for h = 0.01 and h = −0.01. The results are 1 and 0.",
    "slides": [
      155,
      160,
      162
    ]
  },
  {
    "section": "Activations & outputs",
    "category": "Regression setup",
    "prompt": "Which output activation and loss are the usual pairing for regression with unrestricted real-valued targets?",
    "options": [
      "Logistic sigmoid output with binary cross-entropy",
      "Softmax output with categorical cross-entropy",
      "Linear output with squared-error loss",
      "Threshold output with squared-error loss"
    ],
    "answer": 2,
    "explanation": "A linear output can represent any real value, and squared error measures its difference from a real-valued target. Sigmoid and softmax constrain outputs and are commonly paired with classification losses.",
    "activity": "A prediction of 3 and target of 5 contribute (3 − 5)² = 4 to SSE.",
    "slides": [
      160,
      161
    ]
  },
  {
    "section": "Activations & outputs",
    "category": "Classification setup",
    "prompt": "Which setup matches the standard treatment of binary and mutually exclusive multiclass classification?",
    "options": [
      "Softmax for binary classification and a linear output for multiclass, both with squared error",
      "One sigmoid output for binary classification and softmax outputs for multiclass, paired with cross-entropy",
      "A linear output for binary classification and independent thresholds for multiclass, both with cross-entropy",
      "ReLU outputs for both tasks, paired with squared error"
    ],
    "answer": 1,
    "explanation": "A sigmoid models the probability of one binary class. Softmax models probabilities across mutually exclusive classes. Cross-entropy provides the corresponding negative log-likelihood loss.",
    "activity": "For three mutually exclusive classes, softmax produces three probabilities that sum to 1.",
    "slides": [
      161
    ]
  },
  {
    "section": "Backpropagation & training",
    "category": "Weight gradient",
    "prompt": "For a connection from source i to destination j, zᵢ = −2 and εⱼ = ∂L/∂sⱼ = 0.3. What is ∂L/∂wᵢⱼ?",
    "options": [
      "−0.6",
      "0.6",
      "−2.3",
      "−0.15"
    ],
    "answer": 0,
    "explanation": "The weight gradient is source output × destination sensitivity: ∂L/∂wᵢⱼ = zᵢεⱼ = −0.6. It measures the local effect on loss, not the update itself. A bias has constant input z₀ = 1, so ∂L/∂w₀ⱼ = εⱼ.",
    "activity": "At η = 0.1 without momentum, this weight updates by +0.06. The bias gradient is εⱼ = 0.3, giving a bias update of −0.03.",
    "slides": [
      170,
      172,
      176,
      178
    ]
  },
  {
    "section": "Backpropagation & training",
    "category": "Gradients vs updates",
    "prompt": "Which statement correctly distinguishes backpropagation from the optimizer?",
    "options": [
      "Backpropagation chooses the architecture; the optimizer computes hidden-unit outputs",
      "Backpropagation updates weights directly; the optimizer only evaluates predictions",
      "Backpropagation and the optimizer are two names for the same calculation",
      "Backpropagation computes loss gradients; the optimizer uses them to update weights"
    ],
    "answer": 3,
    "explanation": "Backpropagation applies the chain rule to obtain ∂L/∂w. An optimizer, such as gradient descent with momentum, decides how to change the weights using those gradients. A gradient is not itself a weight change.",
    "activity": "With gradient g = 0.2, η = 0.1 and no momentum, the optimizer gives Δw = −0.02; backpropagation supplied g.",
    "slides": [
      173,
      175,
      176
    ]
  },
  {
    "section": "Backpropagation & training",
    "category": "Output sensitivity",
    "prompt": "A logistic output has ŷ = 0.4 and target y = 0.2. For L = (ŷ − y)², what is ε = ∂L/∂s?",
    "options": [
      "0.4",
      "0.096",
      "−0.096",
      "0.048"
    ],
    "answer": 1,
    "explanation": "Apply the chain rule: ε = 2(ŷ − y)g′(s) = 2(0.4 − 0.2) × 0.4(1 − 0.4) = 0.096. The derivative must be taken with respect to the prediction, not the target.",
    "activity": "When ŷ = y, the squared-error output sensitivity is zero.",
    "slides": [
      168,
      172,
      177
    ]
  },
  {
    "section": "Backpropagation & training",
    "category": "Hidden recursion",
    "prompt": "A hidden unit q has g′(s_q) = 0.5 and sends outputs to units 6 and 7. If w_q6 = 3, w_q7 = 2, ε₆ = 0.2 and ε₇ = −0.1, what is ε_q?",
    "options": [
      "0.4",
      "−0.2",
      "0.2",
      "0.3"
    ],
    "answer": 2,
    "explanation": "Sum the downstream contributions, then multiply by the local derivative: ε_q = 0.5[3(0.2) + 2(−0.1)] = 0.2. Multiple outgoing paths contribute to the same hidden-unit sensitivity.",
    "activity": "If w_q7 becomes zero, ε_q becomes 0.5 × 3 × 0.2 = 0.3.",
    "slides": [
      171,
      172
    ]
  },
  {
    "section": "Backpropagation & training",
    "category": "Mini-batch averaging",
    "prompt": "With n = 100, a batch B contains four examples. Their gradients for one weight are 2, 0, −1 and 3, all evaluated at the same weights. What mode and mean gradient does this give?",
    "options": [
      "Full-batch mode; mean gradient 1",
      "Online mode; mean gradient 4",
      "Mini-batch mode; mean gradient 4",
      "Mini-batch mode; mean gradient 1"
    ],
    "answer": 3,
    "explanation": "Since 1 < |B| = 4 < n, this is mini-batch mode. The mean gradient is (2 + 0 − 1 + 3)/4 = 1. The weights are updated once after accumulating the batch gradients.",
    "activity": "|B| = 1 gives online mode; |B| = 100 gives full-batch mode. A sum and a mean differ by the batch-size factor.",
    "slides": [
      166,
      176
    ]
  },
  {
    "section": "Backpropagation & training",
    "category": "Momentum update",
    "prompt": "For one weight, w(t) = 0.3, Δw(t−1) = 0.04, g = −0.2, η = 0.1 and α = 0.5. Using Δw(t) = −ηg + αΔw(t−1), what are Δw(t) and w(t+1)?",
    "options": [
      "Δw(t) = 0.04; w(t+1) = 0.34",
      "Δw(t) = −0.04; w(t+1) = 0.26",
      "Δw(t) = 0.02; w(t+1) = 0.32",
      "Δw(t) = 0.22; w(t+1) = 0.52"
    ],
    "answer": 0,
    "explanation": "The gradient contributes −0.1(−0.2) = 0.02, and momentum contributes 0.5(0.04) = 0.02. Their sum is Δw(t) = 0.04, so the new weight is 0.34. Here t counts weight updates.",
    "activity": "Set α = 0. The update becomes 0.02 and the new weight becomes 0.32.",
    "slides": [
      175,
      176
    ]
  }
];
