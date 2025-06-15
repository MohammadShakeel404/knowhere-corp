
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useSupabase } from '@/hooks/useSupabase';

const SupabaseStatus: React.FC = () => {
  const { isConnected, isLoading, user } = useSupabase();

  if (isLoading) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Checking Supabase Connection</span>
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {isConnected ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600" />
          )}
          <span>Supabase Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Connection:</span>
          <Badge variant={isConnected ? "default" : "destructive"}>
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Authentication:</span>
          <Badge variant={user ? "default" : "secondary"}>
            {user ? "Authenticated" : "Not Authenticated"}
          </Badge>
        </div>
        {user && (
          <div className="pt-2 border-t">
            <p className="text-xs text-gray-600">
              User: {user.email}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SupabaseStatus;
