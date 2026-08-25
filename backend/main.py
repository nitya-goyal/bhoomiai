from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any, List

from services.restoration import process_document_pipeline
from services.ocr_engine import extract_land_entities, get_all_sample_records
from services.cadastral_gis import get_cadastral_geojson, compute_polygon_metrics
from services.validation import run_multi_tier_validation
from services.blockchain import ledger_instance

app = FastAPI(
    title="BhoomiAI - Intelligent Land Record Digitization and Validation API",
    description="SIH26-26018: End-to-end AI Land Record Restoration, Indic OCR, Cadastral GIS, Anomaly Detection & Blockchain Ledger",
    version="1.0.0"
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RestorationRequest(BaseModel):
    image_base64: str
    binarize: bool = True
    deskew_angle: float = 0.0
    contrast_factor: float = 1.5
    denoise_level: int = 1
    dewarp: bool = True

class OCRRequest(BaseModel):
    document_id: Optional[str] = "doc_712_maharashtra"
    custom_text: Optional[str] = None

class MutationRequest(BaseModel):
    survey_no: str
    mutation_type: str
    owner: str
    area: str
    officer: str
    remarks: str

class TamperRequest(BaseModel):
    block_index: int
    fake_owner: str

@app.get("/")
def root():
    return {
        "status": "online",
        "system": "BhoomiAI Platform API (SIH26-26018)",
        "ministry": "Ministry of Rural Development / DoLR",
        "endpoints": [
            "/api/restoration/process",
            "/api/ocr/extract",
            "/api/ocr/samples",
            "/api/gis/cadastral-map",
            "/api/validation/audit",
            "/api/blockchain/ledger",
            "/api/blockchain/mutate",
            "/api/blockchain/verify",
            "/api/blockchain/tamper"
        ]
    }

# 1. Image Restoration & Preprocessing Endpoint
@app.post("/api/restoration/process")
def api_restore_document(payload: RestorationRequest):
    try:
        res = process_document_pipeline(
            image_base64=payload.image_base64,
            binarize=payload.binarize,
            deskew_angle=payload.deskew_angle,
            contrast_factor=payload.contrast_factor,
            denoise_level=payload.denoise_level,
            dewarp=payload.dewarp
        )
        return res
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# 2. Indic OCR & Key Information Extraction
@app.post("/api/ocr/extract")
def api_extract_ocr(payload: OCRRequest):
    return extract_land_entities(document_id=payload.document_id, custom_text=payload.custom_text)

@app.get("/api/ocr/samples")
def api_get_samples():
    return {"samples": get_all_sample_records()}

# 3. Cadastral GIS & Polygon GeoJSON
@app.get("/api/gis/cadastral-map")
def api_get_cadastral_map():
    return get_cadastral_geojson()

@app.post("/api/gis/compute-area")
def api_compute_area(coords: List[List[float]] = Body(...)):
    return compute_polygon_metrics(coords)

# 4. Multi-Tier Anomaly & Validation Audit
@app.post("/api/validation/audit")
def api_run_validation(record_data: Dict[str, Any] = Body(...)):
    return run_multi_tier_validation(record_data=record_data)

# 5. Blockchain Mutation Ledger
@app.get("/api/blockchain/ledger")
def api_get_ledger():
    chain = ledger_instance.get_chain_serialized()
    status = ledger_instance.is_chain_valid()
    return {
        "chain": chain,
        "validation_status": status
    }

@app.post("/api/blockchain/mutate")
def api_create_mutation(payload: MutationRequest):
    block = ledger_instance.add_mutation(
        survey_no=payload.survey_no,
        mutation_type=payload.mutation_type,
        owner=payload.owner,
        area=payload.area,
        officer=payload.officer,
        remarks=payload.remarks
    )
    return {
        "status": "SUCCESS",
        "message": f"Block #{block.index} minted and permanently sealed on Blockchain.",
        "block": block.to_dict()
    }

@app.get("/api/blockchain/verify")
def api_verify_chain():
    return ledger_instance.is_chain_valid()

@app.post("/api/blockchain/tamper")
def api_simulate_tamper(payload: TamperRequest):
    res = ledger_instance.tamper_block_for_demo(payload.block_index, payload.fake_owner)
    verification = ledger_instance.is_chain_valid()
    return {
        "action": res,
        "verification_result": verification
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
