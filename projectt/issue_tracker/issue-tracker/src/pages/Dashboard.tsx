import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import IssueList from "@/components/IssueList";
import CreateIssueDialog from "@/components/CreateIssueDialog";

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Closed";
  created_at: string;
  user_id: string;
}

const Dashboard = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchIssues();
  }, [user, navigate]);

  const fetchIssues = async () => {
    if (!user) return;
    
    try {
      console.log('Fetching issues for user:', user.id);
      const { data, error } = await supabase
        .from('issues')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        toast({
          title: "Error",
          description: "Failed to fetch issues",
          variant: "destructive",
        });
      } else {
        console.log('Fetched issues:', data);
        setIssues(data || []);
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateIssue = async (newIssue: Omit<Issue, "id" | "created_at" | "user_id">) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create issues",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Creating issue:', { ...newIssue, user_id: user.id });
      
      const { data, error } = await supabase
        .from('issues')
        .insert([
          {
            title: newIssue.title,
            description: newIssue.description,
            status: newIssue.status,
            user_id: user.id,
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating issue:', error);
        toast({
          title: "Error",
          description: `Failed to create issue: ${error.message}`,
          variant: "destructive",
        });
      } else {
        console.log('Issue created successfully:', data);
        setIssues([data, ...issues]);
        setIsCreateDialogOpen(false);
        toast({
          title: "Success",
          description: "Issue created successfully",
        });
      }
    } catch (error) {
      console.error('Error creating issue:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleUpdateIssue = async (id: string, updates: Partial<Issue>) => {
    try {
      const { error } = await supabase
        .from('issues')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update issue",
          variant: "destructive",
        });
      } else {
        setIssues(issues.map(issue => 
          issue.id === id ? { ...issue, ...updates } : issue
        ));
        toast({
          title: "Success",
          description: "Issue updated successfully",
        });
      }
    } catch (error) {
      console.error('Error updating issue:', error);
    }
  };

  const handleDeleteIssue = async (id: string) => {
    try {
      const { error } = await supabase
        .from('issues')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete issue",
          variant: "destructive",
        });
      } else {
        setIssues(issues.filter(issue => issue.id !== id));
        toast({
          title: "Success",
          description: "Issue deleted successfully",
        });
      }
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Issue Tracker</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <Button variant="ghost" asChild>
                <Link to="/profile">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Issue
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Your Issues</h2>
          <p className="text-gray-600">
            Manage and track your issues. You have {issues.length} total issues.
          </p>
        </div>

        <IssueList 
          issues={issues}
          onUpdateIssue={handleUpdateIssue}
          onDeleteIssue={handleDeleteIssue}
        />

        <CreateIssueDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onCreateIssue={handleCreateIssue}
        />
      </main>
    </div>
  );
};

export default Dashboard;
