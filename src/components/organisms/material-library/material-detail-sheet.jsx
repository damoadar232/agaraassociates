"use client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getCategoryLabel, getSubcategoryLabel } from "@/lib/materials/categories";
import { PriceChangeBadge } from "@/components/atoms/price-change-badge";
import { DatasheetViewer } from "@/components/organisms/material-library/datasheet-viewer";
import { getMaterialGradientClass } from "@/components/organisms/material-library/material-views";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { X, Star, Archive, Pencil, FileText, ExternalLink, Package, } from "lucide-react";
import { cx } from "@/lib/utils";
import "@/assets/styles/components/MaterialDetailSheet.scss";

function DetailRow({ label, value }) {
    if (value == null || value === "")
        return null;
    return (
        <div className="material-detail-sheet__detail-row">
            <span className="material-detail-sheet__detail-label">{label}</span>
            <span className="material-detail-sheet__detail-value">{value}</span>
        </div>
    );
}

function getHeroGradientClass(imageGradient) {
    return getMaterialGradientClass(imageGradient).replace("material-thumb--", "material-detail-sheet__hero--");
}

export function MaterialDetailSheet({ material, onClose, onToggleFavorite, onArchive, onEdit, }) {
    const [datasheetOpen, setDatasheetOpen] = useState(false);
    if (!material)
        return null;
    const alternates = [];
    return (
        <>
            <div className="material-detail-sheet">
                <div className="material-detail-sheet__header">
                    <h2 className="material-detail-sheet__title">Material Details</h2>
                    <div className="material-detail-sheet__header-actions">
                        <Button variant="ghost" size="icon" className="material-detail-sheet__header-btn" onClick={() => onToggleFavorite(material.id)}>
                            <Star
                                className={cx(
                                    "material-detail-sheet__header-btn-icon",
                                    material.isFavorite && "material-detail-sheet__header-btn-icon--favorite",
                                )}
                                strokeWidth={1.5}
                            />
                        </Button>
                        <Button variant="ghost" size="icon" className="material-detail-sheet__header-btn" onClick={onClose}>
                            <X className="material-detail-sheet__header-btn-icon" />
                        </Button>
                    </div>
                </div>

                <ScrollArea className="material-detail-sheet__scroll">
                    <div className="material-detail-sheet__body">
                        <div className={cx("material-detail-sheet__hero", getHeroGradientClass(material.imageGradient))}>
                            <div>
                                <p className="material-detail-sheet__hero-name">{material.name}</p>
                                <p className="material-detail-sheet__hero-sku">{material.sku}</p>
                            </div>
                        </div>

                        <div className="material-detail-sheet__price-row">
                            <div>
                                <p className="material-detail-sheet__price">
                                    ₹{material.currentPrice.toLocaleString("en-IN")}
                                    <span className="material-detail-sheet__price-unit">/{material.unit}</span>
                                </p>
                                <p className="material-detail-sheet__price-meta">
                                    Incl. GST {material.gst}% · MOQ {material.moq} {material.unit}
                                </p>
                            </div>
                            <PriceChangeBadge current={material.currentPrice} previous={material.previousPrice} />
                        </div>

                        <div className="material-detail-sheet__badges">
                            <Badge variant="outline">{getCategoryLabel(material.categoryId)}</Badge>
                            <Badge variant="secondary">{getSubcategoryLabel(material.categoryId, material.subcategoryId)}</Badge>
                            <Badge
                                variant={material.availability === "in_stock"
                                    ? "success"
                                    : material.availability === "low_stock"
                                        ? "warning"
                                        : "outline"}
                                className="material-detail-sheet__availability"
                            >
                                {material.availability.replace(/_/g, " ")}
                            </Badge>
                        </div>

                        {material.specification && (
                            <p className="material-detail-sheet__spec-text">{material.specification}</p>
                        )}

                        <Separator />

                        <div>
                            <h3 className="material-detail-sheet__section-title">Specifications</h3>
                            <DetailRow label="Brand" value={material.brand} />
                            <DetailRow label="Manufacturer" value={material.manufacturer} />
                            <DetailRow label="Supplier" value={material.supplier} />
                            <DetailRow label="Size" value={material.size} />
                            <DetailRow label="Thickness" value={material.thickness} />
                            <DetailRow label="Color" value={material.color} />
                            <DetailRow label="Finish" value={material.finish} />
                            <DetailRow label="Grade" value={material.grade} />
                            <DetailRow label="Lead Time" value={`${material.leadTimeDays} days`} />
                            <DetailRow label="Stock Qty" value={material.stockQuantity} />
                            <DetailRow label="Warranty" value={material.warranty} />
                            <DetailRow label="Origin" value={material.countryOfOrigin} />
                            <DetailRow label="Sustainability" value={material.sustainabilityRating} />
                            <DetailRow label="Fire Rating" value={material.fireRating} />
                            <DetailRow label="Standards" value={material.standards?.join(", ")} />
                            <DetailRow label="Usage Count" value={material.usageCount} />
                        </div>

                        {material.vendors.length > 0 && (
                            <>
                                <Separator />
                                <div>
                                    <h3 className="material-detail-sheet__section-title">Vendors</h3>
                                    <div className="material-detail-sheet__vendor-list">
                                        {material.vendors.map((v) => (
                                            <div
                                                key={v.id}
                                                className={cx(
                                                    "material-detail-sheet__vendor-item",
                                                    v.isPreferred && "material-detail-sheet__vendor-item--preferred",
                                                )}
                                            >
                                                <div>
                                                    <p className="material-detail-sheet__vendor-name">{v.name}</p>
                                                    <p className="material-detail-sheet__vendor-lead">{v.leadTimeDays}d lead</p>
                                                </div>
                                                <div>
                                                    <p className="material-detail-sheet__vendor-price">₹{v.price.toLocaleString("en-IN")}</p>
                                                    {v.isPreferred && <Badge className="material-detail-sheet__vendor-badge">Preferred</Badge>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {alternates.length > 0 && (
                            <>
                                <Separator />
                                <div>
                                    <h3 className="material-detail-sheet__section-title">Alternates</h3>
                                    <div className="material-detail-sheet__vendor-list">
                                        {alternates.map((alt) => (
                                            <div key={alt.id} className="material-detail-sheet__alternate-item">
                                                <p className="material-detail-sheet__alternate-name">{alt.name}</p>
                                                <p className="material-detail-sheet__alternate-price">
                                                    ₹{alt.currentPrice.toLocaleString("en-IN")}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {material.remarks && (
                            <>
                                <Separator />
                                <p className="material-detail-sheet__remarks">{material.remarks}</p>
                            </>
                        )}

                        <div className="material-detail-sheet__actions">
                            <Button variant="outline" size="sm" className="material-detail-sheet__action-btn" asChild>
                                <Link to="/boq"><Package className="material-detail-sheet__action-icon" /> Add to BOQ</Link>
                            </Button>
                            <Button variant="outline" size="sm" className="material-detail-sheet__action-btn" asChild>
                                <Link to="/procurement"><ExternalLink className="material-detail-sheet__action-icon" /> Procure</Link>
                            </Button>
                            <Button variant="outline" size="sm" className="material-detail-sheet__action-btn" onClick={() => setDatasheetOpen(true)}>
                                <FileText className="material-detail-sheet__action-icon" /> Datasheet
                            </Button>
                        </div>
                    </div>
                </ScrollArea>

                <div className="material-detail-sheet__footer">
                    <Button variant="outline" className="material-detail-sheet__footer-btn material-detail-sheet__footer-btn--grow" size="sm" onClick={() => onEdit?.(material)}>
                        <Pencil className="material-detail-sheet__action-icon" /> Edit
                    </Button>
                    <Button variant="outline" className="material-detail-sheet__footer-btn" size="sm" onClick={() => onArchive(material.id)}>
                        <Archive className="material-detail-sheet__action-icon" />
                    </Button>
                </div>
            </div>

            <DatasheetViewer open={datasheetOpen} onOpenChange={setDatasheetOpen} materialName={material.name} datasheetUrl={material.datasheetUrl} sku={material.sku} brand={material.brand} />
        </>
    );
}
