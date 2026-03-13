class Household {
  final String dishId;
  final String houseName;
  final String area;

  Household({required this.dishId, required this.houseName, required this.area});

  factory Household.fromJson(Map<String, dynamic> json) {
    return Household(
      dishId: json['dish_id'] as String,
      houseName: json['house_name'] as String,
      area: (json['area'] ?? '') as String,
    );
  }
}
