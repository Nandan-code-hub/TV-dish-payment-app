import 'package:flutter/material.dart';
import 'bill_screen.dart';

class ScanQrScreen extends StatelessWidget {
  const ScanQrScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final dishController = TextEditingController();

    return Scaffold(
      appBar: AppBar(title: const Text('Scan QR / Enter Dish ID')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            const Placeholder(fallbackHeight: 140),
            TextField(controller: dishController, decoration: const InputDecoration(labelText: 'Dish ID (e.g., DISH001)')),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => BillScreen(dishId: dishController.text.trim())),
                );
              },
              child: const Text('Open Bill'),
            )
          ],
        ),
      ),
    );
  }
}
