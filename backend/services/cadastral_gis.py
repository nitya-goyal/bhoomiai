import json
from typing import Dict, List, Any

# GeoJSON Village Cadastral Plot Polygons (centered around Pune / Haveli & Varanasi samples)
SAMPLE_CADASTRAL_VILLAGE = {
    "type": "FeatureCollection",
    "village_name": "Wagholi (वाघोली), Haveli, Pune",
    "crs_epsg": "EPSG:4326 (WGS84)",
    "center": [18.5793, 73.9812],
    "features": [
        {
            "type": "Feature",
            "id": "PARCEL-84-2A",
            "properties": {
                "survey_no": "84/2A",
                "khata_no": "142",
                "owner": "Ramchandra Shankarrao Patil & Suresh R. Patil",
                "document_area_ha": 1.45,
                "gis_computed_area_ha": 1.448,
                "area_discrepancy_pct": 0.14,
                "status": "Verified / Clear Title",
                "classification": "Agricultural (Jirayat)",
                "color": "#10b981", # Emerald
                "encumbrance": "Bank of Maharashtra KCC Loan ₹3.5L",
                "dispute_flag": False
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [73.9802, 18.5785],
                    [73.9825, 18.5788],
                    [73.9822, 18.5805],
                    [73.9799, 18.5802],
                    [73.9802, 18.5785]
                ]]
            }
        },
        {
            "type": "Feature",
            "id": "PARCEL-84-2B",
            "properties": {
                "survey_no": "84/2B",
                "khata_no": "189",
                "owner": "Dattatray Anandrao Gaikwad",
                "document_area_ha": 1.20,
                "gis_computed_area_ha": 1.195,
                "area_discrepancy_pct": 0.41,
                "status": "Verified / Clear Title",
                "classification": "Agricultural (Bagayat)",
                "color": "#10b981",
                "encumbrance": "Nil",
                "dispute_flag": False
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [73.9825, 18.5788],
                    [73.9848, 18.5791],
                    [73.9844, 18.5808],
                    [73.9822, 18.5805],
                    [73.9825, 18.5788]
                ]]
            }
        },
        {
            "type": "Feature",
            "id": "PARCEL-84-3-DISPUTE",
            "properties": {
                "survey_no": "84/3",
                "khata_no": "304",
                "owner": "Kailash Vitthal Jagtap vs Gram Panchayat",
                "document_area_ha": 2.10,
                "gis_computed_area_ha": 2.38,
                "area_discrepancy_pct": 13.33,
                "status": "Encroachment & Boundary Dispute Flagged",
                "classification": "Commercial / Mixed",
                "color": "#ef4444", # Red
                "encumbrance": "Civil Court Injunction Order #OS-2023-88",
                "dispute_flag": True,
                "dispute_details": "Plot boundary encroaches 0.28 Hectares into Village Gaothan / Public Road buffer."
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [73.9799, 18.5802],
                    [73.9822, 18.5805],
                    [73.9818, 18.5828],
                    [73.9792, 18.5824],
                    [73.9799, 18.5802]
                ]]
            }
        },
        {
            "type": "Feature",
            "id": "PARCEL-84-4-GOVT",
            "properties": {
                "survey_no": "84/4 (G-Land)",
                "khata_no": "Govt-01",
                "owner": "Government of Maharashtra (Forest & Revenue Dept)",
                "document_area_ha": 4.50,
                "gis_computed_area_ha": 4.50,
                "area_discrepancy_pct": 0.00,
                "status": "Protected Government Land",
                "classification": "Forest & Water Conservation Buffer",
                "color": "#3b82f6", # Blue
                "encumbrance": "Non-Transferable (Non-alienable)",
                "dispute_flag": False
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [73.9848, 18.5791],
                    [73.9880, 18.5795],
                    [73.9875, 18.5825],
                    [73.9844, 18.5808],
                    [73.9848, 18.5791]
                ]]
            }
        },
        {
            "type": "Feature",
            "id": "PARCEL-85-1-MUTATION",
            "properties": {
                "survey_no": "85/1",
                "khata_no": "512",
                "owner": "Sunita Sanjay Deshmukh (Pending Partition Mutation)",
                "document_area_ha": 0.85,
                "gis_computed_area_ha": 0.852,
                "area_discrepancy_pct": 0.23,
                "status": "Pending Tehsildar Mutation Order",
                "classification": "Agricultural",
                "color": "#f59e0b", # Amber
                "encumbrance": "Partition Ferfar #5219 under verification",
                "dispute_flag": False
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [73.9822, 18.5805],
                    [73.9844, 18.5808],
                    [73.9840, 18.5826],
                    [73.9818, 18.5828],
                    [73.9822, 18.5805]
                ]]
            }
        }
    ]
}

def get_cadastral_geojson() -> Dict[str, Any]:
    return SAMPLE_CADASTRAL_VILLAGE

def compute_polygon_metrics(coords: List[List[float]]) -> Dict[str, float]:
    """
    Computes approximate geodesic area in hectares and acres for hackathon simulation.
    """
    # Quick polygon area computation using Shoelace formula on lat/lon
    n = len(coords)
    if n < 3:
        return {"hectares": 0.0, "acres": 0.0, "sq_meters": 0.0}
    
    area_deg = 0.0
    for i in range(n - 1):
        x1, y1 = coords[i]
        x2, y2 = coords[i+1]
        area_deg += (x1 * y2 - x2 * y1)
    area_deg = abs(area_deg) / 2.0
    
    # 1 deg approx 111,000 meters at 18.5 deg latitude
    meters_per_deg_lat = 111000.0
    meters_per_deg_lon = 111000.0 * 0.948
    sq_meters = area_deg * meters_per_deg_lat * meters_per_deg_lon
    hectares = sq_meters / 10000.0
    acres = sq_meters / 4046.86
    
    return {
        "hectares": round(hectares, 4),
        "acres": round(acres, 4),
        "sq_meters": round(sq_meters, 2)
    }
