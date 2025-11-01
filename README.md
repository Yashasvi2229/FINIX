# FINIX Backend API

Production-ready FastAPI backend for FINIX - AI-Powered Financial & Travel Platform.

## 🏗️ Architecture

The backend is organized into logical, modular components:

- **`database.py`**: PostgreSQL connection, session management, and database initialization
- **`models.py`**: SQLAlchemy ORM models (User, Transaction, TravelGoal)
- **`schemas.py`**: Pydantic schemas for request/response validation
- **`ai_engine.py`**: AI Engine ("Central Brain") - Groq API integration for personalized suggestions
- **`main.py`**: FastAPI application with all endpoints and CORS configuration

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- PostgreSQL 12+
- Groq API key

### Installation

1. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Set up environment variables:**
   ```bash
   # Create .env file based on the template
   # On Windows: copy env_template.txt .env
   # On Linux/Mac: cp env_template.txt .env
   # Edit .env with your database credentials and Groq API key
   ```

4. **Create PostgreSQL database:**
   ```sql
   CREATE DATABASE finix_db;
   ```

5. **Run database migrations (auto-created on startup):**
   The database tables are automatically created when you start the server.

6. **Start the server:**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   Or using Python:
   ```bash
   python -m uvicorn main:app --reload
   ```

7. **Access API documentation:**
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## 📋 API Endpoints

### User Management
- `POST /users/` - Create a new user
- `GET /users/{user_id}` - Get user by ID
- `GET /users/` - List all users

### Transactions
- `POST /transactions/` - Create a new transaction
- `GET /transactions/{user_id}` - Get all transactions for a user
  - Query params: `skip`, `limit`, `start_date`, `end_date`, `category`
- `GET /transactions/{user_id}/summary` - Get transaction summary statistics

### Travel Goals
- `POST /travel-goals/` - Create a new travel goal
- `GET /travel-goals/{user_id}` - Get all travel goals for a user
- `GET /travel-goals/{user_id}/{goal_id}` - Get specific travel goal
- `PUT /travel-goals/{user_id}/{goal_id}` - Update travel goal
- `DELETE /travel-goals/{user_id}/{goal_id}` - Delete travel goal

### AI Suggestions (Core Innovation)
- `GET /suggestions/{user_id}` - Get AI-generated personalized savings suggestions

## 🤖 AI Engine

The AI Engine (`ai_engine.py`) is the "Central Brain" of FINIX:

1. **Data Retrieval**: Fetches user transactions and travel goals
2. **Processing (Pandas)**: Analyzes spending patterns, calculates metrics
3. **LLM Prompting (Groq)**: Generates personalized savings strategies
4. **Proactive Insight**: Returns actionable suggestions linking expenses to travel goals

### Fallback Mode

If the Groq API is unavailable or fails, the engine automatically falls back to mock suggestions (useful for Round 1 Demo/MVP).

## 🗄️ Database Schema

### Users Table
- `id` (PK)
- `username` (unique)
- `home_currency` (default: USD)
- `created_at`, `updated_at`

### Transactions Table
- `id` (PK)`
- `user_id` (FK)
- `amount`
- `category`
- `currency`
- `date`
- `description` (optional)
- `created_at`

### TravelGoals Table
- `id` (PK)
- `user_id` (FK)
- `name`
- `target_amount`
- `current_saved`
- `target_date` (optional)
- `destination` (optional)
- `created_at`, `updated_at`

## 🔧 Configuration

### Environment Variables

```bash
DATABASE_URL=postgresql://user:password@host:port/database
GROQ_API_KEY=your_api_key_here
```

### Database URL Format
```
postgresql://[user[:password]@][host][:port][/database]
```

## 📦 Development

### Running Tests

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

### Code Structure Best Practices

- Models (`models.py`): Database schema definitions
- Schemas (`schemas.py`): API validation and serialization
- Database (`database.py`): Connection management (single responsibility)
- AI Engine (`ai_engine.py`): Isolated AI/ML logic
- Main (`main.py`): API routes and business logic orchestration

## 🚢 Production Deployment

### Recommended Settings

1. **Database Connection Pooling**: Already configured in `database.py`
2. **Environment Variables**: Use secure secret management
3. **CORS**: Update allowed origins for production domain
4. **Error Handling**: Comprehensive error handling implemented
5. **Logging**: Add structured logging for production monitoring

### Example Production Command

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 📝 API Response Examples

### Get AI Suggestions Response

```json
{
  "user_id": 1,
  "travel_goal_name": "Trip to Japan",
  "target_amount": 5000.00,
  "current_saved": 1500.00,
  "remaining_amount": 3500.00,
  "average_monthly_spending": 2500.00,
  "non_essential_spending": 800.00,
  "months_to_goal_current": 14.0,
  "months_to_goal_optimized": 9.5,
  "suggestions": [
    {
      "title": "Reduce Entertainment Spending",
      "description": "Cutting entertainment expenses by 30% could save $240/month...",
      "potential_savings": 240.00,
      "impact": "Saves 4.5 months toward your trip",
      "category": "Entertainment"
    }
  ],
  "generated_at": "2024-01-15T10:30:00Z"
}
```

## 🔒 Security Notes

- Always use environment variables for sensitive data (API keys, database passwords)
- Implement authentication/authorization before production deployment
- Use HTTPS in production
- Validate and sanitize all user inputs (handled by Pydantic schemas)

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Groq API Documentation](https://console.groq.com/docs)

