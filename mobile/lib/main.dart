import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/auth_provider.dart';
import 'providers/household_provider.dart';
import 'screens/login_screen.dart';

void main() {
  runApp(const DishPayApp());
}

class DishPayApp extends StatelessWidget {
  const DishPayApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => HouseholdProvider())
      ],
      child: MaterialApp(
        title: 'DishPay',
        theme: ThemeData(primarySwatch: Colors.indigo),
        home: const LoginScreen(),
      ),
    );
  }
}
