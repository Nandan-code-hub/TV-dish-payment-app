import 'package:flutter/material.dart';

class OwnerDashboardScreen extends StatelessWidget {
  const OwnerDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Owner Dashboard')),
      body: GridView.count(
        crossAxisCount: 2,
        padding: const EdgeInsets.all(16),
        crossAxisSpacing: 12,
        mainAxisSpacing: 12,
        children: const [
          _MetricCard(label: 'Total Houses', value: '100'),
          _MetricCard(label: 'Paid', value: '62'),
          _MetricCard(label: 'Pending', value: '38'),
          _MetricCard(label: 'Collected', value: '₹19,840')
        ],
      ),
    );
  }
}

class _MetricCard extends StatelessWidget {
  const _MetricCard({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [Text(label), const Spacer(), Text(value, style: Theme.of(context).textTheme.headlineSmall)],
        ),
      ),
    );
  }
}
