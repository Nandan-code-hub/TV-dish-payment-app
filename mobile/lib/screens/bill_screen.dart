import 'package:flutter/material.dart';
import 'payment_history_screen.dart';

class BillScreen extends StatelessWidget {
  const BillScreen({super.key, required this.dishId});

  final String dishId;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Current Bill')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Dish ID: $dishId'),
            const Text('House Name: Example House'),
            const Text('Bill Amount: ₹320'),
            const Text('Status: Pending'),
            const SizedBox(height: 16),
            ElevatedButton(onPressed: () {}, child: const Text('Pay ₹320')),
            TextButton(
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (_) => const PaymentHistoryScreen()));
              },
              child: const Text('View Payment History'),
            )
          ],
        ),
      ),
    );
  }
}
