"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus, Briefcase } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Job } from "../types";

const API_URL = "http://localhost:5000/jobs";

export default function JobsCRUD() {
    const [jobs, setJobs] = useState<Job[]>([]);

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [category, setCategory] = useState("Technology");
    const [jobType, setJobType] = useState("Full-time");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");
    const [editingJobId, setEditingJobId] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);

    useEffect(() => {
        getJobs();
    }, []);

    const getJobs = async () => {
        setFetchLoading(true);
        try {
            const response = await axios.get<Job[]>(API_URL);
            setJobs(response.data);
        } catch (error) {
            console.error("Failed to load jobs", error);
        } finally {
            setFetchLoading(false);
        }
    };

    const openCreateModal = () => {
        clearForm();
        setModalMode("create");
        setIsModalOpen(true);
    };

    const openEditModal = (job: Job) => {
        setEditingJobId(job.id);
        setTitle(job.title);
        setCompany(job.company);
        setLocation(job.location);
        setSalary(job.salary === "Not Specified" ? "" : job.salary);
        setCategory(job.category);
        setJobType(job.job_type);
        setDescription(job.description);
        setRequirements(job.requirements ? job.requirements.join(", ") : "");

        setModalMode("edit");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        clearForm();
        setIsModalOpen(false);
    };

    const clearForm = () => {
        setTitle("");
        setCompany("");
        setLocation("");
        setSalary("");
        setCategory("Technology");
        setJobType("Full-time");
        setDescription("");
        setRequirements("");
        setEditingJobId(null);
    };

    const handleSaveJob = async () => {
        setLoading(true);

        const requirementsArray = requirements
            .split(",")
            .map((req) => req.trim())
            .filter((req) => req !== "");

        try {
            if (modalMode === "create") {
                await axios.post(API_URL, {
                    title,
                    company,
                    location,
                    salary: salary || "Not Specified",
                    category,
                    job_type: jobType,
                    description,
                    requirements: requirementsArray,
                    created_at: new Date().toISOString()
                });
                closeModal();
                getJobs();
            } else if (modalMode === "edit" && editingJobId) {
                await axios.patch(`${API_URL}/${editingJobId}`, {
                    title,
                    company,
                    location,
                    salary: salary || "Not Specified",
                    category,
                    job_type: jobType,
                    description,
                    requirements: requirementsArray,
                });
                closeModal();
                getJobs();
            }
        } catch (error) {
            console.error("Error saving job entry", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this job posting?")) return;

        try {
            await axios.delete(`${API_URL}/${id}`);
            getJobs();
        } catch (error) {
            console.error("Error deleting job listing", error);
        }
    };

    return (
        <div className="crud-container">
            {/* Top Dashboard Row */}
            <div className="crud-header-row">
                <div>
                    <h1 className="crud-title">Internal Job Board</h1>
                    <p className="crud-subtitle">Manage, create, modify, and track public job vacancies</p>
                </div>
                <button onClick={openCreateModal} className="btn-primary">
                    <Plus size={16} /> Add New Job
                </button>
            </div>

            {/* Main Listings Data Table View */}
            <div className="table-wrapper">
                {fetchLoading ? (
                    <div style={{ padding: "3rem", textAlign: "center", color: "#64748b", fontSize: "0.875rem" }}>
                        Gathering available job listings...
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="empty-state">
                        <Briefcase className="empty-state-icon" />
                        <h3 style={{ fontSize: "1rem", color: "#334155", margin: "0 0 0.25rem 0" }}>No vacancies compiled yet</h3>
                        <p style={{ color: "#94a3b8", fontSize: "0.875rem", margin: "0" }}>Get started by creating your very first post configuration profile.</p>
                    </div>
                ) : (
                    <table className="crud-table">
                        <thead>
                            <tr>
                                <th>Job Info</th>
                                <th>Requirements</th>
                                <th>Category</th>
                                <th>Type</th>
                                <th>Compensation</th>
                                <th style={{ textAlign: "right" }}>Management</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr key={job.id}>
                                    <td>
                                        <div className="job-title-cell">{job.title}</div>
                                        <div className="job-meta-cell">{job.company} — {job.location}</div>
                                    </td>
                                    <td>
                                        {job.requirements && job.requirements.length > 0 ? (
                                            <ul className="requirements-list-inline">
                                                {job.requirements.map((req, idx) => (
                                                    <li key={idx} className="req-pill">{req}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span style={{ color: "#cbd5e1", fontSize: "0.75rem" }}>None</span>
                                        )}
                                    </td>
                                    <td>
                                        <span className="badge badge-gray">{job.category}</span>
                                    </td>
                                    <td>
                                        <span className="badge badge-blue">{job.job_type}</span>
                                    </td>
                                    <td style={{ fontWeight: 500, color: "#475569" }}>{job.salary}</td>
                                    <td>
                                        <div className="actions-cell">
                                            <button onClick={() => openEditModal(job)} className="btn-icon btn-icon-edit" title="Modify Entry">
                                                <Pencil size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(job.id)} className="btn-icon btn-icon-delete" title="Drop Listing">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* shadcn/ui Dialog Component */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[650px] bg-white p-6">
                    <DialogHeader className="border-b pb-4 mb-6">
                        <DialogTitle className="text-xl font-bold text-slate-900">
                            {modalMode === "create" ? "Add New Job Listing" : "Modify Listing Details"}
                        </DialogTitle>
                    </DialogHeader>

                    <div>
                        <div className="form-grid-2">
                            <div>
                                <label className="form-label">Job Title *</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Senior Frontend Engineer"
                                    className="form-input"
                                />
                            </div>
                            <div>
                                <label className="form-label">Company *</label>
                                <input
                                    type="text"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    placeholder="e.g., TechCorp"
                                    className="form-input"
                                />
                            </div>
                        </div>

                        <div className="form-grid-2">
                            <div>
                                <label className="form-label">Location *</label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="e.g., San Francisco, CA"
                                    className="form-input"
                                />
                            </div>
                            <div>
                                <label className="form-label">Salary (Optional)</label>
                                <input
                                    type="text"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    placeholder="e.g., $100,000 - $150,000"
                                    className="form-input"
                                />
                            </div>
                        </div>

                        <div className="form-grid-2">
                            <div>
                                <label className="form-label">Category</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select">
                                    <option value="Technology">Technology</option>
                                    <option value="Design">Design</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Finance">Finance</option>
                                </select>
                            </div>
                            <div>
                                <label className="form-label">Job Type</label>
                                <select value={jobType} onChange={(e) => setJobType(e.target.value)} className="form-select">
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Remote">Remote</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Description *</label>
                            <textarea
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Job description and responsibilities..."
                                className="form-textarea"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Requirements (comma-separated)</label>
                            <input
                                type="text"
                                value={requirements}
                                onChange={(e) => setRequirements(e.target.value)}
                                placeholder="e.g., React, TypeScript, 5+ years experience"
                                className="form-input"
                            />
                        </div>

                        <div className="form-actions-grid">
                            <button
                                type="button"
                                onClick={handleSaveJob}
                                disabled={loading}
                                className="btn-primary"
                                style={{ justifyContent: "center" }}
                            >
                                {loading ? "Processing..." : modalMode === "create" ? "Add Job" : "Update Details"}
                            </button>
                            <button type="button" onClick={closeModal} className="btn-secondary">
                                Cancel
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}