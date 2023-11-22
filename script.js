document.addEventListener("DOMContentLoaded", function () {
  const startColorPreview = document.getElementById("startColorPreview");
  const startColorInput = document.getElementById("startColor");
  const endColorPreview = document.getElementById("endColorPreview");
  const endColorInput = document.getElementById("endColor");
  const gradientType = document.getElementById("gradientType");
  const gradientBox = document.getElementById("gradientBox");
  const cssCodeTextarea = document.getElementById("cssCode");

  // Function to generate gradient
  function generateGradient() {
    const gradientTypeVal = gradientType.value;
    // Generate CSS gradient code
    let cssCode;

    if (gradientTypeVal.startsWith("linear")) {
      const angle = gradientTypeVal === "linear" ? "to right" : gradientTypeVal.match(/\d+/)[0] + "deg";
      cssCode = `linear-gradient(${angle}, ${startColorInput.value}, ${endColorInput.value})`;
    } else {
      cssCode = `radial-gradient(${startColorInput.value}, ${endColorInput.value})`;
    }

    // Apply gradient and update CSS code
    gradientBox.style.background = cssCode;
    document.body.style.background = cssCode;

    //update text
    cssCodeTextarea.value = `background: ${cssCode};`;

    // Update color previews
    updateColorPreview(startColorInput.value, startColorPreview);
    updateColorPreview(endColorInput.value, endColorPreview);
  }

  // Function to update color preview
  function updateColorPreview(color, preview) {
    preview.style.backgroundColor = color;
  }

  startColorPreview.addEventListener("click", () => {
    startColorInput.click();
  });

  endColorPreview.addEventListener("click", () => {
    endColorInput.click();
  });

  // Attach color preview updates to color input change events
  startColorInput.addEventListener("input", function () {
    updateColorPreview(startColor.value, startColorPreview);
    generateGradient();
  });

  endColorInput.addEventListener("input", function () {
    updateColorPreview(endColorInput.value, endColorInput);
    generateGradient();
  });

  // Attach event listener for gradient type change
  gradientType.addEventListener("change", function () {
    generateGradient();
  });

  // Attach click event listener to copy CSS code to clipboard
  cssCodeTextarea.addEventListener("click", function () {
    copyToClipboard();
  });

  // Function to copy CSS code to clipboard
  function copyToClipboard() {
    cssCodeTextarea.select();
    try {
      // Use the Clipboard API to copy the selected text
      navigator.clipboard
        .writeText(cssCodeTextarea.value)
        .then(() => {
          // Display fading message
          const message = document.createElement("div");
          message.classList.add("fade-message");
          message.textContent = "Copied to Clipboard!";
          document.body.appendChild(message);

          // Fade out the message after a short delay
          setTimeout(() => {
            message.style.opacity = "0";
            setTimeout(() => {
              document.body.removeChild(message);
            }, 1000);
          }, 2000);
        })
        .catch((err) => {
          console.error("Unable to copy to clipboard:", err);
        });
    } catch (err) {
      // Handle the case where navigator.clipboard or writeText is not supported (e.g., in older browsers)
      console.error("Unable to copy to clipboard:", err);
    }
  }

  //initial generation
  generateGradient();
});
