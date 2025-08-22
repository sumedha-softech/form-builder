import React from "react";
import { ArrowLeft, Copy, Eye } from "lucide-react";

const Header = () => {
    return (
        <div className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom">
            <div className="d-flex align-items-center">
                <button className="btn btn-link text-dark p-1 me-2">
                    <ArrowLeft size={16} />
                </button>
                <div>
                    <span className="text-muted small">Form/</span>
                    <span className="fw-medium">Untitled</span>
                </div>
            </div>

            <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary btn-sm d-flex align-items-center">
                    <Eye size={16} className="me-1" />
                    Preview
                </button>
                <button className="btn btn-outline-secondary btn-sm d-flex align-items-center">
                    <Copy size={16} className="me-1" />
                    Copy JSON
                </button>
                <button className="btn btn-success-custom btn-sm">
                    Publish
                </button>
            </div>
        </div>
    );
};

export default Header;
