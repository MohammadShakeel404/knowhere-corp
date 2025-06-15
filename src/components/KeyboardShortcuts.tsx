
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface KeyboardShortcutsProps {
  onNewInsight: () => void;
  onRefresh: () => void;
  onExportAll: () => void;
}

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({
  onNewInsight,
  onRefresh,
  onExportAll
}) => {
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for modifier keys (Ctrl/Cmd)
      const isModifierPressed = event.ctrlKey || event.metaKey;
      
      if (!isModifierPressed) return;

      switch (event.key.toLowerCase()) {
        case 'n':
          event.preventDefault();
          onNewInsight();
          toast({
            title: "New Insight",
            description: "Opening insight generation form",
          });
          break;
        case 'r':
          event.preventDefault();
          onRefresh();
          toast({
            title: "Refreshing",
            description: "Reloading insights",
          });
          break;
        case 'e':
          event.preventDefault();
          onExportAll();
          break;
        case '/':
          event.preventDefault();
          // Focus search input if available
          const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
            toast({
              title: "Search",
              description: "Search input focused",
            });
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onNewInsight, onRefresh, onExportAll, toast]);

  return null; // This component doesn't render anything visible
};

export default KeyboardShortcuts;
