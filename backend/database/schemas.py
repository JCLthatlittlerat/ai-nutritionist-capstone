from pydantic import BaseModel
from typing import Optional, List, Dict
from datetime import datetime


# ----------- USER AUTH SCHEMAS -----------

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str = "user"  # Default to user, can be "user" or "coach"


class UserLogin(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str
    is_active: bool
    is_verified: bool
    tfa_enabled: bool
    tfa_verified: bool
    profile_picture: Optional[str] = None  # Path to user's profile picture
    height: Optional[float] = None
    weight: Optional[float] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    activity_level: Optional[str] = None
    goal: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    title: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    status: str = "Active"
    created_at: datetime
    last_login: Optional[datetime]

    class Config:
        from_attributes = True


# ----------- MEAL PLAN SCHEMAS -----------

class Macros(BaseModel):
    protein: int
    carbs: int
    fats: int


class MealPlanCreate(BaseModel):
    goal: str
    daily_calories: int
    diet_type: str
    macros: Macros


class MealPlanResponse(BaseModel):
    id: int
    goal: str
    diet_type: str
    daily_calories: int
    macro_protein: int
    macro_carbs: int
    macro_fats: int
    created_at: datetime

    class Config:
        from_attributes = True


# ----------- MEAL HISTORY SCHEMAS -----------

class MealHistoryResponse(BaseModel):
    id: int
    day_number: int
    meals_json: str
    created_at: datetime

    class Config:
        from_attributes = True


class MealPlanFullResponse(BaseModel):
    mealplan: MealPlanResponse
    history: List[MealHistoryResponse]

    class Config:
        from_attributes = True


class UserStatusUpdate(BaseModel):
    status: str
    is_active: bool = True


class GoogleLoginRequest(BaseModel):
    credential: str


class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    title: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    activity_level: Optional[str] = None
    goal: Optional[str] = None
    status: Optional[str] = None


class PasswordChangeRequest(BaseModel):
    current_password: str
    new_password: str
