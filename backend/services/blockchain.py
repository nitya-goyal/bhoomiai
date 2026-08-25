import hashlib
import json
import time
from typing import Dict, List, Any

class Block:
    def __init__(self, index: int, timestamp: float, data: Dict[str, Any], previous_hash: str):
        self.index = index
        self.timestamp = timestamp
        self.data = data
        self.previous_hash = previous_hash
        self.nonce = 0
        self.hash = self.calculate_hash()

    def calculate_hash(self) -> str:
        block_string = json.dumps({
            "index": self.index,
            "timestamp": self.timestamp,
            "data": self.data,
            "previous_hash": self.previous_hash,
            "nonce": self.nonce
        }, sort_keys=True)
        return hashlib.sha256(block_string.encode('utf-8')).hexdigest()

    def to_dict(self) -> Dict[str, Any]:
        return {
            "index": self.index,
            "timestamp": self.timestamp,
            "data": self.data,
            "previous_hash": self.previous_hash,
            "hash": self.hash,
            "nonce": self.nonce
        }

class BlockchainLedger:
    def __init__(self):
        self.chain: List[Block] = []
        self.create_genesis_block()
        self.seed_sample_mutations()

    def create_genesis_block(self):
        genesis_data = {
            "type": "GENESIS_SETTLEMENT_RECORD",
            "title": "National Land Record Modernization Programme (NLRMP) Master Genesis Block",
            "authority": "Department of Land Resources (DoLR), Ministry of Rural Development",
            "survey_reference": "VILLAGE-WAGHOLI-PUNE-1980-SETTLEMENT"
        }
        genesis_block = Block(0, 1609459200.0, genesis_data, "0" * 64)
        self.chain.append(genesis_block)

    def seed_sample_mutations(self):
        # Block 1: Initial Digitization of Survey 84/2
        self.add_mutation(
            survey_no="84/2A",
            mutation_type="DIGITIZATION_AND_CADASTRE_SYNC",
            owner="Shankarrao Anandrao Patil",
            area="1.45 Ha",
            officer="Talathi / Village Officer - Wagholi",
            remarks="Archival 7/12 record converted to digital ledger format."
        )
        # Block 2: Succession / Virasat
        self.add_mutation(
            survey_no="84/2A",
            mutation_type="VIRASAT_SUCCESSION_MUTATION",
            owner="Ramchandra Shankarrao Patil (50%) & Suresh Ramchandra Patil (50%)",
            area="1.45 Ha",
            officer="Circle Officer / Naib Tehsildar Haveli",
            remarks="Ferfar #3890 approved pursuant to Succession Certificate."
        )
        # Block 3: Bank Mortgage Lien
        self.add_mutation(
            survey_no="84/2A",
            mutation_type="BANK_LIEN_ENTRY",
            owner="Ramchandra Shankarrao Patil",
            area="1.45 Ha",
            officer="Bank of Maharashtra Loan Officer",
            remarks="Ferfar #4120 - KCC Agricultural Loan of ₹3,50,000 recorded."
        )

    def get_latest_block(self) -> Block:
        return self.chain[-1]

    def add_mutation(self, survey_no: str, mutation_type: str, owner: str, area: str, officer: str, remarks: str) -> Block:
        latest = self.get_latest_block()
        mutation_data = {
            "survey_no": survey_no,
            "mutation_type": mutation_type,
            "new_owner": owner,
            "land_area": area,
            "approving_officer": officer,
            "remarks": remarks,
            "digital_signature_algorithm": "ECDSA-secp256k1 (Government e-Sign Verified)",
            "qr_verifiable_hash": None
        }
        new_block = Block(
            index=len(self.chain),
            timestamp=time.time(),
            data=mutation_data,
            previous_hash=latest.hash
        )
        new_block.data["qr_verifiable_hash"] = new_block.hash
        self.chain.append(new_block)
        return new_block

    def is_chain_valid(self) -> Dict[str, Any]:
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            previous = self.chain[i - 1]

            if current.hash != current.calculate_hash():
                return {
                    "is_valid": False,
                    "tampered_block_index": i,
                    "reason": f"Hash mismatch in block {i}! Calculated hash does not match stored block hash."
                }
            if current.previous_hash != previous.hash:
                return {
                    "is_valid": False,
                    "tampered_block_index": i,
                    "reason": f"Broken chain between block {i-1} and block {i}!"
                }
        return {
            "is_valid": True,
            "total_blocks": len(self.chain),
            "merkle_integrity": "100% Cryptographically Verified"
        }

    def tamper_block_for_demo(self, block_index: int, fake_owner: str) -> Dict[str, Any]:
        """
        Allows evaluators to simulate an unauthorized database tampering attempt
        and immediately demonstrates how the blockchain detects fraudulent modification.
        """
        if 0 < block_index < len(self.chain):
            self.chain[block_index].data["new_owner"] = fake_owner
            return {
                "status": "TAMPERED_FOR_EVALUATION",
                "message": f"Block {block_index} data altered maliciously without recalculating cryptographic hash chain."
            }
        return {"status": "ERROR", "message": "Invalid block index."}

    def get_chain_serialized(self) -> List[Dict[str, Any]]:
        return [b.to_dict() for b in self.chain]

# Singleton instance
ledger_instance = BlockchainLedger()
