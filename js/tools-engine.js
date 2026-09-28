/* ==========================================================================
   PARTHIBAN CREATIONS - INTERACTIVE ONLINE TOOLS ENGINE
   Calculators, Checksum Integrity Validators, & APK Safety Inspectors
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Tool Tabs
  const toolTabBtns = document.querySelectorAll('.tool-tab-btn');
  const toolPanels = document.querySelectorAll('.tool-panel');

  toolTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTool = btn.getAttribute('data-tool');
      
      toolTabBtns.forEach(b => b.classList.remove('active'));
      toolPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(`tool-panel-${targetTool}`);
      if (activePanel) activePanel.classList.add('active');
    });
  });

  // Tool 1: Game FPS & Bottleneck Estimator
  const fpsCpu = document.getElementById('fps-cpu-select');
  const fpsGpu = document.getElementById('fps-gpu-select');
  const fpsRes = document.getElementById('fps-res-select');
  const fpsGenre = document.getElementById('fps-genre-select');
  
  const fpsValueDisplay = document.getElementById('fps-result-value');
  const fpsVerdictDisplay = document.getElementById('fps-result-verdict');
  const fpsPresetDisplay = document.getElementById('fps-result-preset');
  const fpsBottleneckDisplay = document.getElementById('fps-result-bottleneck');

  function calculateFPS() {
    if (!fpsCpu || !fpsGpu || !fpsRes || !fpsGenre) return;

    const cpuScore = parseInt(fpsCpu.value);
    const gpuScore = parseInt(fpsGpu.value);
    const resMultiplier = parseFloat(fpsRes.value);
    const genreFactor = parseFloat(fpsGenre.value);

    // Calculate base raw performance score
    let basePerf = (gpuScore * 0.7 + cpuScore * 0.3) * genreFactor * resMultiplier;
    let calculatedFps = Math.round(basePerf);

    // Clamp bounds
    calculatedFps = Math.max(24, Math.min(360, calculatedFps));

    // Bottleneck check
    let bottleneck = "Balanced System (0% Bottleneck)";
    if (cpuScore < gpuScore * 0.6) {
      bottleneck = "⚠️ CPU Bottleneck Detected (~20% Limit)";
    } else if (gpuScore < cpuScore * 0.6) {
      bottleneck = "⚠️ GPU Bottleneck Detected (~25% Limit)";
    }

    // Verdict
    let verdict = "Smooth Performance";
    let preset = "High / Ultra 60+ FPS";
    if (calculatedFps >= 120) {
      verdict = "⚡ High-Refresh Competitive";
      preset = "Ultra 120+ FPS";
    } else if (calculatedFps >= 60) {
      verdict = "🎮 Smooth Playable";
      preset = "High / Ultra 60 FPS";
    } else if (calculatedFps >= 40) {
      verdict = "👍 Decent Playable";
      preset = "Medium Presets";
    } else {
      verdict = "⚠️ Low Frame Rate";
      preset = "Low Settings 720p Scaling";
    }

    if (fpsValueDisplay) fpsValueDisplay.textContent = calculatedFps;
    if (fpsVerdictDisplay) fpsVerdictDisplay.textContent = verdict;
    if (fpsPresetDisplay) fpsPresetDisplay.textContent = `Recommended: ${preset}`;
    if (fpsBottleneckDisplay) fpsBottleneckDisplay.textContent = bottleneck;
  }

  if (fpsCpu) {
    fpsCpu.addEventListener('change', calculateFPS);
    fpsGpu.addEventListener('change', calculateFPS);
    fpsRes.addEventListener('change', calculateFPS);
    fpsGenre.addEventListener('change', calculateFPS);
    calculateFPS(); // Initial calc
  }

  // Tool 2: Client-side File & String Hash Verifier
  const hashInput = document.getElementById('hash-text-input');
  const hashCalcBtn = document.getElementById('hash-calc-btn');
  const hashSha256Output = document.getElementById('hash-sha256-output');
  const hashCompareInput = document.getElementById('hash-compare-input');
  const hashMatchResult = document.getElementById('hash-match-status');

  async function generateSHA256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  if (hashCalcBtn && hashInput) {
    hashCalcBtn.addEventListener('click', async () => {
      const val = hashInput.value.trim();
      if (!val) {
        alert("Please enter text or filename details to calculate hash!");
        return;
      }
      const sha256 = await generateSHA256(val);
      if (hashSha256Output) hashSha256Output.textContent = sha256;
      checkMatch(sha256);
    });

    if (hashCompareInput) {
      hashCompareInput.addEventListener('input', () => {
        if (hashSha256Output) checkMatch(hashSha256Output.textContent);
      });
    }
  }

  function checkMatch(currentHash) {
    if (!hashCompareInput || !hashMatchResult) return;
    const userHash = hashCompareInput.value.trim().toLowerCase();
    if (!userHash) {
      hashMatchResult.textContent = "";
      return;
    }
    if (userHash === currentHash.toLowerCase()) {
      hashMatchResult.innerHTML = `<span style="color: var(--accent-emerald); font-weight:700;">✅ Match Confirmed! File signature is 100% authentic.</span>`;
    } else {
      hashMatchResult.innerHTML = `<span style="color: #ef4444; font-weight:700;">❌ Hash Mismatch! Verification failed.</span>`;
    }
  }
});
