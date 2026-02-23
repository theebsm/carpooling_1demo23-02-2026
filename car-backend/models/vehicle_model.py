# models/vehicle_model.py

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base
from models.driver import Driver

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    driver_id = Column(Integer, ForeignKey("drivers.id"), nullable=False)
    vehicle_type = Column(String, nullable=False)       # e.g., Car, Bike
    vehicle_number = Column(String, nullable=False, unique=True)  # Registration number
    seats_available = Column(Integer, nullable=False)
    color = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship to get driver info
    driver = relationship("Driver", backref="vehicles")
