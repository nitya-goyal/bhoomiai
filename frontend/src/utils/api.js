const BACKEND_URL = "http://localhost:8000";

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${BACKEND_URL}/`, { method: "GET", signal: AbortSignal.timeout(1500) });
    return res.ok;
  } catch {
    return false;
  }
}

export async function restoreDocumentAPI(imageBase64, options = {}) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/restoration/process`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_base64: imageBase64,
        binarize: options.binarize ?? true,
        deskew_angle: options.deskew_angle ?? 0.0,
        contrast_factor: options.contrast_factor ?? 1.5,
        denoise_level: options.denoise_level ?? 1,
        dewarp: options.dewarp ?? true
      }),
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Backend unavailable, using client-side restoration simulator.", err);
  }
  return {
    quality_score: 97.4,
    ink_contrast_ratio: 4.85,
    status: "restored_client_fallback"
  };
}

export async function extractOCRAPI(documentId) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/ocr/extract`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ document_id: documentId }),
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Using local OCR dataset.", err);
  }
  return null;
}

export async function getBlockchainLedgerAPI() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/blockchain/ledger`, {
      signal: AbortSignal.timeout(2000)
    });
    if (res.ok) return await res.json();
  } catch {
    // Client fallback
  }
  return null;
}

export async function addMutationAPI(mutation) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/blockchain/mutate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mutation),
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) return await res.json();
  } catch {
    // Client fallback handled in state
  }
  return null;
}

export async function simulateTamperAPI(blockIndex, fakeOwner) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/blockchain/tamper`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ block_index: blockIndex, fake_owner: fakeOwner }),
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) return await res.json();
  } catch {
    // Fallback
  }
  return null;
}
