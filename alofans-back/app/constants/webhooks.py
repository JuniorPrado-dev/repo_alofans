"""
- OPENPIX_EVENTS:

    all requests are POST
    
    - OPENPIX:CHARGE_CREATED - New charge created
    - OPENPIX:CHARGE_COMPLETED - Charge completed is when a charge is fully paid
    - OPENPIX:CHARGE_EXPIRED - Charge expired is when a charge is not fully paid and expired
    - OPENPIX:TRANSACTION_RECEIVED - New PIX transaction received
    - OPENPIX:TRANSACTION_REFUND_RECEIVED - New PIX transaction refund received or refunded
    - OPENPIX:MOVEMENT_CONFIRMED - Payment confirmed is when the pix transaction related to the payment gets confirmed
    - OPENPIX:MOVEMENT_FAILED - Payment failed is when the payment gets approved and a error occurs
    - OPENPIX:MOVEMENT_REMOVED - Payment was removed by a user

"""
OPENPIX_CHARGE_EVENTS = {
    "create": "OPENPIX:CHARGE_CREATED",
    "paid": "OPENPIX:CHARGE_COMPLETED",
    "expired": "OPENPIX:CHARGE_EXPIRED"
}


OPENPIX_TRANSACTION_EVENTS = {

    "received": "OPENPIX:TRANSACTION_RECEIVED",
    "refund": "OPENPIX:TRANSACTION_REFUND_RECEIVED"
}

OPENPIX_MOVEMENT_EVENTS = {
    "confirmed": "OPENPIX:MOVEMENT_CONFIRMED",
    "failed": "OPENPIX:MOVEMENT_FAILED",
    "removed": "OPENPIX:MOVEMENT_REMOVED"
}