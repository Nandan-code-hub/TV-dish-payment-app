import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import 'scan_qr_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final phoneController = TextEditingController();
  final otpController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('DishPay Login')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(controller: phoneController, decoration: const InputDecoration(labelText: 'Phone Number')),
            TextField(controller: otpController, decoration: const InputDecoration(labelText: 'OTP')),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () async {
                await context.read<AuthProvider>().fakeLogin();
                if (context.mounted) {
                  Navigator.push(context, MaterialPageRoute(builder: (_) => const ScanQrScreen()));
                }
              },
              child: const Text('Verify OTP'),
            )
          ],
        ),
      ),
    );
  }
}
