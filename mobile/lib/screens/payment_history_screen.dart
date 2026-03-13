import 'package:flutter/material.dart';

class PaymentHistoryScreen extends StatelessWidget {
  const PaymentHistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final items = const [
      {'month': 'Jan', 'amount': '320', 'status': 'Paid'},
      {'month': 'Feb', 'amount': '320', 'status': 'Paid'}
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('Payment History')),
      body: ListView.builder(
        itemCount: items.length,
        itemBuilder: (context, index) {
          final item = items[index];
          return ListTile(
            title: Text('${item['month']} - ₹${item['amount']}'),
            trailing: Text(item['status']!),
          );
        },
      ),
    );
  }
}
