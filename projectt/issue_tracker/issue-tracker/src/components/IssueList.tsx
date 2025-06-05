
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { Issue } from "@/pages/Dashboard";

interface IssueListProps {
  issues: Issue[];
  onUpdateIssue: (id: string, updates: Partial<Issue>) => void;
  onDeleteIssue: (id: string) => void;
}

const getStatusColor = (status: Issue["status"]) => {
  switch (status) {
    case "Open":
      return "bg-red-100 text-red-800";
    case "In Progress":
      return "bg-yellow-100 text-yellow-800";
    case "Closed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const IssueList = ({ issues, onUpdateIssue, onDeleteIssue }: IssueListProps) => {
  const handleStatusChange = (id: string, newStatus: Issue["status"]) => {
    onUpdateIssue(id, { status: newStatus });
  };

  if (issues.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No issues found</p>
        <p className="text-gray-400">Create your first issue to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <Card key={issue.id}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="flex-1">
              <CardTitle className="text-lg">{issue.title}</CardTitle>
              <CardDescription className="mt-1">
                Created on {new Date(issue.created_at).toLocaleDateString()}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(issue.status)}>
                {issue.status}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleStatusChange(issue.id, "Open")}
                    disabled={issue.status === "Open"}
                  >
                    Mark as Open
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleStatusChange(issue.id, "In Progress")}
                    disabled={issue.status === "In Progress"}
                  >
                    Mark as In Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleStatusChange(issue.id, "Closed")}
                    disabled={issue.status === "Closed"}
                  >
                    Mark as Closed
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDeleteIssue(issue.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{issue.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IssueList;
