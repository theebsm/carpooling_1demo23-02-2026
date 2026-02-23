from sqlalchemy import Column, Integer, ForeignKey, String, Numeric, DateTime
from sqlalchemy.sql import func
from database import Base

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)

    booking_id = Column(Integer, ForeignKey("bookings.id"), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    payment_method = Column(String(50), nullable=False)  # e.g., "cash", "card"
    transaction_id = Column(String(100), nullable=True)  # optional
    status = Column(String(50), default="pending")       # pending / completed / failed
    created_at = Column(DateTime(timezone=True), server_default=func.now())