import { useState, useCallback } from "react";
import Layout from "../components/layout/Layout.jsx";
import SearchBar from "../components/filters/SearchBar.jsx";
import FilterPanel from "../components/filters/FilterPanel.jsx";
import LeadTable from "../components/leads/LeadTable.jsx";
import LeadDetailModal from "../components/leads/LeadDetailModal.jsx";
import EditLeadModal from "../components/leads/EditLeadModal.jsx";
import Pagination from "../components/pagination/Pagination.jsx";
import Loader from "../components/common/Loader.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import { useLeads } from "../hooks/useLeads.js";

export default function LeadsPage() {
  const {
    leads,
    total,
    totalPages,
    loading,
    error,
    filters,
    page,
    limit,
    setPage,
    setLimit,
    updateFilter,
    resetFilters,
    saveLeadUpdate,
    reload,
  } = useLeads();

  const [viewLeadId, setViewLeadId] = useState(null);
  const [editLead, setEditLead] = useState(null);

  const handleView = useCallback((lead) => setViewLeadId(lead._id), []);
  const handleEdit = useCallback((lead) => setEditLead(lead), []);
  const handleCloseView = useCallback(() => setViewLeadId(null), []);
  const handleCloseEdit = useCallback(() => setEditLead(null), []);

  return (
    <Layout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Lead Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and track all your sales leads in one place.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-2">
            <p className="text-xs text-indigo-500 font-medium">Total Leads</p>
            <p className="text-2xl font-bold text-indigo-600 leading-tight">{total}</p>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-4 mb-5">
        <SearchBar
          value={filters.search}
          onChange={(val) => updateFilter("search", val)}
        />
        <FilterPanel
          filters={filters}
          onFilterChange={updateFilter}
          onReset={resetFilters}
        />
      </div>

      {/* Table / Loading / Error */}
      <div className="mb-5">
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <Loader message="Fetching leads..." />
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <ErrorMessage message={error} onRetry={reload} />
          </div>
        ) : (
          <LeadTable leads={leads} onView={handleView} onEdit={handleEdit} />
        )}
      </div>

      {/* Pagination */}
      {!loading && !error && (
        <Pagination
          page={page}
          totalPages={totalPages}
          total={total}
          limit={limit}
          onPageChange={setPage}
          onLimitChange={setLimit}
        />
      )}

      {/* Modals */}
      <LeadDetailModal
        leadId={viewLeadId}
        isOpen={!!viewLeadId}
        onClose={handleCloseView}
      />
      <EditLeadModal
        lead={editLead}
        isOpen={!!editLead}
        onClose={handleCloseEdit}
        onSave={saveLeadUpdate}
      />
    </Layout>
  );
}
