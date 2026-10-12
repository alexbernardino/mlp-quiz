# MLP concept check

An 18-question formative quiz on the Neural Networks material in printed slides 149–179 of `0_Machine_Learning_Slides.pdf`, stopping before image analysis and CNNs.

The layout and interaction follow the existing [optimization quiz](https://alexbernardino.github.io/optimization-quiz/) and the same quiz family used for [KNN](https://alexbernardino.github.io/knn-quiz/), [regression](https://alexbernardino.github.io/regression-quiz/) and [regularization](https://alexbernardino.github.io/regularization-quiz/).

## Coverage

- **Perceptrons & MLPs:** threshold units, Rosenblatt updates, separability, hidden units, affine stacks and universal approximation.
- **Activations & outputs:** forward computation, activation derivatives, ReLU at zero, and output/loss choices for regression and classification.
- **Backpropagation & training:** weight and bias gradients, the distinction between gradient computation and optimization, output and hidden sensitivities, mini-batches and momentum.

There are six questions per section, each with four choices, one best answer, explanatory feedback and a short follow-up activity. Students can revisit answered questions, review their results and restart. Answers and scores stay in the open browser tab. The site uses local HTML, CSS and JavaScript, with no account, backend, external fonts or runtime dependencies.

## GitHub Pages

The intended address is **https://alexbernardino.github.io/mlp-quiz/**.

### Separate `mlp-quiz` repository

1. Create a public repository named `mlp-quiz` under `alexbernardino`.
2. Upload this folder's contents to the repository root on `main`, including `.github/workflows/deploy-pages.yml`.
3. Under **Settings → Pages**, select **GitHub Actions** as the deployment source.
4. The included workflow checks the questions and deploys the static site on a push to `main`. If necessary, start it manually from **Actions → Deploy to GitHub Pages → Run workflow**.

Alternatively, select **Deploy from a branch**, with `main` and `/(root)`. The quiz is already static and needs no build step.

### Folder in `alexbernardino.github.io`

If `mlp-quiz` will be a folder in your existing website repository, upload the folder there and let that repository's existing Pages configuration publish it. Its URL is the same. The workflow inside the quiz folder is only needed for the separate-repository approach.

All site assets use relative paths, so either arrangement works without a base-path edit.

## QR code

- [PNG for lecture slides](mlp-quiz-qr.png)
- [SVG for lossless scaling](mlp-quiz-qr.svg)

Both encode **https://alexbernardino.github.io/mlp-quiz/**. That destination becomes available after the quiz is published.

![MLP quiz QR code](mlp-quiz-qr.png)

To regenerate them for another URL, edit `QUIZ_URL` in `tools/generate_qr.py` and run that script with ReportLab and Pillow installed. These packages are only needed to regenerate the images, not to run or publish the quiz.

## Preview and checks

From this folder, run:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000/. Use a local server because the quiz imports a JavaScript module.

With Node.js 22 or later, run:

```sh
npm test
```

No package installation is required.

## Editing the questions

Edit `questions.js`. Each item has `section`, `category`, `prompt`, four `options`, a zero-based `answer`, `explanation`, `activity`, and printed-slide references in `slides`. The interface supplies the "Check it:" label, so activities should not repeat it.

The questions use mathematically correct conventions where the lecture wording needs clarification: derivatives are taken with respect to predictions, ReLU's ordinary derivative is undefined at zero, biases use a constant input of one, and the mini-batch question explicitly uses the mean gradient. Sigmoid and softmax output/loss pairings are previewed without requiring cross-entropy derivative calculations.
