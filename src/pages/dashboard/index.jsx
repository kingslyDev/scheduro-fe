import AppLayout from '@/components/layouts/AppLayout';

export default function Dashboard() {
  return <div>This is Dashboard</div>;
}

// Pastikan pakai getLayout, bukan .layout
Dashboard.getLayout = (page) => <AppLayout title="Dashboard">{page}</AppLayout>;
