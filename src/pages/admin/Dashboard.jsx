import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { generateDashboardStats, mockOrders } from '../../data/adminMockData';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Euro, Users, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const [period, setPeriod] = useState('7days'); // '7days' or '5weeks'
  const stats = generateDashboardStats();
  const data = period === '7days' ? stats.last7Days : stats.last5Weeks;
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
  };
  
  // Préparer les données pour les graphiques
  const salesChartData = data.map(item => ({
    date: period === '7days' ? formatDate(item.date) : item.week,
    ventes: item.totalSales,
  }));
  
  const averageCartChartData = data.map(item => ({
    date: period === '7days' ? formatDate(item.date) : item.week,
    EDR: item.averageCartByCategory.EDR,
    XDR: item.averageCartByCategory.XDR,
    SOC: item.averageCartByCategory.SOC,
  }));
  
  // Calculer les totaux pour le pie chart
  const totalSalesByCategory = data.reduce((acc, item) => {
    Object.keys(item.salesByCategory).forEach(category => {
      acc[category] = (acc[category] || 0) + item.salesByCategory[category];
    });
    return acc;
  }, {});
  
  const pieChartData = Object.entries(totalSalesByCategory)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({ name, value }));
  
  const COLORS = ['#0073e6', '#00802f', '#ff6b6b', '#ffa500', '#9b59b6'];
  
  // Dernières commandes
  const recentOrders = mockOrders.slice(0, 10);
  
  const KPICard = ({ title, value, evolution, icon: Icon, format = (v) => v }) => {
    const isPositive = evolution >= 0;
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? 'text-accent' : 'text-destructive'
          }`}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {Math.abs(evolution).toFixed(1)}%
          </div>
        </div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <p className="text-2xl font-bold text-foreground">{format(value)}</p>
        <p className="text-xs text-muted-foreground mt-2">{stats.kpis[title.toLowerCase().replace(/\s+/g, '')]?.period}</p>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total des ventes"
          value={stats.kpis.totalSales.value}
          evolution={stats.kpis.totalSales.evolution}
          icon={DollarSign}
          format={formatCurrency}
        />
        <KPICard
          title="Nombre de commandes"
          value={stats.kpis.orderCount.value}
          evolution={stats.kpis.orderCount.evolution}
          icon={ShoppingCart}
        />
        <KPICard
          title="Panier moyen"
          value={stats.kpis.averageCart.value}
          evolution={stats.kpis.averageCart.evolution}
          icon={Euro}
          format={formatCurrency}
        />
        <KPICard
          title="Nouveaux utilisateurs"
          value={stats.kpis.newUsers.value}
          evolution={stats.kpis.newUsers.evolution}
          icon={Users}
        />
      </div>
      
      {/* Contrôles de période */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-border">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Période:</span>
          <button
            onClick={() => setPeriod('7days')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              period === '7days'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            7 derniers jours
          </button>
          <button
            onClick={() => setPeriod('5weeks')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              period === '5weeks'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            5 dernières semaines
          </button>
        </div>
      </div>
      
      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Histogramme des ventes */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Ventes par {period === '7days' ? 'jour' : 'semaine'}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="ventes" fill="#0073e6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Histogramme paniers moyens */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Panier moyen par catégorie
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={averageCartChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="EDR" fill="#0073e6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="XDR" fill="#00802f" radius={[8, 8, 0, 0]} />
              <Bar dataKey="SOC" fill="#ff6b6b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Graphique camembert */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Répartition des ventes par catégorie
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col justify-center">
            <div className="space-y-3">
              {pieChartData.map((entry, index) => {
                const total = pieChartData.reduce((sum, e) => sum + e.value, 0);
                const percentage = ((entry.value / total) * 100).toFixed(1);
                return (
                  <div key={entry.name} className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{entry.name}</span>
                        <span className="text-sm font-semibold text-foreground">{percentage}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{formatCurrency(entry.value)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Activité récente */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Activité récente</h3>
          <Link
            to="/admin/orders"
            className="text-sm text-primary hover:text-primary-600 flex items-center gap-1"
          >
            Voir toutes les commandes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Client</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Montant</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Statut</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 text-sm text-foreground">
                    {new Date(order.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground">
                    {order.customer.firstName} {order.customer.lastName}
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-foreground">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'Active' ? 'bg-accent/20 text-accent' :
                      order.status === 'Confirmée' ? 'bg-primary/20 text-primary' :
                      order.status === 'Terminée' ? 'bg-muted text-muted-foreground' :
                      order.status === 'Annulée' ? 'bg-destructive/20 text-destructive' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="text-primary hover:text-primary-600 text-sm"
                    >
                      Voir détails
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

