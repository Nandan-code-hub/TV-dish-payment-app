# API Examples

## Create household

```http
POST /households
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "dish_id": "DISH034",
  "house_name": "Ravi House",
  "area": "Main Street"
}
```

## Mark cash payment

```http
POST /payments/cash
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "dish_id": "DISH034",
  "month": 3,
  "year": 2026,
  "amount": 320
}
```
