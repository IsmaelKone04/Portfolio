import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useToast } from '../../hooks/use-toast';
import { adminGet } from '../../lib/adminApi';

const AnalyticsTab = ({ token }) => {
  const [analytics, setAnalytics] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    adminGet(token, '/api/admin/analytics').then(setAnalytics).catch(() => {
      toast({ variant: 'destructive', title: 'Chargement des statistiques impossible' });
    });
  }, []);

  if (!analytics) return <p className="mt-6 text-sm text-muted-foreground">Chargement…</p>;

  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-semibold text-foreground">{analytics.totalViews}</p>
            <p className="text-xs text-muted-foreground">Vues totales</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-semibold text-foreground">{analytics.uniqueVisitors}</p>
            <p className="text-xs text-muted-foreground">Visiteurs uniques</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-sm">Pages vues</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {Object.entries(analytics.byPath).map(([path, count]) => (
            <div key={path} className="flex justify-between border-b border-border py-1 text-sm last:border-0">
              <span className="text-foreground">{path}</span>
              <span className="text-muted-foreground">{count}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
