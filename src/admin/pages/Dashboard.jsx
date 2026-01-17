import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut,
  Mail,
  Users,
  Clock,
  CheckCircle,
  Trash2,
  Eye,
  Search,
  Filter,
  RefreshCw,
  Building2,
  MessageSquare,
  X,
  Loader2,
  AlertCircle,
  Inbox
} from 'lucide-react';
import { supabase, signOut, getSubmissions, updateSubmissionStatus, deleteSubmission } from '../../lib/supabase';
import { cn } from '../../utils/cn';

// Highlight matching text in search results
const HighlightText = ({ text, query }) => {
  if (!query || !text) return <>{text}</>;

  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-yellow-500/40 text-yellow-200 rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

// Stats Card Component
const StatCard = ({ icon: Icon, label, value, color, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
      </div>
      <div className={cn('p-3 rounded-xl', color)}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </motion.div>
);

// Submission Detail Modal
const SubmissionModal = ({ submission, onClose, onMarkRead, onDelete }) => {
  if (!submission) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Message Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Name</p>
              <p className="text-white font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-400" />
                {submission.name}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Email</p>
              <a
                href={`mailto:${submission.email}`}
                className="text-brand-400 hover:text-brand-300 font-medium flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                {submission.email}
              </a>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Company</p>
              <p className="text-white font-medium flex items-center gap-2">
                <Building2 className="w-4 h-4 text-accent-purple" />
                {submission.company || 'Not provided'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Received</p>
              <p className="text-white font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent-cyan" />
                {new Date(submission.created_at).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-400">Message</p>
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-200 whitespace-pre-wrap">{submission.message}</p>
            </div>
          </div>

          <div className="mt-4">
            <span className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium',
              submission.status === 'new'
                ? 'bg-accent-cyan/20 text-accent-cyan'
                : 'bg-accent-emerald/20 text-accent-emerald'
            )}>
              {submission.status === 'new' ? (
                <>
                  <Clock className="w-3.5 h-3.5" />
                  New
                </>
              ) : (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  Read
                </>
              )}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-700 bg-gray-800/50">
          <button
            onClick={() => onDelete(submission.id)}
            className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${submission.email}?subject=Re: Your inquiry to DZ2Cloud`}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4" />
              Reply via Email
            </a>
            {submission.status === 'new' && (
              <button
                onClick={() => onMarkRead(submission.id)}
                className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Read
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Check auth and load submissions
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/admin');
        return;
      }
      loadSubmissions();
    };
    checkAuth();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('submissions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'contact_submissions' },
        () => {
          loadSubmissions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [navigate]);

  // Filter submissions when search or status changes
  useEffect(() => {
    let filtered = [...submissions];

    if (statusFilter !== 'all') {
      filtered = filtered.filter((s) => s.status === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          (s.name || '').toLowerCase().includes(query) ||
          (s.email || '').toLowerCase().includes(query) ||
          (s.company || '').toLowerCase().includes(query) ||
          (s.message || '').toLowerCase().includes(query)
      );
    }

    setFilteredSubmissions(filtered);
  }, [submissions, searchQuery, statusFilter]);

  const loadSubmissions = async () => {
    setIsLoading(true);
    const { data, error: fetchError } = await getSubmissions();
    if (fetchError) {
      setError(fetchError.message);
    } else {
      setSubmissions(data || []);
    }
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadSubmissions();
    setIsRefreshing(false);
  };

  const handleMarkRead = async (id) => {
    const { error: updateError } = await updateSubmissionStatus(id, 'read');
    if (!updateError) {
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: 'read', read_at: new Date().toISOString() } : s))
      );
      if (selectedSubmission?.id === id) {
        setSelectedSubmission((prev) => ({ ...prev, status: 'read' }));
      }
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    const { error: deleteError } = await deleteSubmission(id);
    if (!deleteError) {
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      setSelectedSubmission(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin');
  };

  // Calculate stats
  const stats = {
    total: submissions.length,
    new: submissions.filter((s) => s.status === 'new').length,
    read: submissions.filter((s) => s.status === 'read').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-xl border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-cyan flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <span className="text-xl font-display font-bold text-white">Admin Dashboard</span>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            icon={Inbox}
            label="Total Submissions"
            value={stats.total}
            color="bg-brand-500"
          />
          <StatCard
            icon={Clock}
            label="New Messages"
            value={stats.new}
            color="bg-accent-cyan"
          />
          <StatCard
            icon={CheckCircle}
            label="Read"
            value={stats.read}
            color="bg-accent-emerald"
          />
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search by name, email, company, or message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="read">Read</option>
              </select>
            </div>

            {/* Refresh */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={cn('w-4 h-4', isRefreshing && 'animate-spin')} />
              Refresh
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 p-4 mb-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Submissions Table */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Inbox className="w-12 h-12 mb-4 opacity-50" />
              <p className="text-lg">No submissions found</p>
              <p className="text-sm mt-1">
                {searchQuery || statusFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Submissions will appear here when visitors contact you'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Name</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Email</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-400 hidden md:table-cell">Company</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-400 hidden lg:table-cell">Date</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Message</th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map((submission, index) => (
                    <motion.tr
                      key={submission.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        'border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors cursor-pointer',
                        submission.status === 'new' && 'bg-brand-500/5'
                      )}
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-accent-purple flex items-center justify-center text-white font-medium text-sm">
                            {submission.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-white font-medium">
                            <HighlightText text={submission.name} query={searchQuery} />
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-300">
                        <HighlightText text={submission.email} query={searchQuery} />
                      </td>
                      <td className="py-4 px-6 text-gray-400 hidden md:table-cell">
                        {submission.company ? (
                          <HighlightText text={submission.company} query={searchQuery} />
                        ) : '-'}
                      </td>
                      <td className="py-4 px-6 text-gray-400 hidden lg:table-cell">
                        {new Date(submission.created_at).toLocaleString('en-IN', {
                          dateStyle: 'short',
                          timeStyle: 'short'
                        })}
                      </td>
                      <td className="py-4 px-6">
                        <span className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                          submission.status === 'new'
                            ? 'bg-accent-cyan/20 text-accent-cyan'
                            : 'bg-gray-600/50 text-gray-400'
                        )}>
                          {submission.status === 'new' ? (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                              New
                            </>
                          ) : (
                            'Read'
                          )}
                        </span>
                      </td>
                      <td className="py-4 px-6 max-w-xs">
                        <p className="text-gray-300 text-sm line-clamp-2">
                          <HighlightText text={submission.message} query={searchQuery} />
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSubmission(submission);
                            }}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(submission.id);
                            }}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Results count */}
        {!isLoading && filteredSubmissions.length > 0 && (
          <p className="mt-4 text-sm text-gray-500 text-center">
            Showing {filteredSubmissions.length} of {submissions.length} submissions
          </p>
        )}
      </main>

      {/* Submission Detail Modal */}
      <AnimatePresence>
        {selectedSubmission && (
          <SubmissionModal
            submission={selectedSubmission}
            onClose={() => setSelectedSubmission(null)}
            onMarkRead={handleMarkRead}
            onDelete={handleDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
