import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { Card } from '@/components/ui/card';
import { ShieldAlert, Users, Target, Shield, CheckCircle, GitPullRequest, XCircle, BookOpen, Trophy, Calendar, Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  const [activeTab, setActiveTab] = useState(isAdmin ? 'governance' : 'stories');
  const [users, setUsers] = useState<any[]>([]);
  const [contributions, setContributions] = useState<any[]>([]);
  
  // CMS State
  const [stories, setStories] = useState<any[]>([]);
  const [festivals, setFestivals] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [reels, setReels] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<any>({});
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchContributions();
    fetchCMSData();
  }, []);

  const fetchCMSData = async () => {
    try {
        const [storiesRes, festRes, quizRes, reelsRes] = await Promise.all([
           fetch('/api/v1/stories'),
           fetch('/api/v1/festivals'),
           fetch('/api/v1/quizzes'),
           fetch('/api/v1/reels')
        ]);
        if(storiesRes.ok) setStories(await storiesRes.json());
        if(festRes.ok) setFestivals(await festRes.json());
        if(quizRes.ok) setQuizzes(await quizRes.json());
        if(reelsRes.ok) setReels(await reelsRes.json());
    } catch (e) {
        console.error(e);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/v1/admin/users', {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      const data = await res.json();
      if (res.ok) setUsers(data);
      else toast.error("Failed to load users");
    } catch (err) {
      toast.error("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchContributions = async () => {
    try {
      const res = await fetch('/api/v1/contributions/pending', {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      const data = await res.json();
      if (res.ok) setContributions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateRole = async (userId: string, newRole: string) => {
    try {
      const res = await fetch(`/api/v1/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        toast.success("Role updated successfully!");
        fetchUsers();
      } else {
        toast.error("Role update failed.");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  const handleContributionAction = async (cid: string, action: 'approve' | 'reject') => {
    try {
      const res = await fetch(`/api/v1/contributions/${cid}/${action}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      if (res.ok) {
        toast.success(`Contribution ${action}d successfully`);
        fetchContributions();
      } else {
        toast.error(`Failed to ${action} contribution`);
      }
    } catch (err) {
      toast.error('Network Error');
    }
  };

  const handleCMSDelete = async (type: 'stories' | 'festivals' | 'quizzes' | 'reels', id: string) => {
    try {
      const res = await fetch(`/api/v1/${type}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      if(res.ok) {
        toast.success(`${type} entry deleted`);
        fetchCMSData();
      } else {
        toast.error(`Failed to delete`);
      }
    } catch (e) {
      toast.error('Network error');
    }
  };

  const handleCMSCreate = async () => {
    try {
      let payload = { ...formData };
      const isEditing = !!payload._id;
      const method = isEditing ? 'PUT' : 'POST';
      const endpoint = isEditing ? `/api/v1/${activeTab}/${payload._id}` : `/api/v1/${activeTab}`;

      // Ensure proper structuring if it somehow remained a string (failsafe)
      if (activeTab === 'quizzes' && typeof payload.questions === 'string') {
          payload.questions = JSON.parse(payload.questions);
      }
      if (activeTab === 'stories' && typeof payload.slides === 'string') {
          payload.slides = JSON.parse(payload.slides);
      }

      // Handling multipart/form-data for Reels
      if (activeTab === 'reels') {
         const formPayload = new FormData();
         Object.keys(payload).forEach(key => formPayload.append(key, payload[key]));
         const res = await fetch(endpoint, {
            method: method,
            headers: { Authorization: `Bearer ${user?.token}` },
            body: formPayload
         });
         if(res.ok) {
           toast.success(`Reel ${isEditing ? 'updated' : 'created'} successfully!`);
           setIsAdding(false);
           setFormData({});
           fetchCMSData();
         } else {
           toast.error(`Failed to ${isEditing ? 'update' : 'create'} reel`);
         }
         return;
      }

      const res = await fetch(endpoint, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}` 
        },
        body: JSON.stringify(payload)
      });
      if(res.ok) {
        toast.success(`${activeTab} ${isEditing ? 'updated' : 'created'} successfully!`);
        setIsAdding(false);
        setFormData({});
        fetchCMSData();
      } else {
        toast.error(`Failed to ${isEditing ? 'update' : 'create'}`);
      }
    } catch (e) {
      toast.error('Invalid input, or network error.');
    }
  };

  const handleEditCMS = (type: string, item: any) => {
    setFormData(item);
    setIsAdding(true);
  };

  const getSingularTitle = () => activeTab === 'stories' ? 'Story' : activeTab === 'quizzes' ? 'Quiz' : activeTab === 'reels' ? 'Reel' : 'Festival';

  // Dynamic Array Handlers
  const addSlide = () => {
      setFormData((prev: any) => ({
          ...prev,
          slides: [...(prev.slides || []), { type: 'content', image: '', text: '' }]
      }));
  };
  const updateSlide = (index: number, field: string, value: string) => {
      setFormData((prev: any) => {
          const newSlides = [...prev.slides];
          newSlides[index] = { ...newSlides[index], [field]: value };
          return { ...prev, slides: newSlides };
      });
  };
  const removeSlide = (index: number) => {
     setFormData((prev: any) => ({ ...prev, slides: prev.slides.filter((_: any, i: number) => i !== index) }));
  };

  const addQuestion = () => {
      setFormData((prev: any) => ({
          ...prev,
          questions: [...(prev.questions || []), { question: '', options: ['', '', '', ''], correct: 0, explanation: '' }]
      }));
  };
  const updateQuestion = (index: number, field: string, value: any) => {
      setFormData((prev: any) => {
          const newQ = [...prev.questions];
          newQ[index] = { ...newQ[index], [field]: value };
          return { ...prev, questions: newQ };
      });
  };
  const updateOption = (qIndex: number, optIndex: number, value: string) => {
      setFormData((prev: any) => {
          const newQ = [...prev.questions];
          const newOpts = [...newQ[qIndex].options];
          newOpts[optIndex] = value;
          newQ[qIndex] = { ...newQ[qIndex], options: newOpts };
          return { ...prev, questions: newQ };
      });
  };
  const removeQuestion = (index: number) => {
     setFormData((prev: any) => ({ ...prev, questions: prev.questions.filter((_: any, i: number) => i !== index) }));
  };

  const SidebarItem = ({ icon: Icon, label, id }: any) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-semibold
        ${activeTab === id ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30 shadow-inner' : 'text-foreground/70 hover:bg-white/5 hover:text-foreground'}
      `}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-6 pb-6">
      
      {/* 1. Vertical Sidebar Navigation */}
      <Card className="w-64 shrink-0 h-full overflow-y-auto glass-panel border-amber-500/20 p-4 space-y-2 flex flex-col bg-zinc-950/80">
        <div className="mb-6 px-2 space-y-1">
          <h2 className={`text-xl font-bold cinzel-text flex items-center gap-2 ${isAdmin ? 'text-amber-500' : 'text-primary'}`}>
            {isAdmin ? <ShieldAlert className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
            {isAdmin ? 'Royal CMS' : 'Content Portal'}
          </h2>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">{isAdmin ? 'Supreme Panel' : 'Database Access'}</p>
        </div>
        
        {isAdmin && (
           <>
             <SidebarItem icon={Users} label="User Governance" id="governance" />
             <SidebarItem icon={GitPullRequest} label="PR Review Hub" id="contributions" />
           </>
        )}
        
        <div className="my-4 border-t border-border/50 pt-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2">Content Manager</p>
            <SidebarItem icon={BookOpen} label="Storyverse" id="stories" />
            <SidebarItem icon={Calendar} label="Festivals" id="festivals" />
            <SidebarItem icon={Trophy} label="Quizzes" id="quizzes" />
            <SidebarItem icon={ShieldAlert} label="Reels" id="reels" />
        </div>
      </Card>

      {/* 2. Main Workspace */}
      <div className="flex-1 h-full overflow-y-auto pr-2 pb-12 space-y-6">
          
        {/* Header Stats Strip (Always visible) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {isAdmin && (
            <Card className="p-4 glass-panel border-amber-500/30 flex items-center gap-4 bg-gradient-to-br from-background to-amber-950/20">
              <div className="p-3 rounded-full bg-amber-500/20 text-amber-500">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-foreground/70 uppercase tracking-wider">Total Citizens</p>
                <p className="text-2xl font-bold cinzel-text text-amber-400">{users.length}</p>
              </div>
            </Card>
          )}
          <Card className={`p-4 glass-panel flex items-center gap-4 ${isAdmin ? 'border-emerald-500/30 bg-gradient-to-br from-background to-emerald-950/20' : 'border-primary/30 bg-gradient-to-br from-background to-primary/10'}`}>
            <div className={`p-3 rounded-full ${isAdmin ? 'bg-emerald-500/20 text-emerald-500' : 'bg-primary/20 text-primary'}`}>
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-foreground/70 uppercase tracking-wider">Stories</p>
              <p className={`text-2xl font-bold cinzel-text ${isAdmin ? 'text-emerald-400' : 'text-primary'}`}>{stories.length}</p>
            </div>
          </Card>
          <Card className={`p-4 glass-panel flex items-center gap-4 ${isAdmin ? 'border-purple-500/30 bg-gradient-to-br from-background to-purple-950/20' : 'border-blue-500/30 bg-gradient-to-br from-background to-blue-950/20'}`}>
            <div className={`p-3 rounded-full ${isAdmin ? 'bg-purple-500/20 text-purple-500' : 'bg-blue-500/20 text-blue-500'}`}>
              {isAdmin ? <GitPullRequest className="w-6 h-6" /> : <Trophy className="w-6 h-6" />}
            </div>
            <div>
              <p className="text-xs text-foreground/70 uppercase tracking-wider">{isAdmin ? 'Pending PRs' : 'Quizzes'}</p>
              <p className={`text-2xl font-bold cinzel-text ${isAdmin ? 'text-purple-400' : 'text-blue-400'}`}>{isAdmin ? contributions.length : quizzes.length}</p>
            </div>
          </Card>
        </div>

        {/* Dynamic View Injection */}
        {activeTab === 'governance' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold cinzel-text mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-amber-500" />
          User Governance
        </h2>
        
        <Card className="glass-panel overflow-hidden border-border/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-amber-950/40 border-b border-amber-500/20 text-amber-500">
                  <th className="p-4 font-semibold tracking-wider uppercase text-xs">Name</th>
                  <th className="p-4 font-semibold tracking-wider uppercase text-xs">Email</th>
                  <th className="p-4 font-semibold tracking-wider uppercase text-xs">Points</th>
                  <th className="p-4 font-semibold tracking-wider uppercase text-xs">Current Role</th>
                  <th className="p-4 font-semibold tracking-wider uppercase text-xs">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {isLoading ? (
                  <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">Loading registry...</td></tr>
                ) : (
                  users.map((u) => (
                    <tr key={u._id} className="hover:bg-accent/10 transition-colors">
                      <td className="p-4 text-foreground font-medium">{u.name}</td>
                      <td className="p-4 text-muted-foreground">{u.email}</td>
                      <td className="p-4 text-amber-400 font-bold">{u.points} KP</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider font-bold ${
                          u.role === 'admin' ? 'bg-purple-500/20 text-purple-500 border border-purple-500/30' :
                          u.role === 'contributor' ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' :
                          'bg-primary/10 text-primary border border-primary/20'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 flex gap-2">
                        {u.role !== 'admin' && (
                          <button 
                            onClick={() => updateRole(u._id, 'admin')}
                            className="px-3 py-1 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs rounded transition-all"
                          >
                            Make Admin
                          </button>
                        )}
                        {u.role !== 'contributor' && u.role !== 'admin' && (
                          <button 
                            onClick={() => updateRole(u._id, 'contributor')}
                            className="px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs rounded transition-all"
                          >
                            Make Contributor
                          </button>
                        )}
                        {u.role !== 'user' && u.role !== 'admin' && (
                          <button 
                            onClick={() => updateRole(u._id, 'user')}
                            className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs rounded transition-all"
                          >
                            Demote to User
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
        )}

        {activeTab === 'contributions' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-bold cinzel-text mb-6 flex items-center gap-2">
              <GitPullRequest className="w-6 h-6 text-purple-500" />
              Community Contributions
            </h2>
            
            <div className="space-y-4">
              {contributions.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground border border-border/50 rounded-xl bg-card/20">All caught up! No pending edits.</div>
              ) : (
                contributions.map(c => (
                  <Card key={c._id} className="p-6 glass-panel border-purple-500/30">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="px-2 py-1 text-xs font-bold uppercase bg-purple-500/20 text-purple-400 rounded">
                             {c.targetType} Edit
                           </span>
                           <span className="text-xs text-muted-foreground">Proposed by {c.userId?.name}</span>
                        </div>
                        <div className="mt-4 bg-zinc-950/80 p-4 rounded-xl border border-purple-500/20 max-h-48 overflow-y-auto layout-scroll">
                          {Object.entries(c.proposedChanges).map(([key, val]) => (
                            <div key={key} className="mb-2">
                              <span className="text-purple-400 font-bold text-xs uppercase tracking-wider">{key}: </span>
                              {typeof val === 'object' ? (
                                <pre className="text-emerald-400/90 text-xs mt-1 bg-black/50 p-2 rounded overflow-x-auto whitespace-pre-wrap break-words max-w-full">
                                  {JSON.stringify(val, null, 2)}
                                </pre>
                              ) : (
                                <span className="text-emerald-400/90 text-sm font-medium">{String(val)}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button 
                          onClick={() => handleContributionAction(c._id, 'approve')}
                          className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-full transition-all"
                          title="Approve & Merge"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button 
                           onClick={() => handleContributionAction(c._id, 'reject')}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-full transition-all"
                          title="Reject"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* --- CMS SECTIONS --- */}
        {(activeTab === 'stories' || activeTab === 'festivals' || activeTab === 'quizzes' || activeTab === 'reels') && (
           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
             <div className="flex items-center justify-between">
                <h2 className={`text-2xl font-bold cinzel-text flex items-center gap-2 capitalize ${!isAdmin ? 'text-foreground' : ''}`}>
                  {activeTab === 'stories' ? <BookOpen className={`w-6 h-6 ${isAdmin ? 'text-amber-500' : 'text-primary'}`}/> : activeTab === 'festivals' ? <Calendar className={`w-6 h-6 ${isAdmin ? 'text-amber-500' : 'text-primary'}`}/> : activeTab === 'reels' ? <ShieldAlert className={`w-6 h-6 ${isAdmin ? 'text-amber-500' : 'text-primary'}`}/> : <Trophy className={`w-6 h-6 ${isAdmin ? 'text-amber-500' : 'text-primary'}`} />}
                  {isAdmin ? 'Manage' : 'View'} {activeTab}
                </h2>
                {isAdmin && (
                  <button 
                    onClick={() => {
                          setFormData({
                              slides: activeTab === 'stories' ? [] : undefined,
                              questions: activeTab === 'quizzes' ? [] : undefined,
                          });
                          setIsAdding(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-lg font-bold transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add New {getSingularTitle()}
                  </button>
                )}
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {(activeTab === 'stories' ? stories : activeTab === 'festivals' ? festivals : activeTab === 'quizzes' ? quizzes : reels).map(item => (
                   <Card key={item._id} className="p-4 glass-panel border-border/50 hover:border-amber-500/30 transition-all flex justify-between items-start">
                     <div>
                       <h3 className="font-bold text-lg text-foreground mb-1">{item.title}</h3>
                       <p className="text-sm text-muted-foreground">{item.description?.substring(0,60) || "No description"}...</p>
                     </div>
                     <div className="flex gap-2 shrink-0">
                        {isAdmin && (
                          <>
                            <button onClick={() => handleEditCMS(activeTab, item)} className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded transition-all"><Edit2 className="w-4 h-4"/></button>
                            <button onClick={() => handleCMSDelete(activeTab as 'stories' | 'festivals' | 'quizzes' | 'reels', item._id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-all"><Trash2 className="w-4 h-4"/></button>
                          </>
                        )}
                     </div>
                   </Card>
                ))}
             </div>
           </motion.div>
        )}

      </div>

      {/* Add Item Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="glass-panel w-full max-w-2xl border-amber-500/30 p-6 flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center mb-6 shrink-0">
                <h3 className="text-xl font-bold cinzel-text text-amber-500 capitalize">{formData._id ? 'Edit' : 'Create New'} {getSingularTitle()}</h3>
                <button onClick={() => setIsAdding(false)} className="p-2 bg-white/5 hover:bg-white/10 rounded-full"><XCircle className="w-5 h-5 text-muted-foreground"/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 layout-scroll">
               <div className="space-y-2">
                 <label className="text-sm font-bold text-amber-500">Title</label>
                 <input type="text" className="w-full bg-black/40 border border-amber-500/20 p-3 rounded-lg text-foreground focus:border-amber-500/50" 
                        value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Title" />
               </div>
               
               <div className="space-y-2">
                 <label className="text-sm font-bold text-amber-500">Description</label>
                 <textarea className="w-full bg-black/40 border border-amber-500/20 p-3 rounded-lg text-foreground h-24 focus:border-amber-500/50" 
                        value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Description" />
               </div>

               {activeTab === 'festivals' && (
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-amber-500">Date (YYYY-MM-DD)</label>
                    <input type="date" className="w-full bg-black/40 border border-amber-500/20 p-3 rounded-lg text-foreground focus:border-amber-500/50" 
                           value={formData.date || ''} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                  </div>
               )}

               {activeTab === 'quizzes' && (
                  <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-amber-500">Thumbnail URL</label>
                        <input type="text" className="w-full bg-black/40 border border-amber-500/20 p-3 rounded-lg text-foreground focus:border-amber-500/50" 
                               value={formData.image || ''} onChange={(e) => setFormData({...formData, image: e.target.value})} placeholder="https://example.com/thumbnail.jpg" />
                     </div>

                     <div className="flex justify-between items-center">
                        <label className="text-sm font-bold text-amber-500">Questions Build-Out</label>
                        <button onClick={addQuestion} className="bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30 px-3 py-1 rounded text-xs font-bold transition-all">
                           + Add Question
                        </button>
                     </div>
                     <div className="space-y-4">
                        {(formData.questions || []).map((q: any, i: number) => (
                           <div key={i} className="p-4 bg-black/40 border border-emerald-500/20 rounded-lg space-y-3 relative">
                              <button onClick={() => removeQuestion(i)} className="absolute top-2 right-2 text-red-500 hover:text-red-400 p-1"><Trash2 className="w-4 h-4" /></button>
                              <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">Question Text</label>
                                <input type="text" className="w-full bg-black/60 border border-border p-2 rounded text-sm text-foreground focus:border-emerald-500/50" 
                                       value={q.question} onChange={(e) => updateQuestion(i, 'question', e.target.value)} placeholder="E.g., What is the first avatar?" />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                 {q.options.map((opt: string, optIdx: number) => (
                                    <div key={optIdx} className="space-y-1">
                                       <label className="text-xs text-muted-foreground flex items-center justify-between">
                                          <span>Option {optIdx + 1}</span>
                                          <input type="radio" name={`correct-${i}`} checked={q.correct === optIdx} onChange={() => updateQuestion(i, 'correct', optIdx)} title="Mark Correct" />
                                       </label>
                                       <input type="text" className={`w-full bg-black/60 border p-2 rounded text-sm text-foreground focus:border-emerald-500/50 ${q.correct === optIdx ? 'border-emerald-500/50' : 'border-border'}`} 
                                              value={opt} onChange={(e) => updateOption(i, optIdx, e.target.value)} placeholder={`Option ${optIdx + 1}`} />
                                    </div>
                                 ))}
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">Explanation (Why correct?)</label>
                                <textarea className="w-full bg-black/60 border border-border p-2 rounded text-sm text-foreground focus:border-emerald-500/50 h-16" 
                                       value={q.explanation} onChange={(e) => updateQuestion(i, 'explanation', e.target.value)} placeholder="Because..." />
                              </div>
                           </div>
                        ))}
                        {(formData.questions || []).length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4 border border-dashed border-border/50 rounded">No questions added yet.</p>
                        )}
                     </div>
                  </div>
               )}

               {activeTab === 'stories' && (
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <label className="text-sm font-bold text-amber-500">Slides Build-Out</label>
                        <button onClick={addSlide} className="bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30 px-3 py-1 rounded text-xs font-bold transition-all">
                           + Add Slide
                        </button>
                     </div>
                     <div className="space-y-4">
                        {(formData.slides || []).map((slide: any, i: number) => (
                           <div key={i} className="flex flex-col md:flex-row gap-4 p-4 bg-black/40 border border-emerald-500/20 rounded-lg relative">
                              <button onClick={() => removeSlide(i)} className="absolute top-2 right-2 text-red-500 hover:text-red-400 p-1"><Trash2 className="w-4 h-4" /></button>
                              
                              <div className="flex-1 space-y-3 pt-4 md:pt-0">
                                  <div className="grid grid-cols-2 gap-2">
                                     <div className="space-y-1">
                                        <label className="text-xs text-muted-foreground">Type</label>
                                        <select className="w-full bg-black/60 border border-border p-2 rounded text-sm text-foreground focus:border-emerald-500/50" 
                                                value={slide.type} onChange={(e) => updateSlide(i, 'type', e.target.value)}>
                                            <option value="content">Content</option>
                                            <option value="cover">Cover</option>
                                        </select>
                                     </div>
                                     <div className="space-y-1">
                                        <label className="text-xs text-muted-foreground">Image URL</label>
                                        <input type="text" className="w-full bg-black/60 border border-border p-2 rounded text-sm text-foreground focus:border-emerald-500/50" 
                                               value={slide.image} onChange={(e) => updateSlide(i, 'image', e.target.value)} placeholder="/visual_path.jpg" />
                                     </div>
                                  </div>
                                  <div className="space-y-1">
                                     <label className="text-xs text-muted-foreground">Text / Story Narrative</label>
                                     <textarea className="w-full bg-black/60 border border-border p-2 rounded text-sm text-foreground focus:border-emerald-500/50 h-20" 
                                            value={slide.text} onChange={(e) => updateSlide(i, 'text', e.target.value)} placeholder="Long ago..." />
                                  </div>
                              </div>
                           </div>
                        ))}
                        {(formData.slides || []).length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4 border border-dashed border-border/50 rounded">No slides added yet.</p>
                        )}
                     </div>
                  </div>
               )}
               {activeTab === 'reels' && (
                  <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-amber-500">Video Content (.mp4)</label>
                        <input type="file" accept="video/mp4,video/x-m4v,video/*" className="w-full bg-black/40 border border-amber-500/20 p-2 rounded-lg text-foreground focus:border-amber-500/50" 
                               onChange={(e) => setFormData({...formData, videoVideo: e.target.files?.[0]})} />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-amber-500">Caption</label>
                        <input type="text" className="w-full bg-black/40 border border-amber-500/20 p-3 rounded-lg text-foreground focus:border-amber-500/50" 
                               value={formData.caption || ''} onChange={(e) => setFormData({...formData, caption: e.target.value})} placeholder="Catchy caption..." />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-amber-500">Divine Insight</label>
                        <textarea className="w-full bg-black/40 border border-amber-500/20 p-3 rounded-lg text-foreground h-20 focus:border-amber-500/50" 
                               value={formData.insight || ''} onChange={(e) => setFormData({...formData, insight: e.target.value})} placeholder="Dharma teaches us..." />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-amber-500">Action Item</label>
                        <input type="text" className="w-full bg-black/40 border border-amber-500/20 p-3 rounded-lg text-foreground focus:border-amber-500/50" 
                               value={formData.actionItem || ''} onChange={(e) => setFormData({...formData, actionItem: e.target.value})} placeholder="Perform an act of kindness..." />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-amber-500">Category</label>
                           <input type="text" className="w-full bg-black/40 border border-amber-500/20 p-3 rounded-lg text-foreground focus:border-amber-500/50" 
                                  value={formData.category || ''} onChange={(e) => setFormData({...formData, category: e.target.value})} placeholder="Philosophy" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-amber-500">Related Module Page Route</label>
                           <input type="text" className="w-full bg-black/40 border border-amber-500/20 p-3 rounded-lg text-foreground focus:border-amber-500/50" 
                                  value={formData.relatedModule || ''} onChange={(e) => setFormData({...formData, relatedModule: e.target.value})} placeholder="storyverse" />
                        </div>
                     </div>
                  </div>
               )}
            </div>

            <div className="mt-6 pt-4 border-t border-amber-500/20 flex justify-end shrink-0">
               <button onClick={handleCMSCreate} className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg shadow-lg">
                  {formData._id ? 'Update' : 'Save'} {getSingularTitle()}
               </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
