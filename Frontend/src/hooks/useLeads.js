import { useState, useCallback, useEffect } from "react";
import { getLeads as fetchLeads, updateLead as putLead } from "../api/leads.js";
import { useDebounce } from "./useDebounce.js";
import { ROWS_PER_PAGE_OPTIONS } from "../constants/index.js";

const DEFAULT_FILTERS = {
  search: "",
  status: "",
  employee: "",
  startDate: "",
  endDate: "",
};

export function useLeads() {
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(ROWS_PER_PAGE_OPTIONS[0]);

  const debouncedSearch = useDebounce(filters.search, 400);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchLeads({
        search: debouncedSearch,
        status: filters.status,
        employee: filters.employee,
        startDate: filters.startDate,
        endDate: filters.endDate,
        page,
        limit,
      });
      setLeads(data.leads);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch leads.");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filters.status, filters.employee, filters.startDate, filters.endDate, page, limit]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  // Reset to page 1 whenever filters or limit change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters.status, filters.employee, filters.startDate, filters.endDate, limit]);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const saveLeadUpdate = useCallback(async (id, formData) => {
    const { data } = await putLead(id, formData);
    setLeads((prev) => prev.map((l) => (l._id === id ? data : l)));
    return data;
  }, []);

  return {
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
    reload: loadLeads,
  };
}
