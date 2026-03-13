import 'package:flutter/foundation.dart';

class AuthProvider extends ChangeNotifier {
  String? _token;
  String? get token => _token;
  bool get isLoggedIn => _token != null;

  Future<void> fakeLogin() async {
    _token = 'demo-token';
    notifyListeners();
  }
}
