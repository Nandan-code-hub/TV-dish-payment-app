import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  ApiService(this.baseUrl);
  final String baseUrl;

  Future<Map<String, dynamic>> fetchHouseholdByDishId(String dishId) async {
    final response = await http.get(Uri.parse('$baseUrl/households/$dishId'));
    return jsonDecode(response.body) as Map<String, dynamic>;
  }
}
