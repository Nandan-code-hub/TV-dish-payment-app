import 'package:flutter/foundation.dart';
import '../models/household.dart';

class HouseholdProvider extends ChangeNotifier {
  final List<Household> _households = [];
  List<Household> get households => List.unmodifiable(_households);

  void setHouseholds(List<Household> values) {
    _households
      ..clear()
      ..addAll(values);
    notifyListeners();
  }
}
