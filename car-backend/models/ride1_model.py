from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base

class RideInformation(Base):
    __tablename__ = "rides"

    id = Column(Integer, primary_key=True, index=True)
    driver_id = Column(Integer, ForeignKey("drivers.id"))
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"))  # ADD THIS LINE
    start_location = Column(String(255), nullable=False)
    end_location = Column(String(255), nullable=False)
    date = Column(DateTime, nullable=False)
    seats_available = Column(Integer, default=1)
    created_at = Column(DateTime(timezone=True), server_default=func.now())